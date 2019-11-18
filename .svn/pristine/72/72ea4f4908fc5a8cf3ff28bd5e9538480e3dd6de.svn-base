package com.knight.emms.web.action;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectDepotInit;
import com.knight.emms.model.ProjectDepotInitDetail;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.service.MaterialsSpecificationsService;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.emms.service.ProjectDepotInitDetailService;
import com.knight.emms.service.ProjectDepotInitService;
import com.knight.emms.service.ProjectMaterialsStoreService;
import com.knight.emms.service.ProjectService;

import lombok.Getter;
import lombok.Setter;
import lombok.SneakyThrows;

@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class ProjectDepotInitAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long projectInitId;
	
	@Getter
	@Setter
	private ProjectDepotInit projectDepotInit;
	
	@Resource
	private ProjectDepotInitService projectDepotInitService;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private ProjectDepotInitDetailService projectDepotInitDetailService;

	@Resource
	private ProjectMaterialsStoreService projectMaterialsStoreService;

	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	@Resource
	private ProjectDepotInOutService projectDepotInOutService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ProjectDepotInit> list = projectDepotInitService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		ProjectDepotInit m = projectDepotInitService.getTranslate(projectInitId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新仓库")
	public String save() {
		projectDepotInit.setEffective(Constant.DISENABLED);
		projectDepotInit.setDelFlag(Constant.ENABLED);
		if (projectDepotInit.getProjectInitId() == null) {
			projectDepotInitService.save(projectDepotInit);
		}
		projectDepotInit.setSubProjectDepotInit();
		projectDepotInitService.merge(projectDepotInit);
		return SUCCESS;
	}
	
	@ActionLog(description = "删除仓库")
	public String multiDel() {
		 String[] ids = getRequest().getParameterValues("ids");
	        for (String id : ids) {
	        	ProjectDepotInit p = projectDepotInitService.get(new Long(id));
	        	p.setDelFlag(Constant.DISENABLED);
	        	projectDepotInitService.update(p);
	        }
		return SUCCESS;
	}
	@ActionLog(description = "删除清单")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			projectDepotInitService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	
	
	public String listDetail() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ProjectDepotInitDetail> list = projectDepotInitDetailService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "初始化生效")
	@SneakyThrows(RuntimeException.class)
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ProjectDepotInit p = projectDepotInitService.get(new Long(id));
			if (!Constant.DISENABLED.equals(p.getEffective())) {
				throw new BusinessException("该数据已经生效！请勿重复操作！");
			}
			//判断该数据是否曾在出入库表中生成过
			boolean exist = projectDepotInOutService.alreadyRecord(p.getProjectInitId(), "PROJECT_DEPOT_INIT");
			if(exist) {
				throw new BusinessException("生成出入库记录失败，请联系管理员");
			}
			p.setEffective(Constant.ENABLED);
			projectDepotInitService.save(p);
			
			//同时将周材数量存入T_PROJECT_MATERIALS_STORE
			for(ProjectDepotInitDetail pdid : p.getProjectDepotInitDetailSet()){
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_project.projectId_L_EQ",p.getProjectId()+"");
				filter.addConjunctFilter("Q_materialsSpecifications.specificationsId_L_EQ", pdid.getSpecificationsId()+"");
				List<ProjectMaterialsStore> list = projectMaterialsStoreService.queryTranslateAll(filter);
				ProjectMaterialsStore pms = new ProjectMaterialsStore();
				if(list.size()>0){
					pms = list.get(0);
					Integer i = Integer.valueOf(pms.getQuantity()) + Integer.valueOf(pdid.getQuantity()==null ? "0" : pdid.getQuantity());
					pms.setQuantity(i.toString());
				} else {
					pms.setProject(projectService.get(p.getProjectId()));
					pms.setMaterialsSpecifications(materialsSpecificationsService.get(pdid.getSpecificationsId()));
					pms.setQuantity(pdid.getQuantity()==null ? "0" : pdid.getQuantity());
				} 
				projectMaterialsStoreService.merge(pms);
			}
			addProjectDepotInOut(p);
		}
		return SUCCESS;
	}
	
	
	//新增一条记录到T_PROJECT_DEPOT_IN_OUT
	public void addProjectDepotInOut (ProjectDepotInit projectDepotInit) {
		Set<ProjectDepotInitDetail> set = projectDepotInit.getProjectDepotInitDetailSet();
		if(set.size()>0) {
			for(ProjectDepotInitDetail pdid : set) {
				ProjectDepotInOut pd = new ProjectDepotInOut();
				pd.setSpecificationsId(pdid.getSpecificationsId());
				pd.setSpecifications(pdid.getSpecifications());
				pd.setCommodity(pdid.getCommodity());
				pd.setUnit(pdid.getUnit());
				pd.setQuantity(pdid.getQuantity()==null? "0": pdid.getQuantity());
				pd.setSupplementQuantity(pdid.getSupplementQuantity());
				pd.setOperationWay("初始化");
				pd.setContractId(projectDepotInit.getContractId());
				pd.setRelateId(projectDepotInit.getProjectInitId());
				pd.setRelateModule("PROJECT_DEPOT_INIT");
				pd.setRelateModuleName("项目仓库初始化");
				pd.setRelateSerial(null);
				pd.setProjectId(projectDepotInit.getProjectId());
				pd.setProjectName(projectDepotInit.getProjectName());
				pd.setOperationDate(projectDepotInit.getInitDate());
				projectDepotInOutService.saveCreate(pd);
			}
		}
	}
}
