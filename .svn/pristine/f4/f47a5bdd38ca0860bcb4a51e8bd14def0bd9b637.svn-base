/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: ProjectRepairAfter.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月25日
 *====================================================
 * 文件描述: 维修后(项目维修子表)
 */
package com.knight.emms.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: ProjectRepairAfter
 * @Description: 维修后(项目维修子表)
 * @author 陈光毅
 * @date 2018年1月25日 下午9:31:58
 * @version v1.0
 */
@Data
@Entity
@ToString(exclude = { "afterId" })
@EqualsAndHashCode(callSuper = false, exclude = { "afterId" })
@Table(name = "T_PROJECT_REPAIR_AFTER")
public class ProjectRepairAfter extends BaseModel {

	private static final long serialVersionUID = 1993442817551985645L;

	@Id
	@Expose
	@Column(name = "AFTER_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long afterId;
	
	/** 母表ID */
	@Expose
	@Column(name = "REPAIR_ID", updatable = false)
	private Long repairId;
	
	/** 周材信息 */
	@Expose
	@JoinColumn(name = "SPECIFICATIONS_ID")
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	private MaterialsSpecifications materialsSpecifications;
	
	/** 维修数量 */
	@Expose
	@Column(name = "REPAIR_QUANTITY", nullable = false)
	private String repairQuantity;

	/** 辅助数量 */
	@Expose
	@Column(name = "ASSIST_QUANTITY", nullable = false)
	private String assistQuantity;
}
