
package com.knight.emms.web.action;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.SafeClarification;
import com.knight.emms.model.SafetyEducation;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.SafeClarificationService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: SafeClarificationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class SafeClarificationAction  extends ExportBaseAction<SafeClarification> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private SafeClarification safeClarification;

	@Setter
	@Getter
	private Long clarificaId;
	
	@Resource
	private SafeClarificationService safeClarificationService;
	
	@Resource
	private PractitionerService  practitionerService;
	
	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
		List<SafeClarification> list = safeClarificationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "删除安全交底信息")
	public String multiDel(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			SafeClarification sc = safeClarificationService.get(new Long(id));
			sc.setDelFlag(Constant.DISENABLED);
			safeClarificationService.update(sc);
		}
		return SUCCESS;
	}
	
	/**加载安全交底信息*/
	public String load(){
		safeClarification = safeClarificationService.getTranslate(clarificaId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(safeClarification, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "保存或更新安全交底信息")
	public String save(){
		if(safeClarification.getClarificaId() == null){
			safeClarification.setDelFlag(Constant.ENABLED);
			safeClarification.setUserId(ApplicationContainer.getCurrentUserId());
		}else {
			SafeClarification pi = safeClarificationService.get(safeClarification.getClarificaId());
			safeClarification.setDelFlag(pi.getDelFlag());
			safeClarification.setUserId(pi.getUserId());
		}
		String[] ids = safeClarification.getClarificaManId().split(",");
		for(int i =0; i<ids.length ;i++) {
			Practitioner p = practitionerService.get(Long.valueOf(ids[i]));
			p.setClarificaStatus("1");
			p.setClarificaTime(safeClarification.getClarificaTime());
			practitionerService.update(p);
		}
		safeClarificationService.saveOrMergeFor(safeClarification);
		return SUCCESS;
	}
}
