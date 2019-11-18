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

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: EquipWarehouse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午9:42:53
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare()
@SerialNumberStrategy(name = "serial", strategy = "RK{yyyyMMdd}", maxseq = 99)
public class ComponIntoStore extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long rowId;

	@Expose
	private String serial;

	@Expose
	private String intoDate;
	@Expose
	private String principal;

	private String principalTel;

	private Long storeId;
	@Expose
	private String storeName;

	private String overallUnit;

	private Long userId;

	private String userName;

	private String providedDate;
	
	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;
	
	@Expose
	private String address;

	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	private String receiveMan;
	
	@Expose
	private Long receiveManId;
	
	@Expose
	private String contractNo;
	
	/**原单据号*/
	@Expose
	private String originalSerial;
	
	/**车号*/
	@Expose
	private String licensePlate;
	
	@Expose
	private String driver;
	
	@Expose
	private String remark;

	private String delFlag;

	private Department department;
	
	@Expose
	private Long contractId;
	
	private ContractLease contractLease;

	/*审批时间*/
	@Expose
	private Date approveTime;
	
	/**赔偿金额总计*/
	@Expose
	private BigDecimal damageTotalAmount; 
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ComponIntoStoreDetail> equipWarehouseComponSet = new HashSet<ComponIntoStoreDetail>();

	private String equipWarehouseCompons = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AttachmentStorage> attachmentStorageSet = new HashSet<AttachmentStorage>();

	private String attachmentStorages = "";

	public Long getApplyforId() {
		return this.rowId;
	}

	public void setModelSerial(String serial) {
		this.serial = serial;
	}

	// ========================================================================//
	public void setSubEquipWarehouse() {
		Set<ComponIntoStoreDetail> equipWarehouseComponSet = GsonUtil.fromJson(this.equipWarehouseCompons, new TypeToken<Set<ComponIntoStoreDetail>>() {});
		if (equipWarehouseComponSet != null) {
			for (ComponIntoStoreDetail c : equipWarehouseComponSet) {
				c.setComponId(c.getComponent().getComponId());
				c.setRowId(this.getRowId());
			}
			this.setEquipWarehouseComponSet(equipWarehouseComponSet);
		}
		
		Set<AttachmentStorage> attachmentStorageSet = GsonUtil.fromJson(this.attachmentStorages, new TypeToken<Set<AttachmentStorage>>() {});
		if (attachmentStorageSet != null) {
			for (AttachmentStorage c : attachmentStorageSet) {
				c.setRowId(this.getRowId());
			}
			this.setAttachmentStorageSet(attachmentStorageSet);
		}
	}

}
