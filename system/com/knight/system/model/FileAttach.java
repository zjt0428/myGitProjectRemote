package com.knight.system.model;

import java.util.Date;

import lombok.Data;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

@Data

public class FileAttach extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	@Expose
	protected Long fileId;

	@Expose
	protected Long dependId;

	@Expose
	protected String dependName;

	@Expose
	protected String fileName;

	@Expose
	protected String filePath;

	@Expose
	protected Date createtime;

	@Expose
	protected String ext;

	@Expose
	protected String fileType;

	@Expose
	protected String note;

	@Expose
	protected String creator;
	
	@Expose
	protected String source;
	
	@Expose
	protected String remark;

	public String getFirstKeyColumnName() {
		return "fileId";
	}

	public Long getId() {
		return this.fileId;
	}
}