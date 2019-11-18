package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;

/**
 * @ClassName: InsideBlockUpDetail
 * @Description: 【租借报停】内部结算费用
 * @author chenzj
 * @date 2018-8-16 15:59:27
 */

@Data
public class InsideBlockUpDetail extends BaseModel{
	
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