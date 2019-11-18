/**
 *====================================================
 * 文件名称: SettleRecordIdItem.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月4日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

import com.knight.emms.model.SettleComponBrief;
import com.knight.emms.model.SettleEquipBrief;
import com.knight.emms.model.SettleItemBrief;

/**
 * @ClassName: SettleRecordIdItem
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月4日 下午7:08:29
 */
@Data
public class SettleBuildingNumItem {

	// 楼号
	private String buildingNum;

	// 应扣租金
	private BigDecimal deductRent = BigDecimal.ZERO;

	// 小计
	private BigDecimal summary = BigDecimal.ZERO;

	// 租金项
	private List<SettleRentItem> settleRentItems = new ArrayList<SettleRentItem>();

	@Data
	public static class SettleRentItem {

		// 楼号
		private String buildingNum;

		// 品名
		private String categoryName;

		// 规格
		private String specificName;

		// 单位
		private String unit;

		// 开始日
		private String startSettleDate;

		// 截止日
		private String endSettleDate;

		// 计费天数
		private Integer settleDays;

		// 租金标准
		private BigDecimal rentStandard;

		// 租金单位
		private String measurement;

		// 租用数量
		private Integer quantity;

		// 日租金（元）
		private BigDecimal daysRent;

		// 应扣租金
		private BigDecimal deductRent;

		// 租金累计（元）
		private BigDecimal summary;

		// 备注
		private String remark;
	}

	public void addSettleEquipBrief(SettleEquipBrief brief) {
		this.buildingNum = brief.getBuildingNum();
		this.deductRent = this.deductRent.add(brief.getDeductRent());
		this.summary = this.summary.add(brief.getSummary());
		SettleRentItem item = new SettleRentItem();
		item.setBuildingNum(brief.getBuildingNum());
		item.setCategoryName(brief.getEquipCategoryName());
		item.setSpecificName(brief.getEquipSpecificName());
		item.setUnit(brief.getUnit());
		item.setStartSettleDate(brief.getStartSettleDate());
		item.setEndSettleDate(brief.getEndSettleDate());
		item.setSettleDays(brief.getSettleDays());
		item.setRentStandard(brief.getRentStandard());
		item.setMeasurement(brief.getMeasurement());
		item.setQuantity(brief.getQuantity());
		item.setDaysRent(brief.getDaysRent());
		item.setDeductRent(brief.getDeductRent());
		item.setSummary(brief.getSummary());
		item.setRemark(brief.getRemark());
		settleRentItems.add(item);
	}

	public void addSettleComponBrief(SettleComponBrief brief) {
		this.buildingNum = brief.getBuildingNum();
		this.deductRent = this.deductRent.add(brief.getDeductRent());
		this.summary = this.summary.add(brief.getSummary());
		SettleRentItem item = new SettleRentItem();
		item.setCategoryName(brief.getComponCategoryName());
		item.setSpecificName(brief.getComponSpecificName());
		item.setUnit(brief.getUnit());
		item.setStartSettleDate(brief.getStartSettleDate());
		item.setEndSettleDate(brief.getEndSettleDate());
		item.setSettleDays(brief.getSettleDays());
		item.setRentStandard(brief.getRentStandard());
		item.setMeasurement(brief.getMeasurement());
		item.setQuantity(brief.getQuantity());
		item.setDaysRent(brief.getDaysRent());
		item.setDeductRent(brief.getDeductRent());
		item.setSummary(brief.getSummary());
		item.setRemark(brief.getRemark());
		settleRentItems.add(item);
	}
	
	public void addSettleItemBrief(SettleItemBrief brief) {
		this.buildingNum = brief.getBuildingNum();
		this.deductRent = this.deductRent.add(brief.getDeductRent());
		this.summary = this.summary.add(brief.getSummary());
		SettleRentItem item = new SettleRentItem();
		item.setCategoryName(brief.getSettleItemName());
		item.setSpecificName(null);
		item.setUnit(null);
		item.setStartSettleDate(null);
		item.setEndSettleDate(null);
		item.setSettleDays(null);
		item.setRentStandard(brief.getUnitprice());
		item.setMeasurement(brief.getMeasurement());
		item.setQuantity(brief.getQuantity());
		item.setDaysRent(null);
		item.setDeductRent(brief.getDeductRent());
		item.setSummary(brief.getSummary());
		item.setRemark(brief.getRemark());
		settleRentItems.add(item);
	}

}
