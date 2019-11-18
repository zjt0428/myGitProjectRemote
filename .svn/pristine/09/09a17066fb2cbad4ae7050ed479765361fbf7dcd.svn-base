package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: ChargeHandle
 * @Description: 费用处理
 * @author chenzj
 * @date 2018年3月29日18:04:18
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ChargeHandle extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long handleId;
	
	@Expose
	private Long returnId;
	
	/**品名*/
	@Expose
	private String commodity;
	
	/**收费类型 */
	@Expose
	@CodeFieldDeclare(codeId = "FEES_TYPE", valueField = "feesTypeName")
	private String feesType;
	
	@Expose
	private String feesTypeName;
	
	/**收费单价*/
	@Expose
	private String chargeUnitPrice;

	/**收费数量*/
	@Expose
	private String chargeQuantity;
	
	/**收费金额*/
	@Expose
	private String chargeAmount;
	
	/**收费方式*/
	@Expose
	private String chargeMode;
	
	/**计租金额*/
	@Expose
	private String leaseAmount;
	
	/** 收费类别 */
	@Expose
	private String feeCategory;
	
}
