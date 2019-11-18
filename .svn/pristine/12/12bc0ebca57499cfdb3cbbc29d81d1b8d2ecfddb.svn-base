/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: ProjectRepairBefore.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月25日
 *====================================================
 * 文件描述: 维修前(项目维修子表)
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
 * @ClassName: ProjectRepairBefore
 * @Description: 维修前(项目维修子表)
 * @author 陈光毅
 * @date 2018年1月25日 下午9:23:05
 * @version v1.0
 */
@Data
@Entity
@ToString(exclude = { "beforeId" })
@EqualsAndHashCode(callSuper = false, exclude = { "beforeId" })
@Table(name = "T_PROJECT_REPAIR_BEFORE")
public class ProjectRepairBefore extends BaseModel {

	private static final long serialVersionUID = 4889453950825243549L;

	@Id
	@Expose
	@Column(name = "BEFORE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long beforeId;
	
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

	/** 库存数量 */
	@Expose
	@Column(name = "REPERTORY_QUANTITY", nullable = false)
	private String repertoryQuantity;

	/** 辅助数量 */
	@Expose
	@Column(name = "ASSIST_QUANTITY", nullable = false)
	private String assistQuantity;
}
