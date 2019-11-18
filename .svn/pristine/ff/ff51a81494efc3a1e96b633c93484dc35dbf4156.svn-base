package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.LostCompensationDao;
import com.knight.emms.dao.LostCompensationDetailDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LostCompensation;
import com.knight.emms.model.LostCompensationDetail;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.service.LostCompensationService;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.emms.service.ProjectMaterialsStoreService;
import com.knight.emms.service.ProjectService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.SneakyThrows;

@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class LostCompensationServiceImpl extends BusinessFlowServiceImpl<LostCompensation> implements LostCompensationService {
	
	@Resource
	private LostCompensationDao lostCompensationDao;

	@Resource
	private LostCompensationDetailDao lostCompensationDetailDao;
	
	@Resource
	private ProjectMaterialsStoreService projectMaterialsStoreService;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	public LostCompensationServiceImpl(LostCompensationDao dao) {
		super(dao);
		this.lostCompensationDao = dao;
	}

	
	public List<LostCompensation> queryTranslateAllFull(QueryFilter filter) {
		List<LostCompensation> list = lostCompensationDao.getAll(filter);
		for (LostCompensation lc : list) {
			CodeServiceImpl.translate(lc, getPersistantStruct());
		}
		return list;
	}

	public LostCompensation getTranslateFull(Long lostId) {
		LostCompensation lc = lostCompensationDao.get(lostId);
		CodeServiceImpl.translate(lc, getPersistantStruct());
		return lc;
	}

	public void saveOrMergeForEdit(LostCompensation lostCompensation) {
		if (lostCompensation.getLostId() == null) {
			String lostSerial = lostCompensationDao.createNextSerial(lostCompensation);
//			if(lostCompensation.getContractNumber()!=null){
//				lostSerial = lostCompensation.getContractNumber()+"-"+lostSerial;
//			}
			lostCompensation.setLostSerial(lostSerial);
			lostCompensationDao.save(lostCompensation);
		}
		lostCompensation.setSubLostCompensation();
		lostCompensationDao.merge(lostCompensation);
	}

	public void delete(Long lostId) {
		LostCompensation lostCompensation = lostCompensationDao.get(lostId);
		lostCompensationDao.remove(lostCompensation);
	}
	
	public void deleteDetail(Long detailId) {
		lostCompensationDetailDao.remove(detailId);
	}
	
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) {
		LostCompensation lc = super.passFlowApproveApplication(formApprove);
		boolean exist = projectDepotInOutService.alreadyRecord(lc.getLostId(), "LOST_COMPENSATION");
		if(exist) {
			throw new BusinessException("生成出入库记录失败，请联系管理员");
		}
		lostCompensationDao.save(lc);
		
		for(LostCompensationDetail lcd : lc.getLostCompensationDetailSet()) {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_project.projectId_L_EQ",lc.getContractMaterials().getProjectId()+"");
			filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", lcd.getSpecificationsId()+"");
			List<ProjectMaterialsStore> list = projectMaterialsStoreService.queryTranslateAll(filter);
			ProjectMaterialsStore pms = new ProjectMaterialsStore();
			if(list.size()>0){
				pms = list.get(0);
				Integer i = Integer.valueOf(pms.getQuantity()) - Integer.valueOf(lcd.getLostQuantity()==null ? "0" : lcd.getLostQuantity());
				pms.setQuantity(i.toString());
			} else {
				pms.setProject(projectService.get(lc.getContractMaterials().getProjectId()));
				pms.setMaterialsSpecifications(materialsSpecificationsService.get(lcd.getSpecificationsId()));
				Integer i = (-1*Integer.valueOf(lcd.getLostQuantity()==null ? "0" : lcd.getLostQuantity()));
				pms.setQuantity(i.toString());
			} 
			projectMaterialsStoreService.merge(pms);
		}
		
		//新增一条记录到T_PROJECT_DEPOT_IN_OUT
		addProjectDepotInOut (lc);
	}
	
	@SneakyThrows(RuntimeException.class)
	public void addProjectDepotInOut (LostCompensation lostCompensation) {
		Set<LostCompensationDetail> set = lostCompensation.getLostCompensationDetailSet();
		if(set.size()>0) {
			for(LostCompensationDetail lcd : set) {
				if(!"0".equals(lcd.getLostQuantity())) {
					ProjectDepotInOut pd = new ProjectDepotInOut();
					pd.setSpecificationsId(lcd.getSpecificationsId());
					pd.setSpecifications(lcd.getSpecifications());
					pd.setCommodity(lcd.getCommodity());
					pd.setUnit(lcd.getUnit());
					pd.setQuantity(lcd.getLostQuantity()==null? "0": lcd.getLostQuantity());
					pd.setSupplementQuantity(lcd.getSupplementQuantity());
					pd.setOperationWay("丢失赔偿出库");
					pd.setContractId(lostCompensation.getContractMaterials().getContractmaId());
					pd.setRelateId(lostCompensation.getLostId());
					pd.setRelateModule("LOST_COMPENSATION");
					pd.setRelateModuleName("丢失管理");
					pd.setRelateSerial(lostCompensation.getLostSerial());
					pd.setProjectId(lostCompensation.getContractMaterials().getProjectId());
					pd.setProjectName(lostCompensation.getProjectName());
					pd.setOperationDate(DateUtil.changeObj2DateStr(lostCompensation.getCompensationDate(), "yyyy-MM-dd"));
					projectDepotInOutService.saveCreate(pd);
				}
			}
		}
	}
}
