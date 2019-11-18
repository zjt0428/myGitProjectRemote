package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
* @author 作者 :czj
* @version 创建时间：2017年10月19日 
*  项目周材库存
*/
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class ProjectMaterialsStore extends BaseModel {
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long storeId;
	
	@Expose
	private Project project;
	
	@Expose
	private MaterialsSpecifications materialsSpecifications;
	
	@Expose
	private String quantity;
	
}
