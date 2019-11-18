package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class LogisticsTranDestribution extends BaseModel{
	private static final long serialVersionUID = 1L;

	@Expose
	private Long destributionId;

	@Expose
	private Long transportId;

	@Expose
	private Long logiId;

	@Expose
	@CodeFieldDeclare(codeId = "componGeneric", valueField = "componGenericName")
	private String componGeneric;

	@Expose
	@CodeFieldDeclare(codeId = "componSpecific", valueField = "componSpecificName")
	private String componSpecific;

	@Expose
	private BigDecimal quantity;
	
	@Expose
	private BigDecimal fillCounts;
	
	@Expose
	private String componGenericName;
	
	@Expose
	private String equipVender;
	
	@Expose
	private String componSpecificName;
	
	@Expose
	private String commSpecificName;
	
	@Expose
	private String calculate;
	
	@Expose
	private String dimensions;
	
	@Expose
	private Long disAllInitId;
	
	/**收费数量*/
	@Expose
	private BigDecimal chargeNum;
	
	/**单价*/
	@Expose
	private BigDecimal price;
	
	/**金额*/
	@Expose
	private BigDecimal amount;
}
