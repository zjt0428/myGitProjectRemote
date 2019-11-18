package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.LogisticsTransport;
import com.knight.emms.model.LostCompensation;
import com.knight.emms.model.OtherBets;
import com.knight.emms.service.OtherBetsService;

import lombok.Getter;
import lombok.Setter;

public class OtherBetsAction extends ExportBaseAction<OtherBets> {

	private static final long serialVersionUID = 1L;

	@Getter
    @Setter
    private Long otherBetsId;
	
	@Resource
	private OtherBetsService otherBetsService;
	
	@Getter
    @Setter
	private OtherBets otherBets;
	
	
	public String list() {
        QueryFilter filter = new QueryFilter(getRequest());
        List<OtherBets> list = otherBetsService.queryTranslateAll(filter);
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }
	
	public String load() {
		OtherBets p = otherBetsService.getTranslateFull(otherBetsId);
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }
	
	@ActionLog(description = "新增或更新信息")
    public String save() {
		if(otherBets.getOtherBetsId()==null){
			otherBets.setApplyforState(Status.Applyfor.waitSubmit);
			otherBets.setDelFlag(Constant.ENABLED);
		}else{
			OtherBets lc = otherBetsService.get(otherBets.getOtherBetsId());
			otherBets.setApplyforState(lc.getApplyforState());
			otherBets.setDelFlag(Constant.ENABLED);
		}
		otherBetsService.saveOrMergeForEdit(otherBets);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(otherBets.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "删除其他业务信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	otherBetsService.delete(new Long(id));
        }
        return SUCCESS;
    }
	
	@ActionLog(description = "提交其他业务信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			OtherBets p = otherBetsService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				otherBetsService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除其他业务信息")
    public String multiDelDetail() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	otherBetsService.deleteDetail(new Long(id));
        }
        return SUCCESS;
    }
}
