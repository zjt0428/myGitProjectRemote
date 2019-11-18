package com.knight.system.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.Constants;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;

@Data
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = false)
public class Department extends BaseModel {

	private static final long serialVersionUID = 1L;

	public static final Long TOP_DEPID = 0L;
	
	public static final String LABOUR_DEP_SERIAL = "02";
	@Expose
	private Long depId;

	@Expose
	private String depSerial;

	@Expose
	private String depName;

	@Expose
	private String depDesc;
	
	@Expose
	@CodeFieldDeclare(codeId = "DEP_TYPE", valueField = "depTypeName")
	private String depType = Constants.DEP_CORPORATION;
	
	@Expose
	private String depTypeName;

	@Expose
	private Integer depLevel;

	@Expose
	private Long parentId;

	@Expose
	private String path;
	
	@Expose
	private Integer sortField;

	private Short delFlag = Constants.ENABLED;

	public Department() {
	}

	public Department(Long depId) {
		this.depId = depId;
	}

}