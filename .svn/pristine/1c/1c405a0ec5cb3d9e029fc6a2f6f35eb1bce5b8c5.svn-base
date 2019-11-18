/**
 *====================================================
 * 文件名称: TeamsAccountWall.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年3月30日			chenxy(创建:创建文件)
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
 * @ClassName: TeamsAccountWall
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年3月30日 下午11:39:16
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class TeamsAccountWall extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long accountWallId;

	@Expose
	private Long teamsAccountId;

	@Expose
	private String accountDate;

	@Expose
	@CodeFieldDeclare(codeId = "COMPON_JACKING_STATUS", valueField = "wallTypeName")
	private String wallType;

	@Expose
	private String wallTypeName;

	@Expose
	private String recordId;

	@Expose
	private String buildingNum;

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
	private String measurement;

	@Expose
	private Integer quantity;

	@Expose
	private BigDecimal accountPrice;

	@Expose
	private Integer deductQuantity;

	@Expose
	private Long projectId;

	@Expose
	private String projectName;

	@Expose
	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	private BigDecimal summary;
}
