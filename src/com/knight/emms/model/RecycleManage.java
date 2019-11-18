package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.annotation.FieldComment;
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
@PersistantDeclare(isExportable = true, exportName = "周材回收信息汇总", sheetName = "周材回收信息")
@SerialNumberStrategy(name = "recycleSerial", strategy = "HS{yyyyMMdd}", maxseq = 999)
public class RecycleManage extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;
	
	@Expose	
	private Long recycleId;
	
	/**状态*/
	@Expose
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "applyforStateName")
	private String applyforState;
	
	@Expose
	private String applyforStateName;
	
	@Expose	
	private String recycleSerial;
	
    @Expose
	private BaseDepot baseDepot;
    
	@Expose	
	private Long userId;
	
	@Expose
	private String userName;
	
	@Expose
	private String applyDate;
	
	@Expose
	private ContractMaterials contractMaterials;
	
	@Expose
	@FieldComment(description = "租借合同ID", column = "leaseID")
	private Long leaseID;
	
	@Expose
	@FieldComment(description = "库位ID", column = "locationId")
	private Long locationId;
	
	@Expose
	private String recycleDate;
	
	/**回收类型*/	
	@Expose
	@CodeFieldDeclare(codeId = "recycleType", valueField = "recycleTypeName")
	private String recycleType;
	
	@Expose
	private String recycleTypeName;
	
	/**附属单号*/	
	@Expose
	private String affiliatedSerial;
	
	/**运输车辆号*/
	@Expose
	private String transportNumber;
	
	/**运输车辆人员*/
	@Expose
	private String transportMan;
	
	/**装卸费用*/
	@Expose
	private String handingCharge;
	
	/**包装费用*/
	@Expose
	private String packageCharge;
	
	/**损坏赔偿金额*/
	@Expose
	private String damage;
	
	/**收发人员*/
	@Expose
	private String receivePeople;
	
	/**收发审核人员*/	
	@Expose
	private String sendReceiveMan;
	
	/**收发审核时间*/	
	@Expose
	private String sendReceiveDate;
	
	/**单据审核人员*/	
	@Expose
	private String invoiceCheckMan;
	
	/**单据审核时间*/	
	@Expose
	private String invoiceCheckDate;
	
	@Expose
	private String remark;
	
//	/**合同流水号*/
//	@Expose
//	private String contractNumber;
	
	private String delFlag;
	
	public Long getApplyforId() {
		return this.recycleId;
	}
	
	public void setModelSerial(String serial) {
		this.recycleSerial = serial;
	}

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<RecycleManageDetail> recycleManageDetailSet = new HashSet<RecycleManageDetail>();
	
	private String recycleManageDetails = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<RecycleManageFee> recycleManageFeeSet = new HashSet<RecycleManageFee>();
	
	private String recycleManageFees = "";
	
	/**回收清单中的入库数量（库位分配）*/
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<MaterialsRecycleCountTemp> materialsRecycleCountTempSet = new HashSet<MaterialsRecycleCountTemp>();
	
	private String materialsRecycleCountTemps = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<CompensationDamage> compensationDamageSet = new HashSet<CompensationDamage>();
	
	private String compensationDamages = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TemporaryStorage> temporaryStorageSet = new HashSet<TemporaryStorage>();
	
	private String temporaryStorages = "";
	
	// ========================================================================//
	
	public void setSubRecycleManage() {
		Set<RecycleManageDetail> recycleManageDetailSet = GsonUtil.fromJson(this.recycleManageDetails, new TypeToken<Set<RecycleManageDetail>>() {});
		if (recycleManageDetailSet != null) {
			for (RecycleManageDetail c : recycleManageDetailSet) {
				c.setRecycleId(this.getRecycleId());
			}
			this.setRecycleManageDetailSet(recycleManageDetailSet);
		}
		Set<RecycleManageFee> recycleManageFeeSet = GsonUtil.fromJson(this.recycleManageFees, new TypeToken<Set<RecycleManageFee>>() {});
		if (recycleManageFeeSet != null) {
			for (RecycleManageFee c : recycleManageFeeSet) {
				c.setRecycleId(this.getRecycleId());
			}
			this.setRecycleManageFeeSet(recycleManageFeeSet);
		}
		Set<MaterialsRecycleCountTemp> materialsRecycleCountTempSet = GsonUtil.fromJson(this.materialsRecycleCountTemps, new TypeToken<Set<MaterialsRecycleCountTemp>>() {});
		if (materialsRecycleCountTempSet != null) {
			for (MaterialsRecycleCountTemp c : materialsRecycleCountTempSet) {
				c.setRecycleId(this.getRecycleId());
			}
			this.setMaterialsRecycleCountTempSet(materialsRecycleCountTempSet);
		}
		Set<CompensationDamage> compensationDamageSet = GsonUtil.fromJson(this.compensationDamages, new TypeToken<Set<CompensationDamage>>() {});
		if (compensationDamageSet != null) {
			for (CompensationDamage c : compensationDamageSet) {
				c.setRecycleId(this.getRecycleId());
			}
			this.setCompensationDamageSet(compensationDamageSet);
		}
		Set<TemporaryStorage> temporaryStorageSet = GsonUtil.fromJson(this.temporaryStorages, new TypeToken<Set<TemporaryStorage>>() {});
		if (temporaryStorageSet != null) {
			for (TemporaryStorage c : temporaryStorageSet) {
				c.setRecycleId(this.getRecycleId());
			}
			this.setTemporaryStorageSet(temporaryStorageSet);
		}
	}
}
