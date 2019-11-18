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
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "omsSerial", strategy = "CR{yyyyMMdd}", maxseq = 99)
public class OtherMaterialStock extends ApplyforState implements ExportModel{

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long otherMaterialStockId;
	
//	单据编号
	@Expose
	private String omsSerial;
	
//	制单人
	@Expose
	private Long userId;
	@Expose
	private String userName;
	
//	处理日期
	@Expose
	private String handleDate;
	
//	仓库id
	@Expose
	private Long storeId;
	
//	仓库名称
	@Expose
	private String storeName;
	
//	库位id
	@Expose
	private Long locationId;
	
//	库位
	@Expose
	private String storageLocation;
	
//	处理类型
	@Expose
	@CodeFieldDeclare(codeId = "HANDLE_TYPE", valueField = "handleTypeName")
	private String handleType;
	
	@Expose
	private String handleTypeName;
//	备注
	@Expose
	private String remark;
	
	@Expose
	private String delFlag;
	
	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	@Override
	public void setModelSerial(String serial) {
		this.omsSerial = serial;
	}

	@Override
	public Long getApplyforId() {
		return this.otherMaterialStockId;
	}

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ApplicationDetail> applicationDetailSet = new HashSet<ApplicationDetail>();
	
	private String applicationDetails = "";
	
	public void setSubOtherMaterialStock() {
		Set<ApplicationDetail> applicationDetailSet = GsonUtil.fromJson(this.applicationDetails, new TypeToken<Set<ApplicationDetail>>() {});
		if (applicationDetailSet != null) {
			for(ApplicationDetail ad : applicationDetailSet){
				ad.setOtherMaterialStockId(this.getOtherMaterialStockId());
			}
			this.setApplicationDetailSet(applicationDetailSet);
		}
	}
}
