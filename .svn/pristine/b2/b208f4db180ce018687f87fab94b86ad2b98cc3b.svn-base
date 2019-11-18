
package com.knight.emms.web.action;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.PractiInsurance;
import com.knight.emms.model.PractiInsuranceDetail;
import com.knight.emms.model.PractiLeave;
import com.knight.emms.service.PractiLeaveService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: PractiLeaveAction
 * @Description: 人员离职
 * @author
 * @date
 */
public class PractiLeaveAction  extends ExportBaseAction<PractiLeave> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private PractiLeave practiLeave;
	
	@Setter
	@Getter
	private Long leaveId;
	
	@Resource
	private PractiLeaveService practiLeaveService;
	
	@Resource
	private CodeService codeService;
	
	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
//		if(!ApplicationContainer.isCurrentSuperAdmin()) {
//			filter.addValuesDisjunctFilter("QVO_permissionFlag_S_LK", ApplicationContainer.getCurrentUser().getLabourPermission());
//		}
		List<PractiLeave> list = practiLeaveService.queryTranslateAll(filter);
		for(PractiLeave p : list) {
			if(p.getPractitioner().getKindWork() != null) {
				p.getPractitioner().setKindWorkName(codeService.getValue("kindWork",p.getPractitioner().getKindWork()));
			}
		}
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(filter.getPagingBean().getTotalItems()).append(",\"result\":");
		buff.append(GsonUtil.toJson(list, true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "保存或更新人员离职信息")
	public String save(){
		if(practiLeave.getLeaveId() == null){
			SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			practiLeave.setCreateTime(sd.format(new Date()));
			practiLeave.setUserId(ApplicationContainer.getCurrentUserId());
			practiLeave.setUserName(ApplicationContainer.getCurrentUser().getFullname());
			practiLeave.setEffective(Status.GenericEffective.ineffective);
			practiLeaveService.save(practiLeave);
		}else {
			PractiLeave pi = practiLeaveService.get(practiLeave.getLeaveId());
			practiLeave.setCreateTime(pi.getCreateTime());
			practiLeave.setUserId(pi.getUserId());
			practiLeave.setUserName(pi.getUserName());
			practiLeave.setEffective(pi.getEffective());
			practiLeaveService.merge(practiLeave);
		}
		setFileAttach(practiLeave.getLeaveId());
		return SUCCESS;
	}
	
	/**加载信息*/
	public String load(){
		practiLeave = practiLeaveService.getTranslateFull(leaveId);
		if(practiLeave.getPractitioner().getKindWork() != null) {
			practiLeave.getPractitioner().setKindWorkName(codeService.getValue("kindWork",practiLeave.getPractitioner().getKindWork()));
		}
		StringBuffer sb = new StringBuffer("{\"success\":true,\"data\":[");
		sb.append(GsonUtil.toJson(practiLeave, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "删除信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiLeave c = practiLeaveService.get(new Long(id));
			if (Status.GenericEffective.ineffective.equals(c.getEffective())) {
				practiLeaveService.remove(c);
			}
		}
		return SUCCESS;
	}
	
	/**生效信息*/
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiLeave c = practiLeaveService.get(new Long(id));
			if (Status.GenericEffective.ineffective.equals(c.getEffective())) {
				practiLeaveService.multiEffective(c.getLeaveId());
			}
		}
		return SUCCESS;
	}
	
}
