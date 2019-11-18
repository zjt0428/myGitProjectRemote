package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false)
@PersistantDeclare
public class DispatchAllocateInit extends BaseModel{
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long disAllInitId;
	
	@Expose
	@CodeFieldDeclare(codeId="repertoryCategory",valueField="initStatusName")	
	private String initStatus;
	
	@Expose
	private String initStatusName;
	
	@Expose
	private String componGenericName;
	
	@Expose
	private String calculate;
	
	@Expose
	private Integer quantity;
	
	@Expose
	@CodeFieldDeclare(codeId="equipSpecific",valueField="equipSpecificName")
	private String equipSpecific;
	
	@Expose
	private String equipSpecificName;

	@Expose
	private String dimensions;
	
	@Expose
	@CodeFieldDeclare(codeId="equipVender",valueField="equipVenderName")
	private String equipVender;
	

	@Expose
	private String equipVenderName;
	
	@Expose
	private String componCateGoryName;
  
}
