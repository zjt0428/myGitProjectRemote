
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: AllocationProject
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "allocationSerial", strategy = "XM{yyyyMMdd}", maxseq = 999)
public class AllocationProject extends ApplyforState  {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long allocationId;

	/*状态*/
	@Expose
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "applyforStateName")
	private String applyforState;
	
	@Expose
	private String applyforStateName;

	/*调拨编号*/
	@Expose
	private String allocationSerial;

	/*制单人*/
	@Expose
	private Long userId;

	@Expose
	private String userName;

	/*制单时间*/
	@Expose
	private String makeDate;

	/*资产属性*/
	@Expose
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;

	@Expose
	private String assetsPropertyName;
	
	/*调拨日期*/
	@Expose
	private String allocationDate;

	/*调拨类型*/
	@Expose
	@CodeFieldDeclare(codeId = "ALLOCATION_TYPE", valueField = "allocationTypeName")
	private String allocationType;
	
	@Expose
	private String allocationTypeName;
	
	/*调出合同id*/
	@Expose
	private Long outContractId;

	/*调出项目合同编号*/
	@Expose
	private String outContractSerial;
	
	@Expose
	private Long outProjectId;

	/*调出项目名称*/
	@Expose
	private String outProjectName;
	
	/*调入合同id*/
	@Expose
	private Long inContractId;

	/*调入项目合同编号*/
	@Expose
	private String inContractSerial;
	
	@Expose
	private Long inProjectId;

	/*调入项目名称*/
	@Expose
	private String inProjectName;

	/*调拨主题*/
	@Expose
	private String allocationTheme;

	/*运输车辆*/
	@Expose
	private String vehicleNum;

	/*运输车辆人员*/
	@Expose
	private String vehiclePerson;

	/*调出项目发货人*/
	@Expose
	private String outProjectConsignor;

	/*调入项目收货人*/
	@Expose
	private String inProjectConsignee;

	/*附属单据号*/
	@Expose
	private String attachSerial;

	/*审核人*/
	@Expose
	private String auditorName;

	/*审核时间*/
	@Expose
	private String auditorDate;
	
//	@Expose
//	private Long projectInitId;

	/*备注*/
	@Expose
	private String remark;
	
	private String delFlag;
	
	public Long getApplyforId() {
		return this.allocationId;
	}

	public void setModelSerial(String serial) {
		this.allocationSerial = serial;
	}

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AllocationDetail> allocationDetailSet = new HashSet<AllocationDetail>(0);
	
	private String allocationDetails = "";
	
	public void setSubAllocation(){
		Set<AllocationDetail> allocationDetailSet = GsonUtil.fromJson(this.getAllocationDetails(),new TypeToken<Set<AllocationDetail>>(){},DateUtil.LINK_DISPLAY_DATE);
		if(allocationDetailSet != null){
			for(AllocationDetail p :allocationDetailSet){
				p.setAllocationId(this.getAllocationId());
			}
		}
		this.setAllocationDetailSet(allocationDetailSet);
	}
	
}
