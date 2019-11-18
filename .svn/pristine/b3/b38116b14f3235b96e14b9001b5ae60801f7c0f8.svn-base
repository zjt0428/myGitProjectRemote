package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InspectSelfChooseDetail extends BaseModel {
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long detailId;
	
	@Expose
	private Long chooseId;
	
	/** 检查类型 */
	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_INSPECTION_TYPE", valueField = "inspectTypeName")
	private String inspectType;
	
	@Expose
	private String inspectTypeName;
	
	/** 检查内容 */
	@Expose
	private String detailContent;

}
