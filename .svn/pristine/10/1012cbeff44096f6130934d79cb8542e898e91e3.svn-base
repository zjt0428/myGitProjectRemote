package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InstallDismantelTeam extends BaseModel{

	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long InstallDismantelTeamId;
	
	//关联现场安装Id
	@Expose
	private Long installId;
	
	//设备型号
	@Expose
	private String equipSpecificName;
	
	//收费类型
	@Expose
	@CodeFieldDeclare(codeId = "FEES_TYPE", valueField = "feesTypeName")
	private String feesType;
	
	@Expose
	private String feesTypeName;
	
	//计量单位
	@Expose
	private String unit;
	
	//数量
	@Expose
	private Integer number;
	
	//安拆班组
	@Expose
	private String insDisTeam;
	
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
