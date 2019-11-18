
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: ProductMake
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author xuenz
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ProductMake extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long productMakeId;

	@Expose
	private Long applyMakeId;
	
	@Expose
	private String mnemonics;
	
	@Expose
	private Long commodityId;
	
	@Expose
	private String commodity;
	
	@Expose
	private Long specificationsId;

	@Expose
	private String specifications;
	
	@Expose
	private String measurementUnit;
	
	@Expose
	private String makeQuanity;
	
	@Expose
	private String secondUnitConversion;
	
	@Expose
	private	String auxiliaryQuantity;

	@Expose
	private String auxiliaryNum;

}
