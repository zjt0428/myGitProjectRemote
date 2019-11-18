
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Status;

/**
 * @ClassName: AllocationDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AllocationDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;
	
	@Expose
	private Long allocationId;

	/*助记码*/
	@Expose
	private String mnemonicCode;
	
	/*品名id*/
	@Expose
	private Long commodityId;
	
	/*品名*/
	@Expose
	private String commodity;
	
	/*周材规格*/
	@Expose
	private Long specficationsId;

	/*周材规格*/
	@Expose
	private String specfications;
	
	@Expose
	private Long projectId;
	
	/*项目库存*/
	@Expose
	private String projectTotal;

	/*计量单位*/
	@Expose
	private String measurementUnit;
	
	/*换算单位*/
	@Expose
	private String secondUnitConversion;
	
	/*换算数量*/
	@Expose
	private String secondConvertedQuantity;
	
	/*辅助数量*/
	@Expose
	private String auxiliaryQuantity;

	/*调拨数量*/
	@Expose
	private String allocationCounts;

	/*剩余数量*/
	@Expose
	private String surplusCounts;

	/*备注*/
	@Expose
	private String remark;

}
