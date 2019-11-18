/**
 *====================================================
 * 文件名称: ContractEquip.java
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
 * @ClassName: ContractEquipVersion
 * @Description: TODO(这里用一句话描述这个类的作用)
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ContractEquipVersion extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long equipVersionId;
	
	@Expose
	private Long leaseVersionId;

	@Expose
	private Long contractEquipId;

	@Expose
	private Long contractId;

	@Expose
	private Long equipId;

	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;

	@Expose
	private String equipCategoryName;

	@Expose
	@CodeFieldDeclare(codeId = "equipGeneric", valueField = "equipGenericName")
	private String equipGeneric;

	@Expose
	private String equipGenericName;

	@Expose
	@CodeFieldDeclare(codeId = "equipSpecific", valueField = "equipSpecificName")
	private String equipSpecific;

	@Expose
	private String equipSpecificName;

	@Expose
	private String recordId;

	@Expose
	private String exwSerial;

	@Expose
	private String recordSerial;

	@Expose
	private Long propertyEnt;

	@Expose
	private String propertyName;

	@Expose
	private String buildingNum;

	@Expose
	private String startDate;

	@Expose
	private String endDate;

	@Expose
	private String initialHeight;

	@Expose
	private String finalHeight;

	@Expose
	private BigDecimal rentStandard;

	@Expose
	private BigDecimal rentStandardTemp;

	@Expose
	private String measurement;

	@Expose
	private Short tenancy;

	@Expose
	private Integer wallAttacheQty;

	@Expose
	private BigDecimal summary;

	@Expose
	private String remark;

}
