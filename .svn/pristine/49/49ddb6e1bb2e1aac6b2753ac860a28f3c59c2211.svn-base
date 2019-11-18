
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: DispatchMaterials
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class DispatchMaterials extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long dispatchId;

	@Expose
	private Long materialsId;

	/*助记码*/
	@Expose
	private String mnemonics;
	
	@Expose
	private Long commodityId;

	/*品名*/
	@Expose
	private String commodity;

	/*规格id*/
	@Expose
	private Long specificationsId;
	
	/*规格*/
	@Expose
	private String specifications;

	/*计量单位*/
	@Expose
	private String measurementUnit;

	/*调度数量*/
	@Expose
	private String dispatchCounts;
	
	/*辅助单位*/
	@Expose
	private String secondUnitConversion;
	
	/*换算数量*/
	@Expose
	private String secondConvertedQuantity;
	
	/*辅助数量*/
	@Expose
	private String auxiliaryQuantity;
	
	/*运输数量*/
	@Expose
	private String counts;
	
	@Expose
	private Long materialsStoreId;
}
