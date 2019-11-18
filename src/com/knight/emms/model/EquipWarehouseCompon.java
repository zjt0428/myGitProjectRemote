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

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: EquipWarehouseCompon
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午9:53:21
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class EquipWarehouseCompon extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long warehouseComponId;

	@Expose
	private Long warehouseId;

	@Expose
	private Integer warehouseWaitCounts;

	@Expose
	private Integer warehouseCounts;

	@Expose
	@CodeFieldDeclare(codeId = "INSPECT_RESULT", valueField = "warehouseResultName")
	private String warehouseResult;

	@Expose
	private String warehouseResultName;

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
	private String componGenericName;
	
	@Expose
	private String componSpecificName;
	
	@Expose
	@CodeFieldDeclare(codeId = "equipVender", valueField = "equipVenderName")
	private String equipVender;
	
	@Expose
	private String equipVenderName;
	
	@Expose
	private String calculate;
	
	@Expose
	private String counts;
	
	@Expose
	private String dimensions;

	@Expose
	private ComponDiary componDiary;
	
}
