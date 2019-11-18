package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ExeuntPlan;
import com.knight.emms.service.DemandDetailForExeuntPlanService;
import com.knight.emms.service.ExeuntPlanService;

import lombok.Getter;
import lombok.Setter;

/**
 * 
 * @author lbf
 *
 */
public class ExeuntPlanAction extends ExportBaseAction<ExeuntPlan> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ExeuntPlan exeuntPlan;

	@Getter
	@Setter
	private Long exeuntPlanId;

	@Resource
	private ExeuntPlanService exeuntPlanService;
	@Resource
	private DemandDetailForExeuntPlanService demandDetailForExeuntPlanService;
	
	@ActionLog(description = "")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ExeuntPlan> list = exeuntPlanService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ExeuntPlan exeuntPlan = exeuntPlanService.getTranslate(exeuntPlanId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(exeuntPlan, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新业务申请信息")
	public String save() {
		if (exeuntPlan.getExeuntPlanId() == null) {
			exeuntPlan.setApplyforState(Status.ExeuntPlanApplyfor.waitSubmit);
			super.isCreateFileAttach = true;
		} else {
			ExeuntPlan a = exeuntPlanService.editLoad(exeuntPlan);
			exeuntPlan.setApplyforState(a.getApplyforState());
		}
		exeuntPlanService.saveOrMergeForEdit(exeuntPlan);
		super.createFileAttach(this.exeuntPlan.getExeuntPlanId());
		this.jsonString = "{success:true,applyforId:" + exeuntPlan.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除业务申请")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ExeuntPlan exeuntPlan = exeuntPlanService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(exeuntPlan.getApplyforState())) {
				exeuntPlanService.remove(exeuntPlan);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除业务关联需求明细")
	public String multiDelDemandDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			demandDetailForExeuntPlanService.remove(Long.valueOf(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交业务申请")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ExeuntPlan e = exeuntPlanService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(e.getApplyforState())) {
				e.setApplyforState(Status.Applyfor.waitAccept);
				exeuntPlanService.save(e);
			}
		}
		return SUCCESS;
	}
	
	public String print() {
		exeuntPlan = exeuntPlanService.getTranslate(exeuntPlanId);
		return getRequest().getParameter("formpage");
	}
}
