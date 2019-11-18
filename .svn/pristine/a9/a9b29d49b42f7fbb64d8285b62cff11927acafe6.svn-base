/**
 *====================================================
 * 文件名称: InvoiceIssueServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.BusinessMessageService;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.InvoiceIssueDao;
import com.knight.emms.domain.FundReceiveVoucherService;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.InvoiceIssue;
import com.knight.emms.service.InvoiceIssueService;
import com.knight.emms.service.ReceivementService;

/**
 * @ClassName: InvoiceIssueServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:28:48
 */
public class InvoiceIssueServiceImpl extends BusinessFlowServiceImpl<InvoiceIssue> implements InvoiceIssueService {

	private InvoiceIssueDao invoiceIssueDao;

	@Resource
	private ReceivementService receivementService;

	@Setter
	private Map<String, FundReceiveVoucherService> fundReceiveVoucherServices = new HashMap<String, FundReceiveVoucherService>();

    @Resource
    private BusinessMessageService businessMessageService;

	public InvoiceIssueServiceImpl(InvoiceIssueDao dao) {
		super(dao);
		this.invoiceIssueDao = dao;
		passAcceptStateMap.put(Status.InvoiceApplyfor.nullifyAccept, Status.InvoiceApplyfor.nullifyApprove);
		rejectAcceptStateMap.put(Status.InvoiceApplyfor.nullifyAccept, Status.InvoiceApplyfor.passed);

		passApproveStateMap.put(Status.InvoiceApplyfor.nullifyApprove, Status.InvoiceApplyfor.nullify);
		rejectApproveStateMap.put(Status.InvoiceApplyfor.nullifyApprove, Status.InvoiceApplyfor.passed);
	}

	private void computeInvoiceIssue(InvoiceIssue invoiceIssue) {
		BigDecimal relateAmount = BigDecimal.ZERO;
		BigDecimal hasIssueAmount = BigDecimal.ZERO;
		if (invoiceIssue.getRelateId() != null) {
			if (fundReceiveVoucherServices.containsKey(invoiceIssue.getRelateModule())) {
				FundReceiveVoucherService fundService = fundReceiveVoucherServices.get(invoiceIssue.getRelateModule());
				relateAmount = fundService.getRelateReceiveAmount(invoiceIssue.getRelateId());
			}
			hasIssueAmount = invoiceIssueDao.queryHasIssueAmount(invoiceIssue);
		}
		invoiceIssue.setRelateAmount(relateAmount);
		invoiceIssue.setHasIssueAmount(hasIssueAmount);
	}

	public InvoiceIssue queryInvoiceIssueBySerial(InvoiceIssue invoiceIssue) {
		List<InvoiceIssue> ds = invoiceIssueDao.getInvoiceIssueBySerial(invoiceIssue);
		if (ds.isEmpty()) {
			return null;
		}
		return ds.get(0);
	}

	@Override
	public void saveOrMergeForEdit(InvoiceIssue invoiceIssue) {
		if (invoiceIssue.getInvoiceIssueId() == null) {
			List<InvoiceIssue> ds = invoiceIssueDao.getInvoiceIssueBySerial(invoiceIssue);
			if (!ds.isEmpty()) {
				throw new BusinessException("票据单号[" + invoiceIssue.getInvoiceSerial() + "]已经存在!");
			}
			computeInvoiceIssue(invoiceIssue);
			invoiceIssueDao.save(invoiceIssue);
		} else {
			computeInvoiceIssue(invoiceIssue);
			invoiceIssueDao.merge(invoiceIssue);
		}
	}

	public void passApproveApplication(FormApprove formApprove) {
		InvoiceIssue t = invoiceIssueDao.get(formApprove.getRelateId());
		String applyforState = t.getApplyforState();
		super.passFlowApproveApplication(t);
		if (Status.InvoiceApplyfor.nullifyApprove.equals(applyforState)) {
			invoiceIssueDao.save(t);
			return;
		}
		computeInvoiceIssue(t);

//		if (t.getIssueAmount().compareTo(t.getRelateAmount().subtract(t.getHasIssueAmount())) == 1) { // 1:是大于
//			throw new BusinessException("开票金额大于关联业务回款计划总金额[" + t.getRelateAmount() + "]!无法通过系统验证!");
//		} else 
			
		if (t.getIssueAmount().compareTo(t.getRelateAmount()) == 0) { // 0:是等于，
			t.setIssueStatus(Status.InvoiceAmount.finished);
		} else { // -1:表示小于
			t.setIssueStatus(Status.InvoiceAmount.unfinished);
		}
		// 开票审批通过,信息通知
		List<Map<String,Object>> list = invoiceIssueDao.queryByScript("remaind.invoice_issue_approve", t.getInvoiceIssueId());
		for(Map<String,Object> map:list){
			BusinessMessage bm = new BusinessMessage();
			bm.setReceiveTel((String)map.get("REMAIND_TEL"));
			bm.setMessage((String)map.get("MESSAGE"));
			bm.setSenderName("开票消息");
			businessMessageService.sendOnce(bm);
		}
		invoiceIssueDao.save(t);
	}

}
