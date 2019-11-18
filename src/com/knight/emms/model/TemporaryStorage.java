package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;

@Data
public class TemporaryStorage extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Expose	
	private Long temporaryId;
	
	@Expose	
	private Long specificationsId;
	
	@Expose	
	private Long recycleId;
	
	@Expose	
	private String mnemonics;
	
	@Expose	
	private Long commodityId;
	
	@Expose	
	private String commodity;
	
	@Expose	
	private String specifications;
	
	@Expose	
	private String unit;
	
	@Expose	
	private String temporaryQuantity;
	
	@Expose	
	private String supplementUnit;
	
	@Expose	
	private String supplementQuantity;
	
	@Expose	
	private String remark;

	@Expose	
	private String conversionNum;
	
	
	
}
