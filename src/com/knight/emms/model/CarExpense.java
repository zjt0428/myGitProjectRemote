package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class CarExpense extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long carExpenseId;

	@Expose
	private Long carId;

	@Expose
	private String expense;

	@Expose
	private BigDecimal paymentAmount;

	@Expose
	private String instructions;

	@Expose
	private String practiName;

	@Expose
	private String mileage;

	@Expose
	private String oilWear;

	@Expose
	private String spendDate;

	@Expose
	private String remark;

}
