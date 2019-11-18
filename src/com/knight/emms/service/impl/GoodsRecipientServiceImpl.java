/**
 *====================================================
 * 文件名称: GoodsRecipientServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ContractMaterialsDao;
import com.knight.emms.dao.GoodsRecipientDao;
import com.knight.emms.dao.LeaseStockDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.MaterialsPackageDao;
import com.knight.emms.dao.MaterialsStoreDao;
import com.knight.emms.dao.PackageDetailDao;
import com.knight.emms.dao.ProjectMaterialsStoreDao;
import com.knight.emms.dao.RecipientListDao;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.GoodsRecipient;
import com.knight.emms.model.LeaseStock;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsPackage;
import com.knight.emms.model.MaterialsSpecifications;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.model.PackageDetail;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.model.RecipientList;
import com.knight.emms.service.GoodsRecipientService;
import com.knight.emms.service.ProjectDepotInOutService;

import groovy.util.logging.Slf4j;
import lombok.SneakyThrows;

/**
 * @ClassName: GoodsRecipientServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月20日
 */
@Slf4j
@Service("goodsRecipientService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class GoodsRecipientServiceImpl extends BusinessFlowServiceImpl<GoodsRecipient>
		implements GoodsRecipientService {

	private GoodsRecipientDao goodsRecipientDao;

	/** 子表 */
	@Resource
	private RecipientListDao recipientListDao;

	/** 租借库存表 */
	@Resource
	private LeaseStockDao leaseStockDao;

	/** 周材基地库存表 */
	@Resource
	private MaterialsStoreDao materialsStoreDao;

	/** 周材项目库存表 */
	@Resource
	private ProjectMaterialsStoreDao projectMaterialsStoreDao;

	/** 现场装车 */
	@Resource
	private MaterialsPackageDao materialsPackageDao;

	/** 现场装车清单 */
	@Resource
	private PackageDetailDao packageDetailDao;

	/** 周材出库记录表 */
	@Resource
	private MaterialsOutStockDao materialsOutStockDao;

	/** 周材入库记录表 */
	@Resource
	private MaterialsInStockDao materialsInStockDao;

	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	@Resource
	private ContractMaterialsDao contractMaterialsDao;

	@Autowired(required = true)
	public GoodsRecipientServiceImpl(@Qualifier("goodsRecipientDao") GoodsRecipientDao dao) {
		super(dao);
		this.goodsRecipientDao = dao;
		passAcceptStateMap.put(Status.Applyfor.waitAccept, Status.Applyfor.waitApprove);
		rejectAcceptStateMap.put(Status.Applyfor.waitAccept, Status.Applyfor.waitSubmit);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void delList(Long listId) throws RuntimeException {
		recipientListDao.remove(listId);
	}

	@Override
	public void saveOrMergeForEdit(GoodsRecipient t) {
	}

	/** 审核 */
	@Override
	@SneakyThrows(RuntimeException.class)
	protected GoodsRecipient passFlowAcceptApplication(FormAccept formAccept) throws RuntimeException {
		GoodsRecipient goodsRecipient = super.passFlowAcceptApplication(formAccept);
		return goodsRecipient;
	}

	/** 审批 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		GoodsRecipient goodsRecipient = passFlowApproveApplication(formApprove);
		//判断是否曾审批过，生成过出入库数据
		boolean exist = projectDepotInOutService.alreadyRecord(goodsRecipient.getRecipientId(), "GOODS_RECIPIENT");
		if(exist) {
			throw new BusinessException("生成出入库记录失败，请联系管理员");
		}
		goodsRecipientDao.save(goodsRecipient);
		/* 是否关联合同 */
		// 不关联，并入周材基地库存
		if (goodsRecipient.getLeaseContract().getLeaseId() == null) {
			this.addStore(goodsRecipient, false);
			logger.info("已将收货周材并入周材基地库存！");
		} else { // 关联，并入周材项目库存
			this.addStore(goodsRecipient, true);
			logger.info("已将收货周材并入周材项目库存!");
		}
		// 租借库存生成或更新记录值
		this.addLeaseStock(goodsRecipient);
		logger.info("已生成或更新对应租借周材记录值！");
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(goodsRecipient);
		logger.info("已同步至周材出库记录表生成记录值!");
		// 同步至周材入库记录表生成记录值
		this.addMaterialsIn(goodsRecipient);
		logger.info("已同步至周材入库记录表生成记录值!");
		// 生成现场发货单据
		this.addMaterialsPackage(goodsRecipient);
		logger.info("收货管理审批通过，已生成现场装车单!");
	}

	/**
	 * 生成现场发货单据
	 * 
	 * @param goodsRecipient
	 */
	@SneakyThrows(RuntimeException.class)
	private void addMaterialsPackage(GoodsRecipient goodsRecipient) throws RuntimeException {
		MaterialsPackage materialsPackage = new MaterialsPackage();
		materialsPackage.setApplyDate(goodsRecipient.getFillDate());
		materialsPackage.setApproveTime(DateUtil.changeStrToDate(goodsRecipient.getFillDate()));
		materialsPackage.setAcceptTime(DateUtil.changeStrToDate(goodsRecipient.getFillDate()));
		materialsPackage.setUserId(goodsRecipient.getUserId());
		materialsPackage.setUserName(goodsRecipient.getUserName());
		materialsPackage.setStoreId(goodsRecipient.getDepotId());
		materialsPackage.setStoreName(goodsRecipient.getDepotName());
		materialsPackage.setLocationId(goodsRecipient.getLocationId());
		materialsPackage.setStorageLocation(goodsRecipient.getLocationName());
		materialsPackage.setContractId(goodsRecipient.getLeaseContract().getContractId());
		ContractMaterials cm = contractMaterialsDao.get(goodsRecipient.getLeaseContract().getContractId());
		materialsPackage.setContractSerial(cm.getContractSerial());
		materialsPackage.setPbEntName(goodsRecipient.getLesseeUnit());
		materialsPackage.setProjectId(goodsRecipient.getProject().getProjectId());
		materialsPackage.setProjectName(goodsRecipient.getProject().getProjectName());
		materialsPackage.setPackageDate(goodsRecipient.getDeliveryDate());
		materialsPackage.setAttachSerial(goodsRecipient.getSubsidiarySerial());
		materialsPackage.setRentType("2");
		materialsPackage.setVehicleNum(goodsRecipient.getTransportVehicle());
		materialsPackage.setVehiclePerson(goodsRecipient.getTransportPersonnel());
		materialsPackage.setDispatchAuditorName(goodsRecipient.getAuditor());
		materialsPackage.setDispatchAuditorDate(goodsRecipient.getApproveDate());
		materialsPackage.setOrderAuditorName(goodsRecipient.getSubsidiaryAuditor());
		materialsPackage.setOrderAuditorDate(goodsRecipient.getSubsidiaryApproveDate());
		materialsPackage.setRemark("由" + goodsRecipient.getLeaseUnit() + "租借发货");
		materialsPackage.setStatus("0");
		materialsPackage.setApplyforState("3");
		materialsPackage.setSignFlag(Constant.DISENABLED);
		// 生成单号 与 主键ID
		materialsPackageDao.saveSerialModel(materialsPackage);
		Set<?> set = goodsRecipient.getRecipientListSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				RecipientList recipientList = (RecipientList) object;
				PackageDetail packageDetail = new PackageDetail();
				packageDetail.setPackageId(materialsPackage.getPackageId());
				packageDetail.setMnemonics(recipientList.getMnemonics());
				packageDetail.setCommodityId(recipientList.getCommodityId());
				packageDetail.setCommodity(recipientList.getCommodity());
				packageDetail.setSpecificationsId(recipientList.getSpecificationsId());
				packageDetail.setSpecifications(recipientList.getSpecifications());
				packageDetail.setMeasurementUnit(recipientList.getMeasurementUnit());
				packageDetail.setDispatchNumber(recipientList.getRecipientQuantity());
				packageDetail.setRentQuantity(recipientList.getRecipientQuantity());
				packageDetail.setLoadQuantity(recipientList.getRecipientQuantity());
				packageDetail.setPackageQuantity(recipientList.getRecipientQuantity());
				packageDetail.setSecondUnitConversion(recipientList.getAssistUnit());
				packageDetail.setConvertedQuantity(recipientList.getAssistQuantity());
				packageDetail.setAuxiliaryQuantity(recipientList.getCoefficient());
				packageDetail.setRemark(recipientList.getRemarks());
				packageDetailDao.save(packageDetail);
			}
		}
		materialsPackageDao.save(materialsPackage);
	}

	/**
	 * 将所收周材并入对应仓库库存
	 * 
	 * @param goodsRecipient
	 * @param isRelation
	 */
	@SneakyThrows(RuntimeException.class)
	private void addStore(GoodsRecipient goodsRecipient, boolean isRelation) throws RuntimeException {
		// 不关联，并入周材基地库存
		if (!isRelation) {
			Set<?> set = goodsRecipient.getRecipientListSet();
			if (set != null && set.size() > 0) {
				for (Object object : set) {
					RecipientList recipientList = (RecipientList) object;
					QueryFilter queryFilter = new QueryFilter();
					queryFilter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", goodsRecipient.getDepotId() + "");
					queryFilter.addConjunctFilter("Q_baseLocation.locationId_L_EQ",
							goodsRecipient.getLocationId() + "");
					queryFilter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ",
							recipientList.getSpecificationsId() + "");
					List<MaterialsStore> list = materialsStoreDao.getAll(queryFilter);
					if (list != null && list.size() > 0) {
						for (MaterialsStore m : list) {
							m.setQuantity(String.valueOf(Integer.valueOf(m.getQuantity())
									+ Integer.valueOf(recipientList.getRecipientQuantity())));
							materialsStoreDao.merge(m);
						}
					} else {
						MaterialsStore materialsStore = new MaterialsStore();
						materialsStore.getBaseDepot().setDepotId(goodsRecipient.getDepotId());
						materialsStore.getBaseLocation().setLocationId(goodsRecipient.getLocationId());
						materialsStore.getMaterialsSpecifications()
								.setSpecificationsId(recipientList.getSpecificationsId());
						materialsStore.setQuantity(recipientList.getRecipientQuantity());
						materialsStoreDao.save(materialsStore);
					}
				}
			}
		} else { // 关联，并入周材项目库存
			Set<?> set = goodsRecipient.getRecipientListSet();
			if (set != null && set.size() > 0) {
				for (Object object : set) {
					RecipientList recipientList = (RecipientList) object;
					QueryFilter queryFilter = new QueryFilter();
					queryFilter.addConjunctFilter("Q_project.projectId_L_EQ",
							goodsRecipient.getProject().getProjectId() + "");
					queryFilter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ",
							recipientList.getSpecificationsId() + "");
					List<ProjectMaterialsStore> list = projectMaterialsStoreDao.getAll(queryFilter);
					if (list != null && list.size() > 0) {
						for (ProjectMaterialsStore p : list) {
							if (recipientList.getRecipientQuantity() == null
									&& recipientList.getRecipientQuantity() == "") {
								recipientList.setRecipientQuantity("0");
							}
							p.setQuantity(String.valueOf(Integer.valueOf(p.getQuantity())
									+ Integer.valueOf(recipientList.getRecipientQuantity())));
							projectMaterialsStoreDao.merge(p);
						}
					} else {
						if (recipientList.getRecipientQuantity() == null
								&& recipientList.getRecipientQuantity() == "") {
							recipientList.setRecipientQuantity("0");
						}
						ProjectMaterialsStore projectMaterialsStore = new ProjectMaterialsStore();
						projectMaterialsStore.setProject(goodsRecipient.getProject());
						MaterialsSpecifications materialsSpecifications = new MaterialsSpecifications();
						materialsSpecifications.setSpecificationsId(recipientList.getSpecificationsId());
						projectMaterialsStore.setMaterialsSpecifications(materialsSpecifications);
						projectMaterialsStore.setQuantity(recipientList.getRecipientQuantity());
						projectMaterialsStoreDao.save(projectMaterialsStore);
					}
				}
			}

			// 新增一条记录到T_PROJECT_DEPOT_IN_OUT
			addProjectDepotInOut(goodsRecipient);
		}
	}

	/**
	 * 租借库存生成或更新记录值
	 * 
	 * @param goodsRecipient
	 */
	@SneakyThrows(RuntimeException.class)
	public void addLeaseStock(GoodsRecipient goodsRecipient) throws RuntimeException {
		Set<?> set = goodsRecipient.getRecipientListSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				RecipientList recipientList = (RecipientList) object;
				QueryFilter queryFilter = new QueryFilter();
				queryFilter.addConjunctFilter("Q_leaseId_L_EQ", goodsRecipient.getLeaseContract().getLeaseId() + "");
				queryFilter.addConjunctFilter("Q_[materialsSpecifications.specificationsId]_L_EQ",
						recipientList.getSpecificationsId() + "");
				List<LeaseStock> list = leaseStockDao.getAll(queryFilter);
				if (list != null && list.size() > 0) {
					for (LeaseStock s : list) {
						s.setQuantity(String.valueOf(Integer.valueOf(s.getQuantity())
								+ Integer.valueOf(recipientList.getRecipientQuantity())));
						leaseStockDao.merge(s);
					}
				} else {
					LeaseStock leaseStock = new LeaseStock();
					leaseStock.setLeaseId(goodsRecipient.getLeaseContract().getLeaseId());
					MaterialsSpecifications materialsSpecifications = new MaterialsSpecifications();
					materialsSpecifications.setSpecificationsId(recipientList.getSpecificationsId());
					leaseStock.setMaterialsSpecifications(materialsSpecifications);
					leaseStock.setQuantity(recipientList.getRecipientQuantity());
					leaseStockDao.save(leaseStock);
				}
			}
		} else {
			logger.info("无租借库存变更信息！");
		}
	}

	/**
	 * 同步至周材出库记录表生成记录值
	 * 
	 * @param goodsRecipient
	 */
	@SneakyThrows(RuntimeException.class)
	public void addMaterialsOut(GoodsRecipient goodsRecipient) throws RuntimeException {
		Set<?> set = goodsRecipient.getRecipientListSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				RecipientList recipientList = (RecipientList) object;
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setSerial(goodsRecipient.getRecipientSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(goodsRecipient.getDeliveryDate(), "yyyy-MM-dd"));
				materialsOutStock.setDepotId(goodsRecipient.getDepotId());
				materialsOutStock.setDepotName(goodsRecipient.getDepotName());
				materialsOutStock.setLocationId(goodsRecipient.getLocationId());
				materialsOutStock.setLocationName(goodsRecipient.getLocationName());
				materialsOutStock.setOutType(goodsRecipient.getRentType());
				materialsOutStock.setRemark(goodsRecipient.getRemarks());
				materialsOutStock.setCommodity(recipientList.getCommodity());
				materialsOutStock.setSpecifications(recipientList.getSpecifications());
				materialsOutStock.setQuantity(recipientList.getRecipientQuantity());
				materialsOutStock.setAuxiliaryQuantity(recipientList.getAssistQuantity());
				materialsOutStock.setUnit(recipientList.getMeasurementUnit());
				materialsOutStock.setRelateBusiness("收货管理");
				materialsOutStockDao.save(materialsOutStock);
			}
		}
	}
	
	/**
	 * 同步至周材入库记录表生成记录值
	 * @param goodsRecipient
	 */
	@SneakyThrows(RuntimeException.class)
	public void addMaterialsIn(GoodsRecipient goodsRecipient) throws RuntimeException {
		Set<?> set = goodsRecipient.getRecipientListSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				RecipientList recipientList = (RecipientList) object;
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setSerial(goodsRecipient.getRecipientSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(goodsRecipient.getDeliveryDate(), "yyyy-MM-dd"));
				materialsInStock.setDepotId(goodsRecipient.getDepotId());
				materialsInStock.setDepotName(goodsRecipient.getDepotName());
				materialsInStock.setLocationId(goodsRecipient.getLocationId());
				materialsInStock.setLocationName(goodsRecipient.getLocationName());
				materialsInStock.setInType(goodsRecipient.getRentType());
				materialsInStock.setRemark(goodsRecipient.getRemarks());
				materialsInStock.setCommodity(recipientList.getCommodity());
				materialsInStock.setSpecifications(recipientList.getSpecifications());
				materialsInStock.setQuantity(recipientList.getRecipientQuantity());
				materialsInStock.setAuxiliaryQuantity(recipientList.getAssistQuantity());
				materialsInStock.setUnit(recipientList.getMeasurementUnit());
				materialsInStock.setRelateBusiness("收货管理");
				materialsInStockDao.save(materialsInStock);
			}
		}
	}
	
	//新增一条记录到T_PROJECT_DEPOT_IN_OUT
	@SneakyThrows(RuntimeException.class)
	public void addProjectDepotInOut (GoodsRecipient goodsRecipient) {
		Set<RecipientList> set = goodsRecipient.getRecipientListSet();
		if (set.size() > 0) {
			for (RecipientList rl : set) {
				ProjectDepotInOut pd = new ProjectDepotInOut();
				pd.setSpecificationsId(rl.getSpecificationsId());
				pd.setSpecifications(rl.getSpecifications());
				pd.setCommodity(rl.getCommodity());
				pd.setUnit(rl.getMeasurementUnit());
				pd.setQuantity(rl.getRecipientQuantity()==null? "0": rl.getRecipientQuantity());
				pd.setSupplementQuantity(rl.getAssistQuantity());
				pd.setOperationWay("租借出租");
				pd.setContractId(goodsRecipient.getLeaseContract().getContractId());
				pd.setRelateId(goodsRecipient.getRecipientId());
				pd.setRelateModule("GOODS_RECIPIENT");
				pd.setRelateModuleName("收货管理");
				pd.setRelateSerial(goodsRecipient.getRecipientSerial());
				pd.setProjectId(goodsRecipient.getProject().getProjectId());
				pd.setProjectName(goodsRecipient.getProject().getProjectName());
				pd.setOperationDate(DateUtil.changeObj2DateStr(goodsRecipient.getDeliveryDate(), "yyyy-MM-dd"));
				
				pd.setLeaseId(goodsRecipient.getLeaseContract().getLeaseId());
				projectDepotInOutService.saveCreate(pd);
			}
		}
	}
}
