package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;


@Data
@PersistantDeclare
public class ContractJoinUser extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long joinId;

	@Expose	
	private Long userId;

	@Expose	
	private Long contractId;

	@Expose	
	private String relateModule;
	

}
