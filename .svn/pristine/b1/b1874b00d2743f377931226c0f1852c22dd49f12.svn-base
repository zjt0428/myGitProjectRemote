
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceAbstract;
import com.knight.emms.dao.AllocationDepotDao;
import com.knight.emms.dao.AllocationDepotDetailDao;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.model.AllocationDepot;
import com.knight.emms.model.AllocationDepotDetail;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.service.AllocationDepotService;
import com.knight.emms.service.BaseDepotService;
import com.knight.emms.service.BaseLocationService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.MaterialsStoreService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

/**
 * @ClassName: AllocationDepotServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class AllocationDepotServiceImpl extends BusinessFlowServiceAbstract<AllocationDepot> implements AllocationDepotService {

	private AllocationDepotDao allocationDepotDao;

	@Resource
	private BusinessMessageDao businessMessageDao;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private AllocationDepotDetailDao allocationDepotDetailDao;

	@Resource
	private MaterialsStoreService materialsStoreService;

	@Resource
	private BaseDepotService baseDepotService;

	@Resource
	private BaseLocationService baseLocationService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;

	/** 周材出库记录表 */
	@Resource
	private MaterialsOutStockDao materialsOutStockDao;
	
	/** 周材入库记录表 */
	@Resource
	private MaterialsInStockDao materialsInStockDao;
	
	public AllocationDepotServiceImpl(AllocationDepotDao dao) {
		super(dao);
		this.allocationDepotDao = dao;
	}

	@Override
	public void saveCreate(AllocationDepot allocationDepot) {
		allocationDepot.setDelFlag(Constant.ENABLED);
		allocationDepot.setApplyforState(Status.Applyfor.waitSubmit);
		allocationDepotDao.saveSerialModel(allocationDepot);
		allocationDepot.setSubAllocation();
		allocationDepotDao.save(allocationDepot);
	}
	
	@Override
	public AllocationDepot getTranslateFull(Long allocationId) {
		AllocationDepot d = allocationDepotDao.get(allocationId);
		CodeServiceImpl.translate(d, getPersistantStruct());
		return d;
	}

	@Override
	public void deletedDetail(Long detailId) {
		allocationDepotDetailDao.remove(detailId);
	}

	@Override
	public void submitAllocation(Long allocationId) {
		AllocationDepot p = allocationDepotDao.get(allocationId);
		if (!Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
			throw new BusinessException("项目调拨方案[" + p.getAllocationSerial() + "]状态不合法,无法提交!");
		}
		p.setApplyforState(Status.Applyfor.waitApprove);
		allocationDepotDao.save(p);
	}
	
	/** 审批通过后对应的仓库库存数量根据调入,调出库位做调整 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		AllocationDepot ap = super.passFlowApproveApplication(formApprove);
	
		// 仓库周材库存调整
		for (AllocationDepotDetail ad : ap.getAllocationDepotDetailSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", ap.getOutDepotId() + "");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", ad.getOutLocationId() + "");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", ad.getSpecificationsId() + "");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			QueryFilter filter2 = new QueryFilter();
			filter2.addConjunctFilter("Q_baseDepot.depotId_L_EQ", ap.getInDepotId() + "");
			filter2.addConjunctFilter("Q_baseLocation.locationId_L_EQ", ad.getInLocationId() + "");
			filter2.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", ad.getSpecificationsId() + "");
			List<MaterialsStore> list2 = materialsStoreService.queryTranslateAll(filter2);
			MaterialsStore ms2 = new MaterialsStore();
			if (list.size() > 0 && list2.size() > 0) {
				ms = list.get(0);
				ms2 = list2.get(0);
				Integer i = Integer.valueOf(ms.getQuantity()) - Integer.valueOf(ad.getAllocationCounts()==null? "0" :ad.getAllocationCounts());
				Integer i2 = Integer.valueOf(ms2.getQuantity()) + Integer.valueOf(ad.getAllocationCounts()==null? "0" :ad.getAllocationCounts());
				if(i<0){
					throw new BusinessException("调拨数量大于库存数量，审批失败");
				}
				ms.setQuantity(i.toString());
				ms2.setQuantity(i2.toString());
			} else if (list.size() == 0) {
				throw new BusinessException("调出的仓库，库位不存在周材：" + ad.getCommodity()+ad.getSpecifications());
			} else if (list.size() > 0 && list2.size() == 0) {
				ms = list.get(0);
				Integer i = Integer.valueOf(ms.getQuantity()) - Integer.valueOf(ad.getAllocationCounts()==null? "0" :ad.getAllocationCounts());//调出库位库存-调拨数量
				if(i<0){
					throw new BusinessException("调拨数量大于库存数量，审批失败");
				}
				ms.setQuantity(i.toString());
				Integer i2 = Integer.valueOf(ad.getAllocationCounts()==null? "0" :ad.getAllocationCounts());
				ms2.setQuantity(i2.toString());
				ms2.setBaseDepot(baseDepotService.get(ap.getInDepotId()));
				ms2.setBaseLocation(baseLocationService.get(ad.getInLocationId()));
				ms2.setMaterialsSpecifications(materialsSpecificationsService.get(ad.getSpecificationsId()));
			}
			materialsStoreService.merge(ms);
			materialsStoreService.merge(ms2);
		}
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(ap);
		logger.info("已同步至周材出库记录表并生成记录值!");
		// 同步至周材入库记录表生成记录值
		this.addMaterialsIn(ap);
		logger.info("已同步至周材入库记录表并生成记录值!");
		allocationDepotDao.merge(ap);
	}
	
	/**
	 * 同步至周材出库记录表生成记录值
	 * @param allocationDepot
	 * @author 陈光毅
	 * @Date 2017/12/04
	 */
	public void addMaterialsOut(AllocationDepot allocationDepot) {
		Set<?> set = allocationDepot.getAllocationDepotDetailSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				AllocationDepotDetail allocationDepotDetail = (AllocationDepotDetail) object;
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(allocationDepot.getOutDepotId());
				materialsOutStock.setDepotName(allocationDepot.getOutDepotName());
				materialsOutStock.setLocationId(allocationDepotDetail.getOutLocationId());
				materialsOutStock.setLocationName(allocationDepotDetail.getOutLocationName());
				materialsOutStock.setSerial(allocationDepot.getAllocationSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(allocationDepot.getAllocationDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("仓库间调拨");
				materialsOutStock.setRelateBusiness("仓库调拨");
				materialsOutStock.setRemark(allocationDepot.getRemark());
				materialsOutStock.setCommodity(allocationDepotDetail.getCommodity());
				materialsOutStock.setSpecifications(allocationDepotDetail.getSpecifications());
				materialsOutStock.setQuantity(allocationDepotDetail.getAllocationCounts());
				materialsOutStock.setAuxiliaryQuantity(allocationDepotDetail.getAuxiliaryQuantity());
				materialsOutStock.setUnit(allocationDepotDetail.getMeasurementUnit());
				materialsOutStockDao.save(materialsOutStock);
			}
		}
	}
	
	/**
	 * 同步至周材入库记录表生成记录值
	 * @param allocationDepot
	 * @author 陈光毅
	 * @Date 2017/12/07
	 */
	public void addMaterialsIn(AllocationDepot allocationDepot) {
		Set<?> set = allocationDepot.getAllocationDepotDetailSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				AllocationDepotDetail allocationDepotDetail = (AllocationDepotDetail) object;
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setDepotId(allocationDepot.getInDepotId());
				materialsInStock.setDepotName(allocationDepot.getInDepotName());
				materialsInStock.setLocationId(allocationDepotDetail.getInLocationId());
				materialsInStock.setLocationName(allocationDepotDetail.getInLocationName());
				materialsInStock.setSerial(allocationDepot.getAllocationSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(allocationDepot.getAllocationDate(), "yyyy-MM-dd"));
				materialsInStock.setInType("仓库间调拨");
				materialsInStock.setRelateBusiness("仓库调拨");
				materialsInStock.setRemark(allocationDepot.getRemark());
				materialsInStock.setCommodity(allocationDepotDetail.getCommodity());
				materialsInStock.setSpecifications(allocationDepotDetail.getSpecifications());
				materialsInStock.setQuantity(allocationDepotDetail.getAllocationCounts());
				materialsInStock.setAuxiliaryQuantity(allocationDepotDetail.getAuxiliaryQuantity());
				materialsInStock.setUnit(allocationDepotDetail.getMeasurementUnit());
				materialsInStockDao.save(materialsInStock);
			}
		}
	}
}
