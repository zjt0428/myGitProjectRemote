/**
 *====================================================
 * 文件名称: ProjectAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.JSONException;
import org.json.JSONObject;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Component;
import com.knight.emms.model.DispatchAllocateInit;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.Project;
import com.knight.emms.model.ProjectCompon;
import com.knight.emms.model.ProjectJoinAnnex;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.DispatchAllocateInitService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.ProjectComponService;
import com.knight.emms.service.ProjectJoinAnnexService;
import com.knight.emms.service.ProjectMaterialsStoreService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.support.EmmsApplicationSupport;
import com.knight.system.model.CodeInfo;
import com.knight.system.service.CodeService;
import com.knight.system.service.DepartmentService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ProjectAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午10:58:18
 */
public class ProjectAction extends ExportBaseAction<Project> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Project project;

	@Getter
	@Setter
	private Long projectId;
	
	@Getter
	@Setter
	private Long annexDetalisId;
	
	@Getter
	@Setter
	private DispatchAllocateInit dispatchAllocateInit;

	@Resource
	private ProjectService projectService;

	@Resource
	private CodeService codeService;
	
	@Resource
	private ProjectComponService projectComponService;
	
	@Resource
	private ComponentService componentService;
	
	
	@Resource
	private DispatchAllocateInitService dispatchAllocateService;
	
	
	@Resource
	private ProjectJoinAnnexService projectJoinAnnexService;
	
	@Resource
	private ProjectMaterialsStoreService projectMaterialsStoreService;
	
	@Resource
	private DepartmentService departmentService;
	
	@Resource
	private PractitionerService practitionerService;

	private void setRegAddress(Project project) {
		CodeInfo provinceCode = codeService.getCodeInfoMap("province").get(project.getProvince());
		CodeInfo cityCode = codeService.getCodeInfoMap("city").get(project.getCity());
		CodeInfo countyCode = codeService.getCodeInfoMap("county").get(project.getCounty());
		if(project.getStreet()==null){
			project.setStreet("");
		}
		project.setAddress(provinceCode.getValue() + cityCode.getValue() + countyCode.getValue() + project.getStreet());
	}
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Project> list = projectService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String listOnContract() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_contracted_S_EQ", "1");
		List<Project> list = projectService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Project p = projectService.getTranslate(projectId);
		p.getProjectExpenseSet();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新项目信息")
	public String save() {
		setRegAddress(project);
		projectService.projectIsRepeat(project);
		if (project.getProjectId() == null) {
			project.setStatus(Status.Project.fllowing);
			project.setDelFlag(Constant.ENABLED);
			projectService.saveSerialModel(project);
			setFileAttach(project.getProjectId());
		} else {
			Project p = projectService.get(project.getProjectId());
			project.setProjectSerial(p.getProjectSerial());
			project.setStatus(p.getStatus());
			project.setDelFlag(p.getDelFlag());
			project.setContracted(p.getContracted());
		}
		String permissionFlag = departmentService.bindingDepartmentPermission(project.getDepartment().getDepId());
		project.setPermissionFlag(permissionFlag);
		project.setSubProject();
		projectService.merge(project);
		return SUCCESS;
	}

	@ActionLog(description = "删除项目商务记录")
	public String multiDelExpense() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			projectService.deletedExpense(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除项目信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Project p = projectService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			projectService.merge(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "作废项目信息")
	public String multiScrap() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Project p = projectService.get(new Long(id));
			p.setStatus("0");
			projectService.merge(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "跟进项目信息")
	public String multiFllowing() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Project p = projectService.get(new Long(id));
			p.setStatus("1");
			projectService.merge(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "成交项目信息")
	public String multiConclude() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Project p = projectService.get(new Long(id));
			p.setStatus("2");
			projectService.merge(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "完成项目信息")
	public String multiFinished() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Project p = projectService.get(new Long(id));
			p.setStatus("3");
			projectService.merge(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "项目结案")
	public String multiClose() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Project p = projectService.get(new Long(id));
			p.setStatus("4");
			projectService.merge(p);
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addConjunctFilter("Q_projectId_L_EQ", id);
			List<Practitioner> practitioners = practitionerService.getAll(filter);
			for(Practitioner t : practitioners) {
				//重置为待岗,并清空项目
				t.setIncumbent("2");
				t.setProjectId(null);
				t.setProjectName(null);
				practitionerService.merge(t);
			}
		}
		return SUCCESS;
	}

	public String print() {
		Project project = projectService.get(projectId);
		String equipId = getRequest().getParameter("equipId");
		Map<String, Map<String, Object>> equipments = new HashMap<String, Map<String, Object>>();
		Map<String, List<Map<String, Object>>> components = new HashMap<String, List<Map<String, Object>>>();
		List<Map<String, Object>> inusedGather = projectService.queryByScript("dispatch.project_ecinused_gather", projectId, equipId);
		for (Map<String, Object> data : inusedGather) {
			String key = (String) data.get("RECORD_ID") + data.get("EQUIP_GENERIC") + data.get("EQUIP_SPECIFIC") + data.get("EXW_SERIAL") + data.get("BUILDING_NUM");
			if (!equipments.containsKey(key)) {
				equipments.put(key, data);
			}
			List<Map<String, Object>> ec = components.get(key);
			if (ec == null) {
				ec = new ArrayList<Map<String, Object>>();
				components.put(key, ec);
			}
			if (data.get("COMPON_GENERIC") != null || data.get("COMPON_SPECIFIC") != null || data.get("CALCULATE") != null) {
				ec.add(data);
			}
		}
		getRequest().setAttribute("projectName", project.getProjectName());
		getRequest().setAttribute("equipments", equipments);
		getRequest().setAttribute("components", components);
		List<Map<String, Object>> unusedGather = projectService.queryByScript("dispatch.project_ecunused_gather", projectId);
		List<Map<String, Object>> filter = new ArrayList<Map<String, Object>>();
		for (Map<String, Object> data : unusedGather) {
			if ((Integer) data.get("COUNTS") <= 0) {
				continue;
			}
			filter.add(data);
		}
		getRequest().setAttribute("unusedGather", filter);
		getRequest().setAttribute("companyName", EmmsApplicationSupport.getAppuserCorpName());
		return getRequest().getParameter("formpage");
	}
	
	public String componList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ProjectCompon> list = projectComponService.queryTranslateAll(filter);
		
		if(list!=null && list.size()>0){
			for(ProjectCompon pc:list){
				CodeServiceImpl.translate(pc.getComponent(), componentService.getPersistantStruct());
				//pc.getComponent().setConsumeCounts(pc.getCounts());
				pc.getComponent().setStoreName(pc.getProjectName());			
			}
		}
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	

	@ActionLog(description = "添加项目零配件")
	public String importComponent() {
		String counts = getRequest().getParameter("counts");
	   String id = null;
	   Integer count = null;
				  try
					  {
					  ProjectCompon sc ;
					  project = projectService.get(projectId);
						  for(String s : counts.replace("[", "").replace("]", "").trim().split("},")){
							  sc = new ProjectCompon();
							  if(s.lastIndexOf("}")+1 != s.length()){
								  s=s.concat("}");
							  }
							   JSONObject myJsonObject = new JSONObject(s);
							   Component p = null ;
							   //获取对应的值
							   id = myJsonObject.getString("id");
							   count = myJsonObject.getInt("counts");
							   
							   
							   QueryFilter filter = new QueryFilter();
							   filter.addConjunctFilter("Q_projectId_L_EQ", String.valueOf(projectId));
							   filter.addConjunctFilter("Q_component.componId_L_EQ", id);
							   filter.addConjunctFilter("Q_status_S_EQ", "1");
							   List<ProjectCompon>  sjc =   projectComponService.queryTranslateAll(filter);
							   if(sjc.size()>0){
								    sc = sjc.get(0);
								    sc.setCounts(sc.getCounts()+count);
								    projectComponService.merge(sc);
							   }else{
								   p = componentService.get(new Long(id));
								   sc.setComponent(p);
								   sc.setProjectId(projectId);
								   sc.setComponId(p.getComponId());
								   sc.setStatus("0");
								   sc.setProjectName(project.getProjectName());
								   sc.setCounts(count);
								   projectComponService.save(sc);
							   }
						  }
					  }
				  catch (JSONException e){
				  }
		return SUCCESS;
		
	}
	

	@ActionLog(description = "添加配货清单")
	public String importAnnex() throws JSONException {
		String[] ids = getRequest().getParameterValues("ids");
		String counts = getRequest().getParameter("counts");
		String id = null;
	    Integer count = null;
		  for(String s : counts.replace("[", "").replace("]", "").trim().split("},")){
			  if(s.lastIndexOf("}")+1 != s.length()){
				  s=s.concat("}");
			  }
			   JSONObject myJsonObject = new JSONObject(s);
			   Component p = null ;
			   //获取对应的值
			   id = myJsonObject.getString("id");
			   count = myJsonObject.getInt("counts");
			   
			    dispatchAllocateInit = dispatchAllocateService.get(new Long(id));
				project = projectService.get(projectId);
				ProjectJoinAnnex pja = new ProjectJoinAnnex();
				pja.setCounts(count);
				pja.setDispatchAllocateInit(dispatchAllocateInit);
				pja.setProject(project);
				projectJoinAnnexService.save(pja);
		  }
		
		return SUCCESS;
		
	}
	
	public String listOnMaterials() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_materialsed_S_EQ", "1");
		List<Project> list = projectService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String materialsList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ProjectMaterialsStore> list = projectMaterialsStoreService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	@ActionLog(description = "修改项目档案")
	public String change() {
		projectService.changeProject(project);
		return SUCCESS;
	}
}
