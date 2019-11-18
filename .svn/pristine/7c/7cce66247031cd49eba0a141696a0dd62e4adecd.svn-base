/**
 *====================================================
 * 文件名称: PurchaseBrief.java
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
 * @ClassName: PurchaseBrief
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 下午10:51:24
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PurchaseBrief extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long purchaseBriefId;

	@Expose
	private Long componId;

	@Expose
	private Long purchaseId;

	@Expose
	private String briefName;

	@Expose
	private String partsCategory;
	
	@Expose
	private String brand;

	@Expose
	private String specific;

	@Expose
	private String dimensions;

	@Expose
	private Integer quantity;

	@Expose
	private String unit;

	@Expose
	private BigDecimal unitPrice;

	@Expose
	private BigDecimal summary;

	@Expose
	private String arrivalDate;

	@Expose
	private String acceptanceDate;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	@CodeFieldDeclare(codeId = "PURCHASE_ACCEPTANCE_STATE", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

}
