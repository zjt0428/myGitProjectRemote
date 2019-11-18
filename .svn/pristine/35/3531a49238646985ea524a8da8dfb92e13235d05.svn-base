/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: ProjectRepairAction.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月23日
 *====================================================
 * 文件描述: 项目维修 Action层
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.ProjectRepair;
import com.knight.emms.service.ProjectRepairService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ProjectRepairAction
 * @Description: 项目维修 Action层
 * @author 陈光毅
 * @date 2018年1月23日 下午4:43:02
 * @version v1.0
 */
@ParentPackage("knight-default")
@Namespace("/archive")
@Results({ @Result(name = "success", location = "/jsonString.jsp") })
@Controller("ProjectRepairAction")
@Scope("prototype")
public class ProjectRepairAction extends BaseAction {

	private static final long serialVersionUID = -5359754720194537249L;

	@Getter
	@Setter
	private Long repairId;

	@Getter
	@Setter
	private ProjectRepair projectRepair;

	@Resource
	private ProjectRepairService projectRepairService;

	@Action("listProjectRepair")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ProjectRepair> list = projectRepairService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@Action("loadProjectRepair")
	public String load() {
		ProjectRepair projectRepair = projectRepairService.getTranslate(repairId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(projectRepair, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@Action("saveProjectRepair")
	public String save() {
		projectRepairService.saveOrMergeForEdit(projectRepair);
		createFileAttach(projectRepair.getRepairId());
		this.jsonString = "{success:true,applyforId:" + projectRepair.getApplyforId() + "}";
		return SUCCESS;
	}

	@Action("multiDelProjectRepair")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ProjectRepair p = projectRepairService.getTranslate(new Long(id));
			if ("0".equals(p.getStatus())) {
				projectRepairService.remove(p);
			} else {
				throw new BusinessException("提交申请状态不合法!");
			}
		}
		return SUCCESS;
	}

	@Action("multiSubmitProjectRepair")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ProjectRepair p = projectRepairService.getTranslate(new Long(id));
			if ("0".equals(p.getStatus())) {
				p.setStatus("1");
				projectRepairService.update(p);
			} else {
				throw new BusinessException("提交申请状态不合法!");
			}
		}
		return SUCCESS;
	}
	
	@Action("multiDelBeforeProjectRepair")
	public String multiDelBefore() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			projectRepairService.delBefore(new Long(id));
		}
		return SUCCESS;
	}
	
	@Action("multiDelAfterProjectRepair")
	public String multiDelAfter() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			projectRepairService.delAfter(new Long(id));
		}
		return SUCCESS;
	}
}
