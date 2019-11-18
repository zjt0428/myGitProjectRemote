package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Risk;
import com.knight.emms.service.RiskService;

public class RiskAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Risk risk;

	@Getter
	@Setter
	private Long riskId;

	@Resource
	private RiskService riskService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Risk> list = riskService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Risk c = riskService.getTranslateFull(riskId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新隐患信息")
	public String save() {
		if (risk.getRiskId() == null) {
			risk.setStatus(Status.HandleResult.untreated);
			riskService.saveSerialModel(risk);
			setFileAttach(risk.getRiskId());
		} else {
			Risk a = riskService.get(risk.getRiskId());
			risk.setRiskReportId(a.getRiskReportId());
			risk.setStatus(a.getStatus());
			riskService.merge(risk);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除隐患信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			riskService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String printList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Risk> list = riskService.queryTranslateAllFull(filter);
		getRequest().setAttribute("risks", list);
		if (!list.isEmpty()) {
			getRequest().setAttribute("project", list.get(0).getProject());
		}
		return getRequest().getParameter("formpage");
	}

	public String print() {
		risk = riskService.getTranslateFull(riskId);
		return getRequest().getParameter("formpage");
	}

}
