package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;

/**
 * @ClassName: LeaseBlockUpDetail
 * @Description: TODO(报停管理明细)
 * @author chenzj
 * @date 2018年6月8日15:00:33
 */

@Data
public class LeaseBlockUpDetail extends BaseModel{
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long detailId;
	
	@Expose
	private Long blockId;
	
	@Expose
	private String item;
	
	@Expose
	private String amount;
	
	
}