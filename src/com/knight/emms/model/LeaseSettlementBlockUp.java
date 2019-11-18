package com.knight.emms.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: LeaseSettlementBlockUp
 * @Description: 【租借结算】租借报停清单
 * @author chenzj
 * @date 2018-8-15
 */
@Entity
@Data
@ToString(exclude = {"detailId"})
@EqualsAndHashCode(callSuper = false, exclude = {"detailId"})
@Table(name = "T_LEASE_SETTLEMENT_BLOCK_UP")
public class LeaseSettlementBlockUp extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@Column(name = "DETAIL_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long detailId;
	
	@Expose
	@Column(name = "SETTLEMENT_ID", nullable = false)
	private Long settlementId;
	
	@Expose
	@Column(name = "BLOCK_ID", nullable = false)
	private Long blockId;
	
	@Expose
	@Column(name = "BLOCK_TITLE")
	private String blockTitle;
	
	@Expose
	@Column(name = "BLOCK_SERIAL")
	private String blockSerial;
	
	@Expose
	@Column(name = "PROJECT_NAME")
	private String projectName;
	
	@Expose
	@Column(name = "LEASE_UNIT")
	private String leaseUnit;
	
	@Expose
	@Column(name = "SETTLED_AMOUNT")
	private String settledAmount;
	
	@Expose
	@Column(name = "START_DATE")
	private String startDate;
	
	@Expose
	@Column(name = "END_DATE")
	private String endDate;


}
