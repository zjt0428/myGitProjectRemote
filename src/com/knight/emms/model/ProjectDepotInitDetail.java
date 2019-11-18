package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;


@Data
@PersistantDeclare
public class ProjectDepotInitDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	
	@Expose
	private Long detailId;
	
	@Expose
	private Long projectInitId;
	
	/**规格*/
	@Expose	
	private Long specificationsId;
	
	/**助记码*/
	@Expose	
	private String mnemonics;

	/**品名*/
	@Expose	
	private String commodity;
	
	/**规格*/
	@Expose	
	private String specifications;

	/**数量*/
	@Expose	
	private String quantity;

	/**单位*/
	@Expose	
	private String unit;

	/**辅助数量*/
	@Expose	
	private String supplementQuantity;

	/**辅助单位*/
	@Expose	
	private String supplementUnit;
	
	/**换算数量*/
	@Expose	
	private String convertedQuantity;
}
