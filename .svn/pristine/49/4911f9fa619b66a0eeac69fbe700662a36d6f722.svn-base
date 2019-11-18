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
public class CloseSettleLog extends BaseModel{

	private static final long serialVersionUID = 1L;
	
	private Long closeLogId;
	
	//填报时间
	@Expose
	private String providedDate;

	//填报人
	private Long providedId;

	//关账状态
	private String closedStatus;
	
	//月份
	@Expose
	private String months;
	
	
}
