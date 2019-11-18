/**
 *====================================================
 * 文件名称: AccidentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Accident;
import com.knight.emms.service.AccidentService;

/**
 * @ClassName: AccidentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:50:21
 */
public class AccidentAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Accident accident;

	@Getter
	@Setter
	private Long accidentId;

	@Resource
	private AccidentService accidentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Accident> list = accidentService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Accident c = accidentService.getTranslateFull(accidentId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新事故信息")
	public String save() {
		if (accident.getAccidentId() == null) {
			accident.setStatus(Status.HandleResult.untreated);
			accidentService.saveSerialModel(accident);
			setFileAttach(accident.getAccidentId());
		} else {
			Accident a = accidentService.get(accident.getAccidentId());
			accident.setAccidentReportId(a.getAccidentReportId());
			accident.setStatus(a.getStatus());
			accidentService.merge(accident);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除事故信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			accidentService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		accident = accidentService.getTranslateFull(accidentId);
		return getRequest().getParameter("formpage");
	}

}
