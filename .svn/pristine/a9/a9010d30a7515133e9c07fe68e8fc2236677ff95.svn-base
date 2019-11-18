package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Id;

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
@SerialNumberStrategy(name = "businessSerial", strategy = "QT", maxseq = 999)
public class OtherLeaseBusiness extends ApplyforState {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long otherId;
	
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
	private String businessSerial;
	
	/**收费时间*/
	@Expose
	private String chargeableTime;
	
	@Expose
	private LeaseContract leaseContract;
	
	@Expose
	private String projectName;
	
	/**费用合计*/
	@Expose
	private String totalCosts;
	
	/**附属单号*/
	@Expose
	private String affiliatedSerial;
	
	/**备注*/
	@Expose
	private String remark;
	
	private String delFlag;
	
	@Expose
	private BaseDepot baseDepot;
	
	public Long getApplyforId() {
		return this.otherId;
	}
	
	public void setModelSerial(String serial) {
		this.businessSerial = serial;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<OtherLeaseDetail> otherLeaseDetailSet = new HashSet<OtherLeaseDetail>();
	
	private String otherLeaseDetails = "";
	
	public void setSubOtherBusiness(){
		Set<OtherLeaseDetail> otherLeaseDetailSet = GsonUtil.fromJson(this.otherLeaseDetails, new TypeToken<Set<OtherLeaseDetail>>() {});
		if (otherLeaseDetailSet != null) {
			for (OtherLeaseDetail c : otherLeaseDetailSet) {
				c.setOtherId(this.getOtherId());
			}
			this.setOtherLeaseDetailSet(otherLeaseDetailSet);
		}
	}
}
