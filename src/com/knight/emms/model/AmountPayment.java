/**
 *====================================================
 * 文件名称: AmountPayment.java
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
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: AmountPayment
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午2:48:15
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "付款信息汇总", sheetName = "付款信息")
@SerialNumberStrategy(name = "amountSerial", strategy = "FKDJ-{yyyyMMdd}-", maxseq = 999)
public class AmountPayment extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long amountPaymentId;

	@Expose
	private String amountSerial;

	@Expose
	private String amountTheme;

	private Long paymentEntId;

	private String paymentModule;

	@Expose
	private String paymentEntName;

	private Long paymentEntAccountId;

	private String paymentBank;

	private String paymentAccount;

	@Expose
	private BigDecimal paymentAmount;

	private Long receiveId;

	private String receiveModule;

	@Expose
	private String receiveName;

	private Long receiveAccountId;

	private String receiveBank;

	private String receiveAccount;

	@CodeFieldDeclare(codeId = "paymentType", valueField = "paymentTypeName")
	private String paymentType;

	private String paymentTypeName;

	@Expose
	private String paymentDate;

	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	private Long relateId;

	@Expose
	private String relateSerial;

	@Expose
	private String recordId;

	@Expose
	private String relateTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	@Expose
	private BigDecimal relateAmount;

	@Expose
	private BigDecimal hasPaymentAmount;

	@Expose
	private BigDecimal payableDebit;

	@CodeFieldDeclare(codeId = "reimburseType", valueField = "feesTypeName")
	private String feesType;

	private String feesTypeName;

	private String paymentContent;

	private String remark;

	@CodeFieldDeclare(codeId = "FUND_STATUS", valueField = "paymentStatusName")
	private String paymentStatus;

	@Expose
	private String paymentStatusName;

	private Long projectId;

	private String projectSerial;
	
	@Expose
	private String projectName;

	private String address;

	private Long userId;

	private String userName;

	private Long depId;

	@Expose
	private String providedDate;
	
	@Expose
	private String deliveryDate;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	private Department department;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AmountPaymentShare> amountPaymentShareSet = new HashSet<AmountPaymentShare>();

	private String amountPaymentShares = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AmountEquipShare> amountEquipShareSet = new HashSet<AmountEquipShare>();

	private String amountEquipShares = "";

	public Long getApplyforId() {
		return this.amountPaymentId;
	}

	public String getModelSerial() {
		return this.amountSerial;
	}

	public void setModelSerial(String serial) {
		this.amountSerial = serial;
	}

	// ==========================================================================================//
	public void setSubAmountPayment() {
		Set<AmountPaymentShare> amountPaymentShareSet = GsonUtil.fromJson(this.getAmountPaymentShares(), new TypeToken<Set<AmountPaymentShare>>() {});
		if (amountPaymentShareSet != null) {
			for (AmountPaymentShare p : amountPaymentShareSet) {
				p.setAmountPaymentId(this.getAmountPaymentId());
			}
		}
		this.setAmountPaymentShareSet(amountPaymentShareSet);

		Set<AmountEquipShare> amountEquipShareSet = GsonUtil.fromJson(this.getAmountEquipShares(), new TypeToken<Set<AmountEquipShare>>() {});
		if (amountEquipShareSet != null) {
			for (AmountEquipShare p : amountEquipShareSet) {
				p.setRelateId(this.getAmountPaymentId());
				p.setRelateModule(SystemConstant.MODULE_AMOUNT_PAYMENT);
				p.setRelateSerial(this.getAmountSerial());
				p.setAmountDate(this.getPaymentDate());
			}
		}
		this.setAmountEquipShareSet(amountEquipShareSet);
	}

}
