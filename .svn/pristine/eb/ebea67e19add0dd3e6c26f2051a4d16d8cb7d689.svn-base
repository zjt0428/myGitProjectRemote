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
public class BaseDepot extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long depotId;

	@Expose	
	private String depotName;

	@Expose	
	private String linkman;

	@Expose	
	private String address;
	
	/**数据权限*/
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<BaseDepotPermission> baseDepotPermissionSet = new HashSet<BaseDepotPermission>(0);
	
	/**管辖资产*/
	@Expose	
	private String jurisdiction;

	/**描述*/
	@Expose	
	private String description;
	
	private String delFlag;
	
	private String baseDepotPermissions = "";
	
	public void setSubBaseDepot(){
		Set<BaseDepotPermission> baseDepotPermissionSet =GsonUtil.fromJson(this.getBaseDepotPermissions(), new TypeToken<Set<BaseDepotPermission>>() {});
		if (baseDepotPermissionSet != null) {
			for (BaseDepotPermission bdp : baseDepotPermissionSet) {
				bdp.setDepotId(this.getDepotId());
				bdp.setDepotName(this.getDepotName());
			}
		}
		this.setBaseDepotPermissionSet(baseDepotPermissionSet);
	}
}
