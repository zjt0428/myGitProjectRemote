/**
 *====================================================
 * 文件名称: AmountReceive.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.ReceivementMethod;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: AmountReceive
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午2:32:07
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "收款信息汇总", sheetName = "收款信息")
@SerialNumberStrategy(name = "amountSerial", strategy = "SKDJ-{yyyyMMdd}-", maxseq = 999)
public class AmountReceive extends ApplyforState implements ExportModel{

	private static final long serialVersionUID = 1L;

	@Expose
	private Long amountReceiveId;

	@Expose
	private String amountSerial;

	@Expose
	private String amountTheme;

	
	private String voucher;

	private Long receiveEntId;

	private String receiveModule;

	@Expose
	private String receiveEntName;

	private Long receiveEntAccountId;

	private String receiveBank;

	private String receiveAccount;

	@Expose
	private BigDecimal receiveAmount;

	private Long paymentId;

	private String paymentModule;
	
	@Expose
	private String contractSerial;
	
	@Expose
	private String contractNo;


	@Expose
	private String paymentName;

	private Long paymentAccountId;

	private String paymentBank;

	private String paymentAccount;

	@CodeFieldDeclare(codeId = "paymentType", valueField = "paymentTypeName")
	private String paymentType;

	private String paymentTypeName;

	@Expose
	private String receiveDate;

	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	private BigDecimal relateAmount;

	private BigDecimal hasReceiveAmount;

	private String remark;

	@CodeFieldDeclare(codeId = "FUND_STATUS", valueField = "receiveStatusName")
	private String receiveStatus;

	@Expose
	private String receiveStatusName;

	private BigDecimal receivableDebit;

	private Long projectId;

	private String projectSerial;

	@Expose
	private String projectName;

	private String address;

	private Long userId;

	@Expose
	private String userName;

	private Long depId;
	
	private Long contractId;
	
	@CodeFieldDeclare(codeId = "reimburseType", valueField = "reimburseTypeName")
	private String reimburseType;

	private String reimburseTypeName;

	@Expose
	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;
	
	private Date approveTime;

	private Department department;
	
	/**合同所属部门ID*/
	private Long competentDepartmentId;
	
	@Expose
	private ContractLease contractLease;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AmountReceiveShare> amountReceiveShareSet = new HashSet<AmountReceiveShare>();

	private String amountReceiveShares = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AmountEquipShare> amountEquipShareSet = new HashSet<AmountEquipShare>();

	private String amountEquipShares = "";

	public Long getApplyforId() {
		return this.amountReceiveId;
	}

	public String getModelSerial() {
		return this.amountSerial;
	}

	public void setModelSerial(String serial) {
		this.amountSerial = serial;
	}

	// ==================================================================================//
	public void setSubAmountReceive() {
		Set<AmountReceiveShare> amountReceiveShareSet = GsonUtil.fromJson(this.getAmountReceiveShares(), new TypeToken<Set<AmountReceiveShare>>() {});
		if (amountReceiveShareSet != null) {
			for (AmountReceiveShare p : amountReceiveShareSet) {
				p.setAmountReceiveId(this.getAmountReceiveId());
			}
		}
		this.setAmountReceiveShareSet(amountReceiveShareSet);

		Set<AmountEquipShare> amountEquipShareSet = GsonUtil.fromJson(this.getAmountEquipShares(), new TypeToken<Set<AmountEquipShare>>() {});
		if (amountEquipShareSet != null) {
			for (AmountEquipShare p : amountEquipShareSet) {
				p.setRelateId(this.getAmountReceiveId());
				p.setRelateModule(SystemConstant.MODULE_AMOUNT_RECEIVE);
				p.setRelateSerial(this.getAmountSerial());
				p.setAmountDate(this.getReceiveDate());
			}
		}
		this.setAmountEquipShareSet(amountEquipShareSet);
	}

}
