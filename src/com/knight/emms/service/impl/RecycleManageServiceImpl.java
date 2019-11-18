package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.CompensationDamageDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsRecycleCountTempDao;
import com.knight.emms.dao.RecycleManageDao;
import com.knight.emms.dao.RecycleManageDetailDao;
import com.knight.emms.dao.RecycleManageFeeDao;
import com.knight.emms.dao.ReturnTempStoreDao;
import com.knight.emms.dao.TemporaryStorageDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsRecycleCountTemp;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.model.RecycleManage;
import com.knight.emms.model.RecycleManageDetail;
import com.knight.emms.model.ReturnTempStore;
import com.knight.emms.model.TemporaryStorage;
import com.knight.emms.service.BaseLocationService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.MaterialsStoreService;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.emms.service.ProjectMaterialsStoreService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.service.RecycleManageService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class RecycleManageServiceImpl extends BusinessFlowServiceImpl<RecycleManage> implements RecycleManageService {

	@Resource
	private RecycleManageDetailDao recycleManageDetailDao;

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
	private RecycleManageDao recycleManageDao;

	@Resource
	private RecycleManageFeeDao recycleManageFeeDao;

	@Resource
	private CompensationDamageDao compensationDamageDao;
	
	@Resource
	private TemporaryStorageDao temporaryStorageDao;
	
	@Resource
	private MaterialsRecycleCountTempDao materialsRecycleCountTempDao;

	/** 周材入库记录表 */
	@Resource
	private MaterialsInStockDao materialsInStockDao;
	
	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	@Resource
	private ReturnTempStoreDao returnTempStoreDao;
	
	public RecycleManageServiceImpl(RecycleManageDao dao) {
		super(dao);
		this.recycleManageDao = dao;
	}

	@Override
	public List<RecycleManage> queryTranslateAllFull(QueryFilter filter) {
		List<RecycleManage> list = recycleManageDao.getAll(filter);
		for (RecycleManage lc : list) {
			CodeServiceImpl.translate(lc, getPersistantStruct());
		}
		return list;
	}

	@Override
	public RecycleManage getTranslateFull(Long recycleId) {
		RecycleManage lc = recycleManageDao.get(recycleId);
		CodeServiceImpl.translate(lc, getPersistantStruct());
		return lc;
	}

	@Override
	public void saveOrMergeForEdit(RecycleManage recycleManage) {
		if (recycleManage.getRecycleId() == null) {
			recycleManageDao.saveSerialModel(recycleManage);
		}
		recycleManage.setSubRecycleManage();
		recycleManageDao.merge(recycleManage);
	}

	@Override
	public void delete(Long recycleId) {
		RecycleManage recycleManage = recycleManageDao.get(recycleId);
		recycleManageDao.remove(recycleManage);
	}

	@Override
	public void deleteDetail(Long detailId) {
		//删除Detail时 将Temp中相关数据一同删除
		RecycleManageDetail rmd = recycleManageDetailDao.get(detailId);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_recycleId_L_EQ",rmd.getRecycleId()+"");
		filter.addConjunctFilter("Q_specificationsId_L_EQ",rmd.getSpecificationsId()+"");
		List<MaterialsRecycleCountTemp> list = materialsRecycleCountTempDao.getAll(filter);
		for(MaterialsRecycleCountTemp mr : list) {
			materialsRecycleCountTempDao.remove(mr);
		}
		recycleManageDetailDao.remove(detailId);
	}
	
	@Override
	public void deleteFee(Long feeId) {
		recycleManageFeeDao.remove(feeId);
	}
	
	@Override
	public void deleteDamage(Long compensationId) {
		compensationDamageDao.remove(compensationId);
	}
	
	@Override
	public void delTemporaryStorage(Long compensationId) {
		temporaryStorageDao.remove(compensationId);
	}
	
	/** 库存增减 */
	@Override
	@SneakyThrows(Exception.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		RecycleManage rm = super.passFlowApproveApplication(formApprove);
		
		boolean exist = projectDepotInOutService.alreadyRecord(rm.getRecycleId(), "RECYCLE_MANAGE");
		if(exist) {
			throw new BusinessException("生成出入库记录失败，请联系管理员");
		}
		
		//减去项目库存T_PROJECT_MATERIALS_STORE
		for(RecycleManageDetail rmd : rm.getRecycleManageDetailSet()) {
			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_project.projectId_L_EQ",rm.getContractMaterials().getProjectId()+"");
			filter1.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", rmd.getSpecificationsId()+"");
			List<ProjectMaterialsStore> list1 = projectMaterialsStoreService.queryTranslateAll(filter1);
			ProjectMaterialsStore pms = new ProjectMaterialsStore();
			if(list1.size()>0){
				pms = list1.get(0);
				Integer i = Integer.valueOf(pms.getQuantity()) - Integer.valueOf(rmd.getInputCount()==null ? "0" : rmd.getInputCount());
				pms.setQuantity(i.toString());
			} else {
				pms.setProject(projectService.get(rm.getContractMaterials().getProjectId()));
				pms.setMaterialsSpecifications(materialsSpecificationsService.get(rmd.getSpecificationsId()));
				Integer i = (-1*Integer.valueOf(rmd.getInputCount()==null ? "0" : rmd.getInputCount()));
				pms.setQuantity(i.toString());
			} 
			projectMaterialsStoreService.merge(pms);
		}	
		//增加周材库存T_MATERIALS_STORE
		for(MaterialsRecycleCountTemp mrct : rm.getMaterialsRecycleCountTempSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ",rm.getBaseDepot().getDepotId()+"");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ",mrct.getLocationId()+"");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", mrct.getSpecificationsId()+"");
			Boolean bl = false;
			for(RecycleManageDetail rmd : rm.getRecycleManageDetailSet()){
				if(rmd.getSpecificationsId().equals(mrct.getSpecificationsId())) {
					bl = true;
				}
			}
			if(bl) {
				List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
				MaterialsStore ms = new MaterialsStore();
				if(list.size()>0){
					ms = list.get(0);
					Integer i = Integer.valueOf(ms.getQuantity()) + Integer.valueOf(mrct.getQuantity()==null?"0":mrct.getQuantity());
					ms.setQuantity(i.toString());
				} else {
					ms.setBaseDepot(rm.getBaseDepot());
					ms.setBaseLocation(baseLocationService.get(mrct.getLocationId()));
					ms.setMaterialsSpecifications(materialsSpecificationsService.get(mrct.getSpecificationsId()));
					ms.setQuantity(mrct.getQuantity()==null?"0":mrct.getQuantity());
				} 
				materialsStoreService.merge(ms);
			}
		}
		// 如果类型为 : "回收入库"
		if ("1".equals(rm.getRecycleType())) {
			// 同步至周材入库记录表生成记录值
			this.addMaterialsIn(rm);
			logger.info("已同步至周材入库记录表并生成记录值!");
			addProjectDepotInOut(rm);
		}
		//增加暂存库存
		this.addReturnTempStore(rm);
		
		recycleManageDao.save(rm);
	}

	/**
	 * 同步至周材入库记录表生成记录值
	 * @param recycleManage
	 * @author 陈光毅
	 * @Date 2017/12/07
	 */
	@SneakyThrows(Exception.class)
	public void addMaterialsIn(RecycleManage recycleManage) {
		Set<?> set = recycleManage.getRecycleManageDetailSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				RecycleManageDetail recycleManageDetail = (RecycleManageDetail) object;
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_recycleId_L_EQ", recycleManageDetail.getRecycleId() + "");
				filter.addConjunctFilter("Q_specificationsId_L_EQ", recycleManageDetail.getSpecificationsId() + "");
				List<MaterialsRecycleCountTemp> list = materialsRecycleCountTempDao.getAll(filter);
				if (list != null && list.size() > 0) {
					for (MaterialsRecycleCountTemp materialsRecycleCountTemp : list) {
						if (!"0".equals(materialsRecycleCountTemp.getQuantity())) {
							MaterialsInStock materialsInStock = new MaterialsInStock();
							materialsInStock.setDepotId(recycleManage.getBaseDepot().getDepotId());
							materialsInStock.setDepotName(recycleManage.getBaseDepot().getDepotName());
							materialsInStock.setLocationId(materialsRecycleCountTemp.getLocationId());
							materialsInStock.setLocationName(materialsRecycleCountTemp.getLocationName());
							materialsInStock.setSerial(recycleManage.getRecycleSerial());
							materialsInStock.setInDate(DateUtil.changeObj2DateStr(recycleManage.getRecycleDate(), "yyyy-MM-dd"));
							materialsInStock.setInType("回收入库");
							materialsInStock.setRelateBusiness("回收管理");
							materialsInStock.setRemark(recycleManage.getRemark());
							materialsInStock.setCommodity(recycleManageDetail.getCommodity());
							materialsInStock.setSpecifications(recycleManageDetail.getSpecifications());
							materialsInStock.setQuantity(materialsRecycleCountTemp.getQuantity());
							materialsInStock.setAuxiliaryQuantity(String.valueOf(new java.text.DecimalFormat("#.00").format(
									Double.valueOf(materialsRecycleCountTemp.getQuantity()) * Double.valueOf(recycleManageDetail
											.getConversionNum()))));
							materialsInStock.setUnit(recycleManageDetail.getUnit());
							materialsInStockDao.save(materialsInStock);
						}
					}
				}
			}
		} 
	}
	
	//新增一条回收记录到T_PROJECT_DEPOT_IN_OUT
	@SneakyThrows(RuntimeException.class)
	public void addProjectDepotInOut (RecycleManage recycleManage) {
		Set<RecycleManageDetail> set = recycleManage.getRecycleManageDetailSet();
		if(set.size()>0) {
			for(RecycleManageDetail rmd : set) {
				ProjectDepotInOut pd = new ProjectDepotInOut();
				pd.setSpecificationsId(rmd.getSpecificationsId());
				pd.setSpecifications(rmd.getSpecifications());
				pd.setCommodity(rmd.getCommodity());
				pd.setUnit(rmd.getUnit());
				pd.setQuantity(rmd.getInputCount()==null? "0": rmd.getInputCount());
				pd.setSupplementQuantity(rmd.getSupplementQuantity());
				pd.setOperationWay("正常回收");
				pd.setContractId(recycleManage.getContractMaterials().getContractmaId());
				pd.setRelateId(recycleManage.getRecycleId());
				pd.setRelateModule("RECYCLE_MANAGE");
				pd.setRelateModuleName("回收管理");
				pd.setRelateSerial(recycleManage.getRecycleSerial());
				pd.setProjectId(recycleManage.getContractMaterials().getProjectId());
				pd.setProjectName(recycleManage.getContractMaterials().getProjectName());
				pd.setOperationDate(DateUtil.changeObj2DateStr(recycleManage.getRecycleDate(), "yyyy-MM-dd"));
				projectDepotInOutService.saveCreate(pd);
			}
		}
	}
	
	//如果暂存清单 不为空，增加暂存库存 T_RETURN_TEMP_STORE
	@SneakyThrows(RuntimeException.class)
	public void addReturnTempStore(RecycleManage rm) {
		Set<TemporaryStorage> temporaryStorageSet = rm.getTemporaryStorageSet();
		if(temporaryStorageSet.size()>0) {
			for(TemporaryStorage ts : temporaryStorageSet) {
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_depotId_L_EQ",rm.getBaseDepot().getDepotId()+"");
				filter.addConjunctFilter("Q_contractId_L_EQ",rm.getContractMaterials().getContractmaId()+"");
				filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", ts.getSpecificationsId()+"");
				List<ReturnTempStore> list = returnTempStoreDao.getAll(filter);
				ReturnTempStore rts = new ReturnTempStore();
				if(list.size()==1) {
					rts = list.get(0);
					Integer num =Integer.valueOf(rts.getQuantity())+Integer.valueOf(ts.getTemporaryQuantity()==null?"0":ts.getTemporaryQuantity());
					rts.setQuantity(num.toString());
				} else if(list.size()==0) {
					rts.setDepotId(rm.getBaseDepot().getDepotId());
					rts.setContractId(rm.getContractMaterials().getContractmaId());
					rts.setDepotName(rm.getBaseDepot().getDepotName());
					rts.setMaterialsSpecifications(materialsSpecificationsService.get(ts.getSpecificationsId()));
					rts.setQuantity(ts.getTemporaryQuantity()==null?"0":ts.getTemporaryQuantity());
				} else {
					throw new BusinessException("暂存仓库存在多条重复记录，仓库："+rm.getBaseDepot().getDepotName()+"周材:"+ts.getCommodity()+ts.getSpecifications());
				}
				returnTempStoreDao.merge(rts);
			}
		}
	}
	
}
