package com.knight.emms.model;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

@Data
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ClosedSettleInfo extends BaseModel{

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long closeSettleId;
	
	//关账时间
	@Expose
	private String closedDate;

	//关账状态（0：未关账，1：关账）
	@Expose
	private String closedStatus;
	
	//关账月份
	@Expose
	private String months;
	
	
}
