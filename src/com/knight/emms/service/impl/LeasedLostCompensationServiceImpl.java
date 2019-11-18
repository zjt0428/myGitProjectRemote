package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.LeasedLostCompensationDao;
import com.knight.emms.dao.LeasedLostCompensationDetailDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LeaseStock;
import com.knight.emms.model.LeasedLostCompensation;
import com.knight.emms.model.LeasedLostCompensationDetail;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.service.LeaseStockService;
import com.knight.emms.service.LeasedLostCompensationService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.emms.service.ProjectService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class LeasedLostCompensationServiceImpl extends BusinessFlowServiceImpl<LeasedLostCompensation> implements LeasedLostCompensationService {
	
	@Resource
	private LeasedLostCompensationDao leasedLostCompensationDao;

	@Resource
	private LeasedLostCompensationDetailDao leasedLostCompensationDetailDao;
	
	@Resource
	private LeaseStockService leaseStockService;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	public LeasedLostCompensationServiceImpl(LeasedLostCompensationDao dao) {
		super(dao);
		this.leasedLostCompensationDao = dao;
	}

	
	public List<LeasedLostCompensation> queryTranslateAllFull(QueryFilter filter) {
		List<LeasedLostCompensation> list = leasedLostCompensationDao.getAll(filter);
		for (LeasedLostCompensation lc : list) {
			CodeServiceImpl.translate(lc, getPersistantStruct());
		}
		return list;
	}

	public LeasedLostCompensation getTranslateFull(Long lostId) {
		LeasedLostCompensation lc = leasedLostCompensationDao.get(lostId);
		CodeServiceImpl.translate(lc, getPersistantStruct());
		return lc;
	}

	public void saveOrMergeForEdit(LeasedLostCompensation ldc) {
		if (ldc.getLostId() == null) {
			String lostSerial = leasedLostCompensationDao.serialAutoIncrement();
			if(ldc.getContractNumber()!=null){
				lostSerial = ldc.getContractNumber()+"-"+lostSerial;
			}
			ldc.setLostSerial(lostSerial);
			leasedLostCompensationDao.save(ldc);
		}
		ldc.setSubLeasedLostCompensation();
		leasedLostCompensationDao.merge(ldc);
	}

	public void delete(Long lostId) {
		LeasedLostCompensation lostCompensation = leasedLostCompensationDao.get(lostId);
		leasedLostCompensationDao.remove(lostCompensation);
	}
	
	public void deleteDetail(Long detailId) {
		leasedLostCompensationDetailDao.remove(detailId);
	}
	
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		LeasedLostCompensation lc = super.passFlowApproveApplication(formApprove);
		//判断是否曾审批过，生成过出入库数据
		boolean exist = projectDepotInOutService.alreadyRecord(lc.getLostId(), "LEASED_LOST_COMPENSATION");
		if(exist) {
			throw new BusinessException("生成出入库记录失败，请联系管理员");
		}
		leasedLostCompensationDao.save(lc);
		
		for(LeasedLostCompensationDetail lcd : lc.getLeasedLostCompensationDetailSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_leaseId_L_EQ",lc.getLeaseContract().getLeaseId()+"");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", lcd.getSpecificationsId()+"");
			List<LeaseStock> list = leaseStockService.getAll(filter);
			LeaseStock ls = new LeaseStock();
			if(list.size()>0){
				ls = list.get(0);
				Integer i = Integer.valueOf(ls.getQuantity()) - Integer.valueOf(lcd.getLostQuantity());
				ls.setQuantity(i.toString());
			} else {
				throw new BusinessException("【租借仓库】不存在 合同流水号："+lc.getLeaseContract().getLeaseSerial()+"周材："
						+lcd.getCommodity()+lcd.getSpecifications()+"的记录");
			} 
			leaseStockService.merge(ls);
		}
		//新增一条记录到T_PROJECT_DEPOT_IN_OUT
		addProjectDepotInOut (lc);
		
	}
	
	@SneakyThrows(RuntimeException.class)
	public void addProjectDepotInOut (LeasedLostCompensation lc) {
		Set<LeasedLostCompensationDetail> set = lc.getLeasedLostCompensationDetailSet();
		if(set.size()>0) {
			for(LeasedLostCompensationDetail lcd : set) {
				if(!"0".equals(lcd.getLostQuantity())) {
					ProjectDepotInOut pd = new ProjectDepotInOut();
					pd.setSpecificationsId(lcd.getSpecificationsId());
					pd.setSpecifications(lcd.getSpecifications());
					pd.setCommodity(lcd.getCommodity());
					pd.setUnit(lcd.getUnit());
					pd.setQuantity(lcd.getLostQuantity()==null? "0": lcd.getLostQuantity());
					pd.setSupplementQuantity(lcd.getSupplementQuantity());
					pd.setOperationWay("租借丢失赔偿");
					pd.setContractId(lc.getLeaseContract().getContractId());
					pd.setRelateId(lc.getLostId());
					pd.setRelateModule("LEASED_LOST_COMPENSATION");
					pd.setRelateModuleName("租借丢失赔偿");
					pd.setRelateSerial(lc.getLostSerial());
					pd.setProjectId(lc.getProjectId());
					pd.setProjectName(lc.getProjectName());
					pd.setOperationDate(DateUtil.changeObj2DateStr(lc.getCompensationDate(), "yyyy-MM-dd"));
					
					pd.setLeaseId(lc.getLeaseContract().getLeaseId());
					projectDepotInOutService.saveCreate(pd);
				}
			}
		}
	}
}
