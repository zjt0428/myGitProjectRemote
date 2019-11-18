/**
 *====================================================
 * 文件名称: InvoiceCollect.java
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
 * @ClassName: InvoiceCollect
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午2:41:25
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InvoiceCollect extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long invoiceCollectId;

	@Expose
	private String invoiceSerial;

	private String invoiceTheme;

	@Expose
	private String invoiceItem;

	@Expose
	private String collectDate;

	@Expose
	private BigDecimal collectAmount;

	@CodeFieldDeclare(codeId = "invoiceType", valueField = "invoiceTypeName")
	private String invoiceType;

	@Expose
	private String invoiceTypeName;

	@Expose
	private String issueEnterprise;

	private String description;

	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateTheme;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	private BigDecimal relateAmount;

	private BigDecimal hasCollectAmount;

	@CodeFieldDeclare(codeId = "INVOICE_STATUS", valueField = "collectStatusName")
	private String collectStatus;

	@Expose
	private String collectStatusName;

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

	public Long getApplyforId() {
		return this.invoiceCollectId;
	}

	public void setModelSerial(String serial) {
	}

}
