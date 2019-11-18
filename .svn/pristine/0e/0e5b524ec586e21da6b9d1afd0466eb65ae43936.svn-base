package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ContractMaterialsDao;
import com.knight.emms.dao.CostDetailDao;
import com.knight.emms.dao.DispatchMaterialsDao;
import com.knight.emms.dao.MaterialsOutStockDao;
import com.knight.emms.dao.MaterialsPackageDao;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.CostDetail;
import com.knight.emms.model.CostHandle;
import com.knight.emms.model.DispatchMaterials;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MaterialsDispatch;
import com.knight.emms.model.MaterialsOutStock;
import com.knight.emms.model.MaterialsPackage;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.model.PackageDetail;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.service.BaseDepotService;
import com.knight.emms.service.MaterialsDispatchService;
import com.knight.emms.service.MaterialsPackageService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.MaterialsStoreService;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.emms.service.ProjectMaterialsStoreService;
import com.knight.emms.service.ProjectService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

/**
 * @author 作者 :jlh
 * @version 创建时间：2017年7月12日 上午9:39:56 类说明
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class MaterialsPackageServiceImpl extends BusinessFlowServiceImpl<MaterialsPackage> implements MaterialsPackageService {

	private MaterialsPackageDao materialsPackageDao;

	@Resource
	private ProjectMaterialsStoreService projectMaterialsStoreService;

	@Resource
	private ProjectService projectService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;

	@Resource
	private MaterialsStoreService materialsStoreService;

	@Resource
	private BaseDepotService baseDepotService;

	@Resource
	private CostDetailDao costDetailDao;

	@Resource
	private DispatchMaterialsDao dispatchMaterialsDao;

	@Resource
	private MaterialsDispatchService materialsDispatchService;

	/** 周材出库记录表 */
	@Resource
	private MaterialsOutStockDao materialsOutStockDao;
	
	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	@Resource
	private ContractMaterialsDao contractMaterialsDao;
	
	public MaterialsPackageServiceImpl(MaterialsPackageDao dao) {
		super(dao);
		this.materialsPackageDao = dao;
	}

	@Override
	public List<MaterialsPackage> queryTranslateAllFull(QueryFilter filter) {
		List<MaterialsPackage> list = materialsPackageDao.getAll(filter);
		CodeServiceImpl.translate(list);
		return list;
	}

	@Override
	public MaterialsPackage getTranslateFull(Long scrapId) {
		MaterialsPackage r = materialsPackageDao.get(scrapId);
		CodeServiceImpl.translate(r);
		return r;
	}

	@Override
	public void saveOrUpdate(MaterialsPackage materialsPackage) {
		materialsPackageDao.save(materialsPackage);
	}

	@Override
	public void saveOrMergeForEdit(MaterialsPackage t) {
	}

	@Override
	public void deleteCost(Long detailId) {
		costDetailDao.remove(detailId);
	}
	
	@Override
	public void saveCreate(MaterialsPackage materialsPackage) {
		materialsPackage.setMaterialsPackage();
		if (materialsPackage.getPackageId() == null) {
			String seq = materialsPackageDao.createNextSerial(materialsPackage);
			materialsPackage.setPackageSerial(seq);
			materialsPackageDao.save(materialsPackage);
		} else {
			materialsPackageDao.merge(materialsPackage);
		}
	}

	/** 审批通过 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		MaterialsPackage mp = super.passFlowApproveApplication(formApprove);
		
		boolean exist = projectDepotInOutService.alreadyRecord(mp.getPackageId(), "MATERIALS_PACKAGE");
		if(exist) {
			throw new BusinessException("生成出入库记录失败，请联系管理员");
		}
		
		boolean ads = true;
		for (PackageDetail pd : mp.getPackageDetailSet()) {
			// 发货调度运输数量
			DispatchMaterials dispatchMaterials = dispatchMaterialsDao.get(pd.getDispatchId());
			// 调度清单的调度数量
			Integer dispatchCounts = Integer.valueOf(dispatchMaterials.getDispatchCounts());
			String scounts = dispatchMaterials.getCounts() == null ? "0" : dispatchMaterials.getCounts();
			// 调度清单的运输数量
			Integer counts = Integer.valueOf(scounts);
			// 现场装车的出租数量
			Integer rentQuantit = Integer.valueOf(pd.getRentQuantity());
			if ((rentQuantit + counts) < dispatchCounts) {
				dispatchMaterials.setCounts(String.valueOf(rentQuantit + counts));
				dispatchMaterialsDao.merge(dispatchMaterials);
				ads = false;
			} else if ((rentQuantit + counts) == dispatchCounts) {
				dispatchMaterials.setCounts(String.valueOf(rentQuantit + counts));
				dispatchMaterialsDao.merge(dispatchMaterials);
			} else {
				throw new BusinessException("总运输数量" + (rentQuantit + counts) + "不能大于调拨数量!");
			}
		}
		if (ads) {
			MaterialsDispatch materialsDispatch = materialsDispatchService.get(mp.getMaterialsId());
			materialsDispatch.setApplyforState(Status.DispatchApplyfor.finished);
			materialsDispatchService.merge(materialsDispatch);
		}
		boolean insufficient = false;
		StringBuilder counts1 = new StringBuilder();
		for (PackageDetail pd : mp.getPackageDetailSet()) {
			// 增加项目库存T_PROJECT_MATERIALS_STORE
			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_project.projectId_L_EQ", mp.getProjectId() + "");
			filter1.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", pd.getSpecificationsId() + "");
			List<ProjectMaterialsStore> list1 = projectMaterialsStoreService.queryTranslateAll(filter1);
			ProjectMaterialsStore pms = new ProjectMaterialsStore();
			if (list1.size() > 0) {
				pms = list1.get(0);
				Integer i = Integer.valueOf(pms.getQuantity()) + Integer.valueOf(pd.getRentQuantity() == null ? "0" : pd.getRentQuantity());
				pms.setQuantity(i.toString());
			} else {
				pms.setProject(projectService.get(mp.getProjectId()));
				pms.setMaterialsSpecifications(materialsSpecificationsService.get(pd.getSpecificationsId()));
				pms.setQuantity(String.valueOf(pd.getRentQuantity() == null ? "0" : pd.getRentQuantity()));
			}
			projectMaterialsStoreService.merge(pms);
			// 减少周材库存T_MATERIALS_STORE
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_baseDepot.depotId_L_EQ", mp.getStoreId() + "");
			filter.addConjunctFilter("Q_baseLocation.locationId_L_EQ", mp.getLocationId() + "");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", pd.getSpecificationsId() + "");
			List<MaterialsStore> list = materialsStoreService.queryTranslateAll(filter);
			MaterialsStore ms = new MaterialsStore();
			if (list.size() > 0) {
				ms = list.get(0);
				// 库存-出租数量
				String rentQuantity = pd.getRentQuantity()==null? "0":pd.getRentQuantity();
				Integer i2 = Integer.valueOf(ms.getQuantity()) - Integer.valueOf(rentQuantity);
				if (Integer.valueOf(rentQuantity) > 0 && i2<0) {
					insufficient = true;
					counts1.append("【" + ms.getMaterialsSpecifications().getMaterialsCommodity().getCommodity() + "的"
							+ ms.getMaterialsSpecifications().getSpecifications() + "】,");
				} else {
					ms.setQuantity(i2.toString());
				}
			} else {
				throw new BusinessException("找不到" + pd.getCommodity() + pd.getSpecifications() + "的仓库周材库存，无法装车");
			}
			materialsStoreService.merge(ms);
		}
		counts1.append("库存不足，无法装车");
		if (insufficient) {
			throw new BusinessException(counts1.toString());
		}
		// 同步至周材出库记录表生成记录值
		this.addMaterialsOut(mp);
		logger.info("已同步至周材出库记录表生成记录值!");
		addProjectDepotInOut(mp);
		materialsPackageDao.save(mp);
	}

	/**
	 * 同步至周材出库记录表生成记录值
	 * @param materialsPackage
	 */
	public void addMaterialsOut(MaterialsPackage materialsPackage) {
		Set<?> set = materialsPackage.getPackageDetailSet();
		if (set != null && set.size() > 0){
			for (Object object : set) {
				PackageDetail packageDetail = (PackageDetail) object;
				MaterialsOutStock materialsOutStock = new MaterialsOutStock();
				materialsOutStock.setDepotId(materialsPackage.getStoreId());
				materialsOutStock.setDepotName(materialsPackage.getStoreName());
				materialsOutStock.setLocationId(materialsPackage.getLocationId());
				materialsOutStock.setLocationName(materialsPackage.getStorageLocation());
				materialsOutStock.setSerial(materialsPackage.getPackageSerial());
				materialsOutStock.setOutDate(DateUtil.changeObj2DateStr(materialsPackage.getPackageDate(), "yyyy-MM-dd"));
				materialsOutStock.setOutType("出租出库");
				materialsOutStock.setRelateBusiness("现场装车");
				materialsOutStock.setRemark(materialsPackage.getRemark());
				materialsOutStock.setCommodity(packageDetail.getCommodity());
				materialsOutStock.setSpecifications(packageDetail.getSpecifications());
				materialsOutStock.setQuantity(packageDetail.getRentQuantity());
				materialsOutStock.setAuxiliaryQuantity(packageDetail.getConvertedQuantity());
				materialsOutStock.setUnit(packageDetail.getMeasurementUnit());
				materialsOutStockDao.save(materialsOutStock);
			}
		}
	}
	
	//新增一条记录到T_PROJECT_DEPOT_IN_OUT
	@SneakyThrows(RuntimeException.class)
	public void addProjectDepotInOut (MaterialsPackage materialsPackage) {
		Set<PackageDetail> set = materialsPackage.getPackageDetailSet();
		if(set.size()>0) {
			for(PackageDetail detail : set) {
				ProjectDepotInOut pd = new ProjectDepotInOut();
				pd.setSpecificationsId(detail.getSpecificationsId());
				pd.setSpecifications(detail.getSpecifications());
				pd.setCommodity(detail.getCommodity());
				pd.setUnit(detail.getMeasurementUnit());
				pd.setQuantity(detail.getRentQuantity()==null? "0": detail.getRentQuantity());
				pd.setSupplementQuantity(detail.getConvertedQuantity());
				pd.setOperationWay("正常出租");
				pd.setContractId(materialsPackage.getContractId());
				pd.setRelateId(materialsPackage.getPackageId());
				pd.setRelateModule("MATERIALS_PACKAGE");
				pd.setRelateModuleName("现场装车");
				pd.setRelateSerial(materialsPackage.getPackageSerial());
				pd.setProjectId(materialsPackage.getProjectId());
				pd.setProjectName(materialsPackage.getProjectName());
				pd.setOperationDate(DateUtil.changeObj2DateStr(materialsPackage.getPackageDate(), "yyyy-MM-dd"));
				projectDepotInOutService.saveCreate(pd);
			}
		}
	}
	
	@Override
	public void calculateCostDetail(MaterialsDispatch md, MaterialsPackage mp) {
		Set<CostDetail> costDetailSet = new HashSet<CostDetail>();
		ContractMaterials cm = contractMaterialsDao.get(md.getContractId());
		BigDecimal handingCharge = BigDecimal.ZERO;
		BigDecimal packAmount = BigDecimal.ZERO;
		for(CostHandle ch : cm.getCostHandleSet()) {
			double packageQuantity = 0;
			double loadQuantity = 0;
			for(PackageDetail pd : mp.getPackageDetailSet()) {
				double pq = 0;
				double aq = 0;
				double tvc = 0;
				if ("3".equals(ch.getFeesType()) && ch.getCommodityId().equals(pd.getCommodityId()) && pd.getPackageQuantity() !=null) {
					pq = Double.parseDouble(pd.getPackageQuantity());
					aq = Double.parseDouble(pd.getAuxiliaryQuantity());
					tvc = Double.parseDouble(ch.getTheoriesValueConversion());
					packageQuantity += pq*aq*tvc;
				}
				if("1".equals(ch.getFeesType()) && ch.getCommodityId().equals(pd.getCommodityId()) && pd.getLoadQuantity() !=null) {
					pq = Double.parseDouble(pd.getLoadQuantity());
					aq = Double.parseDouble(pd.getAuxiliaryQuantity());
					tvc = Double.parseDouble(ch.getTheoriesValueConversion());
					loadQuantity += pq*aq*tvc;
				}
			}
			if(packageQuantity != 0) {
				BigDecimal bd = new BigDecimal(packageQuantity/1000).setScale(2, BigDecimal.ROUND_HALF_DOWN);
				BigDecimal unitPrice = new BigDecimal(ch.getChargeUnitPrice());
				BigDecimal amount = bd.multiply(unitPrice).setScale(2);
				CostDetail cd = new  CostDetail();
				cd.setPackageId(mp.getPackageId());
				cd.setCommodity(ch.getCommodity());
				cd.setFeesType(ch.getFeesType());
				cd.setFeesTypeName(ch.getFeesTypeName());
				cd.setChargeUnitPrice(ch.getChargeUnitPrice());
				cd.setChargeQuantity(bd.toString());
				cd.setChargeMode("2");
				cd.setChargeAmount(amount.toString());
				cd.setLeaseAmount(amount.toString());
				cd.setFeeCategory(ch.getFeeCategory());
				packAmount = packAmount.add(amount);
				costDetailSet.add(cd);
			}
			if(loadQuantity != 0) {
				BigDecimal bd = new BigDecimal(loadQuantity/1000).setScale(2, BigDecimal.ROUND_HALF_UP);
				BigDecimal unitPrice = new BigDecimal(ch.getChargeUnitPrice());
				BigDecimal amount = bd.multiply(unitPrice).setScale(2);
				CostDetail cd = new  CostDetail();
				cd.setPackageId(mp.getPackageId());
				cd.setCommodity(ch.getCommodity());
				cd.setFeesType(ch.getFeesType());
				cd.setFeesTypeName(ch.getFeesTypeName());
				cd.setChargeUnitPrice(ch.getChargeUnitPrice());
				cd.setChargeQuantity(bd.toString());
				cd.setChargeMode("1");
				cd.setChargeAmount(amount.toString());
				cd.setFeeCategory(ch.getFeeCategory());
				handingCharge = handingCharge.add(amount);
				costDetailSet.add(cd);
			}
		}
		mp.setHandingCharge(handingCharge.toString());
		mp.setPackAmount(packAmount.toString());
		mp.setCostDetailSet(costDetailSet);
	}
}
