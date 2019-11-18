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
public class ProjectExpense extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long projectExpenseId;

	@Expose
	private Long projectId;

	@Expose
	private String spendDate;

	@Expose
	private String discription;

	@Expose
	private String status;

	@Expose
	private BigDecimal expenseAmount;

	@Expose
	private String expenseDesc;

	@Expose
	private String remark;

}
