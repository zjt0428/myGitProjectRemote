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
public class InstallFee extends BaseModel{
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long installFeeId;
	
	//关联现场安装Id
	@Expose
	private Long installId;
	
	//设备型号
	@Expose
	private String equipSpecificName;
	
	//收费类型
	@Expose
	@CodeFieldDeclare(codeId = "installFeeType", valueField = "feesTypeName")
	private String installFeeType;
	
	@Expose
	private String feesTypeName;
	
	//计量单位
	@Expose
	private String unit;
	
	//数量
	@Expose
	private Integer number;
	
	//项目单价
	@Expose
	private BigDecimal projectPrice;
	
	
	//费用小计
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
