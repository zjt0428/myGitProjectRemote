/**
 *====================================================
 * 文件名称: BorrowComponent.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-12			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: BorrowComponent
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-12 上午10:58:10
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class BorrowComponent extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long borrowComponId;

	@Expose
	private Long borrowId;

	@Expose
	private Long componId;

	@Expose
	private String componSerial;
	
	@Expose
	private String dimensions;
	
	@Expose
	private String exwSerial;

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
	private Integer consumeCounts;

	@Expose
	private Integer returnCounts;

	@Expose
	private Integer borrowCounts;

	@Expose
	private String borrowDate;

	@Expose
	private String returnDate;

	@Expose
	private Long returnStoreId;

	@Expose
	private String returnStoreName;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	@CodeFieldDeclare(codeId = "BORROW_ACCEPTANCE_STATE", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

}
