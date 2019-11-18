/**
 *====================================================
 * 文件名称: EquipWarehouse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: EquipWarehouse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午9:42:53
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare()
@SerialNumberStrategy(name = "warehouseSerial", strategy = "RK{yyyyMMdd}", maxseq = 99)
public class EquipWarehouse extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long warehouseId;

	@Expose
	private String warehouseSerial;

	@Expose
	private String warehouseDate;

	private String principal;

	private String principalTel;

	@Expose
	private Long storeId;

	@Expose
	private String storeName;

	private Long userId;
	
	@Expose
	private Long corpId;

	private String userName;

	@Expose
	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;
	
	@Expose
	private String vehiclePerson;
	
	@Expose
	private String vehicleNum;
	
	@Expose
	private String receiveMan;
	
	@Expose
	private Long receiveManId;
	
	@Expose
	private String attachSerial;
	
	/*是否做过拆卸报停 0否 1是*/
	@Expose
	private String isScraped;

	private Department department;

	@Expose
	private EquipFlow equipFlow;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipWarehouseCompon> equipWarehouseComponSet = new HashSet<EquipWarehouseCompon>();

	private String equipWarehouseCompons = "";

	public Long getApplyforId() {
		return this.warehouseId;
	}

	public void setModelSerial(String serial) {
		this.warehouseSerial = serial;
	}

	// ========================================================================//
	public void setSubEquipWarehouse() {
		Set<EquipWarehouseCompon> equipWarehouseComponSet = GsonUtil.fromJson(this.equipWarehouseCompons, new TypeToken<Set<EquipWarehouseCompon>>() {});
		if (equipWarehouseComponSet != null) {
			for (EquipWarehouseCompon c : equipWarehouseComponSet) {
				c.setWarehouseId(this.getWarehouseId());
			}
			this.setEquipWarehouseComponSet(equipWarehouseComponSet);
		}
	}

}
