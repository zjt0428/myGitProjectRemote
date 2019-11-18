/**
 *====================================================
 * 文件名称: Pickup.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
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
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: Pickup
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 上午8:07:03
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "领用信息汇总", sheetName = "领用信息")
@SerialNumberStrategy(name = "pickupSerial", strategy = "LY{0}", maxseq = 999999)
public class Pickup extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long pickupId;

	@Expose
	private String pickupSerial;

	@Expose
	private String pickupTheme;
	
	@Expose
	@CodeFieldDeclare(codeId = "pickupPurpose", valueField = "pickupPurposeName")
	private String pickupPurpose;

	@Expose
	private String pickupPurposeName;

	private String description;

	@Expose
	private String recipients;
	
	@Expose 
	private String recipientsDepName;

	@Expose
	private String pickupDate;

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
	@CodeFieldDeclare(codeId = "PICKUP_STATUS", valueField = "pickupStatusName")
	private String pickupStatus;

	@Expose
	public String pickupStatusName;
	
	@Expose
	private String projectName;

	private Long userId;

	private String userName;

	private Long depId;

	@Expose
	private String providedDate;

	private String delFlag;

	@Expose
	private BigDecimal pickupAmount;

	@Expose
	private BigDecimal paidAmount;
	
	@Expose
	private BigDecimal totalAmount;
	
	@Expose
	private Department department;

	@Expose
	private Project project;

	@Expose
	private Equipment equipment;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	private String remark;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PickupComponent> pickupComponentSet = new HashSet<PickupComponent>();

	private String pickupComponents;

	public Long getApplyforId() {
		return this.pickupId;
	}

	public void setModelSerial(String serial) {
		this.pickupSerial = serial;
	}

	// ==================================================================================//
	public void setSubPickup() {
		Set<PickupComponent> pickupComponentSet = GsonUtil.fromJson(this.getPickupComponents(), new TypeToken<Set<PickupComponent>>() {});
		if (pickupComponentSet != null) {
			for (PickupComponent p : pickupComponentSet) {
				p.setPickupDate(this.getPickupDate());
				p.setPickupId(this.getPickupId());
			}
		}
		this.setPickupComponentSet(pickupComponentSet);
	}

}
