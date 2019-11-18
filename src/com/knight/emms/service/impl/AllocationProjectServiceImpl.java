
package com.knight.emms.service.impl;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceAbstract;
import com.knight.emms.dao.AllocationDetailDao;
import com.knight.emms.dao.AllocationProjectDao;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.PackageDetailDao;
import com.knight.emms.dao.RecycleManageDetailDao;
import com.knight.emms.model.AllocationDetail;
import com.knight.emms.model.AllocationProject;
import com.knight.emms.model.BaseDepot;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsPackage;
import com.knight.emms.model.PackageDetail;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.model.RecycleManage;
import com.knight.emms.model.RecycleManageDetail;
import com.knight.emms.service.AllocationProjectService;
import com.knight.emms.service.BaseDepotService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ContractMaterialsService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.MaterialsPackageService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.emms.service.ProjectMaterialsStoreService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.service.RecycleManageService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

/**
 * @ClassName: AllocationProjectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author xuenz
 * @date
 */
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class AllocationProjectServiceImpl extends BusinessFlowServiceAbstract<AllocationProject> implements AllocationProjectService {

	private AllocationProjectDao allocationProjectDao;

	@Resource
	private BusinessMessageDao businessMessageDao;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private AllocationDetailDao allocationDetailDao;

	@Resource
	private ProjectMaterialsStoreService projectMaterialsStoreService;

	@Resource
	private ProjectService projectService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;

	@Resource
	private MaterialsPackageService materialsPackageService;

	@Resource
	private RecycleManageService recycleManageService;

	@Resource
	private PackageDetailDao packageDetailDao;

	@Resource
	private RecycleManageDetailDao recycleManageDetailDao;

	@Resource
	private ContractMaterialsService contractMaterialsService;

	@Resource
	private BaseDepotService baseDeoptService;
	
	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	public AllocationProjectServiceImpl(AllocationProjectDao dao) {
		super(dao);
		this.allocationProjectDao = dao;
	}

	@Override
	public List<AllocationProject> queryList(String contractIds, QueryFilter filter) {
		String hql = "from AllocationProject vo where (vo.inContractId in("+contractIds+") or vo.outContractId in("+contractIds+") ) ";
		BindingParamFilters bindingFilter = new BindingParamFilters();
		bindingFilter.convertQueryFilter(filter);
		//统计总数
		List<AllocationProject> list = allocationProjectDao.getAll(bindingFilter, hql);
		filter.getPagingBean().setTotalItems(list.size());
		
		//分页
		bindingFilter.setPageNumber(filter.getPagingBean().getFirstResult()/filter.getPagingBean().getPageSize()+1);
		bindingFilter.setPageSize(filter.getPagingBean().getPageSize());
		List<AllocationProject> list2 = allocationProjectDao.getAll(bindingFilter, hql);
		CodeServiceImpl.translate(list2);
		return list2;
	}
	
	@Override
	public void saveCreate(AllocationProject allocationProject) {
		allocationProject.setDelFlag(Constant.ENABLED);
		allocationProject.setApplyforState(Status.Applyfor.waitSubmit);
		allocationProjectDao.saveSerialModel(allocationProject);

		allocationProject.setSubAllocation();
		allocationProjectDao.save(allocationProject);
	}
	
	@Override
	public AllocationProject getTranslateFull(Long allocationId) {
		AllocationProject d = allocationProjectDao.get(allocationId);
		CodeServiceImpl.translate(d, getPersistantStruct());
		return d;
	}

	@Override
	public void deletedDetail(Long detailId) {
		allocationDetailDao.remove(detailId);
	}

	@Override
	public void submitAllocation(Long allocationId) {
		AllocationProject p = allocationProjectDao.get(allocationId);
		if (!Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
			throw new BusinessException("项目调拨方案[" + p.getAllocationSerial() + "]状态不合法,无法提交!");
		}
		p.setApplyforState(Status.Applyfor.waitAccept);
		allocationProjectDao.save(p);
	}

	/** 审批通过后对应的项目库存数量根据调入,调出项目做调整 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		AllocationProject ap = super.passFlowApproveApplication(formApprove);
		//判断是否曾审批过，生成过出入库数据
		boolean exist = projectDepotInOutService.alreadyRecord(ap.getAllocationId(), "ALLOCATION_PROJECT");
		if(exist) {
			throw new BusinessException("生成出入库记录失败，请联系管理员");
		}

		// 调出项目的周材库存
		for (AllocationDetail ad : ap.getAllocationDetailSet()) {
			// 减少调出项目库存T_PROJECT_MATERIALS_STORE
			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_project.projectId_L_EQ", ap.getOutProjectId() + "");
			filter1.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", ad.getSpecficationsId() + "");
			List<ProjectMaterialsStore> list1 = projectMaterialsStoreService.queryTranslateAll(filter1);
			ProjectMaterialsStore pms1 = new ProjectMaterialsStore();
			if (list1.size() > 0) {
				pms1 = list1.get(0);
				Integer i = Integer.valueOf(pms1.getQuantity()) - Integer.valueOf(ad.getAllocationCounts());
				if(i<0) {
					throw new BusinessException("调出数量大于项目库存数量，审批失败");
				}
				pms1.setQuantity(i.toString());
			} else {
//				pms1.setProject(projectService.get(ap.getOutProjectId()));
//				pms1.setMaterialsSpecifications(materialsSpecificationsService.get(ad.getSpecficationsId()));
//				Integer doubles = (-1
//						* (Integer.valueOf(ad.getAllocationCounts() == null ? "0" : ad.getAllocationCounts())));
//				pms1.setQuantity(doubles.toString());
				throw new BusinessException("调出项目不存在周材："+ad.getCommodity()+ad.getSpecfications());
			}
			projectMaterialsStoreService.merge(pms1);

			// 增加调入项目周材库存T_PROJECT_MATERIALS_STORE
			QueryFilter filter2 = new QueryFilter();
			filter2.addConjunctFilter("Q_project.projectId_L_EQ", ap.getInProjectId() + "");
			filter2.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", ad.getSpecficationsId() + "");
			List<ProjectMaterialsStore> list2 = projectMaterialsStoreService.queryTranslateAll(filter2);
			ProjectMaterialsStore pms2 = new ProjectMaterialsStore();
			if (list2.size() > 0) {
				pms2 = list2.get(0);
				Integer i = Integer.valueOf(pms2.getQuantity()) + Integer.valueOf(ad.getAllocationCounts());
				pms2.setQuantity(i.toString());
			} else {
				pms2.setProject(projectService.get(ap.getInProjectId()));
				pms2.setMaterialsSpecifications(materialsSpecificationsService.get(ad.getSpecficationsId()));
				pms2.setQuantity(String.valueOf(ad.getAllocationCounts() == null ? "0" : ad.getAllocationCounts()));
			}
			projectMaterialsStoreService.merge(pms2);
		}

		//新增一条记录到T_PROJECT_DEPOT_IN_OUT
		addProjectDepotInOut(ap);
		allocationProjectDao.save(ap);
		/* 自动生成一条装车单 */
		MaterialsPackage materialsPackage = new MaterialsPackage();
		materialsPackage.setStatus(Status.HandleResult.untreated);
		materialsPackage.setApplyforState("3");
		materialsPackage.setApplyDate(ap.getMakeDate());
		materialsPackage.setPackageDate(ap.getAllocationDate());
		materialsPackage.setContractId(ap.getInContractId());
		materialsPackage.setContractSerial(ap.getInContractSerial());
		materialsPackage.setProjectId(ap.getInProjectId());
		materialsPackage.setProjectName(ap.getInProjectName());
		materialsPackage.setRentType("1");
		materialsPackage.setHandingCharge("0");
		materialsPackage.setPackAmount("0");
		materialsPackage.setUserId(ap.getUserId());
		materialsPackage.setUserName(ap.getUserName());
		String remark1 = "由" + ap.getOutProjectName() + "调拨转入";
		materialsPackage.setRemark(remark1);
		if (ap.getVehicleNum() != null && ap.getVehiclePerson() != null) {
			materialsPackage.setVehicleNum(ap.getVehicleNum());
			materialsPackage.setVehiclePerson(ap.getVehiclePerson());
		}
		materialsPackage.setDelFlag(Constant.ENABLED);
		materialsPackageService.saveCreate(materialsPackage);

		/* 自动生成一条回收单 */
		RecycleManage recycleManage = new RecycleManage();
		recycleManage.setApplyDate(ap.getMakeDate());
		recycleManage.setUserId(ap.getUserId());
		recycleManage.setUserName(ap.getUserName());
		recycleManage.setApplyforState("3");
		recycleManage.setRecycleType("3");
		recycleManage.setRecycleDate(ap.getAllocationDate());
		if (ap.getVehicleNum() != null && ap.getVehiclePerson() != null) {
			recycleManage.setTransportMan(ap.getVehiclePerson());
			recycleManage.setTransportNumber(ap.getVehicleNum());
		}
		recycleManage.setHandingCharge("0");
		recycleManage.setDamage("0");
		BaseDepot baseDepot = baseDeoptService.get(Long.valueOf(-1));
		recycleManage.setBaseDepot(baseDepot);
		ContractMaterials contractMaterials = contractMaterialsService.get(ap.getOutContractId());
		recycleManage.setContractMaterials(contractMaterials);
		String remark2 = "调拨转出到" + ap.getInProjectName();
		recycleManage.setRemark(remark2);
		recycleManage.setDelFlag(Constant.ENABLED);
		recycleManageService.saveOrMergeForEdit(recycleManage);
		PackageDetail packageDetail = new PackageDetail();
		RecycleManageDetail recycleManageDetail = new RecycleManageDetail();
		for (AllocationDetail ad : ap.getAllocationDetailSet()) {
			/* 自动生成装车清单 */
			packageDetail.setCommodity(ad.getCommodity());
			packageDetail.setCommodityId(ad.getCommodityId());
			packageDetail.setDispatchNumber(ad.getAllocationCounts());
			packageDetail.setMnemonics(ad.getMnemonicCode());
			packageDetail.setMeasurementUnit(ad.getMeasurementUnit());
			packageDetail.setSpecifications(ad.getSpecfications());
			packageDetail.setSpecificationsId(ad.getSpecficationsId());
			packageDetail.setSecondUnitConversion(ad.getSecondUnitConversion());
			packageDetail.setAuxiliaryQuantity(ad.getSecondConvertedQuantity());
			DecimalFormat df = new DecimalFormat(".##");
			if (ad.getAllocationCounts() != null) {
				packageDetail.setDispatchNumber(ad.getAllocationCounts());
				packageDetail.setRentQuantity(ad.getAllocationCounts());
				packageDetail.setLoadQuantity(ad.getAllocationCounts());
				packageDetail.setPackageQuantity(ad.getAllocationCounts());
				Double convertedQuantity = Double.valueOf(ad.getAllocationCounts())
						* Double.valueOf(ad.getSecondConvertedQuantity());
				packageDetail.setConvertedQuantity(df.format(convertedQuantity));
			}
			packageDetail.setPackageId(materialsPackage.getPackageId());
			packageDetailDao.merge(packageDetail);
			
			/* 自动生成回收清单 */
			recycleManageDetail.setCommodity(ad.getCommodity());
			recycleManageDetail.setCommodityId(ad.getCommodityId());
			recycleManageDetail.setMnemonics(ad.getMnemonicCode());
			recycleManageDetail.setSpecifications(ad.getSpecfications());
			recycleManageDetail.setSpecificationsId(ad.getSpecficationsId());
			recycleManageDetail.setUnit(ad.getMeasurementUnit());// 计量单位
			recycleManageDetail.setSupplementUnit(ad.getSecondUnitConversion());// 换算单位
			recycleManageDetail.setConversionNum(ad.getSecondConvertedQuantity());// 换算数量
			recycleManageDetail.setInputCount(ad.getAllocationCounts());// 入库单位
			if (ad.getAllocationCounts() != null) {
				recycleManageDetail.setPackageCount(ad.getAllocationCounts());// 包装数量
				recycleManageDetail.setTruckLoadingCount(ad.getAllocationCounts());// 卸车数量
				Double supplementQuantity = Double.valueOf(ad.getAllocationCounts())
						* Double.valueOf(ad.getSecondConvertedQuantity());
				recycleManageDetail.setSupplementQuantity(df.format(supplementQuantity));// 辅助数量
			}
			recycleManageDetail.setRecycleId(recycleManage.getRecycleId());
			recycleManageDetailDao.merge(recycleManageDetail);
		}
	}
	
	//新增一条记录到T_PROJECT_DEPOT_IN_OUT
	@SneakyThrows(RuntimeException.class)
	public void addProjectDepotInOut (AllocationProject allocationProject) {
		Set<AllocationDetail> set = allocationProject.getAllocationDetailSet();
		if(set.size()>0) {
			for(AllocationDetail detail : set) {
				ProjectDepotInOut pd = new ProjectDepotInOut();
				//入库
				pd.setSpecificationsId(detail.getSpecficationsId());
				pd.setSpecifications(detail.getSpecfications());
				pd.setCommodity(detail.getCommodity());
				pd.setUnit(detail.getMeasurementUnit());
				pd.setQuantity(detail.getAllocationCounts()==null? "0": detail.getAllocationCounts());
				//计算辅助数量
				String supplementQuantity = String.valueOf(Integer.valueOf(detail.getAllocationCounts())*Double.valueOf(detail.getSecondConvertedQuantity()));
				pd.setSupplementQuantity(supplementQuantity);
				pd.setOperationWay("项目间调拨入库");
				pd.setContractId(allocationProject.getInContractId());
				pd.setRelateId(allocationProject.getAllocationId());
				pd.setRelateModule("ALLOCATION_PROJECT");
				pd.setRelateModuleName("项目调拨");
				pd.setRelateSerial(allocationProject.getAllocationSerial());
				pd.setProjectId(allocationProject.getInProjectId());
				pd.setProjectName(allocationProject.getInProjectName());
				pd.setOperationDate(DateUtil.changeObj2DateStr(allocationProject.getAllocationDate(), "yyyy-MM-dd"));
				projectDepotInOutService.saveCreate(pd);
				
				ProjectDepotInOut pd2 = new ProjectDepotInOut();
				//出库
				pd2.setSpecificationsId(detail.getSpecficationsId());
				pd2.setSpecifications(detail.getSpecfications());
				pd2.setCommodity(detail.getCommodity());
				pd2.setUnit(detail.getMeasurementUnit());
				pd2.setQuantity(detail.getAllocationCounts()==null? "0": detail.getAllocationCounts());
				pd2.setSupplementQuantity(supplementQuantity);
				pd2.setOperationWay("项目间调拨出库");
				pd2.setContractId(allocationProject.getOutContractId());
				pd2.setRelateId(allocationProject.getAllocationId());
				pd2.setRelateModule("ALLOCATION_PROJECT");
				pd2.setRelateModuleName("项目调拨");
				pd2.setRelateSerial(allocationProject.getAllocationSerial());
				pd2.setProjectId(allocationProject.getOutProjectId());
				pd2.setProjectName(allocationProject.getOutProjectName());
				pd2.setOperationDate(DateUtil.changeObj2DateStr(allocationProject.getAllocationDate(), "yyyy-MM-dd"));
				projectDepotInOutService.saveCreate(pd2);
			}
		}
	}
}
