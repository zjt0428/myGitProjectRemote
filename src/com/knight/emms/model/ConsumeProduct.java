
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: ConsumeProduct
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author xuenz
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ConsumeProduct extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long consumeId;
	
	@Expose
	private Long handleId;
	
	/**品名id*/
	@Expose
	private Long commodityId;
	
	/**周材名称（品名）*/
	@Expose
	private String commodity;
	
	/**规格id*/
	@Expose
	private Long specificationsId;
	
	/**规格*/
	@Expose
	private String specifications;
	
	/**助记码*/
	@Expose
	private String mnemonics;
	
	/**计量单位*/
	@Expose
	private String measurementUnit;
	
	/**库存数量*/
	@Expose
	private String quantity;
	
	/**换算数量*/
	@Expose
	private	String auxiliaryQuantity;
	
	/**耗用数量*/
	@Expose
	private String consumeQuantity;
	
	/**辅助数量*/
	@Expose
	private	String convertedQuantity;
	
	/**出库库位id*/
	@Expose
	private Long exitLocationId;
	
	/**出库库位名称*/
	@Expose
	private String exitLocationName;
}
