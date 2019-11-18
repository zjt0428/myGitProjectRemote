package com.knight.emms.model;


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
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;

@Data
@PersistantDeclare
@SerialNumberStrategy(name = "receiveSerial", strategy = "ZCLY{0}", maxseq = 999999)
public class ReceiveManage extends ApplyforState implements ExportModel{

	private static final long serialVersionUID = 1L;
	

	@Expose	
	private Long receiveId;

	@Expose	
	@CodeFieldDeclare(codeId = "PICKUP_STATUS", valueField = "statusName")
	private String status;

	@Expose	
	private String statusName;

	@Expose	
	private String receiveSerial;
	
	private Long userId;

	@Expose	
	private String userName;

	@Expose	
	private String receiveMan;

	@Expose	
	private String provideDate;

	@Expose	
	private String receiveTheme;

	@Expose	
	private String receiveDate;

	@Expose	
	private Long depotId;

	@Expose	
	private String depotName;

	@Expose	
	private String totalAmount;

	@Expose	
	private String receivePurpose;

	@Expose	
	private String remark;

	private String delFlag;

	public Long getApplyforId() {
		return this.receiveId;
	}
	
	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	public void setModelSerial(String serial) {
		this.receiveSerial = serial;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ReceiveManageDetail> receiveManageDetailSet = new HashSet<ReceiveManageDetail>();
	
	private String receiveManageDetails = "";
	
	
	public void setSubPickup() {
		Set<ReceiveManageDetail> receiveManageDetailSet = GsonUtil.fromJson(this.getReceiveManageDetails(), new TypeToken<Set<ReceiveManageDetail>>() {});
		if (receiveManageDetailSet != null) {
			for (ReceiveManageDetail p : receiveManageDetailSet) {
				p.setReceiveId(this.getReceiveId());
			}
		}
		this.setReceiveManageDetailSet(receiveManageDetailSet);
	}

}
