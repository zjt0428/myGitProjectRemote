/**
 *====================================================
 * 文件名称: PickupComponent.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: PickupComponent
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 上午8:21:50
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PickupComponent extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long pickupComponId;

	@Expose
	private Long pickupId;

	@Expose
	private Long componId;

	@Expose
	private Integer consumeCounts;

	@Expose
	private String unit;

	@Expose
	private Integer quantity;

	@Expose
	private BigDecimal unitPrice;

	@Expose
	private BigDecimal summary;

	@Expose
	private String componSerial;

	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "componCategoryName")
	private String componCategory;

	@Expose
	private String componCategoryName;

	@Expose
	@CodeFieldDeclare(codeId = "componGeneric", valueField = "componGenericName")
	private String componGeneric;

	@Expose
	private String componGenericName;

	@Expose
	@CodeFieldDeclare(codeId = "componSpecific", valueField = "componSpecificName")
	private String componSpecific;

	@Expose
	private String componSpecificName;

	@Expose
	private String dimensions;

	@Expose
	private BigDecimal presentValue;

	@Expose
	private String pickupDate;

	@Expose
	private String returnDate;

	@Expose
	private Long returnStoreId;

	@Expose
	private String returnStoreName;

	@Expose
	private String remark;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	@CodeFieldDeclare(codeId = "PICKUP_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

}
