package com.knight.app.model;

import java.util.Date;
import java.util.List;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;

@Data
@PersistantDeclare
public class InspectRectify extends BaseModel {
	
	private static final long serialVersionUID = 1L;

	@Expose
	private Long inspectRectifyId;
	
	@Expose
	private Long inspectId;
	
	@Expose
	private Date rectifyDate;
	
	@Expose
	private long rectifyUserId;
	
	@Expose
	private String rectifyUsername;
	
	@Expose
	@CodeFieldDeclare(codeId="INSPECT_RESULT",valueField="rectifyResultName")
	private String rectifyResult;
	
	@Expose
	private String rectifyResultName;
	
	@Expose
	private String rectifyIntroduce;
	
	@Expose
	private String fileAttaches;
	
	@Expose
	private String longitude;

	@Expose
	private String latitude;
	
	@Expose
	private String remark;

	
	@Expose
	private List<String> imgList;
}
