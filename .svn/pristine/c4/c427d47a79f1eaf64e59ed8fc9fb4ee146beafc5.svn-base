package com.knight.emms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: AllocationDepotDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@EqualsAndHashCode(callSuper=false)
@PersistantDeclare
public class TransfersDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long tdetailId;
	
	@Expose
	private Long depottId;

	/*设备型号*/
	@Expose
	private String equipSpecific;
	
	@Expose
	private Long specificationsId;
	
	/*规格*/
	@Expose
	private String specifications;
	
	/*计量单位*/
	@Expose
	private String measurementUnit;
	
	/*仓库库存*/
	@Expose
	private String quantity;

	/*调拨数量*/
	@Expose
	private String transfersCounts;

	/*剩余数量*/
	@Expose
	private String surplusCounts;

	@Expose
	private Long storeId;
}
