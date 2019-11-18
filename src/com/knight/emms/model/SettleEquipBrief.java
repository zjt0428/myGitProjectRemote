/**
 *====================================================
 * 文件名称: SettleEquipBrief.java
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
 * @ClassName: SettleEquipBrief
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午4:02:24
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class SettleEquipBrief extends SettleBrief {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long seBriefId;

	@Expose
	private Long settleId;

	@Expose
	private Long equipDiaryId;

	@Expose
	private Long equipId;
	@Expose
	private Equipment equipment;

	@Expose
	private String recordSerial;

	@Expose
	private String recordId;

	@Expose
	private String exwSerial;

	@Expose
	private String equipCategoryName;

	@Expose
	private String equipSpecificName;

	@Expose
	private String buildingNum;

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
	private String monthTag;

	@Expose
	private String remark;

	@Expose
	private String taxRate;

	@Expose
	private String preTaxAmount;

	@Expose
	private String afterTaxAmount;

	@Expose
	private String taxes;
	
	@Expose
	private String equipSerial;
	
	@Expose
	private Long contractId;
	// ==============================================================================//
	public String getGroupKey() {
		return this.equipCategoryName + this.equipSpecificName + this.unit + this.startSettleDate + this.endSettleDate + this.settleDays + this.rentStandard
				+ this.measurement + this.quantity + this.daysRent + this.deductRent + this.summary + this.remark;
	}

	public int getMonthSub() {
		int sy = Integer.parseInt(this.startSettleDate.substring(0, 4));
		int ey = Integer.parseInt(this.endSettleDate.substring(0, 4));
		int sm = Integer.parseInt(this.startSettleDate.substring(5, 7));
		int em = Integer.parseInt(this.endSettleDate.substring(5, 7));
		return (ey - sy) * 12 + (em - sm) + 1;
	}

	public String getCategoryName() {
		return this.equipCategoryName;
	}

	public String getSpecificKey() {
		return this.buildingNum + this.equipCategoryName + this.equipSpecificName + this.recordId;
	}

}
