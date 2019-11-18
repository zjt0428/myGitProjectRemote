/**
 *====================================================
 * 文件名称: MatDamage.java
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
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: MatDamage
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenzj
 * @date 2017年11月2日09:35:30
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class CompensationDamage extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long compensationId;
	
	@Expose
	private Long recycleId;

	@Expose
	private Long commodityId;
	
	/*品名*/
	@Expose
	private String commodity;
	
	@Expose
	private Long damageId;
	
	/*损坏类型*/
	@Expose
	private String damageType;

	/*计量单位*/
	@Expose
	private String measurementUnit;

	/*损坏单价*/
	@Expose
	private String damageUnitPrice;

	/*数量*/
	@Expose
	private String quantity;

	/*损坏赔偿金额*/
	@Expose
	private String damageAmount;
	
	
}
