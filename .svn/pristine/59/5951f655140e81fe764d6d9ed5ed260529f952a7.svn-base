
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.exception.BusinessException;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: AllocationDepot
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "allocationSerial", strategy = "CK{yyyyMMdd}", maxseq = 999)
public class AllocationDepot extends ApplyforState  {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long allocationId;

	/*状态*/
	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
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

	/*录入时间*/
	@Expose
	private String inputDate;
	
	/*调拨主题*/
	@Expose
	private String allocationTheme;
		
	/*调拨日期*/
	@Expose
	private String allocationDate;

	/*调拨类型*/
	@Expose
	@CodeFieldDeclare(codeId = "ALLOCATION_TYPE", valueField = "allocationTypeName")
	private String allocationType;
	
	@Expose
	private String allocationTypeName;
	
	/*调出仓库id*/
	@Expose
	private Long outDepotId;

	/*调出仓库名称*/
	@Expose
	private String outDepotName;
	
	/*调入仓库id*/
	@Expose
	private Long inDepotId;

	/*调入仓库名称*/
	@Expose
	private String inDepotName;
	
	/*资产属性*/
	@Expose
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;

	@Expose
	private String assetsPropertyName;

	/*申请人*/
	@Expose
	private String applicantMan;

	/*负责人*/
	@Expose
	private String chargeMan;

	/*联系电话*/
	@Expose
	private String contactTel;

	/*运输车辆*/
	@Expose
	private String vehicleNum;

	/*运输车辆人员*/
	@Expose
	private String vehiclePerson;

	/*调出仓库发货人*/
	@Expose
	private String outDepotConsignor;

	/*调入仓库收货人*/
	@Expose
	private String inDepotConsignee;
	

	/*附属单据号*/
	@Expose
	private String attachSerial;

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
	private Set<AllocationDepotDetail> allocationDepotDetailSet = new HashSet<AllocationDepotDetail>(0);
	
	private String allocationDepotDetails = "";
	
	public void setSubAllocation(){
		Set<AllocationDepotDetail> allocationDepotDetailSet = GsonUtil.fromJson(this.getAllocationDepotDetails(),new TypeToken<Set<AllocationDepotDetail>>(){},DateUtil.LINK_DISPLAY_DATE);
		if(allocationDepotDetailSet != null){
			for(AllocationDepotDetail p :allocationDepotDetailSet){
				if(StringUtils.isBlank(p.getInLocationId()+"")) {
					throw new BusinessException("获取调入仓库ID失败，请重新选择一遍调入仓库！");
				}
				p.setAllocationId(this.getAllocationId());
			}
		}
		this.setAllocationDepotDetailSet(allocationDepotDetailSet);
	}
	
}
