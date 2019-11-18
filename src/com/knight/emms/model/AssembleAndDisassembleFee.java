/**
 *====================================================
 * 文件名称: AssembleAndDisassembleFee.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月13日		陈光毅(创建:创建文件)
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
 * @ClassName: AssembleAndDisassembleFee
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月13日
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AssembleAndDisassembleFee extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long feeId;
	
	/** 品名(来源 周材品名设置) */
	@Expose
	private MaterialsCommodity materialsCommodity;
	
	/** 收费类型 */
	@Expose
	@CodeFieldDeclare(codeId = "FEES_TYPE", valueField = "feesTypeName")
	private String feesType;
	
	@Expose
	private String feesTypeName;
	
	/** 收费单位 */
	@Expose
	private String measurementUnit;
	
	/** 是否在用 */
	@Expose
	private String whetherUsing;
	
	/** 理论换算数值 */
	@Expose
	private String theoriesValueConversion;
	
	/** 换算单位 */
	@Expose
	private String unitConversion;
	
	/** 收费单价 */
	@Expose
	private String chargeUnitPrice;
	
	/** 收费类别 */
	@Expose
	private String feeCategory;
}
