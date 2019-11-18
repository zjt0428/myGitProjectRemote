/**
 *====================================================
 * 文件名称: ReimburseTicket.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
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
 * @ClassName: ReimburseTicket
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午3:17:46
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ReimburseTicket extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long ticketId;

	@Expose
	private Long reimburseId;

	@Expose
	@CodeFieldDeclare(codeId = "reimburseType", valueField = "reimburseTypeName")
	private String reimburseType;

	@Expose
	private String reimburseTypeName;

	@Expose
	private String ticketDate;

	@Expose
	private Integer ticketQuantity;

	@Expose
	private String specificName;

	@Expose
	private String modelName;

	@Expose
	private BigDecimal unitPrice;

	@Expose
	private Integer quantity;

	@Expose
	private BigDecimal summary;

	@Expose
	private String remark;

	@Expose
	private Long carId;

	@Expose
	private String licensePlate;

}
