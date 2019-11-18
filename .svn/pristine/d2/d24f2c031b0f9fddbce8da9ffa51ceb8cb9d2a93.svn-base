/**
 *====================================================
 * 文件名称: BorrowAcceptance.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-12			chenxy(创建:创建文件)
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
import com.knight.system.model.Department;

/**
 * @ClassName: BorrowAcceptance
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-12 上午10:50:13
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class BorrowAcceptance extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long bacceptanceId;

	@Expose
	private Long borrowId;

	@Expose
	@CodeFieldDeclare(codeId = "BORROW_ACCEPTANCE_STATE", valueField = "acceptanceStatusName")
	private String acceptanceStatus;

	@Expose
	private String acceptanceStatusName;

	@Expose
	private String unqualified;

	@Expose
	@CodeFieldDeclare(codeId = "BORROW_ACCEPTANCE_STATE", valueField = "handleMethodName")
	private String handleMethod;

	@Expose
	private String handleMethodName;

	@Expose
	private String arrivalPlanDate;

	@Expose
	private String refundPlanDate;

	@Expose
	private BigDecimal compensateAmount;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private Long depId;

	@Expose
	private String providedDate;

	@Expose
	private String remark;

	private Department department;

	// =============================================================================================//
	private String borrowEquips = "";

	private String borrowComponents = "";

	private String instalments = "";

	private String receivements = "";

}
