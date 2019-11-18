package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
* @author 作者 :jlh
* @version 创建时间：2017年10月17日 上午9:59:39
*  周材仓库
*/
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class BasedepotJoinMaterials extends BaseModel {
	private static final long serialVersionUID = 1L;

	@Expose
	private Long storeMaterialsId;
	
	
	@Expose
	private Long counts;
	
	@Expose
	private BaseDepot baseDepot;
	
	@Expose
	private MaterialsSpecifications materialsSpecifications;
	
}
