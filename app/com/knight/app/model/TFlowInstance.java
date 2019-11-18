package com.knight.app.model;

// Generated 2015-5-28 17:11:39 by Hibernate Tools 3.4.0.CR1

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.model.ComponDiary;

/**
 * TFlowInstance generated by hbm2java
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "流程实例", sheetName = "流程实例")
public class TFlowInstance extends BaseModel  implements ExportModel, Cloneable {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long insid;
	@Expose
	private Long userid;	
	@Expose
	private String userName;	
	@Expose
	private String applyDt;
	@Expose
	private Long depid;
	@Expose
	private String depname;
	@Expose
	private String content;
	@Expose
	private String flowType;
	@Expose
	private String flowName;
	@Expose
	private Long flowId;
	@Expose
	private Long chkUserid;
	@Expose
	private String chkUserName;	
	@Expose
	@CodeFieldDeclare(codeId = "APPFLOW_STATE", valueField = "stateName")
	private String state;
	@Expose
	private String stateName;
	@Expose
	private String copyUserNames;
	@Expose
	private Date startinDate;
	@Expose
	private Date endinDate;
	
	@Expose
	private String flowDesc;
	@Expose
	private Long seq;
	@Expose
	private Long lastSeq;
	
	@Expose
	private String hasView;
	
	@Expose
	private Long arcUserId;
	@Expose
	private String arcUserName;
	@Expose
	private Date arcDate;
	@Expose
	private String arcRemark;
	@Expose
	private String days;
	
	@Expose
	private String fileAttaches;
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<TFlowInstanceProcess> instanceProcessSet = new HashSet<TFlowInstanceProcess>();
}