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
 * @ClassName: LeaseOtherBusinessDetail
 * @Description: 【租借结算】租借其他业务清单
 * @author chenzj
 * @date 2018-8-14
 */
@Entity
@Data
@ToString(exclude = {"detailId"})
@EqualsAndHashCode(callSuper = false, exclude = {"detailId"})
@Table(name = "T_LEASE_OTHER_BUSINESS_DETAIL")
public class LeaseOtherBusinessDetail extends BaseModel {

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
	@Column(name = "RECEIPT_DATE")
	private String receiptDate;
	
	@Expose
	@Column(name = "RELATE_SERIAL")
	private String relateSerial;
	
	@Expose
	@Column(name = "RECEIPT_TYPE")
	private String receiptType;
	
	@Expose
	@Column(name = "DEPOT_NAME")
	private String depotName;
	
	@Expose
	@Column(name = "FEES_TYPE")
	private String feesType;
	
	@Expose
	@Column(name = "CALCULATION_METHOD")
	private String calculationMethod;
	
	@Expose
	@Column(name = "AMOUNT")
	private String amount;
	
	@Expose
	@Column(name = "OTHER_ID")
	private String otherId;
	

}
