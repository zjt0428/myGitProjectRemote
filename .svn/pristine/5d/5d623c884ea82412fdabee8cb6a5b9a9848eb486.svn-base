package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
* @author 作者 :czj
* @version 创建时间：2017年10月30日 
*  回收管理 页签 入库数量中各库位的回收数量
*/
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare()
public class MaterialsRecycleCountTemp extends BaseModel {
	private static final long serialVersionUID = 1L;

	@Expose
	private Long tempId;
	
	@Expose
	private Long specificationsId;

	@Expose
	private Long recycleId;
	
	@Expose
	private Long locationId;
	
	@Expose
	private String locationName;
	
	@Expose
	private String quantity;

	
}
