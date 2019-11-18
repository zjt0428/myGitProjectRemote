/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: ProjectRepair.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月23日
 *====================================================
 * 文件描述: 项目维修
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
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: ProjectRepair
 * @Description: 项目维修
 * @author 陈光毅
 * @date 2018年1月23日 上午9:49:34
 * @version v1.0
 */
@Data
@Entity
@ToString(exclude = { "repairId" })
@EqualsAndHashCode(callSuper = false, exclude = { "repairId" })
@PersistantDeclare
@SerialNumberStrategy(name = "repairSerial", strategy = "WX{yyyyMMdd}", maxseq = 999)
@Table(name = "T_PROJECT_REPAIR")
public class ProjectRepair extends ApplyforState {

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
	@JoinColumn(name = "CONTRACTMA_ID", updatable = false, nullable = false)
	private ContractMaterials contractMaterials;
	
	/** 维修主题 */
	@Expose
	@Column(name = "REPAIR_THEME", nullable = false)
	private String repairTheme;

	/** 维修日期 */
	@Expose
	@Column(name = "REPAIR_DATE", nullable = false, updatable = false)
	private String repairDate;

	/** 主管部门ID */
	@Expose
	@Column(name = "DEP_ID", nullable = false)
	private Long depId;

	/** 主管部门 */
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
	
	/** 维修前 */
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	@JoinColumn(name = "REPAIR_ID")
	@OneToMany(cascade = { CascadeType.ALL })
	private Set<ProjectRepairBefore> projectRepairBeforeSet = new HashSet<ProjectRepairBefore>(0);
	
	@Transient
	private String projectRepairBefores = "";
	
	/** 维修后 */
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	@JoinColumn(name = "REPAIR_ID")
	@OneToMany(cascade = { CascadeType.ALL })
	private Set<ProjectRepairAfter> projectRepairAfterSet = new HashSet<ProjectRepairAfter>(0);
	
	@Transient
	private String projectRepairAfters = "";

	/* （非 Javadoc）
	 * @see com.knight.emms.core.ApplyforState#getApplyforId()
	 */
	@Override
	public Long getApplyforId() {
		return this.repairId;
	}

	/* （非 Javadoc）
	 * @see com.knight.emms.core.ApplyforState#setApplyforState(java.lang.String)
	 */
	@Override
	public void setApplyforState(String applyforState) {
		this.status = applyforState;
	}

	/* （非 Javadoc）
	 * @see com.knight.emms.core.ApplyforState#getApplyforState()
	 */
	@Override
	public String getApplyforState() {
		return this.status;
	}

	/* （非 Javadoc）
	 * @see com.knight.emms.core.BusinessModel#setModelSerial(java.lang.String)
	 */
	@Override
	public void setModelSerial(String serial) {
		this.repairSerial = serial;
	}

	public void setSubProjectRepair() {
		Set<ProjectRepairBefore> projectRepairBeforeSet = GsonUtil.fromJson(this.getProjectRepairBefores(), new TypeToken<Set<ProjectRepairBefore>>() {});
		if (projectRepairBeforeSet != null) {
			for(ProjectRepairBefore b : projectRepairBeforeSet) {
				b.setRepairId(this.getRepairId());
			}
		}
		this.setProjectRepairBeforeSet(projectRepairBeforeSet);
		
		Set<ProjectRepairAfter> projectRepairAfterSet = GsonUtil.fromJson(this.getProjectRepairAfters(), new TypeToken<Set<ProjectRepairAfter>>() {});
		if (projectRepairAfterSet != null) {
			for(ProjectRepairAfter a : projectRepairAfterSet) {
				a.setRepairId(this.getRepairId());
			}
		}
		this.setProjectRepairAfterSet(projectRepairAfterSet);
	}
}
