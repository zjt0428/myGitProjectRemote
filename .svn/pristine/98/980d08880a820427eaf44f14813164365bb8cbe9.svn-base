package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class TemporaryReturnDetail  extends BaseModel{

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long detailId;
	
	@Expose
	private Long returnId;
	
	/**助记码*/
	@Expose
	private String mnemonics;
	
	/**品名id*/
	@Expose
	private Long commodityId;
	
	/**品名*/
	@Expose
	private String commodity;
	
	/**规格*/
	@Expose
	private Long specificationsId;
	
	/**规格*/
	@Expose
	private String specifications;
	
	/**计量单位*/
	@Expose
	private String unit;
	
	
	/**装车数量*/
	@Expose
	private String returnQuantity;
	
	/**暂存库存*/
	@Expose
	private String temporaryQuantity;
	
	/**辅助单位*/
	@Expose
	private String supplementUnit;
	
	/**辅助数量*/
	@Expose
	private String supplementQuantity;
	
	/**换算系数*/
	@Expose
	private String conversionNum;
	
	/**备注*/
	@Expose
	private String remark;
	
}