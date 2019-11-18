package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.system.model.AppUser;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class BasedepotJoinUser extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long joinId;
	
	@Expose
	private BaseDepot baseDepot;
	
	@Expose
	private AppUser appUser;

}