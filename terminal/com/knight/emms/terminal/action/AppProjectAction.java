/**
 *====================================================
 * 文件名称: ProjectAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Project;
import com.knight.emms.model.ProjectCompon;
import com.knight.emms.model.SettleContract;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.ProjectComponService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.service.SettleContractService;
import com.knight.emms.support.EmmsApplicationSupport;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.model.CodeInfo;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ProjectAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午10:58:18
 */
public class AppProjectAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Project project;

	@Getter
	@Setter
	private Long projectId;

	@Resource
	private ProjectService projectService;

	@Resource
	private CodeService codeService;
	
	@Resource
	private ProjectComponService projectComponService;
	
	@Resource
	private ComponentService componentService;
	
	@Resource
	private SettleContractService settleContractService;

	private void setRegAddress(Project project) {
		CodeInfo provinceCode = codeService.getCodeInfoMap("province").get(project.getProvince());
		CodeInfo cityCode = codeService.getCodeInfoMap("city").get(project.getCity());
		CodeInfo countyCode = codeService.getCodeInfoMap("county").get(project.getCounty());
		if(project.getStreet()==null){
			project.setStreet("");
		}
		project.setAddress(provinceCode.getValue() + cityCode.getValue() + countyCode.getValue() + project.getStreet());
	}
//
//	public String list() {
////		Query query = getTerminalMessage().getQuery();
////		String 
////		if(query !=null){
////			
////		}
//		List<Project> list = projectService.queryByScript(sqlId, params)
//		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
//		buff.append(GsonUtil.toJson(list));
//		buff.append("}");
//		this.jsonString = buff.toString();
//		return SUCCESS;
//	}

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
		}
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
			projectService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "作废项目信息")
	public String multiScrap() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Project p = projectService.get(new Long(id));
			p.setStatus(Status.Project.scrap);
			projectService.save(p);
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
	
	/*结算详情*/
	public String listSettleContract() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		long projectId = 0;
		if(query !=null){
			projectId=query.getProjectId();
		}
		List<Map<String, Object>> list = null;
		 list = settleContractService.queryByScript("terminal.list_settle_contract", projectId,start,pageSize);
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(list.size()).append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	/*项目资产-配件*/
	public String componList() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		long projectId = 0;
		if(query !=null){
			projectId=query.getProjectId();
		}
		List<Map<String, Object>> list = projectComponService.queryByScript("terminal.query_comp", projectId,start,pageSize);
		StringBuffer buff = new StringBuffer("{\"success\":true").append(",\"result\":");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String queryProjectInUse() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		String keyword = query.getKeyword();
		List<Map<String, Object>> projectList = projectService.queryByScript("terminal.list_inuse_project",start, pageSize,keyword==null?"":keyword,"2");
		Integer count = 0;
		if(projectList.size()>0) {
			count =(Integer) projectList.get(0).get("count");
		}
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(count).append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(projectList, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String queryEquipOnProjectId() {
		Query query = getTerminalMessage().getQuery();
		Integer start = query.getStart();
		Integer pageSize = query.getPageSize();
		long projectId = 0;
		long equipId = 0;
		if(query !=null){
			projectId=query.getProjectId();
		}
		List<Map<String, Object>> projectList = new ArrayList<Map<String, Object>>();
		if(query.getEquipId() != null){
			equipId=query.getEquipId();
			 projectList = projectService.queryByScript("terminal.list_equip_on_project_id2",start,pageSize,projectId,equipId);
		}else{
			 projectList = projectService.queryByScript("terminal.list_equip_on_project_id",start,pageSize,projectId);
		}
		
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(projectList.size()).append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(projectList, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String queryHeadOnProjectId() {
		Query query = getTerminalMessage().getQuery();
		long projectId = 0;
		if(query !=null){
			projectId=query.getProjectId();
		}
		
		List<Map<String, Object>> projectList = projectService.queryByScript("terminal.list_head_info_on_project_id",projectId);
		
		StringBuffer buff = new StringBuffer("{\"success\":true").append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(projectList, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String queryProjectById() {
		Query query = getTerminalMessage().getQuery();
//		Integer start = query.getStart();
//		Integer pageSize = query.getPageSize();
//		QueryFilter filter = new QueryFilter();
//		filter.setPagingBean(new PagingBean(start,pageSize));
		long projId = 0;
		if(query!=null){
			projId = query.getProjectId();
		}
		Project projec = projectService.get(projId);
		if(projec!=null ){
			projec.setProjectExpenseSet(null);
			projec.setProjectExpenses(null);
		}
		StringBuffer buff = new StringBuffer("{\"success\":true,").append("\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(projec, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

}
