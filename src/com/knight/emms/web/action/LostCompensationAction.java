package com.knight.emms.web.action;

import java.text.DecimalFormat;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.LostCompensation;
import com.knight.emms.model.LostCompensationDetail;
import com.knight.emms.model.Project;
import com.knight.emms.service.LostCompensationService;
import com.knight.emms.service.ProjectService;

import lombok.Getter;
import lombok.Setter;

public class LostCompensationAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
    @Setter
    private Long lostId;

	@Resource
    private LostCompensationService lostCompensationService;
	
	@Getter
    @Setter
	private LostCompensation lostCompensation;

	@Resource
    private ProjectService projectService;
	
	public String list() {
        QueryFilter filter = new QueryFilter(getRequest());
        List<LostCompensation> list = lostCompensationService.queryTranslateAll(filter);
//      List<LostCompensation>  map = new ArrayList<LostCompensation>();
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }
	
	public String load() {
		LostCompensation p = lostCompensationService.getTranslateFull(lostId);
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }
	
	@ActionLog(description = "新增或更新信息")
    public String save() {
		if(lostCompensation.getLostId()==null){
			lostCompensation.setApplyforState(Status.Applyfor.waitSubmit);
			lostCompensation.setDelFlag(Constant.ENABLED);
		}else{
			LostCompensation lc = lostCompensationService.get(lostCompensation.getLostId());
			lostCompensation.setApplyforState(lc.getApplyforState());
			lostCompensation.setDelFlag(Constant.ENABLED);
		}
		lostCompensationService.saveOrMergeForEdit(lostCompensation);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(lostCompensation.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "提交丢失信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			LostCompensation p = lostCompensationService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				lostCompensationService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除丢失信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	LostCompensation lc = lostCompensationService.get(new Long(id));
        	lc.setDelFlag(Constant.DISENABLED);
        	lostCompensationService.update(lc);
        }
        return SUCCESS;
    }

	@ActionLog(description = "删除丢失清单")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			lostCompensationService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "丢失赔偿打印单")
	public String printForm() {
		LostCompensation p = lostCompensationService.getTranslate(lostId);
		Project b= projectService.getTranslate(p.getContractMaterials().getProjectId());
		p.setCompensationDate(DateUtil.changeObj2DateStr(p.getCompensationDate(), DateUtil.CN_DISPLAY_DATE));
		String address = b.getProvinceName()+b.getCityName()+b.getCountyName();
		double cost = 0;
		Iterator<LostCompensationDetail> it = p.getLostCompensationDetailSet().iterator();
		while(it.hasNext()) {
			LostCompensationDetail lcd = it.next();
			if(lcd.getLostQuantity()==null||"0".equals(lcd.getLostQuantity())) {
				it.remove();
			}else{
				cost += Double.valueOf(lcd.getTotalCosts());
			}
		}
		String allCost = new DecimalFormat("#.00").format(cost);
		getRequest().setAttribute("lostCompensation", p);
		getRequest().setAttribute("address", address);
		getRequest().setAttribute("allCost", allCost);
		return "printForm";
	}
}
