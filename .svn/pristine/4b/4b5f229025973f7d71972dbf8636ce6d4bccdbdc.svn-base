
package com.knight.emms.web.action;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.PractiInsurance;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.SafetyEducation;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.SafetyEducationService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: SafetyEducationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class SafetyEducationAction  extends ExportBaseAction<SafetyEducation> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private SafetyEducation safetyEducation;

	@Setter
	@Getter
	private Long safetyId;
	
	@Resource
	private SafetyEducationService safetyEducationService;
	
	@Resource
	private PractitionerService  practitionerService;
	
	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
		List<SafetyEducation> list = safetyEducationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "删除安全教育信息")
	public String multiDel(){
		String[] ids = getRequest().getParameterValues("ids");
		for(String id : ids){
			SafetyEducation sd = safetyEducationService.get(new Long(id));
			sd.setDelFlag(Constant.DISENABLED);
			safetyEducationService.update(sd);
		}
		return SUCCESS;
	}
	
	/**加载安全教育信息*/
	public String load(){
		safetyEducation = safetyEducationService.getTranslate(safetyId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(safetyEducation, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "保存或更新安全教育信息")
	public String save(){
		QueryFilter filter = new QueryFilter();
		if(safetyEducation.getSafetyId() == null){
			safetyEducation.setDelFlag(Constant.ENABLED);
			safetyEducation.setUserId(ApplicationContainer.getCurrentUserId());
		}else {
			SafetyEducation pi = safetyEducationService.get(safetyEducation.getSafetyId());
			safetyEducation.setDelFlag(pi.getDelFlag());
			safetyEducation.setUserId(pi.getUserId());
		}
		filter.addValuesDisjunctFilter("QVO_practiId_L_EQ", safetyEducation.getEducaManId());
		List<Practitioner> list = practitionerService.getAll(filter);
		for(Practitioner p : list){
			p.setEdcationTime(safetyEducation.getEdcationTime());
			practitionerService.update(p);
		}
		safetyEducationService.saveOrMergeFor(safetyEducation);
		return SUCCESS;
	}
}
