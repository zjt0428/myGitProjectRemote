/**
 *====================================================
 * 文件名称: OverduePayment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月2日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: OverduePayment
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月2日 下午11:33:54
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@SerialNumberStrategy(name = "overduePaymentSerial", strategy = "CK{yyyyMMdd}", maxseq = 999)
public class OverduePayment extends BusinessModel {

	protected static final long serialVersionUID = 1L;

	@Expose
	private Long overduePaymentId;

	@Expose
	private String overduePaymentSerial;

	@Expose
	private Long customerId;

	@Expose
	private String customerName;

	@Expose
	private Long corpId;

	@Expose
	private String corpName;

	private String contents;

	public void setModelSerial(String serial) {
		this.overduePaymentSerial = serial;
	}
}
