/**
 *====================================================
 * 文件名称: AccidentReportAction.java
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
import com.knight.emms.model.AccidentReport;
import com.knight.emms.service.AccidentReportService;

/**
 * @ClassName: AccidentReportAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:50:33
 */
public class AccidentReportAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AccidentReport accidentReport;

	@Getter
	@Setter
	private Long accidentReportId;

	@Resource
	private AccidentReportService accidentReportService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AccidentReport> list = accidentReportService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		AccidentReport c = accidentReportService.getTranslateFull(accidentReportId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String save() {
		if (accidentReport.getAccidentReportId() == null) {
			this.isCreateFileAttach = true;
		} else {
			AccidentReport a = accidentReportService.get(accidentReport.getAccidentReportId());
			accidentReport.setAccident(a.getAccident());
		}
		accidentReportService.saveOrUpdate(accidentReport);
		createFileAttach(accidentReport.getAccidentReportId());
		return SUCCESS;
	}

	@ActionLog(description = "删除信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			accidentReportService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		accidentReport = accidentReportService.getTranslateFull(accidentReportId);
		return getRequest().getParameter("formpage");
	}

}
