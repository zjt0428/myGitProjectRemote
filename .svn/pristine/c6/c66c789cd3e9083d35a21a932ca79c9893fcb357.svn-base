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
public class AllocationDepotDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;
	
	@Expose
	private Long allocationId;

	/*助记码*/
	@Expose
	private String mnemonicCode;
	
	/*品名*/
	@Expose
	private String commodity;

	/*周材规格Id*/
	@Expose
	private Long specificationsId;
	
	/*周材规格*/
	@Expose
	private String specifications;
	
	/*计量单位*/
	@Expose
	private String measurementUnit;
	
	@Expose
	private Long outLocationId;
	
	/*调出库位*/
	@Expose
	private String outLocationName;
	
	/*仓库库存*/
	@Expose
	private String quantity;

	/*调拨数量*/
	@Expose
	private String allocationCounts;
	
	/*换算数量*/
	@Expose
	private String secondConvertedQuantity;
	
	/*辅助数量*/
	@Expose
	private String auxiliaryQuantity;
	
	@Expose
	private Long inLocationId;
	
	/*调入库位*/
	@Expose
	private String inLocationName;

	/*剩余数量*/
	@Expose
	private String surplusCounts;
	
	@Expose
	private Long depotInitId;

	@Expose
	private Long storeId;

	/*辅助单位*/
	@Expose
	private String secondUnitConversion;
}
