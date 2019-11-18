package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "returnSerial", strategy = "ZC{yyyyMMdd}", maxseq = 999)
public class TemporaryReturn extends ApplyforState {

	protected static final long serialVersionUID = 1L;

	@Expose
	private Long returnId;
	
	/**制单人员*/
	@Expose
	private Long userId;
	
	/**制单人员*/
	@Expose
	private String userName;

	/**退货单号 */
	@Expose
	private String returnSerial;
	
	/***/
	@Expose
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	/**车牌号*/
	@Expose
	private String licensePlate;
	
	/**运输人员*/
	@Expose
	private String driver;
	
	/***/
	@Expose
	private Long depotId;
	
	/**退货仓库*/
	@Expose
	private String depotName;
	
	/**周材合同*/
	@Expose
	private ContractMaterials contractMaterials;
	
	/***/
	@Expose
	private Long projectId;
	
	/**项目名称*/
	@Expose
	private String projectName;
	
	/**制单日期*/
	@Expose
	private String applyDate;
	
	/**装车日期*/
	@Expose
	private String packageDate;
	
	/**收发人员*/
	@Expose
	private String deliveryMan;
	
	/**附属单据号*/
	@Expose
	private String affiliatedSerial;
	
	@Expose
	private String delFlag;
	
	/**审核时间*/
	@Expose
	private String acceptTime;
	
	/**审批时间*/
	@Expose
	private String approveTime;
	
	@Override
	public Long getApplyforId() {
		return returnId;
	}
	@Override
	public void setModelSerial(String serial) {
		this.returnSerial = serial;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TemporaryReturnDetail> temporaryReturnDetailSet = new HashSet<TemporaryReturnDetail>(0);
	
	private String temporaryReturnDetails;
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ChargeHandle> chargeHandleSet = new HashSet<ChargeHandle>(0);
	
	private String chargeHandles;

	public void setSubTemporaryReturn() {
		Set<TemporaryReturnDetail> temporaryReturnDetailSet = GsonUtil.fromJson(this.temporaryReturnDetails, new TypeToken<Set<TemporaryReturnDetail>>() {});
		if(temporaryReturnDetailSet != null) {
			for(TemporaryReturnDetail trd : temporaryReturnDetailSet ) {
				trd.setReturnId(this.getReturnId());
			}
			this.setTemporaryReturnDetailSet(temporaryReturnDetailSet);
		}
		Set<ChargeHandle> chargeHandleSet = GsonUtil.fromJson(this.chargeHandles, new TypeToken<Set<ChargeHandle>>() {});
		if(chargeHandleSet != null) {
			for(ChargeHandle ch : chargeHandleSet ) {
				ch.setReturnId(this.getReturnId());
			}
			this.setChargeHandleSet(chargeHandleSet);
		}
	}
}
