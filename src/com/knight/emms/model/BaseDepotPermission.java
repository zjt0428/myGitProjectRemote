package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;

@Data
public class BaseDepotPermission extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long permissionId;
	
	@Expose
	private Long depotId;
	
	@Expose
	private Long userId;
	
	@Expose
	private String depotName;
	
	@Expose
	private String userName;
	
}
