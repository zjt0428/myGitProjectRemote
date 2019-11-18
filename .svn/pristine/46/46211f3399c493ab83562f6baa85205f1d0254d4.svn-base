package com.knight.emms.model;

import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * 退场计划
 * 
 * @author lbf
 *
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "退场计划", sheetName = "退场计划")
@SerialNumberStrategy(name = "exeuntPlanSerial", strategy = "TCJH{yyyyMMdd}", maxseq = 999)
public class ExeuntPlan extends ApplyforState implements ExportModel{

	private static final long serialVersionUID = 1L;

	@Expose
	private Long exeuntPlanId;

	@Expose
	private String exeuntPlanSerial;

	@Expose
	private String declareDate;

	@Expose
	private Long projectId;
	@Expose
	private String projectName;

	@Expose
	@CodeFieldDeclare(codeId = "projectType", valueField = "projectTypeName")
	private String projectType;

	@Expose
	private String projectTypeName;

	@Expose
	private String planApplicant;

	@Expose
	@CodeFieldDeclare(codeId = "belongToArea", valueField = "belongToAreaName")
	private String belongToArea;

	@Expose
	private String belongToAreaName;

	@Expose
	@CodeFieldDeclare(codeId = "planType", valueField = "planTypeName")
	private String planType;

	@Expose
	private String planTypeName;

	@Expose
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;

	@Expose
	private String assetsPropertyName;

	@Expose
	private Long backStoreId;
	@Expose
	private String backStoreName;

	@Expose
	private String workFlow;

	@Expose
	private String title;

	@Expose
	private String projectSchedule;

	@Expose
	private String remark;

	// ------------------------
	@Expose
	private Long userId;

	@Expose
	@CodeFieldDeclare(codeId = "EXEUNT_PLAN_STATUS", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	@Override
	public Long getApplyforId() {
		return this.exeuntPlanId;
	}

	@Override
	public void setModelSerial(String serial) {
		this.exeuntPlanSerial = serial;
	}
	@Expose
	private String demandDetailForExeuntPlans = "";

	@Expose(deserialize = false, serialize = false)
	private Set<DemandDetailForExeuntPlan> demandDetailForExeuntPlanSet;

	// ==============================================================================//
	public void setDemandDetail() {
		demandDetailForExeuntPlanSet = GsonUtil.fromJson(this.getDemandDetailForExeuntPlans(),
				new TypeToken<Set<DemandDetailForExeuntPlan>>() {
				});
		if (demandDetailForExeuntPlanSet != null) {
			for (DemandDetailForExeuntPlan p : demandDetailForExeuntPlanSet) {
				p.setExeuntPlanId(exeuntPlanId);
			}
		}
	}
}
