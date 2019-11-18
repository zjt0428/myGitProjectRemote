/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: LeaseRepair.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月18日
 *====================================================
 * 文件描述: 租借维修模块
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.annotation.FieldComment;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: LeaseRepair
 * @Description: 租借维修
 * @author 陈光毅
 * @date 2018年1月18日 上午9:30:56
 * @version v1.0
 */
@Data
@Entity
@ToString(exclude = { "repairId" })
@EqualsAndHashCode(callSuper = false, exclude = { "repairId" })
@PersistantDeclare
@SerialNumberStrategy(name = "repairSerial", strategy = "WX{yyyyMMdd}", maxseq = 999)
@Table(name = "T_LEASE_REPAIR")
public class LeaseRepair extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@Column(name = "REPAIR_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long repairId;

	/** 单据编号 */
	@Expose
	@Column(name = "REPAIR_SERIAL", nullable = false, updatable = false)
	private String repairSerial;

	/** 填报人ID */
	@Expose
	@Column(name = "USER_ID", nullable = false, updatable = false)
	private Long userId;

	/** 填报人 */
	@Expose
	@Column(name = "USER_NAME", nullable = false, updatable = false)
	private String userName;

	/** 填报日期 */
	@Expose
	@Column(name = "FILL_DATE", nullable = false, updatable = false)
	private String fillDate;
	
	/** 关联合同 */
	@Expose
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "LEASE_ID", updatable = false, nullable = false)
	private LeaseContract leaseContract;

	/** 维修主题 */
	@Expose
	@Column(name = "REPAIR_THEME", nullable = false)
	private String repairTheme;

	/** 维修日期 */
	@Expose
	@Column(name = "REPAIR_DATE", nullable = false, updatable = false)
	private String repairDate;

	/** 维修班组ID */
	@Expose
	@Column(name = "DEP_ID", nullable = false)
	private Long depId;

	/** 维修班组 */
	@Expose
	@Column(name = "DEP_NAME", nullable = false)
	private String depName;

	/** 备注 */
	@Expose
	@Column(name = "REMARK")
	private String remark;

	/** 状态值 */
	@Expose
	@Column(name = "STATUS", nullable = false)
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "statusName")
	private String status;

	/** 状态名 */
	@Expose
	@Transient
	private String statusName;

	@Column(name = "DEL_FLAG")
	@FieldComment(description ="删除标识", column = "delFlag")
	private String delFlag;
	
	/** 维修前 */
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	@JoinColumn(name = "REPAIR_ID")
	@OneToMany(cascade = { CascadeType.ALL })
	private Set<LeaseRepairBefore> leaseRepairBeforeSet = new HashSet<LeaseRepairBefore>(0);

	@Transient
	private String leaseRepairBefores = "";

	/** 维修后 */
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	@JoinColumn(name = "REPAIR_ID")
	@OneToMany(cascade = { CascadeType.ALL })
	private Set<LeaseRepairAfter> leaseRepairAfterSet = new HashSet<LeaseRepairAfter>(0);

	@Transient
	private String leaseRepairAfters = "";

	@Override
	public void setModelSerial(String serial) {
		this.repairSerial = serial;
	}

	@Override
	public Long getApplyforId() {
		return this.repairId;
	}

	@Override
	public void setApplyforState(String applyforState) {
		this.status = applyforState;
	}

	@Override
	public String getApplyforState() {
		return this.status;
	}

	public void setSubLeaseRepair() {
		Set<LeaseRepairBefore> leaseRepairBeforeSet = GsonUtil.fromJson(this.getLeaseRepairBefores(), new TypeToken<Set<LeaseRepairBefore>>() {});
		if (leaseRepairBeforeSet != null) {
			for (LeaseRepairBefore b : leaseRepairBeforeSet) {
				b.setRepairId(this.getRepairId());
			}
		}
		this.setLeaseRepairBeforeSet(leaseRepairBeforeSet);
		
		Set<LeaseRepairAfter> leaseRepairAfterSet = GsonUtil.fromJson(this.getLeaseRepairAfters(), new TypeToken<Set<LeaseRepairAfter>>() {});
		if (leaseRepairAfterSet != null) {
			for (LeaseRepairAfter a : leaseRepairAfterSet) {
				a.setRepairId(this.getRepairId());
			}
		}
		this.setLeaseRepairAfterSet(leaseRepairAfterSet);
	}

}
