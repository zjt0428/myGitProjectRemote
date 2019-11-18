package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InstallPriceSet extends BaseModel{

	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long installPriceId;
	
	@Expose
	private Long contractId;
	
	@Expose
	private String belongToAreaName;
	
	@Expose
	private String equipSpecificName;
	
	@Expose
	private String installDismantleTypeName;
	
	@Expose
	private String measurementUnit;
	
	@Expose
	private Long projectPrice;
}
