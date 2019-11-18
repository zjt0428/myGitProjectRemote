/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: LeaseRepairAfter.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月25日
 *====================================================
 * 文件描述: 维修后 (租借维修关联表)
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
 * @ClassName: LeaseRepairAfter
 * @Description: 维修后 (租借维修关联表)
 * @author 陈光毅
 * @date 2018年1月25日 上午11:00:46
 * @version v1.0
 */
@Data
@Entity
@ToString(exclude = { "afterId" })
@EqualsAndHashCode(callSuper = false, exclude = { "afterId" })
@Table(name = "T_LEASE_REPAIR_AFTER")
public class LeaseRepairAfter extends BaseModel {

	private static final long serialVersionUID = 1774601040590991770L;

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
