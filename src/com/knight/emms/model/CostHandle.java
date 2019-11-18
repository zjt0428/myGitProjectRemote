/**
 *====================================================
 * 文件名称: DemandDetail.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: DemandDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:41:01
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class CostHandle extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long costHandleId;
	
	@Expose
	private Long contractmaId;
	
	@Expose
	private Long commodityId;
	
	/*品名*/
	@Expose
	private String commodity;

	/*计量单位*/
	@Expose
	private String measurementUnit;

	@Expose
	private String feeId;
	
	/*收费单价*/
	@Expose
	private String chargeUnitPrice;

	/** 收费类型 */
	@Expose
	@CodeFieldDeclare(codeId = "FEES_TYPE", valueField = "feesTypeName")
	private String feesType;
	
	@Expose
	private String feesTypeName;

	/**理论换算数值*/
	@Expose
	private String theoriesValueConversion;
	
	/*辅助单位*/
	@Expose
	private String auxiliaryUnit;
	
	/** 收费类别 */
	@Expose
	private String feeCategory;
}
