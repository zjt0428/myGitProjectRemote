/**
 *====================================================
 * 文件名称: EquipRepair.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月6日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Type;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: EquipRepair
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月6日 上午8:50:47
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "维修信息汇总", sheetName = "维修信息")
@SerialNumberStrategy(name = "repairSerial", strategy = "WX{yyyyMMdd}", maxseq = 99)
public class EquipRepair extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long repairId;

	@Expose
	private String repairSerial;

	@Expose
	private Long relateId;
	
	@Expose
	private String licensePlate;
	
	@Expose
	private String relateSerial;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	@Expose
	private String buildingNum;

	@Expose
	private Long repairManId;

	@Expose
	private String repairMan;
	
	@Expose
	private String schemaName;

	@Expose
	private String renewalDescription;

	@Expose
	private String renewalDate;

	@Expose
	private BigDecimal repairAmount;

	@Expose
	@CodeFieldDeclare(codeId = "INSPECT_RESULT", valueField = "repairResultName")
	private String repairResult;

	@Expose
	private String repairResultName;

	@Expose
	private String repairDate;

	@Expose
	private String damageDate;

	@Expose
	private String preventiveMeasures;

	@Expose
	private String remark;

	@Expose
	@CodeFieldDeclare(codeId = "HANDLE_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private Date providedDate;
	
	@Expose
	private String completionedDate;

	@Expose
	private String phenomenon;

	@Expose
	@CodeFieldDeclare(codeId = "REPAIR_RUNNING_STATE", valueField = "runningStateName")
	private String runningState;

	@Expose
	private String runningStateName;
	
	@Expose
	@CodeFieldDeclare(codeId = "REPAIR_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private Department department;

	@Expose
	private Project project;

	@Expose
	private Equipment equipment;
		
	   //入库时间
    @Expose
    private String warehouseDate;

    
	/**维修班组*/
	@Expose
	private Long teamId;
	
	/**维修班组*/
	@Expose
	private String teamName;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipRepairCompon> equipRepairOldComponSet = new HashSet<EquipRepairCompon>();

	private String equipRepairOldCompons = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipRepairCompon> equipRepairNewComponSet = new HashSet<EquipRepairCompon>();

	private String equipRepairNewCompons = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipRepairLocation> equipRepairLocationSet = new HashSet<EquipRepairLocation>();

	private String equipRepairLocations = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipRepairVehicle> equipRepairVehicleSet = new HashSet<EquipRepairVehicle>();
	
	private String equipRepairVehicles = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchAllocate> towerCraneDispatchAllocateSet = new LinkedHashSet<DispatchAllocate>(0);

	private String towerCraneDispatchAllocates = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DispatchAllocate> liftDispatchAllocateSet = new HashSet<DispatchAllocate>(0);

	private String liftDispatchAllocates = "";

	public Long getApplyforId() {
		return this.repairId;
	}

	public void setModelSerial(String serial) {
		this.repairSerial = serial;
	}

	// ==========================================================================================//
	public void setSubEquipRepair() {
		Set<EquipRepairCompon> equipRepairOldComponSet = GsonUtil.fromJson(this.getEquipRepairOldCompons(), new TypeToken<Set<EquipRepairCompon>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (equipRepairOldComponSet != null) {
			for (EquipRepairCompon e : equipRepairOldComponSet) {
				e.setRepairId(this.getRepairId());
				e.setType(Type.RepairCompon.original);
			}
			this.setEquipRepairOldComponSet(equipRepairOldComponSet);
		}
		Set<EquipRepairCompon> equipRepairNewComponSet = GsonUtil.fromJson(this.getEquipRepairNewCompons(), new TypeToken<Set<EquipRepairCompon>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (equipRepairNewComponSet != null) {
			for (EquipRepairCompon e : equipRepairNewComponSet) {
				e.setRepairId(this.getRepairId());
				e.setType(Type.RepairCompon.renewal);
			}
			this.setEquipRepairNewComponSet(equipRepairNewComponSet);
		}
		Set<EquipRepairLocation> equipRepairLocationSet = GsonUtil.fromJson(this.getEquipRepairLocations(), new TypeToken<Set<EquipRepairLocation>>() {}, DateUtil.LINK_DISPLAY_DATE_FULL);
		if (equipRepairLocationSet != null) {
			for (EquipRepairLocation e : equipRepairLocationSet) {
				e.setRepairId(this.getRepairId());
			}
			this.setEquipRepairLocationSet(equipRepairLocationSet);
		}
		Set<EquipRepairVehicle> equipRepairVehicleSet = GsonUtil.fromJson(this.getEquipRepairVehicles(), new TypeToken<Set<EquipRepairVehicle>>() {}, DateUtil.LINK_DISPLAY_DATE_FULL);
		if (equipRepairVehicleSet != null) {
			for (EquipRepairVehicle e : equipRepairVehicleSet) {
				e.setRepairId(this.getRepairId());
			}
			this.setEquipRepairVehicleSet(equipRepairVehicleSet);
		}
		Set<DispatchAllocate> towerCraneDispatchAllocateSet = GsonUtil.fromJson(this.getTowerCraneDispatchAllocates(), new TypeToken<Set<DispatchAllocate>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (towerCraneDispatchAllocateSet != null) {
			for (DispatchAllocate p : towerCraneDispatchAllocateSet) {
				p.setAllocateType("T");
				p.setDispatchId(this.getRepairId());
			}
			this.setTowerCraneDispatchAllocateSet(towerCraneDispatchAllocateSet);
		}
		Set<DispatchAllocate> liftDispatchAllocateSet = GsonUtil.fromJson(this.getLiftDispatchAllocates(), new TypeToken<Set<DispatchAllocate>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (liftDispatchAllocateSet != null) {
			for (DispatchAllocate p : liftDispatchAllocateSet) {
				p.setAllocateType("S");
				p.setDispatchId(this.getRepairId());
			}
			this.setLiftDispatchAllocateSet(liftDispatchAllocateSet);
		}
	}

}
