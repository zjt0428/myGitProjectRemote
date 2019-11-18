package com.knight.emms.model;


import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;

@Data
public class ReceiveManageDetail extends BaseModel {
	
	private static final long serialVersionUID = 1L;

	@Expose	
	private Long detailId;

	@Expose	
	private Long receiveId;

	@Expose	
	private String mnemonics;

	@Expose	
	private String specifications;

	@Expose	
	private String commodity;

	@Expose	
	private String unit;

	@Expose	
	private String locationCounts;

	@Expose	
	private String receiveCounts;

	@Expose	
	private int price;

	@Expose	
	private String amount;

	@Expose
	private String remark;

	@Expose	
	private String returnCounts;

	@Expose	
	private String returnDate;
	
	
}
