/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: LeaseRepairAction.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月18日
 *====================================================
 * 文件描述: TODO (用一句话描述该文件做什么)
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
import com.knight.emms.constant.Constant;
import com.knight.emms.model.LeaseRepair;
import com.knight.emms.service.LeaseRepairService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: LeaseRepairAction
 * @Description: 租借维修 Action层
 * @author 陈光毅
 * @date 2018年1月18日 上午10:30:37
 * @version v1.0
 */
@ParentPackage("knight-default")
@Namespace("/materials")
@Results({ @Result(name = "success", location = "/jsonString.jsp") })
@Controller("LeaseRepairAction")
@Scope("prototype")
public class LeaseRepairAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	public Long repairId;

	@Getter
	@Setter
	public LeaseRepair leaseRepair;

	@Resource
	public LeaseRepairService leaseRepairService;

	@Action("listLeaseRepair")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		String includeSet = getRequest().getParameter("includeSet");
		List<LeaseRepair> list = leaseRepairService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		boolean excludesFieldsWithoutExpose = true;
		if("Y".equals(includeSet)) {
			excludesFieldsWithoutExpose = false;
		}
		buff.append(GsonUtil.toJson(list, excludesFieldsWithoutExpose));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@Action("loadLeaseRepair")
	public String load() {
		LeaseRepair r = leaseRepairService.getTranslate(repairId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(r, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@Action("saveLeaseRepair")
	public String save() {
		leaseRepairService.saveOrMergeForEdit(leaseRepair);
		createFileAttach(leaseRepair.getRepairId());
		this.jsonString = "{success:true,applyforId:" + leaseRepair.getApplyforId() + "}";
		return SUCCESS;
	}

	@Action("multiDelLeaseRepair")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseRepair r = leaseRepairService.getTranslate(new Long(id));
			if ("0".equals(r.getStatus())) {
				r.setDelFlag(Constant.DISENABLED);
				leaseRepairService.update(r);
			} else {
				throw new BusinessException("提交申请状态不合法!");
			}
		}
		return SUCCESS;
	}

	@Action("multiSubmitLeaseRepair")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeaseRepair r = leaseRepairService.getTranslate(new Long(id));
			if ("0".equals(r.getStatus())) {
				r.setStatus("1");
				leaseRepairService.merge(r);
			} else {
				throw new BusinessException("提交申请状态不合法!");
			}
		}
		return SUCCESS;
	}

	@Action("multiDelBeforeLeaseRepair")
	public String multiDelBefore() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseRepairService.delBefore(new Long(id));
		}
		return SUCCESS;
	}

	@Action("multiDelAfterLeaseRepair")
	public String multiDelAfter() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leaseRepairService.delAfter(new Long(id));
		}
		return SUCCESS;
	}
}
