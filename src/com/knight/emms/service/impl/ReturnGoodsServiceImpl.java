/**
 *====================================================
 * 文件名称: ReturnGoodsServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月25日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.LeaseStockDao;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.ProjectMaterialsStoreDao;
import com.knight.emms.dao.RecycleManageDao;
import com.knight.emms.dao.RecycleManageDetailDao;
import com.knight.emms.dao.ReturnGoodsDao;
import com.knight.emms.dao.ReturnListDao;
import com.knight.emms.model.BaseDepot;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LeaseStock;
import com.knight.emms.model.MaterialsInStock;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.model.RecycleManage;
import com.knight.emms.model.RecycleManageDetail;
import com.knight.emms.model.ReturnGoods;
import com.knight.emms.model.ReturnList;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.emms.service.ReturnGoodsService;

import groovy.util.logging.Slf4j;
import lombok.SneakyThrows;

/**
 * @ClassName: ReturnGoodsServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月25日
 */
@Slf4j
@Service("returnGoodsService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class ReturnGoodsServiceImpl extends BusinessFlowServiceImpl<ReturnGoods> implements ReturnGoodsService {

	private ReturnGoodsDao returnGoodsDao;
	
	@Resource
	private ReturnListDao returnListDao;
	
	/** 租借库存 */
	@Resource
	private LeaseStockDao leaseStockDao;
	
	/** 周材项目库存 */
	@Resource
	private ProjectMaterialsStoreDao projectMaterialsStoreDao;
	
	/** 回收管理 */
	@Resource
	private RecycleManageDao recycleManageDao;
	
	/** 回收管理清单 */
	@Resource
	private RecycleManageDetailDao recycleManageDetailDao;
	
	/** 周材出库记录表 */
	@Resource
	private MaterialsInStockDao materialsInStockDao;
	
	/** 周材出库记录表 */
	@Resource
	private MaterialsOutStockDao materialsOutStockDao;
	
	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	@Autowired(required = true)
	public ReturnGoodsServiceImpl(@Qualifier("returnGoodsDao") ReturnGoodsDao dao) {
		super(dao);
		this.returnGoodsDao = dao;
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void delList(Long listId) throws RuntimeException {
		returnListDao.remove(listId);
	}

	@Override
	public void saveOrMergeForEdit(ReturnGoods t) {}

	@Override
	@SneakyThrows(RuntimeException.class)
	protected ReturnGoods passFlowAcceptApplication(FormAccept formAccept) throws RuntimeException {
		ReturnGoods returnGoods = super.passFlowAcceptApplication(formAccept);
		return returnGoods;
	}
	
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		ReturnGoods returnGoods =  passFlowApproveApplication(formApprove);
		
		boolean exist = projectDepotInOutService.alreadyRecord(returnGoods.getReturnId(), "RETURN_GOODS");
		if(exist) {
			throw new BusinessException("生成出入库记录失败，请联系管理员");
		}
		
		// 扣除对应项目库存并更新租借库存记录值
		this.deductAndUpdata(returnGoods);
		logger.info("已扣除对应项目库存并更新租借库存记录值!");
		// 生成回收单据
		this.addRecycleManage(returnGoods);
		logger.info("已生成回收单据!");
		// 同步至周材入库记录表生成记录值
		this.addMaterialsIn(returnGoods);
		logger.info("已同步至周材入库记录表并生成记录值!");
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(returnGoods);
		logger.info("已同步至周材出库记录表并生成记录值!");
		
		returnGoodsDao.save(returnGoods);
		//新增一条记录到T_PROJECT_DEPOT_IN_OUT
		this.addProjectDepotInOut (returnGoods);
	}
	
	/** 扣除对应项目库存并更新租借库存记录值 */
	@SneakyThrows(RuntimeException.class)
	public void deductAndUpdata(ReturnGoods returnGoods) throws RuntimeException {
		Set<?> set = returnGoods.getReturnListSet();
		if (set != null && set.size() > 0) {
			//		原本是控制规格不能退多    修改成 控制品名不能退多
			//		比如  累计发货6米 100根         租借退货可以退3米的   最后退200根
			//		比如  累计发货6米 100根         租借退货也可以退2米的   最后退300根
			//  统计总共收货的品名辅助数量
//			QueryFilter queryLeaseStock = new QueryFilter();
//			queryLeaseStock.addConjunctFilter("Q_leaseId_L_EQ", returnGoods.getLeaseContract().getLeaseId() + "");
			BindingParamFilters params = new BindingParamFilters();
			params.addFilter("leaseId", "EQ", returnGoods.getLeaseContract().getLeaseId());
			List<LeaseStock> listLeaseStock = leaseStockDao.getAll(params);
			Map<Long,BigDecimal> stockQuantityMap = new HashMap<Long,BigDecimal>();
			Map<Long,String> commodityMap = new HashMap<Long,String>();
			if(listLeaseStock.size()>0) {
				for(LeaseStock ls : listLeaseStock) {
					Long commodityId = ls.getMaterialsSpecifications().getMaterialsCommodity().getCommodityId();
					BigDecimal total = new BigDecimal(ls.getQuantity()).multiply(new BigDecimal(ls.getMaterialsSpecifications().getSecondConvertedQuantity()));
					if(!stockQuantityMap.containsKey(commodityId)){
						stockQuantityMap.put(commodityId, total);
						commodityMap.put(commodityId, ls.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
					}else{
						stockQuantityMap.put(commodityId, stockQuantityMap.get(commodityId).add(total));
					}
				}
			} else {
				logger.info("leaseId : "+returnGoods.getLeaseContract().getLeaseId());
				throw new BusinessException("当前租借合同在租借库存中没有记录");
			}
			
			Map<Long,BigDecimal> returnQuantityMap = new HashMap<Long,BigDecimal>();
			for (Object object : set) {
				ReturnList rl = (ReturnList) object;
				Long commodityId = rl.getCommodityId();
				BigDecimal total = new BigDecimal(rl.getReturnQuantity()).multiply(new BigDecimal(rl.getCoefficient()));
				if(!returnQuantityMap.containsKey(commodityId)) {
					returnQuantityMap.put(commodityId, total);
					commodityMap.put(commodityId, rl.getCommodity());
				}else{
					returnQuantityMap.put(commodityId, returnQuantityMap.get(commodityId).add(total));
				}
			}
			//比较库存
			for(Long commodityId : returnQuantityMap.keySet()) {
				if(stockQuantityMap.containsKey(commodityId)) {
					BigDecimal a = stockQuantityMap.get(commodityId);
					BigDecimal b = returnQuantityMap.get(commodityId);
					Integer i = a.compareTo(b);
					if(i==-1) {
						throw new BusinessException("【"+commodityMap.get(commodityId)+"】退货数量大于库存数量，无法审批");
					}
				}else{
					throw new  BusinessException("租借仓库不存在此周材："+commodityMap.get(commodityId));
				}
			}
			
			for (Object object : set) {
				ReturnList returnList = (ReturnList) object;
				boolean hasAdd = false;
				for(LeaseStock ls : listLeaseStock) {
					if(ls.getMaterialsSpecifications().getSpecificationsId().equals(returnList.getSpecificationsId())){
						ls.setQuantity(String.valueOf(Integer.valueOf(ls.getQuantity()) - Integer.valueOf(returnList.getReturnQuantity())));
						leaseStockDao.merge(ls);
						hasAdd = true;
					}
				}
				if(!hasAdd){
					LeaseStock leaseStock = new LeaseStock();
					leaseStock.setLeaseId(returnGoods.getLeaseContract().getLeaseId());
					leaseStock.setMaterialsSpecifications(materialsSpecificationsService.get(returnList.getSpecificationsId()));
					leaseStock.setQuantity(String.valueOf(0 - Integer.valueOf(returnList.getReturnQuantity())));
					leaseStockDao.save(leaseStock);
				}
				//减去项目库存
				QueryFilter queryProjectMaterialsStore = new QueryFilter();
				queryProjectMaterialsStore.addConjunctFilter("Q_project.projectId_L_EQ", returnGoods.getLeaseContract().getProject().getProjectId() + "");
				queryProjectMaterialsStore.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", returnList.getSpecificationsId() + "");
				List<ProjectMaterialsStore> listProjectMaterialsStore = projectMaterialsStoreDao.getAll(queryProjectMaterialsStore);
				if (listProjectMaterialsStore != null && listProjectMaterialsStore.size() > 0) {
					for (ProjectMaterialsStore p : listProjectMaterialsStore) {
						p.setQuantity(String.valueOf(Integer.valueOf(p.getQuantity()) - Integer.valueOf(returnList.getReturnQuantity())));
						projectMaterialsStoreDao.merge(p);
					}
				} else {
					ProjectMaterialsStore p =  new ProjectMaterialsStore();
					p.setProject(returnGoods.getProject());
					p.setMaterialsSpecifications(materialsSpecificationsService.get(returnList.getSpecificationsId()));
					p.setQuantity(String.valueOf(0 - Integer.valueOf(returnList.getReturnQuantity())));
					projectMaterialsStoreDao.save(p);
				}
			}
		}
	}
	
	/** 生成回收单据 */
	@SneakyThrows(RuntimeException.class)
	public void addRecycleManage(ReturnGoods returnGoods) throws RuntimeException {
		/*QueryFilter queryFilter = new QueryFilter();
		queryFilter.addConjunctFilter("Q_leaseId_L_EQ", returnGoods.getLeaseContract().getLeaseId() + "");
		queryFilter.addConjunctFilter("Q_userId_L_EQ", returnGoods.getUserId() + "");
		queryFilter.addConjunctFilter("Q_locationId_L_EQ", returnGoods.getLocationId() + "");
		List<RecycleManage> list = recycleManageDao.getAll(queryFilter);
		if (list != null && list.size() > 0) {
			logger.info("已生成过回收单据，将不重复生成！");
		} else {}*/
		RecycleManage recycleManage = new RecycleManage();
		BaseDepot baseDepot = new BaseDepot();
		baseDepot.setDepotId(returnGoods.getDepotId());
		recycleManage.setBaseDepot(baseDepot);
		recycleManage.setLocationId(returnGoods.getLocationId());
		recycleManage.setLeaseID(returnGoods.getLeaseContract().getLeaseId());
		recycleManage.setUserId(returnGoods.getUserId());
		recycleManage.setUserName(returnGoods.getUserName());
		recycleManage.setApplyDate(DateUtil.changeObj2DateStr(returnGoods.getFillDate(), DateUtil.LINK_DISPLAY_DATE_MINUTE));
		recycleManage.setRecycleDate(returnGoods.getReturnDate().substring(0,10));
		recycleManage.setRecycleType("2");
		ContractMaterials contractMaterials = new ContractMaterials();
		contractMaterials.setContractmaId(returnGoods.getLeaseContract().getContractId());
		recycleManage.setContractMaterials(contractMaterials);
		recycleManage.setAffiliatedSerial(returnGoods.getSubsidiarySerial());
		recycleManage.setTransportNumber(returnGoods.getTransportVehicle());
		recycleManage.setTransportMan(returnGoods.getTransportPersonnel());
		recycleManage.setSendReceiveMan(returnGoods.getAuditor());
		recycleManage.setSendReceiveDate(returnGoods.getApproveDate());
		recycleManage.setInvoiceCheckMan(returnGoods.getSubsidiaryAuditor());
		recycleManage.setInvoiceCheckDate(returnGoods.getSubsidiaryApproveDate());
		recycleManage.setRemark("租借退货到" + returnGoods.getLeaseUnit());
		recycleManage.setDelFlag("1");
		recycleManage.setApplyforState("3");
		recycleManageDao.saveSerialModel(recycleManage);
		Set<?> set = returnGoods.getReturnListSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				ReturnList returnList = (ReturnList) object;
				RecycleManageDetail recycleManageDetail = new RecycleManageDetail();
				recycleManageDetail.setRecycleId(recycleManage.getRecycleId());
				recycleManageDetail.setSpecificationsId(returnList.getSpecificationsId());
				recycleManageDetail.setSpecifications(returnList.getSpecifications());
				recycleManageDetail.setMnemonics(returnList.getMnemonics());
				recycleManageDetail.setCommodityId(returnList.getCommodityId());
				recycleManageDetail.setCommodity(returnList.getCommodity());
				recycleManageDetail.setUnit(returnList.getMeasurementUnit());
				recycleManageDetail.setInputCount(returnList.getReturnQuantity());
				recycleManageDetail.setTruckLoadingCount(returnList.getReturnQuantity());
				recycleManageDetail.setPackageCount(returnList.getReturnQuantity());
				recycleManageDetail.setSupplementQuantity(returnList.getAssistQuantity());
				recycleManageDetail.setSupplementUnit(returnList.getAssistUnit());
				recycleManageDetail.setConversionNum(returnList.getCoefficient());
				recycleManageDetail.setRemark(returnList.getRemarks());
				recycleManageDetailDao.save(recycleManageDetail);
			}
		}
		recycleManageDao.merge(recycleManage);
	}

	/**
	 * 同步至周材入库记录表生成记录值
	 * @param returnGoods
	 * @author 陈光毅
	 * @Date 2017/12/07
	 */
	@SneakyThrows(RuntimeException.class)
	public void addMaterialsIn(ReturnGoods returnGoods) throws RuntimeException {
		Set<?> set = returnGoods.getReturnListSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				ReturnList returnList = (ReturnList) object;
				MaterialsInStock materialsInStock = new MaterialsInStock();
				materialsInStock.setDepotId(returnGoods.getDepotId());
				materialsInStock.setDepotName(returnGoods.getDepotName());
				materialsInStock.setLocationId(returnGoods.getLocationId());
				materialsInStock.setLocationName(returnGoods.getLocationName());
				materialsInStock.setSerial(returnGoods.getReturnSerial());
				materialsInStock.setInDate(DateUtil.changeObj2DateStr(returnGoods.getReturnDate(), "yyyy-MM-dd"));
				materialsInStock.setInType("租借退货");
				materialsInStock.setRelateBusiness("退货管理");
				materialsInStock.setRemark(returnGoods.getRemarks());
				materialsInStock.setCommodity(returnList.getCommodity());
				materialsInStock.setSpecifications(returnList.getSpecifications());
				materialsInStock.setQuantity(returnList.getReturnQuantity());
				materialsInStock.setAuxiliaryQuantity(returnList.getAssistQuantity());
				materialsInStock.setUnit(returnList.getMeasurementUnit());
				materialsInStockDao.save(materialsInStock);
			}
		}
	}
	
	/**
	 * 同步至周材出库记录表生成记录值
	 * @param returnGoods
	 */
	@SneakyThrows(RuntimeException.class)
	public void addMaterialsOut(ReturnGoods returnGoods) throws RuntimeException {
		Set<?> set = returnGoods.getReturnListSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				ReturnList returnList = (ReturnList) object;
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(returnGoods.getDepotId());
				materialsOutStock.setDepotName(returnGoods.getDepotName());
				materialsOutStock.setLocationId(returnGoods.getLocationId());
				materialsOutStock.setLocationName(returnGoods.getLocationName());
				materialsOutStock.setSerial(returnGoods.getReturnSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(returnGoods.getReturnDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("租借退货");
				materialsOutStock.setRelateBusiness("退货管理");
				materialsOutStock.setRemark(returnGoods.getRemarks());
				materialsOutStock.setCommodity(returnList.getCommodity());
				materialsOutStock.setSpecifications(returnList.getSpecifications());
				materialsOutStock.setQuantity(returnList.getReturnQuantity());
				materialsOutStock.setAuxiliaryQuantity(returnList.getAssistQuantity());
				materialsOutStock.setUnit(returnList.getMeasurementUnit());
				materialsOutStockDao.save(materialsOutStock);
			}
		}
	}
	
	//新增一条记录到T_PROJECT_DEPOT_IN_OUT
	@SneakyThrows(RuntimeException.class)
	public void addProjectDepotInOut (ReturnGoods returnGoods) {
		Set<ReturnList> set = returnGoods.getReturnListSet();
		if(set.size()>0) {
			for(ReturnList rl : set) {
				ProjectDepotInOut pd = new ProjectDepotInOut();
				pd.setSpecificationsId(rl.getSpecificationsId());
				pd.setSpecifications(rl.getSpecifications());
				pd.setCommodity(rl.getCommodity());
				pd.setUnit(rl.getMeasurementUnit());
				pd.setQuantity(rl.getReturnQuantity()==null? "0": rl.getReturnQuantity());
				pd.setSupplementQuantity(rl.getAssistQuantity());
				pd.setOperationWay("退货管理");
				pd.setContractId(returnGoods.getLeaseContract().getContractId());
				pd.setRelateId(returnGoods.getReturnId());
				pd.setRelateModule("RETURN_GOODS");
				pd.setRelateModuleName("退货管理");
				pd.setRelateSerial(returnGoods.getReturnSerial());
				pd.setProjectId(returnGoods.getLeaseContract().getProject().getProjectId());
				pd.setProjectName(returnGoods.getLeaseContract().getProject().getProjectName());
				pd.setOperationDate(DateUtil.changeObj2DateStr(returnGoods.getReturnDate(), "yyyy-MM-dd"));
				
				pd.setLeaseId(returnGoods.getLeaseContract().getLeaseId());
				projectDepotInOutService.saveCreate(pd);
			}
		}
	}
}
