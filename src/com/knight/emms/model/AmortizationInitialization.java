/**
 *====================================================
 * 文件名称: AmortizationInitialization.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月14日		陈光毅(创建:创建文件)
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
 * @ClassName: AmortizationInitialization
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月14日
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AmortizationInitialization extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long initializationId;
		
	/** 形成时间 */
	@Expose
	private String formationTime;
	
	/** 单位 */
	@Expose
	private String unit;
	
	/** 数量 */
	@Expose
	private String quantity;
	
	/** 原值 */
	@Expose
	private String originalValue;
	
	/** 总计摊销月数 */
	@Expose
	private MaterialsAmortization materialsAmortization;
	
	/** 已摊销月数 */
	@Expose
	private String amortizedMonths;
	

	/*@Expose
	private String totalAmortizationMonths;*/
	
	/** 已摊销金额 */
	@Expose
	private String amortizedAmount;
	
	/** 未摊销月数 */
	@Expose
	private String notyetAmortizedMonths;
	
	/** 未摊销金额 */
	@Expose
	private String notyetAmortizedAmount;

}
