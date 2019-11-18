/**
 *====================================================
 * 文件名称: LeasePayment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年9月04日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：付款管理
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
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: LeasePayment
 * @Description: 付款管理
 * @author 陈光毅
 * @date 2017年9月04日
 */
@Entity
@Data
@ToString(exclude = {"paymentId"})
@EqualsAndHashCode(callSuper = false, exclude = {"paymentId"})
@PersistantDeclare(isExportable = true, exportName = "付款管理汇总", sheetName = "付款管理信息")
@SerialNumberStrategy(name = "paymentSerial", strategy = "FK{yyyyMMdd}", maxseq = 999999)
@Table(name = "T_LEASE_PAYMENT")
public class LeasePayment extends BusinessModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Id
	@Expose
	@Column(name = "PAYMENT_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long paymentId;
	
	@Expose
	@Column(name = "PAYMENT_SERIAL", nullable = false)
	private String paymentSerial;
	
	@Expose
	@Column(name = "PAYMENT_THEME")
	private String paymentTheme;
	
	@Expose
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "LEASE_ID", updatable = false, nullable = false)
	private LeaseContract leaseContract;
	
	@Expose
	@Column(name = "LEASE_MONEY")
	private String leaseMoney;
	
	@Expose
	@Column(name = "TENANTRY")
	private String tenantry;
	
	@Expose
	@Column(name = "LESSOR")
	private String lessor;
	
	@Expose
	@Column(name = "PAYMENT_DATE")
	private String paymentDate;
	
	@Expose
	@Column(name = "PAYMENT_AMOUNT")
	private String paymentAmount;
	
	@Expose
	@Column(name = "ALREADY_PAYMENT_AMOUNT")
	private String alreadyPaymentAmount;
	
	@Expose
	@Column(name = "AMOUNT_PAYABLE")
	private String amountPayable;
	
	@Expose
	@Column(name = "ACCOUNTING_TYPE")
	@CodeFieldDeclare(codeId = "", valueField = "accountingTypeName")
	private String accountingType;
	
	@Expose
	@Transient
	private String accountingTypeName;
	
	@Expose
	@Column(name = "PURPOSE")
	private String purpose;
	
	@Expose
	@Column(name = "IS_INVOICE")
	private String isInvoice;
	
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
	@Column(name = "STATUS")
	@CodeFieldDeclare(codeId = "AUDIT_APPROVAL_STATUS", valueField = "statusName")
	private String status;
	
	@Expose
	@Transient
	private String statusName;
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@Column(name = "PAYMENT_ID")
	private Set<SettlementInfo> settlementInfoSet = new HashSet<SettlementInfo> (0);
	
	@Transient
	private String settlementInfos = "";
	
	@Override
	public void setModelSerial(String serial) {
		this.paymentSerial = serial;
	}

	public void setSubLeasePayment () {
		Set<SettlementInfo> settlementInfoSet = GsonUtil.fromJson(this.getSettlementInfos(), new TypeToken<Set<SettlementInfo>>() {});
		if (settlementInfoSet != null) {
			for (SettlementInfo s : settlementInfoSet) {
				s.setPaymentId(this.getPaymentId());
			}
		}
		this.setSettlementInfoSet(settlementInfoSet);
	}
}
