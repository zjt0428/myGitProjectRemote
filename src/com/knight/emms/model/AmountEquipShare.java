/**
 *====================================================
 * 文件名称: AmountEquipShare.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-27			chenxy(创建:创建文件)
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
 * @ClassName: AmountEquipShare
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-27 上午11:56:17
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class AmountEquipShare extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long amountEquipShareId;

	@Expose
	private Long relateId;

	@Expose
	private String relateSerial;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	@Expose
	private String amountDate;

	@Expose
	private BigDecimal presentAmount;

	@Expose
	private Long equipId;

	@Expose
	private String recordSerial;

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
	private Long propertyEnt;

	@Expose
	private String propertyName;

}
