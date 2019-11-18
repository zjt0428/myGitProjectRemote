/**
 *====================================================
 * 文件名称: AfterMaterialsRepair.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: AfterMaterialsRepair
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:41:01
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AfterMaterialsRepair extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long afterRepairId;

	@Expose
	private Long materialsRepairId;
	
	@Expose
	private String mnemonicCode;

	@Expose
	private String commodity;

	@Expose
	private String specifications;
	
	@Expose
	private Long specificationsId;
	
	@Expose
	private String measurementUnit;
	
	@Expose
	private String secondUnitConversion;

	@Expose
	private String quantity;

	@Expose
	private String auxiliaryNum;
	
	@Expose
	private String enterLocation;
	
	@Expose
	private Long locationId;
	
	@Expose
	private String storeNum;
	
	@Expose
	private String conversionNum;

	@Expose
	private Long commodityId;
}
