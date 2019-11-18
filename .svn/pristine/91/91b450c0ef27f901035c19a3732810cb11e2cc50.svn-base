/**
 *====================================================
 * 文件名称: SalaryPracti.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: SalaryPracti
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午3:12:04
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class SalaryPracti extends BaseModel {

	private static final long serialVersionUID = 1L;

	private Long salaryPractiId;

	private Long salaryId;

	private Integer monthId;

	private String salaryMonth;

	private Long practiId;

	private String practiName;

	private String practiTel;

	private BigDecimal baseSalary;

	private BigDecimal station;

	private BigDecimal overtimeWork;

	private BigDecimal mealFee;

	private BigDecimal housingFund;

	private BigDecimal tax;

	private BigDecimal otherDeduct;

	private BigDecimal otherItems;

	private BigDecimal reward;

	private BigDecimal totalAmount;

	private BigDecimal deductAmount;

	private BigDecimal finalAmount;

	private BigDecimal insurancePremium;

	private BigDecimal attendance;

	private BigDecimal daibanFee;

	private BigDecimal dinnerPartyFee;
	
	private BigDecimal driveSubsidies;
	
	private BigDecimal houseSubsidies;
	
	private BigDecimal telephoneFee;
	
	private BigDecimal perAttendance;
	
	private BigDecimal fine;
	
	private BigDecimal borrowFee;
	
	private BigDecimal monthPay;
	
	private BigDecimal nonPayment;
	
	private BigDecimal accBalance;

	private String remark;

	public BigDecimal getSummaryAmount() {
		this.totalAmount = baseSalary.add(station).add(overtimeWork).add(mealFee).add(otherItems).add(reward)
				.add(daibanFee).add(dinnerPartyFee).add(driveSubsidies).add(houseSubsidies).add(telephoneFee)
				.add(perAttendance);
		this.deductAmount = insurancePremium.add(housingFund).add(tax).add(otherDeduct).add(borrowFee).add(fine);
		this.finalAmount = this.totalAmount.subtract(this.deductAmount);
		return this.finalAmount;
	}
}
