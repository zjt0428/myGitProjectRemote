/**
 *====================================================
 * 文件名称: SettleContract.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.ReceivementMethod;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: SettleContract
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午3:57:28
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "结算信息汇总", sheetName = "结算信息")
@SerialNumberStrategy(name = "settleSerial", strategy = "JS{yyyyMMdd}", maxseq = 999)
public class SettleContract extends BusinessModel implements ReceivementMethod, InstalmentMethod, ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long settleId;

	@Expose
	private String settleSerial;

	@Expose
	private String settleTheme;
	
	//10-18新增结算日期
	@Expose
	private String settleDate;

	@Expose
	private Long contractId;

	@Expose
	private String contractSerial;

	private String contractTheme;

	private Long paEnt;

	private String paModule;

	@Expose
	private String paEntName;

	private Long pbEnt;

	private String pbModule;

	private String pbEntName;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@Expose
	private String address;

	@Expose
	private String startSettleDate;

	@Expose
	private String endSettleDate;

	@Expose
	private BigDecimal settleAmount;

	@Expose
	private BigDecimal finishedAmount;

	@Expose
	private BigDecimal balanceAmount;

	@Expose
	private String collectionRatio;

	@Expose
	private BigDecimal taxAmount;

	@Expose
	private String taxRate;

	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	@Expose
	@CodeFieldDeclare(codeId = "FUND_TYPE", valueField = "fundTypeName")
	private String fundType;

	@Expose
	private String fundTypeName;
	
	@Expose
	@CodeFieldDeclare(codeId = "FUND_CATEGORY", valueField = "fundCategoryName")
	private String fundCategory;

	@Expose
	private String fundCategoryName;

	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;

	private String remark;

	@Expose
	private String sitesPrincipal;

	private Long userId;

	@Expose
	private String userName;

	private Long depId;

	@Expose
	private String settleType;//结算类型
	
	@Expose
	private String providedDate;

	private String delFlag;
	
	@Expose
	private String currentTotalAmount;
	
	@Expose
	private String currentNoTaxAmount;

	private Department department;
	
	@Expose
	private BigDecimal accumulatedAmount;
	
	@Expose
	private String contractNo;
	
	@Expose
	private String materialPractiName;
	
	/**累计已收金额（新增时就固定 ）*/
	@Expose
	private BigDecimal receivedAmount;
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<Instalment> instalmentSet = new HashSet<Instalment>(0);

	private String instalments = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<Receivement> receivementSet = new HashSet<Receivement>(0);

	private String receivements = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SettleEquipBrief> settleEquipBriefSet = new HashSet<SettleEquipBrief>(0);

	private String settleEquipBriefs = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SettleComponBrief> settleComponBriefSet = new HashSet<SettleComponBrief>(0);

	private String settleComponBriefs = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SettleItemBrief> settleItemBriefSet = new HashSet<SettleItemBrief>(0);

	private String settleItemBriefs = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AmountReceive> amountReceiveGridSet = new HashSet<AmountReceive>(0);
	
	private String amountReceives = "";
	

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<OperatorSalaryStatement> operatorSalaryStatementSet = new HashSet<OperatorSalaryStatement>(0);

	private String operatorSalaryStatements = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SafetyMonitorSettleStatement> safetyMonitorSettleStatementSet = new HashSet<SafetyMonitorSettleStatement>(0);

	private String safetyMonitorSettleStatements = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<OtherExpenseStatement> otherExpenseStatementSet = new HashSet<OtherExpenseStatement>(0);

	private String otherExpenseStatements = "";
	// ===============================================================================//
	@Expose
	private BigDecimal arrearsAmount;
	
	/**累计应收*/
	@Expose
	private BigDecimal summaryReceivable;
	
	/**累计已收（实时）*/
	@Expose
	private BigDecimal summaryReceived;
	
	/**尚欠款*/
	@Expose
	private BigDecimal arrears;
	
	/**关账状态*/
	@Expose
	private String closedStatus = "0";
	
	/**合同所属部门ID*/
	private Long competentDepartmentId;
	
	public void setSubSettleContract() {
		Set<SettleEquipBrief> settleEquipBriefSet = GsonUtil.fromJson(this.getSettleEquipBriefs(), new TypeToken<Set<SettleEquipBrief>>() {});
		if (settleEquipBriefSet != null) {
			for (SettleEquipBrief p : settleEquipBriefSet) {
				p.setSettleId(this.getSettleId());
				if(p.getMonthTag() == "false"){
					p.setMonthTag(null);
				}
			}
		}
		this.setSettleEquipBriefSet(settleEquipBriefSet);

		Set<SettleComponBrief> settleComponBriefSet = GsonUtil.fromJson(this.getSettleComponBriefs(), new TypeToken<Set<SettleComponBrief>>() {});
		if (settleComponBriefSet != null) {
			for (SettleComponBrief p : settleComponBriefSet) {
				p.setSettleId(this.getSettleId());
			}
		}
		this.setSettleComponBriefSet(settleComponBriefSet);

		Set<SettleItemBrief> settleItemBriefSet = GsonUtil.fromJson(this.getSettleItemBriefs(), new TypeToken<Set<SettleItemBrief>>() {});
		if (settleItemBriefSet != null) {
			for (SettleItemBrief p : settleItemBriefSet) {
				p.setSettleId(this.getSettleId());
			}
		}
		this.setSettleItemBriefSet(settleItemBriefSet);
		
		Set<OperatorSalaryStatement> operatorSalaryStatementSet = GsonUtil.fromJson(this.getOperatorSalaryStatements(), new TypeToken<Set<OperatorSalaryStatement>>() {});
		if (operatorSalaryStatementSet != null) {
			for (OperatorSalaryStatement p : operatorSalaryStatementSet) {
				p.setSettleId(this.getSettleId());
			}
		}
		this.setOperatorSalaryStatementSet(operatorSalaryStatementSet);
		
		Set<SafetyMonitorSettleStatement> safetyMonitorSettleStatementSet = GsonUtil.fromJson(this.getSafetyMonitorSettleStatements(), new TypeToken<Set<SafetyMonitorSettleStatement>>() {});
		if (safetyMonitorSettleStatementSet != null) {
			for (SafetyMonitorSettleStatement p : safetyMonitorSettleStatementSet) {
				p.setSettleId(this.getSettleId());
			}
		}
		this.setSafetyMonitorSettleStatementSet(safetyMonitorSettleStatementSet);
		
		Set<OtherExpenseStatement> otherExpenseStatementSet = GsonUtil.fromJson(this.getOtherExpenseStatements(), new TypeToken<Set<OtherExpenseStatement>>() {});
		if (otherExpenseStatementSet != null) {
			for (OtherExpenseStatement p : otherExpenseStatementSet) {
				p.setSettleId(this.getSettleId());
			}
		}
		this.setOtherExpenseStatementSet(otherExpenseStatementSet);
		
		
	}

	public void setModelSerial(String serial) {
		this.settleSerial = serial;
	}

	public Long getInstalmentRelationId() {
		return this.settleId;
	}

	public String getInstalmentRelationSerial() {
		return this.settleSerial;
	}

	public String getInstalmentRelationModule() {
		return SystemConstant.MODULE_SETTLE_CONTRACT;
	}

	public Long getReceivementRelationId() {
		return this.settleId;
	}

	public String getReceivementRelationSerial() {
		return this.settleSerial;
	}

	public String getReceivementRelationModule() {
		return SystemConstant.MODULE_SETTLE_CONTRACT;
	}

}
