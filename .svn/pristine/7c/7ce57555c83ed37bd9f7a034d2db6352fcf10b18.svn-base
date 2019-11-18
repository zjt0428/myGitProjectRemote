package com.knight.emms.web.action;

import java.text.DecimalFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.LeasedLostCompensation;
import com.knight.emms.model.LeasedLostCompensationDetail;
import com.knight.emms.model.LostCompensation;
import com.knight.emms.model.LostCompensationDetail;
import com.knight.emms.model.Project;
import com.knight.emms.service.LeasedLostCompensationService;

import lombok.Getter;
import lombok.Setter;

public class LeasedLostCompensationAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
    @Setter
    private Long lostId;

	@Resource
    private LeasedLostCompensationService leasedLostCompensationService;
	
	@Getter
    @Setter
	private LeasedLostCompensation leasedLostCompensation;
	
	
	public String list() {
        QueryFilter filter = new QueryFilter(getRequest());
		String includeSet = getRequest().getParameter("includeSet");
        List<LeasedLostCompensation> list = leasedLostCompensationService.queryTranslateAll(filter);
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
	
	public String load() {
		LeasedLostCompensation p = leasedLostCompensationService.getTranslateFull(lostId);
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }
	
	@ActionLog(description = "新增或更新信息")
    public String save() {
		if(leasedLostCompensation.getLostId()==null){
			leasedLostCompensation.setApplyforState(Status.Applyfor.waitSubmit);
			leasedLostCompensation.setDelFlag(Constant.ENABLED);
		}else{
			LeasedLostCompensation lc = leasedLostCompensationService.get(leasedLostCompensation.getLostId());
			leasedLostCompensation.setApplyforState(lc.getApplyforState());
			leasedLostCompensation.setDelFlag(Constant.ENABLED);
		}
		leasedLostCompensationService.saveOrMergeForEdit(leasedLostCompensation);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(leasedLostCompensation.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "提交丢失信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LeasedLostCompensation p = leasedLostCompensationService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				leasedLostCompensationService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除丢失信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	LeasedLostCompensation lc = leasedLostCompensationService.get(new Long(id));
        	lc.setDelFlag(Constant.DISENABLED);
        	leasedLostCompensationService.update(lc);
        }
        return SUCCESS;
    }

	@ActionLog(description = "删除丢失清单")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			leasedLostCompensationService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	public String detailList() {
		Long leaseId = new Long(getRequest().getParameter("leaseId"));
		String startDate = getRequest().getParameter("startDate");
		String endDate = getRequest().getParameter("endDate");
		startDate = DateUtil.changeObj2DateStr(startDate,DateUtil.LINK_DISPLAY_DATE);
		endDate = DateUtil.changeObj2DateStr(endDate,DateUtil.LINK_DISPLAY_DATE);
		List<Map<String, Object>> list = leasedLostCompensationService.queryByScript("materials.leasedLostDetail_by_leasedId",leaseId,startDate,endDate);
		StringBuffer buff = new StringBuffer("{success:true,").append("result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "丢失赔偿打印单")
	public String printForm() {
		LeasedLostCompensation p = leasedLostCompensationService.getTranslate(lostId);
		double cost = 0;
		Iterator<LeasedLostCompensationDetail> it = p.getLeasedLostCompensationDetailSet().iterator();
		while(it.hasNext()) {
			LeasedLostCompensationDetail lcd = it.next();
			if(lcd.getLostQuantity()==null||"0".equals(lcd.getLostQuantity())) {
				it.remove();
			}else{
				cost += Double.valueOf(lcd.getTotalCosts());
			}
		}
		String allCost = new DecimalFormat("#.00").format(cost);
		getRequest().setAttribute("leasedLostCompensation", p);
		getRequest().setAttribute("allCost", allCost);
		return "printForm";
	}
}
