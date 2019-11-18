/**
 *====================================================
 * 文件名称: Receivement.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;

/**
 * @ClassName: Receivement
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午11:07:09
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class Receivement extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long receivementId;

	@Expose
	private Long relateId;

	@Expose
	private String relateSerial;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	@Expose
	private Short periods;

	@Expose
	private BigDecimal receivement;

	@Expose
	private String receiveDate;

	@Expose
	private BigDecimal alreadyReceivement;

	@Expose
	private String issueInvoice;

	@Expose
	@CodeFieldDeclare(codeId = "invoiceType", valueField = "invoiceTypeName")
	private String invoiceType;

	@Expose
	private String invoiceTypeName;

	@Expose
	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	// =====================================================================================//
	@Expose
	private boolean invoiceFlag = false;

	public void setIssueInvoice(String issueInvoice) {
		this.issueInvoice = issueInvoice;
		if (Constant.ENABLED.equals(issueInvoice)) {
			this.invoiceFlag = true;
		}
	}

	public void setInvoiceFlag(boolean invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
		if (invoiceFlag) {
			this.issueInvoice = "1";
		} else {
			this.issueInvoice = "0";
		}
	}

}
