/**
 *====================================================
 * 文件名称: EquipDismantleServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
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
import com.knight.emms.dao.AfterMaterialsRepairDao;
import com.knight.emms.dao.BeforeMaterialsRepairDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.MaterialsRepairDao;
import com.knight.emms.model.AfterMaterialsRepair;
import com.knight.emms.model.BeforeMaterialsRepair;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsRepair;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.service.BaseDepotService;
import com.knight.emms.service.BaseLocationService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.MaterialsRepairService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.MaterialsStoreService;

import lombok.SneakyThrows;

/**
 * @ClassName: EquipDismantleServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:31:46
 */
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class MaterialsRepairServiceImpl extends BusinessFlowServiceImpl<MaterialsRepair> implements MaterialsRepairService {

	private MaterialsRepairDao materialsRepairDao;

	private BeforeMaterialsRepairDao beforeMaterialsRepairDao;

	private AfterMaterialsRepairDao afterMaterialsRepairDao;

	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private MaterialsStoreService materialsStoreService;

	@Resource
	private BaseDepotService baseDepotService;

	@Resource
	private BaseLocationService baseLocationService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	/** 周材出库记录表 */
	@Autowired
	private MaterialsOutStockDao materialsOutStockDao;
	
	/** 周材入库记录表 */
	@Autowired
	private MaterialsInStockDao materialsInStockDao;

	public MaterialsRepairServiceImpl(MaterialsRepairDao dao) {
		super(dao);
		this.materialsRepairDao = dao;
	}

	@Override
	public void saveOrMergeForEdit(MaterialsRepair materialsRepair) {
		if (materialsRepair.getMaterialsRepairId() == null) {
			materialsRepairDao.saveSerialModel(materialsRepair);
		}
		materialsRepair.setSubMaterialsRepair();
		materialsRepairDao.merge(materialsRepair);
	}

	@Override
	public void deleteBefore(Long beforeRepairId) {
		beforeMaterialsRepairDao.remove(beforeRepairId);
	}

	@Override
	public void deleteAfter(Long afterRepairId) {
		afterMaterialsRepairDao.remove(afterRepairId);
	}
	
	/** 审批 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		MaterialsRepair cl = super.passFlowApproveApplication(formApprove);
		Set<BeforeMaterialsRepair> bfs = cl.getBeforeMaterialsRepairSet();
		Set<AfterMaterialsRepair> afs = cl.getAfterMaterialsRepairSet();
		/* 出库 */
		for (BeforeMaterialsRepair br : bfs) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", String.valueOf(cl.getStoreId()));
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", String.valueOf(br.getLocationId()));
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", String.valueOf(br.getSpecificationsId()));
			List<MaterialsStore> msList = materialsStoreService.getAll(filter);
			if (msList.size() > 0) {
				/* 更新周材库存数量 */
				MaterialsStore ms = msList.get(0);
				Integer num = Integer.valueOf(ms.getQuantity())- Integer.valueOf(br.getQuantity() == null ? "0" : br.getQuantity());
				if(num<0) {
					throw new BusinessException("维修数量大于库存数量，审批失败");
				}
				ms.setQuantity(String.valueOf(num));
				materialsStoreService.merge(ms);
			} else {
				throw new BusinessException("仓库不存在"+br.getCommodity()+br.getSpecifications()+"的记录，审批失败");
			}
		}
		/* 入库 */
		for (AfterMaterialsRepair af : afs) {
			QueryFilter afilter = new QueryFilter();
			afilter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", String.valueOf(cl.getStoreId()));
			afilter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", String.valueOf(af.getLocationId()));
			afilter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ",
					String.valueOf(af.getSpecificationsId()));
			List<MaterialsStore> amsList = materialsStoreService.getAll(afilter);
			if (amsList.size() > 0) {
				/* 更新周材库存数量 */
				MaterialsStore ams = amsList.get(0);
				ams.setQuantity(String.valueOf(Integer.valueOf(ams.getQuantity())
						+ Integer.valueOf(af.getQuantity() == null ? "0" : af.getQuantity())));
				materialsStoreService.merge(ams);
			} else {
				/* 新增一条记录 */
				MaterialsStore ams = new MaterialsStore();
				ams.setBaseDepot(baseDepotService.get(cl.getStoreId()));
				ams.setBaseLocation(baseLocationService.get(af.getLocationId()));
				ams.setMaterialsSpecifications(materialsSpecificationsService.get(af.getSpecificationsId()));
				ams.setQuantity(af.getQuantity() == null ? "0" : af.getQuantity());
				materialsStoreService.save(ams);
			}
		}
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(cl);
		logger.info("已同步至周材出库记录表并生成记录值!");
		materialsRepairDao.merge(cl);
		// 同步至周材入库记录表生成记录值
		this.addMaterialsIn(cl);
		logger.info("已同步至周材入库记录表并生成记录值!");
	}

	/**
	 * @Title addMaterialsOut
	 * @Description 同步至周材出库记录表生成记录值
	 * @author 陈光毅
	 * @date 2017年12月05日
	 * @param materialsRepair
	 * @return void
	 */
	@Override
	public void addMaterialsOut(MaterialsRepair materialsRepair) {
		Set<?> set = materialsRepair.getBeforeMaterialsRepairSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				BeforeMaterialsRepair beforeMaterialsRepair = (BeforeMaterialsRepair) object;
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(materialsRepair.getStoreId());
				materialsOutStock.setDepotName(materialsRepair.getStoreName());
				materialsOutStock.setLocationId(beforeMaterialsRepair.getLocationId());
				materialsOutStock.setLocationName(beforeMaterialsRepair.getStorageLocation());
				materialsOutStock.setSerial(materialsRepair.getRepairSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(materialsRepair.getRepairDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("维修出库");
				materialsOutStock.setRelateBusiness("周材维修");
				materialsOutStock.setRemark(materialsRepair.getRemark());
				materialsOutStock.setCommodity(beforeMaterialsRepair.getCommodity());
				materialsOutStock.setSpecifications(beforeMaterialsRepair.getSpecifications());
				materialsOutStock.setQuantity(beforeMaterialsRepair.getQuantity());
				materialsOutStock.setAuxiliaryQuantity(beforeMaterialsRepair.getAuxiliaryNum());
				materialsOutStock.setUnit(beforeMaterialsRepair.getMeasurementUnit());
				materialsOutStockDao.save(materialsOutStock);
			}
		}
	}
	
	/**
	 * @Title addMaterialsIn
	 * @Description 同步至周材入库记录表生成记录值
	 * @author 陈光毅
	 * @date 2017年12月12日
	 * @param materialsRepair
	 * @return void
	 */
	@Override
	public void addMaterialsIn(MaterialsRepair materialsRepair) {
		Set<?> set = materialsRepair.getAfterMaterialsRepairSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				AfterMaterialsRepair afterMaterialsRepair = (AfterMaterialsRepair) object;
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setDepotId(materialsRepair.getStoreId());
				materialsInStock.setDepotName(materialsRepair.getStoreName());
				materialsInStock.setLocationId(afterMaterialsRepair.getLocationId());
				materialsInStock.setLocationName(afterMaterialsRepair.getEnterLocation());
				materialsInStock.setSerial(materialsRepair.getRepairSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(materialsRepair.getRepairDate(), "yyyy-MM-dd"));
				materialsInStock.setInType("维修入库");
				materialsInStock.setRelateBusiness("周材维修");
				materialsInStock.setRemark(materialsRepair.getRemark());
				materialsInStock.setCommodity(afterMaterialsRepair.getCommodity());
				materialsInStock.setSpecifications(afterMaterialsRepair.getSpecifications());
				materialsInStock.setQuantity(afterMaterialsRepair.getQuantity());
				materialsInStock.setAuxiliaryQuantity(afterMaterialsRepair.getAuxiliaryNum());
				materialsInStock.setUnit(afterMaterialsRepair.getMeasurementUnit());
				materialsInStockDao.save(materialsInStock);
			}
		}
	}
}
