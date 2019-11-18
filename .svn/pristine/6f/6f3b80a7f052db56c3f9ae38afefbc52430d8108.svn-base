/**
 *====================================================
 * 文件名称: MaterialsCommodity.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月10日		陈光毅(创建:创建文件)
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
 * @ClassName: MaterialsCommodity
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月10日
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class MaterialsCommodity extends BaseModel {
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long commodityId;
	
	/** 资产属性 */
	@Expose
	private String assetsProperty;
	
	/** 品名 */
	@Expose
	private String commodity;
	
	/** 是否在用 */
	@Expose
	private String whetherUsing;
	
	/** 日租金 */
	@Expose
	private String dailyRent;
	
	/** 租金核算单位 */
	private String rentUnit;
	
	/** 丢失赔偿单价 */
	@Expose
	private String compensationCosts;
	
	/** 丢失赔偿单位 */
	@Expose
	private String compensationUnit;
}