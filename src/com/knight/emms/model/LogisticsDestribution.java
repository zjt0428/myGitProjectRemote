
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class LogisticsDestribution extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long destributionId;

	@Expose
	private Long transportId;

	@Expose
	@CodeFieldDeclare(codeId = "componGeneric", valueField = "componGenericName")
	private String componGeneric;

	@Expose
	@CodeFieldDeclare(codeId = "componSpecific", valueField = "componSpecificName")
	private String componSpecific;

	@Expose
	private BigDecimal quantity;
	
	@Expose
	private String componGenericName;
	
	@Expose
	private String componSpecificName;


}
