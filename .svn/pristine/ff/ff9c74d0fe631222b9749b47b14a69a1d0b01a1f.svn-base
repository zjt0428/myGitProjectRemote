package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.model.UserExtend;

@Data
@ToString(callSuper = false)
@PersistantDeclare(isExportable = true, exportName = "派工记录汇总", sheetName = "派工记录")
@SerialNumberStrategy(name = "dispatchSerial", strategy = "PG{yyyyMMdd}", maxseq = 9999)
public class PractiDispatch extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long dispatchId;

	@Expose
	private String dispatchSerial;

	//历史工种
	@Expose
	@CodeFieldDeclare(codeId = "kindWork", valueField = "kindWorkNameHis")
	private String kindWorkHis;
	@Expose
	private String kindWorkNameHis;
	
	//调度后的工种（当前）
	@Expose
	@CodeFieldDeclare(codeId = "kindWork", valueField = "kindWorkName")
	private String kindWork;
	@Expose
	private String kindWorkName;

	//历史项目
	@Expose
	private Long projectIdHis;
	@Expose
	private String projectNameHis;
	
	//调度后的项目（当前）
	@Expose
	private Long projectId;
	@Expose
	private String projectName;

	//历史班组
	@Expose
	private String teamsHis;

	//调度后的班组（当前）
	@Expose
	private String teams;
	
	@Expose
	private String remark;
	
	@Expose
	private Long userId;

	@Expose
	private String userName;
	
	@Expose
	private String createTime;
	
	private String delFlag = Constant.ENABLED;

	//交底状态，作为劳务公司查询未交底人员，开展交底教育的参考
	@Expose
	@CodeFieldDeclare(codeId = "PRACTI_DISCLOSE_STATE", valueField = "discloseStateName")
	private String discloseState;
	
	@Expose
	private String discloseStateName;
	
	@Expose
	@CodeFieldDeclare(codeId = "PRACTI_DISPATCH_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	private Long practiId;

	@Expose
	private Practitioner practitioner;

	// ==========================================================================================//
	@Override
	public Long getApplyforId() {
		return this.dispatchId;
	}
	
	@Override
	public void setModelSerial(String serial) {
		this.dispatchSerial = serial;
	}
	
	@Override
	public String getModelSerial() {
		return this.dispatchSerial;
	}
}
