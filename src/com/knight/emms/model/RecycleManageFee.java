package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;

@Data
public class RecycleManageFee extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Expose	
	private Long feeId;
	
	@Expose	
	private Long recycleId;
	
	@Expose	
	private String commodity;

	@Expose	
	private Long commodityId;

	/**收费类型*/
	@Expose	
	private String chargeType;
	
	/**收费单价*/
	@Expose	
	private String chargePrice;
	
	/**收费数量*/
	@Expose	
	private String chargeQuantity;
	
	/**收费金额*/
	@Expose	
	private String chargeAmount;
	
	/**收费方式*/
	@Expose	
	private String chargeWay;
	
	private String chargeWayName;

	/**计租金额*/
	@Expose	
	private String leaseAmount;
	
	/** 收费类别 */
	@Expose
	private String feeCategory;
}
