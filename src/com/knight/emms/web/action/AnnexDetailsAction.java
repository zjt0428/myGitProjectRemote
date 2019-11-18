package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.AnnexDetails;
import com.knight.emms.service.AnnexDetailsService;
import com.knight.emms.service.ProjectService;

import lombok.Getter;
import lombok.Setter;

public class AnnexDetailsAction extends BaseAction{

	private static final long serialVersionUID = 9153306476593971306L;

	@Getter
	@Setter
	private AnnexDetails annexDetails;

	@Getter
	@Setter
	private Long annexDetalisId;
	
	@Getter
	@Setter
	private Long projectId;
		
	@Resource
	private AnnexDetailsService annexDetailsService;
	

	@Resource
	private ProjectService projectService;
	
		
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AnnexDetails> list = annexDetailsService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	public String listOnProject() {
		String initStatus = getRequest().getParameter("initStatus");
		String projectId = getRequest().getParameter("projectId");
		String equipSpecific = getRequest().getParameter("equipSpecific");
		String equipVender = getRequest().getParameter("equipVender");
		List<Map<String,Object>> list = annexDetailsService.queryByScript("store.project_dis_allocate_list", initStatus,equipSpecific,equipVender,projectId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(list.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
