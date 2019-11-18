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

import com.knight.emms.model.AmountReceive;

/**
 * @ClassName: FundInvoiceService
 * @Description: 款项收入
 * @author chenxy
 * @date 2013-7-21 下午4:33:16
 */
public interface FundReceiveVoucherService {

	/**
	 * 收款业务金额
	 * @param relateId
	 * @return
	 */
	public BigDecimal getRelateReceiveAmount(Long relateId);

	/**
	 * 收款业务状态变更
	 * @param amountReceive
	 * @param relateId
	 * @param status
	 */
	public void saveRelateAmountReceiveStatus(AmountReceive amountReceive, Long relateId, String status);

}
