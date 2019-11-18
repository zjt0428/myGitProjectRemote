
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
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;


/**
 * @ClassName: DepotTransfers
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "transfersNum", strategy = "CK{yyyyMMdd}", maxseq = 999)
public class DepotTransfers extends ApplyforState  {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long depottId;

	/*状态*/
	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;
	
	@Expose
	private String applyforStateName;

	/*调拨编号*/
	@Expose
	private String transfersNum;

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
	private String transfersTheme;
		
	/*调拨日期*/
	@Expose
	private String transfersDate;

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
	

	/*运输车辆*/
	@Expose
	private String vehicleNum;

	/*运输车辆人员*/
	@Expose
	private String vehiclePerson;

	/*调出仓库发货人*/
	@Expose
	private String outDepotPerson;
	
	/*调出仓库发货人ID*/
	@Expose
	private Long outPersonId;

	/*调入仓库收货人*/
	@Expose
	private String inDepotPerson;
	
	/*调入仓库收货人ID*/
	@Expose
	private Long inPersonId;
	
	@Expose
	private Long storeId;
	
	@Expose
	private String delFlag;
	
	/*所属部门**/
    @Expose
    private Long depId;
    
    @Expose
    private Department department;
	
	public Long getApplyforId() {
		return this.depottId;
	}

	public void setModelSerial(String serial) {
		this.transfersNum = serial;
	}

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TransfersDetail> transfersDetailSet = new HashSet<TransfersDetail>(0);
	
	private String transfersDetails = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TransfersEquipDetail> transfersEquipDetailSet = new HashSet<TransfersEquipDetail>(0);
	
	private String transfersEquipDetails = "";
	
	public void setSubAllocation(){
		Set<TransfersDetail> transfersDetailSet = GsonUtil.fromJson(this.getTransfersDetails(),new TypeToken<Set<TransfersDetail>>(){},DateUtil.LINK_DISPLAY_DATE);
		if(transfersDetailSet != null && transfersDetailSet.size()>0){
			for(TransfersDetail p :transfersDetailSet){
				if(StringUtils.isBlank(p.getTdetailId()+"")) {
					throw new BusinessException("获取调入仓库ID失败，请重新选择一遍调入仓库！");
				}
				p.setDepottId(this.getDepottId());
			}
		}
		this.setTransfersDetailSet(transfersDetailSet);
		
		Set<TransfersEquipDetail> transfersEquipDetailSet = GsonUtil.fromJson(this.getTransfersEquipDetails(),new TypeToken<Set<TransfersEquipDetail>>(){},DateUtil.LINK_DISPLAY_DATE);
		if(transfersEquipDetailSet != null){
			for(TransfersEquipDetail p :transfersEquipDetailSet){
				p.setDepottId(this.getDepottId());
			}
		}
		this.setTransfersEquipDetailSet(transfersEquipDetailSet);
	}
}

