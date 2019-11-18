package com.knight.emms.model;

import java.util.Date;
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

@Data
@PersistantDeclare()
@SerialNumberStrategy(name = "lostSerial", strategy = "DS{yyyyMM}", maxseq = 999)
public class LostCompensation extends ApplyforState {

	private static final long serialVersionUID = 1L;
	
	@Expose	
	private Long lostId;
	
	/**状态*/
	@Expose
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "applyforStateName")
	private String applyforState;
	
	@Expose
	private String applyforStateName;
	
	/**丢失单号*/
	@Expose	
	private String lostSerial;
	
	@Expose	
	private Long userId;
	
	/**制单人*/
	@Expose	
	private String userName;
	
	/**制单日期*/
	@Expose	
	private String applyDate;
	
	/**关联周材合同*/
	@Expose	
	private ContractMaterials contractMaterials;
	
	/**合同编号*/
	@Expose	
	private String contractSerial;
	
	/**工程名称*/
	@Expose	
	private String projectName;

	/**项目地址*/
	@Expose	
	private String address;
	
	/**承租单位*/
	@Expose	
	private String paEntName;
	
	/**赔偿日期*/
	@Expose	
	private String compensationDate;
	
	/**赔偿总额*/
	@Expose	
	private String totalCompensation;
	
	/**主题*/
	@Expose	
	private String lostTheme;
	
	/**复核日期*/
	@Expose	
	private Date recheckDate;
	
	/**复核人*/
	@Expose	
	private String recheckMan;
	
	/**审核日期*/
	@Expose	
	private Date checkDate;
	
	/**审核人*/
	@Expose	
	private String checkMan;
	
	/**丢失说明*/
	@Expose	
	private String explain;
	
	/**合同流水号*/
	@Expose
	private String contractNumber;
	
	private String delFlag;
	
	public Long getApplyforId() {
		return this.lostId;
	}
	
	public void setModelSerial(String serial) {
		this.lostSerial = serial;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<LostCompensationDetail> lostCompensationDetailSet = new HashSet<LostCompensationDetail>();
	
	private String lostCompensationDetails = "";
	
	// ========================================================================//
	
	public void setSubLostCompensation() {
		Set<LostCompensationDetail> lostCompensationDetailSet = GsonUtil.fromJson(this.lostCompensationDetails, new TypeToken<Set<LostCompensationDetail>>() {});
		if (lostCompensationDetailSet != null) {
			for (LostCompensationDetail c : lostCompensationDetailSet) {
				c.setLostId(this.getLostId());
			}
			this.setLostCompensationDetailSet(lostCompensationDetailSet);
		}
	}
}
