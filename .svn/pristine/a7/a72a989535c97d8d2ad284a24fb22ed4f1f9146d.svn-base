/**
 *====================================================
 * 文件名称: RentSpecificItem.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月12日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

import com.knight.emms.model.RentComponBrief;
import com.knight.emms.model.RentEquipBrief;

/**
 * @ClassName: RentSpecificItem
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月12日 上午8:12:27
 */
@Data
public class RentSpecificItem {

	// 楼号
	private String buildingNum;

	// 品名
	private String categoryName;

	// 规格
	private String specificName;

	// 备案编号
	private String recordId;

	// 单位
	private String unit;

	// 应扣租金
	private BigDecimal deductRent = BigDecimal.ZERO;

	// 小计
	private BigDecimal summary = BigDecimal.ZERO;

	// 租金项
	private List<RentRentItem> rentRentItems = new ArrayList<RentRentItem>();

	@Data
	public static class RentRentItem {

		// 开始日
		private String startRentDate;

		// 截止日
		private String endRentDate;

		// 计费天数
		private Integer rentDays;

		// 租金标准
		private BigDecimal rentStandard;

		// 租金单位
		private String measurement;

		// 租用数量
		private Integer quantity;

		// 日租金（元）
		private BigDecimal daysRent;

		// 租金累计（元）
		private BigDecimal summary;

		// 备注
		private String remark;
	}

	public void addRentEquipBrief(RentEquipBrief brief) {
		this.buildingNum = brief.getBuildingNum();
		this.categoryName = brief.getEquipCategoryName();
		this.specificName = brief.getEquipSpecificName();
		this.recordId = brief.getRecordId();
		this.unit = brief.getUnit();
		this.deductRent = this.deductRent.add(brief.getDeductRent());
		this.summary = this.summary.add(brief.getSummary());
		RentRentItem item = new RentRentItem();
		item.setStartRentDate(brief.getStartRentDate());
		item.setEndRentDate(brief.getEndRentDate());
		item.setRentDays(brief.getRentDays());
		item.setRentStandard(brief.getRentStandard());
		item.setMeasurement(brief.getMeasurement());
		item.setQuantity(brief.getQuantity());
		item.setDaysRent(brief.getDaysRent());
		item.setSummary(brief.getSummary());
		item.setRemark(brief.getRemark());
		rentRentItems.add(item);
	}

	public void addRentComponBrief(RentComponBrief brief) {
		this.categoryName = brief.getComponCategoryName();
		this.specificName = brief.getComponSpecificName();
		this.recordId = brief.getRecordId();
		this.unit = brief.getUnit();
		this.deductRent = this.deductRent.add(brief.getDeductRent());
		this.summary = this.summary.add(brief.getSummary());
		RentRentItem item = new RentRentItem();
		item.setStartRentDate(brief.getStartRentDate());
		item.setEndRentDate(brief.getEndRentDate());
		item.setRentDays(brief.getRentDays());
		item.setRentStandard(brief.getRentStandard());
		item.setMeasurement(brief.getMeasurement());
		item.setQuantity(brief.getQuantity());
		item.setDaysRent(brief.getDaysRent());
		item.setSummary(brief.getSummary());
		item.setRemark(brief.getRemark());
		rentRentItems.add(item);
	}

}
