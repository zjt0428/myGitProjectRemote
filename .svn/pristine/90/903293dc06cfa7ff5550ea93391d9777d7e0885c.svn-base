
package com.knight.emms.web.action;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.EquipInsurance;
import com.knight.emms.model.PractiEvaluation;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.*;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;
import javax.annotation.Resource;
import java.util.*;

/**
 * @ClassName: PractiEvaluationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class PractiEvaluationAction extends ExportBaseAction<PractiEvaluation> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private PractiEvaluation practiEvaluation;
	
	@Setter
	@Getter
	private Long evaluaId;
	
	@Resource
	private PractiEvaluationService practiEvaluationService;
	
	@Resource
	private PractitionerService practitionerService;

	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
		List<PractiEvaluation> list = practiEvaluationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除人员评价")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiEvaluation c = practiEvaluationService.get(new Long(id));
			c.setDelFlag(Constant.DISENABLED);
			practiEvaluationService.save(c);
			Practitioner p = practitionerService.get(c.getAcceptManId());
			p.setEvaluaCount(p.getEvaluaCount()-1);
			practitionerService.update(p);
		}
		return SUCCESS;
	}
	
	public String load() {
		practiEvaluation = practiEvaluationService.get(evaluaId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(practiEvaluation, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	@ActionLog(description = "保存或更新评价信息")
	public String save() {
		if (practiEvaluation.getEvaluaId() == null) {
			practiEvaluation.setDelFlag(Status.AppLogistics.Received);
			Practitioner p = practitionerService.get(practiEvaluation.getAcceptManId());
			p.setStarsLevel(practiEvaluation.getEvaluaStar());
			p.setEvaluaCount(p.getEvaluaCount()+1);
			practitionerService.update(p);
		}else {
			PractiEvaluation ei = practiEvaluationService.get(practiEvaluation.getEvaluaId());
			practiEvaluation.setDelFlag(ei.getDelFlag());
		}
		practiEvaluationService.saveOrMergeFor(practiEvaluation);
		return SUCCESS;
	}
}
