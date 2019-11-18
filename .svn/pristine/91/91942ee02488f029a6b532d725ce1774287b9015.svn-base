/**
 *====================================================
 * 文件名称: LeaseSettlement.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月30日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
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
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: LeaseSettlement
 * @Description: 结算管理
 * @author 陈光毅
 * @date 2017年8月30日
 */
@Entity
@Data
@ToString(exclude = {"settlementId"})
@EqualsAndHashCode(callSuper = false, exclude = {"settlementId"})
@PersistantDeclare(isExportable = true, exportName = "结算管理汇总", sheetName = "结算管理信息")
@SerialNumberStrategy(name = "settlementSerial", strategy = "JS{yyyyMMdd}", maxseq = 999)
@Table(name = "T_LEASE_SETTLEMENT")
public class LeaseSettlement extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@Column(name = "SETTLEMENT_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long settlementId;
	
	@Expose
	@Column(name = "SETTLEMENT_SERIAL", updatable = false, nullable = false)
	private String settlementSerial;
	
	@Expose
	@Column(name = "SETTLEMENT_THEME")
	private String settlementTheme;
	
	@Expose
	@Column(name = "USER_ID", updatable = false, nullable = false)
	private Long userId;
	
	@Expose
	@Column(name = "USER_NAME", updatable = false, nullable = false)
	private String userName;
	
	@Expose
	@Column(name = "FILL_DATE", updatable = false, nullable = false)
	private String fillDate;
	
	@Expose
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "LEASE_ID", updatable = false, nullable = false)
	private LeaseContract leaseContract;
	
	@Expose
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "PROJECT_ID", updatable = false, nullable = false)
	private Project project;
	
	@Expose
	@Column(name = "LESSOR")
	private String lessor;
	
	@Expose
	@Column(name = "TENANTRY")
	private String tenantry;
	
	@Expose
	@Column(name = "SETTLEMENT")
	@CodeFieldDeclare(codeId = "TRANPORT_CACULATE_TYPE", valueField = "settlementName")
	private String settlement;
	
	@Expose
	@Transient
	private String settlementName;
	
	@Expose
	@Column(name = "START_DATE")
	private String startDate;
	
	@Expose
	@Column(name = "END_DATE")
	private String endDate;
	
	@Expose
	@Column(name = "LEASE_TYPE")
	@CodeFieldDeclare(codeId = "contractCategory", valueField = "leaseTypeName")
	private String leaseType;
	
	@Expose
	@Transient
	private String leaseTypeName;
	
	@Expose
	@Column(name = "CURRENT_SETTLEMENT_AMOUNT")
	private String currentSettlementAmount;
	
	@Expose
	@Column(name = "ALREADY_SETTLEMENT_AMOUNT")
	private String alreadySettlementAmount;
	
	@Expose
	@Column(name = "INSIDE_SETTLEMENT_AMOUNT")
	private String insideSettlementAmount;
	
	@Expose
	@Column(name = "ALREADY_PAYMENT_AMOUNT")
	private String alreadyPaymentAmount;
	
	@Expose
	@Column(name = "FREIGHT")
	private String freight;
	
	@Expose
	@Column(name = "ACCOUNTING_TYPE")
	private String accountingType;
	
	@Expose
	@Column(name = "SERVICE_CHARGE")
	private String serviceCharge;
	
	@Expose
	@Column(name = "LOSE_CHARGE")
	private String loseCharge;
	
	@Expose
	@Column(name = "REMARKS")
	private String remarks;
	
	@Expose
	@Column(name = "STATUS")
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "statusName")
	private String status;
	
	@Expose
	@Transient
	private String statusName;
	
	@Column(name = "DEL_FLAG")
	private String delFlag;
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "SETTLEMENT_ID")
	private Set<SettlementList> settlementListSet = new HashSet<SettlementList> (0);

	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "SETTLEMENT_ID")
	private Set<InsideSettlementList> insideSettlementListSet = new HashSet<InsideSettlementList> (0);
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "SETTLEMENT_ID")
	private Set<LeasedLostDetail> leasedLostDetailSet = new HashSet<LeasedLostDetail> (0);
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "SETTLEMENT_ID")
	private Set<LeaseOtherBusinessDetail> leaseOtherBusinessDetailSet = new HashSet<LeaseOtherBusinessDetail> (0);
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "SETTLEMENT_ID")
	private Set<LeaseSettlementBlockUp> leaseSettlementBlockUpSet = new HashSet<LeaseSettlementBlockUp> (0);
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "SETTLEMENT_ID")
	private Set<LeaseSettlementInsideBlockUp> leaseSettlementInsideBlockUpSet = new HashSet<LeaseSettlementInsideBlockUp> (0);
	
	@Transient
	private String settlementLists = "";

	@Transient
	private String insideSettlementLists = "";
	
	@Transient
	private String leasedLostDetails = "";
	
	@Transient
	private String leaseOtherBusinessDetails = "";
	
	@Transient
	private String leaseSettlementBlockUps = "";
	
	@Transient
	private String leaseSettlementInsideBlockUps = "";
	
	@Override
	public void setModelSerial(String serial) {
		this.settlementSerial = serial;
	}
	
	@Override
	public Long getApplyforId() {
		return this.settlementId;
	}

	@Override
	public void setApplyforState(String applyforState) {
		this.status = applyforState;
	}

	@Override
	public String getApplyforState() {
		return this.status;
	}
	
	public void setSubLeaseSettlement () {
		Set<SettlementList> settlementListSet = GsonUtil.fromJson(this.getSettlementLists(), new TypeToken<Set<SettlementList>> () {});
		if (settlementListSet != null) {
			for (SettlementList s : settlementListSet) {
				s.setSettlementId(this.getSettlementId());
			}
		}
		this.setSettlementListSet(settlementListSet);
		//内部结算
		Set<InsideSettlementList> insideSettlementListSet = GsonUtil.fromJson(this.getInsideSettlementLists(), new TypeToken<Set<InsideSettlementList>> () {});
		if (insideSettlementListSet != null) {
			for (InsideSettlementList s : insideSettlementListSet) {
				s.setSettlementId(this.getSettlementId());
			}
		}
		this.setInsideSettlementListSet(insideSettlementListSet);
		//租借丢失赔偿
		Set<LeasedLostDetail> leasedLostDetailSet = GsonUtil.fromJson(this.getLeasedLostDetails(), new TypeToken<Set<LeasedLostDetail>> () {});
		if (leasedLostDetailSet != null) {
			for (LeasedLostDetail s : leasedLostDetailSet) {
				s.setSettlementId(this.getSettlementId());
			}
		}
		this.setLeasedLostDetailSet(leasedLostDetailSet);
		//租借其他业务
		Set<LeaseOtherBusinessDetail> leaseOtherBusinessDetailSet = GsonUtil.fromJson(this.getLeaseOtherBusinessDetails(), new TypeToken<Set<LeaseOtherBusinessDetail>> () {});
		if (leaseOtherBusinessDetailSet != null) {
			for (LeaseOtherBusinessDetail s : leaseOtherBusinessDetailSet) {
				s.setSettlementId(this.getSettlementId());
			}
		}
		this.setLeaseOtherBusinessDetailSet(leaseOtherBusinessDetailSet);
		//租借报停
		Set<LeaseSettlementBlockUp> leaseSettlementBlockUpSet = GsonUtil.fromJson(this.getLeaseSettlementBlockUps(), new TypeToken<Set<LeaseSettlementBlockUp>> () {});
		if (leaseSettlementBlockUpSet != null) {
			for (LeaseSettlementBlockUp s : leaseSettlementBlockUpSet) {
				s.setSettlementId(this.getSettlementId());
			}
		}
		this.setLeaseSettlementBlockUpSet(leaseSettlementBlockUpSet);
		//内部报停
		Set<LeaseSettlementInsideBlockUp> leaseSettlementInsideBlockUpSet = GsonUtil.fromJson(this.getLeaseSettlementInsideBlockUps(), new TypeToken<Set<LeaseSettlementInsideBlockUp>> () {});
		if (leaseSettlementInsideBlockUpSet != null) {
			for (LeaseSettlementInsideBlockUp s : leaseSettlementInsideBlockUpSet) {
				s.setSettlementId(this.getSettlementId());
			}
		}
		this.setLeaseSettlementInsideBlockUpSet(leaseSettlementInsideBlockUpSet);
	}
}
