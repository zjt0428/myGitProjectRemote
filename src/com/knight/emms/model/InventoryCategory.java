/**
 *====================================================
 * 文件名称: InventoryCategory.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: InventoryCategory
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-26 下午9:49:49
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InventoryCategory extends BaseModel {

	private static final long serialVersionUID = 1L;

	private Long invCategoryId;

	private Long inventoryId;

	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "repertoryCategoryName")
	private String repertoryCategory;

	private String repertoryCategoryName;

	private Integer bookQuantity;

	private Integer inventoryQuantity;

	private Integer scrapQuantity;

	private Integer borrowQuantity;

	private Integer pickupQuantity;

	private Integer missQuantity;

}
