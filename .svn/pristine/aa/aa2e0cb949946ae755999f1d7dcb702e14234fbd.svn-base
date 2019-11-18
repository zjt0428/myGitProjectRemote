package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AutocraneFee extends BaseModel{
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long autocraneFeeId;
	
	//关联现场安装Id
	@Expose
	private Long installId;
	
	//汽吊型号
	@Expose
	private String truckCraneSpecific;
	
	//数量
	@Expose
	private Integer number;
	
	//台班
	@Expose
	private Integer machineTeam;
	
	//项目单价
	@Expose
	private BigDecimal projectPrice;
	
	//金额小计
	@Expose
	private BigDecimal chargesSubtotal;
	
	//发生时间
	@Expose
	private String startTime;
	
	@Expose
	private Long relateId;
	
	@Expose
	private String relateModule;
	
	@Expose 
	private String relateSerial;
	
	@Expose 
	private String remark;
}
