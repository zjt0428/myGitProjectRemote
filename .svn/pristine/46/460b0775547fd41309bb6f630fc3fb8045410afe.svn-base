/**
 *====================================================
 * 文件名称: ContractEquipOutlay.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-13			chenxy(创建:创建文件)
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
 * @ClassName: ContractEquipOutlay
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-13 下午5:08:32
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare
public class ContractEquipOutlayVersion extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long outlayVersionId;
	
	@Expose
	private Long leaseVersionId;

	@Expose
	private Long contractEquipoutlayId;

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
	private String equipVender;

	@Expose
	private Integer quantity;

	@Expose
	private BigDecimal employOutlay;

	@Expose
	private BigDecimal installOutlay;

	@Expose
	private BigDecimal dismantleOutlay;

	@Expose
	private BigDecimal mantOutlay;

	@Expose
	private BigDecimal summary;

}
