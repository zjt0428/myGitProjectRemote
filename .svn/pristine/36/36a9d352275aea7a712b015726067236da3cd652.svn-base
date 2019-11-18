package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class Car extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long carId;

	@Expose
	private String licensePlate;

	@Expose
	private String idCard;

	@Expose
	private String sedan;

	@Expose
	private String propertyName;

	private String engineNumber;

	private Date scrapDate;

	@Expose
	private BigDecimal nominalLoad;

	private Date purchaseDate;

	@Expose
	private String propertyBelong;

	@Expose
	private String driver;

	@Expose
	private String driverPhone;

	@Expose
	private BigDecimal disbursement;

	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "USED_SIMPLE_STATUS", valueField = "statusName")
	private String status;// 0:在用 1：闲置

	@Expose
	private String statusName;

	private String delFlag;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<CarExpense> carExpenseSet = new HashSet<CarExpense>(0);

	private String carExpenses = "";

	public void setSubCar() {
		Set<CarExpense> carExpenseSet = GsonUtil.fromJson(this.getCarExpenses(), new TypeToken<Set<CarExpense>>() {});
		if (carExpenseSet != null) {
			disbursement = BigDecimal.ZERO;
			for (CarExpense ce : carExpenseSet) {
				ce.setCarId(this.getCarId());
				disbursement = disbursement.add(ce.getPaymentAmount());
			}
		}
		this.setCarExpenseSet(carExpenseSet);
	}

}
