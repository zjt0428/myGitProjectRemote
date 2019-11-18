/**
 *====================================================
 * 文件名称: InvoiceCollectServiceImpl.java
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

import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.InvoiceCollectDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.InvoiceCollect;
import com.knight.emms.service.InstalmentService;
import com.knight.emms.service.InvoiceCollectService;

/**
 * @ClassName: InvoiceCollectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:28:15
 */
public class InvoiceCollectServiceImpl extends BusinessFlowServiceImpl<InvoiceCollect> implements InvoiceCollectService {

	private InvoiceCollectDao invoiceCollectDao;

	@Resource
	private InstalmentService instalmentService;

	@Setter
	private Map<String, FundPaymentVoucherService> fundPaymentVoucherServices = new HashMap<String, FundPaymentVoucherService>();

	public InvoiceCollectServiceImpl(InvoiceCollectDao dao) {
		super(dao);
		this.invoiceCollectDao = dao;
	}

	private void computeInvoiceCollect(InvoiceCollect invoiceCollect) {
		BigDecimal relateAmount = BigDecimal.ZERO;
		BigDecimal hasCollectAmount = BigDecimal.ZERO;
		if (invoiceCollect.getRelateId() != null) {
			if (fundPaymentVoucherServices.containsKey(invoiceCollect.getRelateModule())) {
				FundPaymentVoucherService fundService = fundPaymentVoucherServices.get(invoiceCollect.getRelateModule());
				relateAmount = fundService.getRelatePaymentAmount(invoiceCollect.getRelateId());
			}
			hasCollectAmount = invoiceCollectDao.queryHasCollectAmount(invoiceCollect);
		}
		invoiceCollect.setRelateAmount(relateAmount);
		invoiceCollect.setHasCollectAmount(hasCollectAmount);
	}

	public InvoiceCollect queryInvoiceCollectBySerial(InvoiceCollect invoiceCollect) {
		List<InvoiceCollect> ds = invoiceCollectDao.getInvoiceCollectBySerial(invoiceCollect);
		if (ds.isEmpty()) {
			return null;
		}
		return ds.get(0);
	}

	public void saveOrMergeForEdit(InvoiceCollect invoiceCollect) {
		if (invoiceCollect.getInvoiceCollectId() == null) {
			List<InvoiceCollect> ds = invoiceCollectDao.getInvoiceCollectBySerial(invoiceCollect);
			if (!ds.isEmpty()) {
				throw new BusinessException("票据单号[" + invoiceCollect.getInvoiceSerial() + "]已经存在!");
			}
			computeInvoiceCollect(invoiceCollect);
			invoiceCollectDao.save(invoiceCollect);
		} else {
			computeInvoiceCollect(invoiceCollect);
			invoiceCollectDao.merge(invoiceCollect);
		}
	}

	public void passApproveApplication(FormApprove formApprove) {
		InvoiceCollect t = super.passFlowApproveApplication(formApprove);
		computeInvoiceCollect(t);
		if (t.getCollectAmount().compareTo(t.getRelateAmount().subtract(t.getHasCollectAmount())) == -1) { // -1:表示小于
			t.setCollectStatus(Status.InvoiceAmount.unfinished);
		} else { // 0:是等于,1:是大于
			t.setCollectStatus(Status.InvoiceAmount.finished);
		}
		invoiceCollectDao.save(t);
	}

}
