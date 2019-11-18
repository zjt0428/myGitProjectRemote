/**
 *====================================================
 * 文件名称: Reimburse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: Reimburse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午3:14:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "报销信息汇总", sheetName = "报销信息")
@SerialNumberStrategy(name = "reimburseSerial", strategy = "BX{yyyyMMdd}", maxseq = 99)
public class Reimburse extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long reimburseId;

	@Expose
	private String reimburseSerial;

	@Expose
	private String reimburseTheme;

	private Long paymentEntId;

	private String paymentModule;

	private String paymentEntName;

	private Long paymentEntAccountId;

	private String paymentBank;

	private String paymentAccount;

	private String receiveBank;

	private String receiveAccount;

	private Long practiId;

	@Expose
	private String practiName;

	private String practiTel;

	@Expose
	private String reimburseMonth;

	private String reimburseDate;

	private Short ticketCount;

	@Expose
	private BigDecimal reimburseAmount;

	@Expose
	private BigDecimal askforAmount;

	private String description;

	private BigDecimal arrearsAmount;

	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	private Long equipId;

	private String recordSerial;

	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;

	private String equipCategoryName;

	@CodeFieldDeclare(codeId = "equipGeneric", valueField = "equipGenericName")
	private String equipGeneric;

	private String equipGenericName;

	@CodeFieldDeclare(codeId = "equipSpecific", valueField = "equipSpecificName")
	private String equipSpecific;

	private String equipSpecificName;

	private String recordId;

	private Long customerId;

	private String customerName;

	private String customerTel;

	private Long projectId;

	private String projectSerial;

	private String projectName;

	private String address;

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

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ReimburseTicket> reimburseTicketSet = new HashSet<ReimburseTicket>(0);

	private String reimburseTickets = "";

	public Long getApplyforId() {
		return this.reimburseId;
	}

	public void setModelSerial(String serial) {
		this.reimburseSerial = serial;
	}

	// ==========================================================================//
	public void setSubReimburse() {
		Set<ReimburseTicket> reimbursePractiSet = GsonUtil.fromJson(this.getReimburseTickets(), new TypeToken<Set<ReimburseTicket>>() {});
		for (ReimburseTicket p : reimbursePractiSet) {
			p.setReimburseId(this.getReimburseId());
		}
		this.setReimburseTicketSet(reimbursePractiSet);
	}

}
