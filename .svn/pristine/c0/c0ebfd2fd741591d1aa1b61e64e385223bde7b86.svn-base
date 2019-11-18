package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;
import com.knight.emms.model.SettleContract;
import com.knight.emms.model.Equipment;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: LaborSettle
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:00:19
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "劳务结算汇总", sheetName = "劳务结算")
@SerialNumberStrategy(name = "laborSettSerial", strategy = "LWJS{yyyyMMdd}", maxseq = 999999)
public class LaborSettle extends ApplyforState implements ExportModel{
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long laborSettId;
	
	/**结算编号*/
	@Expose
	private String laborSettSerial;
	
	/**项目名称*/
	@Expose
	private String projectName;
	
	/**结算Id*/
	@Expose
	private Long settleId;
	
	@Expose
	private SettleContract settleContract;
	@Expose
	private Long depId;
	
	/**审批状态*/
	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;
	@Expose
	private String applyforStateName;
	
	/**支付状态*/
	@Expose
	@CodeFieldDeclare(codeId = "PAY_STATE", valueField = "payStateName")
	private String payState;
	@Expose
	private String payStateName;
	
	@Expose
	private String userName;
	
	@Expose
	private Long userId;
	
	private Department department;
	
	/**合同编号*/
	@Expose
	private String contractNo;
	
	/**承租方*/
	private Long paEnt;
	private String paModule;
	@Expose
	private String paEntName;
	
	/**出租方*/
	private Long pbEnt;
	private String pbModule;
	@Expose
	private String pbEntName;
	
	/**结算开始时间*/
	@Expose
	private String startSettleDate;
	
	/**截止时间*/
	@Expose
	private String endSettleDate;
	
	/**工地项目经理*/
	@Expose
	private String leaseProjectHead;
	
	/**结算金额*/
	@Expose
	private BigDecimal costTotal;
	
	/**结余*/
	@Expose
	private BigDecimal afterTaxAmount;
	
	/**创建时间*/
	@Expose
	private String createDate;
	
	/**劳务费*/
	@Expose
	private BigDecimal laborFree;	
	
	/**扣款*/
	@Expose
	private BigDecimal deductions;	
	
	/**人员类型*/
	@Expose
	@CodeFieldDeclare(codeId = "PRACTI_TYPE", valueField = "practiTypeName")
	private String practiType;
	@Expose
	private String practiTypeName;
	
	/**结算标识*/
	@Expose
	private String settleLogo;
	
	/**已付金额*/
	@Expose
	private BigDecimal paidAmount;	
	
	/**人员工资结算单ID*/
	@Expose
	private Long statementId;
	
	@Expose
	private String delFlag;
	
	@Expose
	private Long equipId;
	
	@Expose
	private Equipment equipment;
	
	/**税点*/
	@Expose
	private BigDecimal taxPoint;	
	
	/**风险金*/
	@Expose
	private BigDecimal riskFee;
	
	/**设备保费*/
	@Expose
	private BigDecimal equipFee;
	
	/**管理费*/
	@Expose
	private BigDecimal managerFee;
	
	/**人员保费*/
	@Expose
	private BigDecimal practiFee;
	

	public Long getApplyforId() {
		return this.laborSettId;
	}

	public void setModelSerial(String serial) {
		this.laborSettSerial = serial;
	}


}
