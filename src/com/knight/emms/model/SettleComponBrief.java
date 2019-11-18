/**
 *====================================================
 * 文件名称: SettleComponBrief.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.SettleBrief;

/**
 * @ClassName: SettleComponBrief
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午4:04:50
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class SettleComponBrief extends SettleBrief {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long scBriefId;

	@Expose
	private Long settleId;

	@Expose
	private String buildingNum;

	@Expose
	private Long componDiaryId;

	@Expose
	private Long componId;

	@Expose
	private String componSerial;

	@Expose
	private String componCategoryName;

	@Expose
	private String componSpecificName;

	@Expose
	private String unit;

	@Expose
	private String startSettleDate;

	@Expose
	private String endSettleDate;

	@Expose
	private Integer settleDays;

	@Expose
	private BigDecimal rentStandard;

	@Expose
	private String measurement;

	@Expose
	private Integer quantity;

	@Expose
	private BigDecimal daysRent;

	@Expose
	private BigDecimal deductRent;

	@Expose
	private BigDecimal summary;

	@Expose
	private String remark;

	@Expose
	private Long equipId;

	@Expose
	private String recordId;

	@Expose
	private String taxRate;

	@Expose
	private String preTaxAmount;

	@Expose
	private String afterTaxAmount;
	
	@Expose
	private String monthTag;

	@Expose
	private String taxes;
	
	@Expose
	private String equipSerial;
	
	@Expose
	private String equipCategoryName;
	
	@Expose
	private String equipSpecificName;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private Long contractId;
	// ==============================================================================//
	public String getGroupKey() {
		return this.componCategoryName + this.componSpecificName + this.unit + this.startSettleDate + this.endSettleDate + this.settleDays + this.rentStandard + this.measurement + this.quantity + this.daysRent + this.deductRent + this.summary + this.remark;
	}

	public int getMonthSub() {
		int sy = Integer.parseInt(this.startSettleDate.substring(0, 4));
		int ey = Integer.parseInt(this.endSettleDate.substring(0, 4));
		int sm = Integer.parseInt(this.startSettleDate.substring(5, 7));
		int em = Integer.parseInt(this.endSettleDate.substring(5, 7));
		return (ey - sy) * 12 + (em - sm) + 1;
	}

	public String getCategoryName() {
		return this.componCategoryName;
	}

	public String getSpecificKey() {
		return this.buildingNum + this.componCategoryName + this.componSpecificName + this.recordId;
	}

}
