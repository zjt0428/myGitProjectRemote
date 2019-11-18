package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.AfterRemodelDao;
import com.knight.emms.dao.BeforeRemodelDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.MaterialsRemodelDao;
import com.knight.emms.model.AfterRemodel;
import com.knight.emms.model.BeforeRemodel;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsRemodel;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.service.BaseLocationService;
import com.knight.emms.service.MaterialsRemodelService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.MaterialsStoreService;
import com.knight.emms.service.ProjectMaterialsStoreService;
import com.knight.emms.service.ProjectService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class MaterialsRemodelServiceImpl extends BusinessFlowServiceImpl<MaterialsRemodel> implements MaterialsRemodelService {

	@Resource
	private MaterialsStoreService materialsStoreService;

	@Resource
	private ProjectMaterialsStoreService projectMaterialsStoreService;

	@Resource
	private BaseLocationService baseLocationService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;

	@Resource
	private ProjectService projectService;

	@Resource
	private MaterialsRemodelDao materialsRemodelDao;

	@Resource
	private AfterRemodelDao afterRemodelDao;

	@Resource
	private BeforeRemodelDao beforeRemodelDao;
	
	/** 周材出库记录表 */
	@Autowired
	private MaterialsOutStockDao materialsOutStockDao;
	
	/** 周材入库记录表 */
	@Autowired
	private MaterialsInStockDao materialsInStockDao;

	public MaterialsRemodelServiceImpl(MaterialsRemodelDao dao) {
		super(dao);
		this.materialsRemodelDao = dao;
	}

	@Override
	public List<MaterialsRemodel> queryTranslateAllFull(QueryFilter filter) {
		List<MaterialsRemodel> list = materialsRemodelDao.getAll(filter);
		for (MaterialsRemodel lc : list) {
			CodeServiceImpl.translate(lc, getPersistantStruct());
		}
		return list;
	}

	@Override
	public MaterialsRemodel getTranslateFull(Long remodelId) {
		MaterialsRemodel lc = materialsRemodelDao.get(remodelId);
		CodeServiceImpl.translate(lc, getPersistantStruct());
		return lc;
	}

	@Override
	public void deleteAfter(Long afterId) {
		afterRemodelDao.remove(afterId);
	}

	@Override
	public void deleteBefore(Long beforeId) {
		beforeRemodelDao.remove(beforeId);
	}
	
	@Override
	public void saveOrMergeForEdit(MaterialsRemodel materialsRemodel) {
		if (materialsRemodel.getRemodelId() == null) {
			materialsRemodelDao.saveSerialModel(materialsRemodel);
		}
		materialsRemodel.setSubMaterialsRemodel();
		materialsRemodelDao.merge(materialsRemodel);
	}

	/** 审批 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		MaterialsRemodel mr = super.passFlowApproveApplication(formApprove);
	
		// 改型前
		for (BeforeRemodel br : mr.getBeforeRemodelSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", mr.getBaseDepot().getDepotId() + "");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", br.getBaseLocation().getLocationId() + "");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ",
					br.getMaterialsSpecifications().getSpecificationsId() + "");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			if (list.size() > 0) {
				ms = list.get(0);
				Integer i = Integer.valueOf(ms.getQuantity()) - Integer.valueOf(br.getQuantity());
				if(i<0) {
					throw new BusinessException("改型数量大于库存数量，审批失败");
				}
				ms.setQuantity(i.toString());
			} else {
				throw new BusinessException("基地库存不存在此条记录！");
			}
			materialsStoreService.merge(ms);
		}
		// 改型后
		for (AfterRemodel ar : mr.getAfterRemodelSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", mr.getBaseDepot().getDepotId() + "");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", ar.getBaseLocation().getLocationId() + "");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ",
					ar.getMaterialsSpecifications().getSpecificationsId() + "");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			if (list.size() > 0) {
				ms = list.get(0);
				Integer i = Integer.valueOf(ms.getQuantity()) + Integer.valueOf(ar.getQuantity()==null?"0":ar.getQuantity());
				ms.setQuantity(i.toString());
			} else {
				ms.setBaseDepot(mr.getBaseDepot());
				ms.setBaseLocation(ar.getBaseLocation());
				ms.setMaterialsSpecifications(ar.getMaterialsSpecifications());
				ms.setQuantity(ar.getQuantity());
			}
			materialsStoreService.merge(ms);
		}
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(mr);
		logger.info("已同步至周材出库记录表并生成记录值!");
		// 同步至周材入库记录表生成记录值
		this.addMaterialsIn(mr);
		logger.info("已同步至周材入库记录表并生成记录值!");
		materialsRemodelDao.save(mr);
	}

	/**
	 * @Title addMaterialsOut
	 * @Description 同步至周材出库记录表生成记录值
	 * @author 陈光毅
	 * @date 2017年12月12日
	 * @param materialsRemodel
	 * @return void
	 * @version v1.0
	 */
	public void addMaterialsOut(MaterialsRemodel materialsRemodel) {
		Set<?> set = materialsRemodel.getBeforeRemodelSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				BeforeRemodel beforeRemodel = (BeforeRemodel) object;
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(materialsRemodel.getBaseDepot().getDepotId());
				materialsOutStock.setDepotName(materialsRemodel.getBaseDepot().getDepotName());
				materialsOutStock.setLocationId(beforeRemodel.getBaseLocation().getLocationId());
				materialsOutStock.setLocationName(beforeRemodel.getBaseLocation().getLocationName());
				materialsOutStock.setSerial(materialsRemodel.getRemodelSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(materialsRemodel.getApplyDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("改型出库");
				materialsOutStock.setRelateBusiness("周材改型");
				materialsOutStock.setRemark(materialsRemodel.getRemark());
				materialsOutStock.setCommodity(beforeRemodel.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
				materialsOutStock.setSpecifications(beforeRemodel.getMaterialsSpecifications().getSpecifications());
				materialsOutStock.setQuantity(beforeRemodel.getQuantity());
				materialsOutStock.setAuxiliaryQuantity(String.valueOf(new java.text.DecimalFormat("#.00").format(
						Double.valueOf(beforeRemodel.getQuantity()) * Double.valueOf(beforeRemodel.getMaterialsSpecifications()
								.getSecondConvertedQuantity()))));
				materialsOutStock.setUnit(beforeRemodel.getMaterialsSpecifications().getFirstUnitConversion());
				materialsOutStockDao.save(materialsOutStock);
			}
		}
	}
	
	/**
	 * @Title addMaterialsIn
	 * @Description 同步至周材入库记录表生成记录值
	 * @author 陈光毅
	 * @date 2017年12月12日
	 * @param materialsRemodel
	 * @return void
	 * @version v1.0
	 */
	public void addMaterialsIn(MaterialsRemodel materialsRemodel) {
		Set<?> set = materialsRemodel.getAfterRemodelSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				AfterRemodel afterRemodel = (AfterRemodel) object;
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setDepotId(materialsRemodel.getBaseDepot().getDepotId());
				materialsInStock.setDepotName(materialsRemodel.getBaseDepot().getDepotName());
				materialsInStock.setLocationId(afterRemodel.getBaseLocation().getLocationId());
				materialsInStock.setLocationName(afterRemodel.getBaseLocation().getLocationName());
				materialsInStock.setSerial(materialsRemodel.getRemodelSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(materialsRemodel.getApplyDate(), "yyyy-MM-dd"));
				materialsInStock.setInType("改型入库");
				materialsInStock.setRelateBusiness("周材改型");
				materialsInStock.setRemark(materialsRemodel.getRemark());
				materialsInStock.setCommodity(afterRemodel.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
				materialsInStock.setSpecifications(afterRemodel.getMaterialsSpecifications().getSpecifications());
				materialsInStock.setQuantity(afterRemodel.getQuantity());
				materialsInStock.setAuxiliaryQuantity(String.valueOf(new java.text.DecimalFormat("#.00").format(Double.valueOf(
						afterRemodel.getQuantity()) * Double.valueOf(afterRemodel.getMaterialsSpecifications()
								.getSecondConvertedQuantity()))));
				materialsInStock.setUnit(afterRemodel.getMaterialsSpecifications().getFirstUnitConversion());
				materialsInStockDao.save(materialsInStock);
			}
		}
	}
}
