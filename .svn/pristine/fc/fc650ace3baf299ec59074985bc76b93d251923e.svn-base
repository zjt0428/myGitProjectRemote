package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;

@Data
@PersistantDeclare
public class OtherBetsDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;

	@Expose	
	private Long otherBetsId;

	@Expose	
	@CodeFieldDeclare(codeId = "contractCostitem", valueField = "feesTypeName")
	private String feesType;

	@Expose
	private String feesTypeName;
	
	@Expose	
	@CodeFieldDeclare(codeId = "CALCULATION_METHOD", valueField = "calculationMethodName")
	private String calculationMethod;
	
	@Expose	
	private String calculationMethodName;
	
	@Expose	
	private String fee;
	
	@Expose	
	private String remark;
	
}
