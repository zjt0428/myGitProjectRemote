/**
 *====================================================
 * 文件名称: EquipWarehouseCompon.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: EquipWarehouseCompon
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午9:53:21
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ComponIntoStoreDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;

	@Expose
	private Long rowId;

	@Expose
	private Integer waitCounts;

	@Expose
	private Integer counts;

	@Expose
	@CodeFieldDeclare(codeId = "INSPECT_RESULT", valueField = "resultName")
	private String result;

	@Expose
	private String resultName;

	@Expose
	private String description;

	@Expose
	private String maintContent;

	@Expose
	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "WAREHOUSE_COMPON_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	@Expose
	private Long componId;
	@Expose
	private Component component;
	
	/**损坏描述*/
	@Expose
	private String damageDescription;
	
	/**损坏数量*/
	@Expose
	private Integer damageCount;
	
	/**计量单位*/
	@Expose
	private String damageUnit;
	
	/**损坏单价*/
	@Expose
	private BigDecimal damagePrice;
	
	/**损坏金额*/
	@Expose
	private BigDecimal damageAmount;

}
