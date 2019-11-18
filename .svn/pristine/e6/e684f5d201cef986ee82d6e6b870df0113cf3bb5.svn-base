/**
 *====================================================
 * 文件名称: InvoiceCollectAction.java
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

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.InvoiceCollect;
import com.knight.emms.service.InvoiceCollectService;

/**
 * @ClassName: InvoiceCollectAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:33:39
 */
public class InvoiceCollectAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private InvoiceCollect invoiceCollect;

	@Getter
	@Setter
	private Long invoiceCollectId;

	@Resource
	private InvoiceCollectService invoiceCollectService;

	private void checkInvoiceCollectSerial(InvoiceCollect invoiceCollect) {
		InvoiceCollect d = invoiceCollectService.queryInvoiceCollectBySerial(invoiceCollect);
		if (d != null) {
			throw new BusinessException("票据单号[" + d.getInvoiceSerial() + "]已经存在!");
		}
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InvoiceCollect> list = invoiceCollectService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		InvoiceCollect p = invoiceCollectService.getTranslate(invoiceCollectId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新收票信息")
	public String save() {
		if (invoiceCollect.getInvoiceCollectId() == null) {
			checkInvoiceCollectSerial(invoiceCollect);
			invoiceCollect.setCollectStatus(Status.InvoiceAmount.unfinished);
			invoiceCollect.setApplyforState(Status.Applyfor.waitSubmit);
			invoiceCollect.setDelFlag(Constant.ENABLED);
		} else {
			InvoiceCollect p = invoiceCollectService.editLoad(invoiceCollect);
			invoiceCollect.setInvoiceSerial(p.getInvoiceSerial());
			invoiceCollect.setCollectStatus(p.getCollectStatus());
			invoiceCollect.setApplyforState(p.getApplyforState());
			invoiceCollect.setDelFlag(p.getDelFlag());
		}
		invoiceCollectService.saveOrMergeForEdit(invoiceCollect);
		this.jsonString = "{success:true,applyforId:" + invoiceCollect.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除收票信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			InvoiceCollect p = invoiceCollectService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			invoiceCollectService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交收票信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			InvoiceCollect p = invoiceCollectService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				invoiceCollectService.save(p);
			}
		}
		return SUCCESS;
	}

}
