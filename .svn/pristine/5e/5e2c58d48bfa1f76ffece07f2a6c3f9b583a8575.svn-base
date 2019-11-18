package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.OtherBusiness;
import com.knight.emms.service.OtherBusinessService;

import lombok.Getter;
import lombok.Setter;

public class OtherBusinessAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
    @Setter
    private Long otherBusinessId;
	
	@Resource
	private OtherBusinessService otherBusinessService;
	
	@Getter
    @Setter
	private OtherBusiness otherBusiness;
	
	
	public String list() {
        QueryFilter filter = new QueryFilter(getRequest());
        List<OtherBusiness> list = otherBusinessService.queryTranslateAll(filter);
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }
	
	public String load() {
		OtherBusiness p = otherBusinessService.getTranslateFull(otherBusinessId);
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }
	
	@ActionLog(description = "新增或更新信息")
    public String save() {
		if(otherBusiness.getOtherBusinessId()==null){
			otherBusiness.setApplyforState(Status.Applyfor.waitSubmit);
			otherBusiness.setDelFlag(Constant.ENABLED);
			otherBusiness.setApplyDate(DateUtil.getCurrentLinkTimeStr());
		}else{
			OtherBusiness lc = otherBusinessService.get(otherBusiness.getOtherBusinessId());
			otherBusiness.setApplyforState(lc.getApplyforState());
			otherBusiness.setDelFlag(Constant.ENABLED);
			otherBusiness.setApplyDate(lc.getApplyDate());
		}
		otherBusinessService.saveOrMergeForEdit(otherBusiness);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(otherBusiness.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "删除其他业务信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	OtherBusiness ob = otherBusinessService.get(new Long(id));
        	ob.setDelFlag(Constant.DISENABLED);
        	otherBusinessService.update(ob);
        }
        return SUCCESS;
    }
	
	@ActionLog(description = "删除其他业务信息")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			 otherBusinessService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "提交其他业务信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			OtherBusiness p = otherBusinessService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				otherBusinessService.save(p);
			}
		}
		return SUCCESS;
	}
}
