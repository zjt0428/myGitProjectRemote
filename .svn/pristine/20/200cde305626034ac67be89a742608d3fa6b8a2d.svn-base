/**
 *====================================================
 * 文件名称: EquipMaint.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;
import java.util.HashSet;
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
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: EquipMaint
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:50:21
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare(isExportable = true, exportName = "保养信息汇总", sheetName = "保养信息")
@SerialNumberStrategy(name = "maintSerial", strategy = "BY{yyyyMMdd}", maxseq = 99)
public class EquipMaint extends BusinessModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long maintId;

	@Expose
	private String maintSerial;
	
	@Expose
	private String practiName;

	@Expose
	private Integer cycleTimes;

	@Expose
	private Date maintDate;
	
	@Expose
	private Date lastMaintDate;

	@Expose
	private Date thisEndCycleDate;

	private String maintPepoles;

	@Expose
	@CodeFieldDeclare(codeId = "INSPECT_RESULT", valueField = "maintResultName")
	private String maintResult;

	@Expose
	private String maintResultName;

	@Expose
	@CodeFieldDeclare(codeId = "SCHEMA_FORM_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	@Expose
	private String repairStatus;
	@Expose
	private String corpId;
	
	@Expose
	private Equipment equipment;
	
	@Expose
	private String basics;
	@Expose
	private String amplitude;
	@Expose
	private String rotation;
	@Expose
	private String lift;
	@Expose
	private String electric;
	@Expose
	private String safe;
	@Expose
	private String wire;
	@Expose
	private String hook;
	@Expose
	private String drum;
	@Expose
	private String counterweight;
	@Expose
	private String cab;
	@Expose
	private String complete;
	@Expose
	private String brake;
	@Expose
	private String licensePlate;
	@Expose
	private String summary;
	
	@Expose
	private EquipMaintSchema equipMaintSchema;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipMaintDetail> equipMaintDetailSet = new HashSet<EquipMaintDetail>();

	private String equipMaintDetails = "";

    @Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipMaintCompon> equipMaintComponSet = new HashSet<EquipMaintCompon>();

	private String equipMaintCompons = "";

	public void setModelSerial(String serial) {
		this.maintSerial = serial;
	}

	// ==========================================================================================//
	public void setSubEquipMaint() {
		Set<EquipMaintDetail> equipMaintDetailSet = GsonUtil.fromJson(this.getEquipMaintDetails(), new TypeToken<Set<EquipMaintDetail>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (equipMaintDetailSet != null) {
			for (EquipMaintDetail e : equipMaintDetailSet) {
				e.setMaintId(this.getMaintId());
			}
			this.setEquipMaintDetailSet(equipMaintDetailSet);
		}
        Set<EquipMaintCompon> equipMaintComponSet = GsonUtil.fromJson(this.getEquipMaintCompons(), new TypeToken<Set<EquipMaintCompon>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (equipMaintComponSet != null) {
			for (EquipMaintCompon e : equipMaintComponSet) {
				e.setMaintId(this.getMaintId());
			}
			this.setEquipMaintComponSet(equipMaintComponSet);
		}
	}

}
