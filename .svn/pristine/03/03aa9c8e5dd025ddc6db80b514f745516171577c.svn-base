package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.RiskReport;
import com.knight.emms.service.RiskReportService;

public class RiskReportAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private RiskReport riskReport;

	@Getter
	@Setter
	private Long riskReportId;

	@Resource
	private RiskReportService riskReportService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<RiskReport> list = riskReportService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		RiskReport c = riskReportService.getTranslateFull(riskReportId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新故障反馈信息")
	public String save() {
		if (riskReport.getRiskReportId() == null) {
			this.isCreateFileAttach = true;
		} else {
			RiskReport r = riskReportService.get(riskReport.getRiskReportId());
			riskReport.setRisk(r.getRisk());
		}
		riskReportService.saveOrUpdate(riskReport);
		createFileAttach(riskReport.getRiskReportId());
		return SUCCESS;
	}

	@ActionLog(description = "删除故障反馈信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			riskReportService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		riskReport = riskReportService.getTranslateFull(riskReportId);
		return getRequest().getParameter("formpage");
	}

}
