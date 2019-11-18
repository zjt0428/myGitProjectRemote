package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

import lombok.Data;

@Data
@PersistantDeclare
public class BaseLocation extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long locationId;
	
	@Expose
	private Long depotId;

	@Expose	
	private BaseDepot baseDepot;
	
	@Expose
	private String depotName;

	@Expose	
	private String locationSerial;

	@Expose	
	private String locationName;

	@Expose	
	private String linkman;

	@Expose	
	private String address;

	@Expose	
	private String description;
	
	private String delFlag;
	
	/**数据权限*/
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private Set<BaseLocationPermission> baseLocationPermissionSet = new HashSet<BaseLocationPermission>(0);
	
	private String baseLocationPermissions = "";
	
	public void setSubBaseLocation(){
		Set<BaseLocationPermission> baseLocationPermissionSet =GsonUtil.fromJson(this.getBaseLocationPermissions(), new TypeToken<Set<BaseLocationPermission>>() {});
		if (baseLocationPermissionSet != null) {
			for (BaseLocationPermission bdp : baseLocationPermissionSet) {
				bdp.setLocationId(this.getLocationId());
				bdp.setLocationName(this.getLocationName());
			}
		}
		this.setBaseLocationPermissionSet(baseLocationPermissionSet);
	}
	
}
