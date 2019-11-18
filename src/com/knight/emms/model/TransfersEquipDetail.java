package com.knight.emms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.system.model.Department;

/**
 * @ClassName: TransfersEquipDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@EqualsAndHashCode(callSuper=false)
@PersistantDeclare
public class TransfersEquipDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long edetailId;
	
	@Expose
	private Long depottId;
	
	@Expose
	private Long equipId;
	
	@Expose
	private Equipment equipment;

	@Expose
	private Long storeId;
	
	@Expose
	private Long depId;
	
	@Expose
	private Department department;
}
