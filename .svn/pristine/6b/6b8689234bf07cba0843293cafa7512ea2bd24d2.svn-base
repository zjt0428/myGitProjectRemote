/**
 *====================================================
 * 文件名称: Dispatch.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @ClassName: Dispatch
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:00:19
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = false, exportName = "调度信息汇总", sheetName = "调度信息")
@SerialNumberStrategy(name = "dispatchSerial", strategy = "DD{yyyyMMdd}", maxseq = 999)
public class Dispatch extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long dispatchId;

	@Expose
	private String dispatchSerial;

	@Expose
	private String dispatchTheme;

	@Expose
	private Long deliveryEntId;

	@Expose
	private String deliveryEntName;

	@Expose
	private String deliveryAddress;

	@Expose
	private Long receiveEntId;

	@Expose
	private String receiveEntName;

	@Expose
	private String receiveAddress;
	@Expose
	private String contractSerial;

	@Expose
	private String teams;

	@Expose
	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	private BigDecimal autocraneAmount;

	@Expose
	private Long relateId;

	@Expose
	private String relateSerial;

	@Expose
	private String relateTheme;

	@Expose
	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	@Expose
	@CodeFieldDeclare(codeId = "autocraneDepend", valueField = "autocraneDependName")
	private String autocraneDepend;

	@Expose
	private String autocraneDependName;

	@Expose
	private String startPlanDate;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@Expose
	private String address;

	@Expose
	private String projectManager;

	@Expose
	private String entManager;

	private String remark;

	private Long userId;

	@Expose
	private String userName;

	private Long depId;

	@Expose
	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "DISPATCH_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;

	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	private String delFlag;

	@Expose
	private String recordId;

	@Expose
	private String exwSerial;
	
	@Expose
	private String isTransFinished;
	
	@Expose
	private Long contractId;
	
	@Expose
	private String competentDepartment;

	private Department department;
	
	/**状态（已装车，未装车）*/
	private String isTransport;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchEquip> dispatchEquipSet = new HashSet<DispatchEquip>(0);

	private String dispatchEquips = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchCompon> dispatchComponSet = new LinkedHashSet<DispatchCompon>(0);

	private String dispatchCompons = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchPracti> dispatchPractiSet = new HashSet<DispatchPracti>(0);

	private String dispatchPractis = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchAutocrane> dispatchAutocraneSet = new LinkedHashSet<DispatchAutocrane>(0);

	private String dispatchAutocranes = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchAllocate> towerCraneDispatchAllocateSet = new LinkedHashSet<DispatchAllocate>(0);

	private String towerCraneDispatchAllocates = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchAllocate> liftDispatchAllocateSet = new HashSet<DispatchAllocate>(0);

	private String liftDispatchAllocates = "";

	public Long getApplyforId() {
		return this.dispatchId;
	}

	public void setModelSerial(String serial) {
		this.dispatchSerial = serial;
	}

	// ================================================================================//
	public void setSubDispatch() {
		Set<DispatchEquip> dispatchEquipSet = GsonUtil.fromJson(this.getDispatchEquips(), new TypeToken<Set<DispatchEquip>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (dispatchEquipSet != null) {
			for (DispatchEquip p : dispatchEquipSet) {
				p.setDispatchId(this.getDispatchId());
			}
			this.setDispatchEquipSet(dispatchEquipSet);
		}

		Set<DispatchCompon> dispatchComponSet = GsonUtil.fromJson(this.getDispatchCompons(), new TypeToken<Set<DispatchCompon>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (dispatchComponSet != null) {
			for (DispatchCompon p : dispatchComponSet) {
				p.setDispatchId(this.getDispatchId());
				p.setProjectId(projectId);
			}
			this.setDispatchComponSet(dispatchComponSet);
		}

		Set<DispatchPracti> dispatchPractiSet = GsonUtil.fromJson(this.getDispatchPractis(), new TypeToken<Set<DispatchPracti>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (dispatchPractiSet != null) {
			for (DispatchPracti p : dispatchPractiSet) {
				p.setDispatchId(this.getDispatchId());
			}
			this.setDispatchPractiSet(dispatchPractiSet);
		}
		Set<DispatchAutocrane> dispatchAutocraneSet = GsonUtil.fromJson(this.getDispatchAutocranes(), new TypeToken<Set<DispatchAutocrane>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (dispatchAutocraneSet != null) {
			for (DispatchAutocrane p : dispatchAutocraneSet) {
				p.setDispatchId(this.getDispatchId());
			}
			this.setDispatchAutocraneSet(dispatchAutocraneSet);
		}
		Set<DispatchAllocate> towerCraneDispatchAllocateSet = GsonUtil.fromJson(this.getTowerCraneDispatchAllocates(), new TypeToken<Set<DispatchAllocate>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (towerCraneDispatchAllocateSet != null) {
			for (DispatchAllocate p : towerCraneDispatchAllocateSet) {
				p.setAllocateType("T");
				p.setDispatchId(this.getDispatchId());
			}
			this.setTowerCraneDispatchAllocateSet(towerCraneDispatchAllocateSet);
		}
		Set<DispatchAllocate> liftDispatchAllocateSet = GsonUtil.fromJson(this.getLiftDispatchAllocates(), new TypeToken<Set<DispatchAllocate>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (liftDispatchAllocateSet != null) {
			for (DispatchAllocate p : liftDispatchAllocateSet) {
				p.setAllocateType("S");
				p.setDispatchId(this.getDispatchId());
			}
			this.setLiftDispatchAllocateSet(liftDispatchAllocateSet);
		}
	}

}
