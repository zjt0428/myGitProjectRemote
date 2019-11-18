/**
 *====================================================
 * 文件名称: InvoiceIssue.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.ApplyforState;
import com.knight.system.model.Department;

/**
 * @ClassName: InvoiceIssue
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午2:24:15
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InvoiceIssue extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long invoiceIssueId;

	@Expose
	private String invoiceSerial;

	private String invoiceTheme;

	@Expose
	private String invoiceItem;

	@Expose
	private String issueDate;

	@Expose
	private BigDecimal issueAmount;

	@CodeFieldDeclare(codeId = "invoiceType", valueField = "invoiceTypeName")
	private String invoiceType;

	private String invoiceTypeName;

	private Long handleEntId;

	@Expose
	private String handleEntName;

	private Long issuePractiId;

	@Expose
	private String issuePractiName;

	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateTheme;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	private BigDecimal relateAmount;

	private BigDecimal hasIssueAmount;

	@Expose
	private String taxRate;

	@Expose
	private BigDecimal taxAmount;

	private String description;

	@CodeFieldDeclare(codeId = "INVOICE_STATUS", valueField = "issueStatusName")
	private String issueStatus;

	@Expose
	private String issueStatusName;

	private String remark;

	private Long userId;

	private String userName;

	private Long depId;

	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	private Department department;
	
	@CodeFieldDeclare(codeId = "invoiceContent", valueField = "invoiceContent")
	private String invoiceContent;

	private String invoiceContentName;
	
	@CodeFieldDeclare(codeId = "invoiceStatus", valueField = "invoiceStatus")
	private String invoiceStatus;

	private String invoiceStatusName;

	public Long getApplyforId() {
		return this.invoiceIssueId;
	}

	public void setModelSerial(String serial) {
	}
}
