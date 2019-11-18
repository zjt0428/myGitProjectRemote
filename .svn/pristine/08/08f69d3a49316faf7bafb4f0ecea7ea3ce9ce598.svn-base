/**
 *====================================================
 * 文件名称: InvoiceIssueAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
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
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.InvoiceIssue;
import com.knight.emms.service.InvoiceIssueService;

/**
 * @ClassName: InvoiceIssueAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:33:59
 */
public class InvoiceIssueAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private InvoiceIssue invoiceIssue;

	@Getter
	@Setter
	private Long invoiceIssueId;

	@Resource
	private InvoiceIssueService invoiceIssueService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InvoiceIssue> list = invoiceIssueService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		InvoiceIssue p = invoiceIssueService.getTranslate(invoiceIssueId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新开票信息")
	public String save() {
		if (invoiceIssue.getInvoiceIssueId() == null) {
			invoiceIssue.setIssueStatus(Status.InvoiceAmount.waiting);
			invoiceIssue.setApplyforState(Status.InvoiceApplyfor.waitSubmit);
			invoiceIssue.setDelFlag(Constant.ENABLED);
		} else {
			InvoiceIssue p = invoiceIssueService.editLoad(invoiceIssue);
			invoiceIssue.setInvoiceSerial(p.getInvoiceSerial());
			invoiceIssue.setIssueStatus(p.getIssueStatus());
			invoiceIssue.setApplyforState(p.getApplyforState());
			invoiceIssue.setDelFlag(p.getDelFlag());
		}
		invoiceIssueService.saveOrMergeForEdit(invoiceIssue);
		this.jsonString = "{success:true,applyforId:" + invoiceIssue.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除开票信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			InvoiceIssue p = invoiceIssueService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			invoiceIssueService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交开票信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			InvoiceIssue p = invoiceIssueService.get(new Long(id));
			if (Status.InvoiceApplyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.InvoiceApplyfor.waitApprove);
				invoiceIssueService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "作废开票信息")
	public String multiDeprecate() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			InvoiceIssue p = invoiceIssueService.get(new Long(id));
			if (Status.InvoiceApplyfor.passed.equals(p.getApplyforState())) { // 3:完成
				p.setApplyforState(Status.InvoiceApplyfor.nullifyAccept);
				invoiceIssueService.save(p);
			}
		}
		return SUCCESS;
	}

}
