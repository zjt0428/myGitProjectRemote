package com.knight.emms.model;


import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class Baldetail extends BaseModel{
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long baldetailId;
	
	@Expose
	private Long takeStockId;
	
	/**助记码*/
	@Expose
	private String mnemonics;
	
	/**品名id*/
	@Expose
	private Long commodityId;
	
	/**品名*/
	@Expose
	private String commodity;
	
	/**规格id*/
	@Expose
	private Long specificationsId;
	
	/**规格*/
	@Expose
	private String specifications;
	
	/**单位*/
	@Expose
	private String firstUnitConversion;

	/**账面库存*/
	@Expose
	private String bookInventory;
	
	/**实盘库存*/
	@Expose
	private String firmofferInventory;
	
	/**盈亏量*/
	@Expose
	private String amountProLoss;
	
	/**库位id*/
	@Expose
	private Long locationId;
	
	/**库位名称*/
	@Expose
	private String locationName;
	
	/**仓库库存表id*/
	@Expose
	private Long materialsStoreId;
	
	/**换算数量*/
	@Expose
	private String secondConvertedQuantity;
	
	/**辅助数量*/
	@Expose
	private String auxiliaryQuantity;
}
