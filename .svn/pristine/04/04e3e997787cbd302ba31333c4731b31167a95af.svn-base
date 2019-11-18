package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
* @author 作者 :czj
* @version 创建时间：2018年3月28日10:25:46
*  暂存库存
*/
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class ReturnTempStore extends BaseModel {
	private static final long serialVersionUID = 1L;

	@Expose
	private Long tempId;
	
	@Expose
	private Long depotId;
	
	@Expose
	private Long contractId;
	
	@Expose
	private String depotName;
	
	@Expose
	private MaterialsSpecifications materialsSpecifications;
	
	@Expose
	private String quantity;
	
}
