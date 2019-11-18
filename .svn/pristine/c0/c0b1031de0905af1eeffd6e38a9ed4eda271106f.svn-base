/**
 *====================================================
 * 文件名称: MaterialsSpecifications.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月11日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: MaterialsSpecifications
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月11日
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class MaterialsSpecifications extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long specificationsId;
	
	/** 品名(来源 周材品名设置) */
	@Expose
	private MaterialsCommodity materialsCommodity;
	
	/** 周材规格 */
	@Expose
	private String specifications;
	
	/** 代码编号 */
	@Expose
	private String mnemonics;
	
	/** 是否在用 */
	@Expose
	private String whetherUsing;
	
	/** 换算单位1 */
	@Expose
	private String firstUnitConversion;
	
	/** 换算单位2 */
	@Expose
	private String secondUnitConversion;
	
	/** 计量数量 */
	@Expose
	private String firstConvertedQuantity;
	
	/** 换算数量 */
	@Expose
	private String secondConvertedQuantity;
}
