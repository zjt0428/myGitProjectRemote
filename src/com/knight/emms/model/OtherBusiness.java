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

@Data
@PersistantDeclare()
@SerialNumberStrategy(name = "otherBusinessSerial", strategy = "BT", maxseq = 99)
public class OtherBusiness extends ApplyforState {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long otherBusinessId;
	
	/**制单日期*/
	private String applyDate;
	
	/**状态*/
	@Expose
	@CodeFieldDeclare(codeId = "OTHER_BUSINESS_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;
	
	@Expose
	private String applyforStateName;
	
	@Expose
	private Long userId;
	
	/**制单人*/
	@Expose
	private String userName;
	
	/**其他业务单号*/
	@Expose
	private String otherBusinessSerial;
	
	/**收费时间*/
	@Expose
	private String chargeableTime;
	
	@Expose
	private Long contractId;
	
	/**合同编号*/
	@Expose
	private String contractSerial;
	
	@Expose
	private String projectName;
	
	/**承租单位*/
	@Expose
	private String paEntName;
	
	/**费用合计*/
	@Expose
	private String totalCosts;
	
//	@Expose
//	private Long baseDepotId;
//	
//	/**基地仓库名称*/
//	@Expose
//	private String baseDepotName;
	
	/**附属单号*/
	@Expose
	private String affiliatedSerial;
	
	/**合同流水号*/
	@Expose
	private String contractNumber;
	
	/**备注*/
	@Expose
	private String remark;
	
	private String delFlag;
	
	@Expose
	private BaseDepot baseDepot;
	
	public Long getApplyforId() {
		return this.otherBusinessId;
	}
	
	public void setModelSerial(String serial) {
		this.otherBusinessSerial = serial;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<OtherBusinessDetail> otherBusinessDetailSet = new HashSet<OtherBusinessDetail>();
	
	private String otherBusinessDetails = "";
	
	public void setSubOtherBusiness(){
		Set<OtherBusinessDetail> otherBusinessDetailSet = GsonUtil.fromJson(this.otherBusinessDetails, new TypeToken<Set<OtherBusinessDetail>>() {});
		if (otherBusinessDetailSet != null) {
			for (OtherBusinessDetail c : otherBusinessDetailSet) {
				c.setOtherBusinessId(this.getOtherBusinessId());
			}
			this.setOtherBusinessDetailSet(otherBusinessDetailSet);
		}
	}
}
