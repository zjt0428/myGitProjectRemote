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
public class AutocraneUnit extends BaseModel{

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long autocraneUnitId;
	
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
	
	//汽吊单位
	@Expose
	private String autocraneUnit;
	
	//班组单价
	@Expose
	private BigDecimal teamPrice;
	
	//金额小计
	@Expose
	private BigDecimal chargesSubtotal;
	
	//发生时间
	@Expose
	private String startTime;
	
	//备注
	@Expose
	private String remark;
	
	@Expose
	private Long relateId;
	
	@Expose
	private String relateModule;
	
	@Expose 
	private String relateSerial;

}
