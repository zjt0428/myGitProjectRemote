package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;


@Data
@PersistantDeclare
public class BaseDepotInitDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	
	@Expose
	private Long detailId;

	/**仓库初始化id*/
	@Expose	
	private Long depotInitId;

	/**库位Id*/
	@Expose	
	private Long locationId;

	/**库位名称*/
	@Expose	
	private String locationName;
	
	/**数量*/
	@Expose	
	private String quantity;
	
	/**辅助数量*/
	@Expose	
	private String supplementQuantity;
	
	/**辅助单位*/
	@Expose	
	private String supplementUnit;
	
	/**计量单位*/
	@Expose	
	private String unit;
	
	/**换算系数*/
	@Expose	
	private String conversion;
	
	
}
