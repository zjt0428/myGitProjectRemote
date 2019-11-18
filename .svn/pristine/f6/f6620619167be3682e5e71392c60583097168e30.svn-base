/**
 *====================================================
 * 文件名称: ContractEquipBrief.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
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
 * @ClassName: ContractEquipBriefVersion
 * @Description: TODO(这里用一句话描述这个类的作用)
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ContractEquipBriefVersion extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long briefVersionId;
	
	@Expose
	private Long leaseVersionId;

	@Expose
	private Long ceBriefId;

	@Expose
	private Long contractId;

	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;

	@Expose
	private String equipCategoryName;

	@Expose
	private String equipGeneric;
	
	@Expose
	private String equipSpecificName;
	
	@Expose
	private String equipSpecific;

	@Expose
	private String unit;

	@Expose
	private String startDate;

	@Expose
	private String endDate;

	@Expose
	private String initialHeight;

	@Expose
	private String finalHeight;

	@Expose
	private Short quantity;

	@Expose
	private BigDecimal rentStandard;

	@Expose
	private String measurement;

	@Expose
	private Short tenancy;

}
