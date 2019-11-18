/**
 *====================================================
 * 文件名称: EquipInspect.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.app.model.InspectRectify;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: EquipInspect
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "巡检信息汇总", sheetName = "巡检信息")
@SerialNumberStrategy(name = "inspectSerial", strategy = "XJ{yyyyMMdd}", maxseq = 9999)
public class EquipInspect extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long inspectId;

	@Expose
	private String inspectSerial;

	@Expose
	private Integer cycleTimes;

	@Expose
	private Date thisEndCycleDate;

	@Expose
	private Date inspectDate;

	@Expose
	private String inspectPepoles;

	@Expose
	@CodeFieldDeclare(codeId = "INSPECT_RESULT", valueField = "inspectResultName")
	private String inspectResult;

	@Expose
	private String inspectResultName;

	@Expose
	@CodeFieldDeclare(codeId = "SCHEMA_FORM_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	@Expose
	private String remark;

	@Expose
	private String longitude;

	@Expose
	private String latitude;

	@Expose
	private String address;

	@Expose
	private String licensePlate;

	@Expose
	private String fileAttaches;

	@Expose
	private String repairStatus;

	@Expose
	private EquipInspectSchema equipInspectSchema;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private String buildingNum;
	
	@Expose
	private Long inspectRectifyId;
	
	@Expose
	private InspectRectify inspectRectify;
	
	/** 整改进度(代码 0:计划中/1:待整改/2:待复查:/3:完成:/4:结案)（未完成=计划中+待整改）*/
	@Expose
	private String inspectSchedule;
	
	/** 巡检项目 */
	@Expose
    @CodeFieldDeclare(codeId = "verifyType", valueField = "verifyTypeName")
	private String verifyType;
	
	private String verifyTypeName;
	
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
	private Date rectifyDate;
	
	@Expose
	private String recordId;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipInspectDetail> equipInspectDetailSet = new HashSet<EquipInspectDetail>();

	private String equipInspectDetails = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<CostInspect> costInspectSet = new HashSet<CostInspect>();

	private String costInspects = "";
	
	@Expose
	private String paEntName;
	
	@Expose
	private String depName;
	
	@Expose
	@CodeFieldDeclare(codeId="RECTIFICATION",valueField="rectificationName")
	private String rectification;
	
	@Expose
	private String rectificationName;

	private String flowState;
	
	/**封存状态*/
	@Expose
	@CodeFieldDeclare(codeId="SEAL_STATUS",valueField="sealStatusName")
	private String sealStatus;
	
	@Expose
	private String sealStatusName;
	
	/**项目经理*/
	@Expose
	private String materialPractiName;

	public void setModelSerial(String serial) {
		this.inspectSerial = serial;
	}

	// ==========================================================================================//
	public void setSubEquipInspect() {
		Set<EquipInspectDetail> equipInspectDetailSet = GsonUtil.fromJson(this.getEquipInspectDetails(), new TypeToken<Set<EquipInspectDetail>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (equipInspectDetailSet != null) {
			for (EquipInspectDetail e : equipInspectDetailSet) {
				e.setInspectId(this.getInspectId());
			}
			this.setEquipInspectDetailSet(equipInspectDetailSet);
		}
		
		Set<CostInspect> costInspectSet = GsonUtil.fromJson(this.getCostInspects(), new TypeToken<Set<CostInspect>>() {});
		if (costInspectSet != null) {
			for (CostInspect e : costInspectSet) {
				e.setInspectId(this.getInspectId());
			}
			this.setCostInspectSet(costInspectSet);
		}
	}

	@Override
	public Long getUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Long getApplyforId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setApplyforState(String applyforState) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getApplyforState() {
		// TODO Auto-generated method stub
		return null;
	}

}
