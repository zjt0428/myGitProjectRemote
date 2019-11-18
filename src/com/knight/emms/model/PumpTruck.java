package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * 泵车档案
 * chenzj
 * 2018年3月22日15:32:06
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PumpTruck extends BaseModel {

	private static final long serialVersionUID = 1L;

	/**泵车Id*/
	@Expose
	private Long pumpId;

	/**车牌号*/
	@Expose
	private String licensePlate;

	/**泵车类型*/
	@Expose
    @CodeFieldDeclare(codeId = "pumpType", valueField = "pumpTypeName")
	private String pumpType;
	
	@Expose
	private String pumpTypeName;
	
	/**泵车型号*/
	@Expose
	@CodeFieldDeclare(codeId = "pumpNumber", valueField = "pumpNumberName")
	private String pumpNumber;

	@Expose
	private String pumpNumberName;
	
	/**出厂日期*/
	@Expose
	private String  releaseDate;

	/**发证机关*/
	@Expose
	private String issuingAuthority;

	/**车辆通行证信息*/
	@Expose
	private String vehiclePermit;

	/**到期时间*/
	@Expose
	private String expirationDate;

	/**备注*/
	@Expose
	private String remark;
	
	private String delFlag;



}
