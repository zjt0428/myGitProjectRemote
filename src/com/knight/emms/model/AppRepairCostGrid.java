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
public class AppRepairCostGrid extends BaseModel { 
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long repaircostId;
	
	@Expose
	private Long relateId;
	
	@Expose
	private String equipCategoryName;
	
	@Expose
	private String hoursContent;
	
	@Expose
	private Long maintenanceHours;
	
	@Expose
	private Long price;
	
	@Expose
	private Long amount;
	
	@Expose
	private String remarks;
}
