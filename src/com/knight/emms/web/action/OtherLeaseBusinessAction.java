package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.OtherLeaseBusiness;
import com.knight.emms.model.OtherLeaseBusiness;
import com.knight.emms.service.OtherLeaseBusinessService;

import lombok.Getter;
import lombok.Setter;

public class OtherLeaseBusinessAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
    @Setter
    private Long otherId;
	
	@Resource
	private OtherLeaseBusinessService otherLeaseBusinessService;
	
	@Getter
    @Setter
	private OtherLeaseBusiness otherLeaseBusiness;
	
	
	public String list() {
        QueryFilter filter = new QueryFilter(getRequest());
        List<OtherLeaseBusiness> list = otherLeaseBusinessService.queryTranslateAll(filter);
        StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
        buff.append(GsonUtil.toJson(list));
        buff.append("}");
        this.jsonString = buff.toString();
        return SUCCESS;
    }
	
	public String load() {
		OtherLeaseBusiness p = otherLeaseBusinessService.getTranslateFull(otherId);
        StringBuffer sb = new StringBuffer("{success:true,data:[");
        sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
        return SUCCESS;
    }
	
	@ActionLog(description = "新增或更新信息")
    public String save() {
		if(otherLeaseBusiness.getOtherId()==null){
			otherLeaseBusiness.setApplyforState(Status.Applyfor.waitSubmit);
			otherLeaseBusiness.setDelFlag(Constant.ENABLED);
		}else{
			OtherLeaseBusiness lc = otherLeaseBusinessService.get(otherLeaseBusiness.getOtherId());
			otherLeaseBusiness.setApplyforState(lc.getApplyforState());
			otherLeaseBusiness.setDelFlag(Constant.ENABLED);
		}
		otherLeaseBusinessService.saveOrMergeForEdit(otherLeaseBusiness);
		StringBuffer sb = new StringBuffer("{success:true,applyforId:").append(otherLeaseBusiness.getApplyforId()).append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "删除其他业务信息")
    public String multiDel() {
        String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	OtherLeaseBusiness ob = otherLeaseBusinessService.get(new Long(id));
        	ob.setDelFlag(Constant.DISENABLED);
        	otherLeaseBusinessService.update(ob);
        }
        return SUCCESS;
    }
	
	@ActionLog(description = "删除其他业务信息")
	public String multiDelDetail() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			 otherLeaseBusinessService.deleteDetail(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "提交其他业务信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			OtherLeaseBusiness p = otherLeaseBusinessService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				otherLeaseBusinessService.save(p);
			}
		}
		return SUCCESS;
	}
}
