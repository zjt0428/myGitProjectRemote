/**
 *====================================================
 * 文件名称: SalaryAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Salary;
import com.knight.emms.model.SalaryPracti;
import com.knight.emms.service.SalaryService;

/**
 * @ClassName: SalaryAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:34:44
 */
public class SalaryAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Salary salary;

	@Setter
	@Getter
	private Long salaryId;

	@Resource
	private SalaryService salaryService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Salary> list = salaryService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Salary cert = salaryService.getTranslateFull(salaryId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(cert, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String loadPrePracti() {
		String salaryMonth = getRequest().getParameter("salaryMonth");
		Map<Long, SalaryPracti> deducts = salaryService.loadPreMonthSalary(salaryMonth);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(deducts, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新薪资信息")
	public String save() {
		salary.setMonthId(Integer.parseInt(salary.getSalaryMonth().replaceAll("[^0-9]", "")));
		salary.setSalaryDate(DateUtil.changeObj2DateStr(salary.getMonthId(), DateUtil.LINK_DISPLAY_DATE));
		if (salary.getSalaryId() == null) {
			salary.setApplyforState(Status.Applyfor.waitSubmit);
			salary.setDelFlag(Constant.ENABLED);
		} else {
			Salary p = salaryService.editLoad(salary);
			salary.setSalarySerial(p.getSalarySerial());
			salary.setApplyforState(p.getApplyforState());
			salary.setDelFlag(p.getDelFlag());
		}
		salaryService.saveOrMergeForEdit(salary);
		this.jsonString = "{success:true,applyforId:" + salary.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除薪资人员信息")
	public String multiDelPracti() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			salaryService.deletedPracti(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除薪资信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Salary c = salaryService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(c.getApplyforState())) {
				c.setDelFlag(Constant.DISENABLED);
				salaryService.save(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交薪资信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Salary p = salaryService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitAccept);
				salaryService.save(p);
			}
		}
		return SUCCESS;
	}

	// =================================================================================================//
	public String printPractiMonth() throws Exception {
		String salaryMonth = getRequest().getParameter("salaryMonth");
		salaryMonth = URLDecoder.decode(salaryMonth, "UTF-8");
		List<Map<String, Object>> practiMonthSalary = salaryService.findPractiSalaryByMonth(salaryMonth);
		getRequest().setAttribute("salaryMonth", salaryMonth);
		getRequest().setAttribute("practiMonthSalary", practiMonthSalary);
		return "allpractimonthsalary";
	}
}
