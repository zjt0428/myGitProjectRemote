package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.InspectSelfInit;
import com.knight.emms.model.InspectSelfInitDetail;
import com.knight.emms.service.InspectSelfInitDetailService;
import com.knight.emms.service.InspectSelfInitService;

import lombok.Getter;
import lombok.Setter;

public class InspectSelfInitAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private Long initId;
	
	@Setter
	@Getter
	private Long initDetailId;
	
	@Setter
	@Getter
	private InspectSelfInit inspectSelfInit;
	
	@Setter
	@Getter
	private InspectSelfInitDetail inspectSelfInitDetail;
	
	@Resource
	private InspectSelfInitService inspectSelfInitService;
	
	@Resource
	private InspectSelfInitDetailService inspectSelfInitDetailService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InspectSelfInit> list = inspectSelfInitService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String listDetail() {
		QueryFilter filter = new QueryFilter(getRequest());
		InspectSelfInit init = inspectSelfInitService.get(initId);
		List<InspectSelfInitDetail> list = new ArrayList<InspectSelfInitDetail>(init.getInspectSelfInitDetailSet());
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		InspectSelfInit c = inspectSelfInitService.getTranslate(initId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String loadDetail() {
		InspectSelfInitDetail c = inspectSelfInitDetailService.getTranslate(initDetailId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "保存检测项")
	public String save() {
		if (inspectSelfInit.getInitId() != null) {
			InspectSelfInit i = inspectSelfInitService.get(inspectSelfInit.getInitId());
			inspectSelfInit.setInspectType(i.getInspectType());
			inspectSelfInit.complete();
		}
		inspectSelfInitService.saveOrMerge(inspectSelfInit);
		return SUCCESS;
	}
	
	public String saveDetail() {
		if (inspectSelfInitDetail.getInitDetailId() != null) {
			InspectSelfInitDetail i = inspectSelfInitDetailService.get(inspectSelfInitDetail.getInitDetailId());
			inspectSelfInitDetail.setInitId(i.getInitId());
			inspectSelfInitDetailService.merge(inspectSelfInitDetail);
		}else {
			inspectSelfInitDetailService.save(inspectSelfInitDetail);
		}
		return SUCCESS;
	}

	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			inspectSelfInitService.remove(new Long(id));
		}
		return SUCCESS;
	}
	
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			inspectSelfInitDetailService.remove(new Long(id));
		}
		return SUCCESS;
	}
}
