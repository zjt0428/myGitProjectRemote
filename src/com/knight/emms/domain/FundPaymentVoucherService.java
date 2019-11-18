/**
 *====================================================
 * 文件名称: FundInvoiceService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-21			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain;

import java.math.BigDecimal;

import com.knight.emms.model.AmountPayment;

/**
 * @ClassName: FundInvoiceService
 * @Description: 款项支出
 * @author chenxy
 * @date 2013-7-21 下午4:33:16
 */
public interface FundPaymentVoucherService {

	/**
	 * 付款业务金额
	 * @param relateId
	 * @return
	 */
	public BigDecimal getRelatePaymentAmount(Long relateId);

	/**
	 * 付款业务状态变更
	 * @param amountPayment
	 * @param relateId
	 * @param status
	 */
	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long relateId, String status);

}
