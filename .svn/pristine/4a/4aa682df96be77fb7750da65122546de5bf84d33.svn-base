/**
 *====================================================
 * 文件名称: MaterialsScrap.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月12日		陈光毅(创建:创建文件)
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
 * @ClassName: MaterialsScrap
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月12日
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class MaterialsScrap extends BaseModel {
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long scrapId;
	
	/** 品名(来源 周材品名设置) */
	@Expose
	private MaterialsCommodity materialsCommodity;
	
	/** 收费类型 */
	@Expose
	private String feesType;
	
	/** 计量单位 */
	@Expose
	private String measurementUnit;
	
	/** 是否在用 */
	@Expose
	private String whetherUsing;
	
	/** 报废单价 */
	@Expose
	private String scrapUnitPrice;
	
	/** 报废类型 */
	@Expose
	private String scrapType;

}
