/**
 *====================================================
 * 文件名称: LeaseContract.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月15日		chengy(创建:创建文件)
 *====================================================
 * 类描述：租借合同
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
 * @ClassName: LeaseContract
 * @Description: 租借合同
 * @author chengy
 * @date 2017年8月15日 下午5:12:52
 */
@Data
@Entity
@ToString(exclude = {"leaseId"})
@EqualsAndHashCode(callSuper=false, exclude = {"leaseId"})
@PersistantDeclare(isExportable = true, exportName = "租借合同汇总", sheetName = "租借合同信息")
@SerialNumberStrategy(name = "leaseSerial", strategy = "", maxseq = 999999)
@Table(name = "T_LEASE_CONTRACT")
public class LeaseContract extends ApplyforState implements ExportModel {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@Column(name = "LEASE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@FieldComment(description ="主键ID", column = "leaseId")
	private Long leaseId;
	
	@Expose
	@Column(name = "LEASE_SERIAL")
	@FieldComment(description ="合同流水号", column = "leaseSerial")
	private String leaseSerial;

	@Expose
	@Column(name = "LEASE_IDENTIFIER", nullable = false)
	@FieldComment(description ="合同编号", column = "leaseIdentifier")
	private String leaseIdentifier;
	
	@Expose
	@Column(name = "LEASE_THEME")
	@FieldComment(description ="合同主题", column = "leaseTheme")
	private String leaseTheme;
	
	@Expose
	@Column(name = "CONTRACT_ID", nullable = false)
	@FieldComment(description = "周材合同ID", column = "contractId")
	private Long contractId;
	
	@Expose
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "PROJECT_ID", nullable = false)
	@FieldComment(description ="关联项目", column = "project")
	private Project project;
	
	@Expose
	@Column(name = "LESSEE_UNIT", nullable = false)
	@FieldComment(description ="承租单位", column = "lesseeUnit")
	private String lesseeUnit;
	
	@Expose
	@Column(name = "USE_UNIT", nullable = false)
	@FieldComment(description ="使用单位", column = "useUnit")
	private String useUnit;
	
	@Expose
	@Column(name = "DEP_ID", nullable = false)
	@FieldComment(description = "管理部门ID", column = "depId")
	private Long depId;
	
	@Expose
	@Column(name = "DEP_NAME")
	@FieldComment(description ="管理部门", column = "depName")
	private String depName;
	
	@Expose
	@Column(name = "LEASE_UNIT", nullable = false)
	@FieldComment(description ="租借单位", column = "leaseUnit")
	private String leaseUnit;
	
	@Expose
	@Column(name = "LEASE_UNIT_ADDRESS")
	@FieldComment(description ="单位地址", column = "leaseUnitAddress")
	private String leaseUnitAddress;
	
	@Expose
	@Column(name = "LEASE_UNIT_LINK")
	@FieldComment(description ="联系方式", column = "leaseUnitLink")
	private String leaseUnitLink;
	
	@Expose
	@Column(name = "SIGNING_DATE")
	@FieldComment(description ="签订日期", column = "signingDate")
	private String signingDate;
	
	@Expose
	@Column(name = "ACCOUNTING_METHOD")
	@FieldComment(description = "计费方式码", column = "accountingMethod")
	@CodeFieldDeclare(codeId = "TRANPORT_CACULATE_TYPE", valueField = "accountingMethodName")
	private String accountingMethod;
	
	@Expose
	@Transient
	@FieldComment(description = "计费方式值", column = "accountingMethodName")
	private String accountingMethodName;
	
	@Expose
	@Column(name = "TAX_METHOD")
	@FieldComment(description ="计税方式码", column = "taxMethod")
	@CodeFieldDeclare(codeId = "TAX_MODE", valueField = "taxMethodName")
	private String taxMethod;
	
	@Expose
	@Transient
	@FieldComment(description ="计税方式值", column = "taxMethodName")
	private String taxMethodName;
	
	@Expose
	@Column(name = "TAX_RATE", nullable = false)
	@FieldComment(description ="适用税率", column = "taxRate")
	private String taxRate;
	
	@Expose
	@Column(name = "DISCOUNT_RENTAL_RATE")
	@FieldComment(description ="租金优惠比例", column = "discountRentalRate")
	private String discountRentalRate;
	
	@Expose
	@Column(name = "DISCOUNT")
	@FieldComment(description ="折扣", column = "discount")
	private String discount;
	
	@Expose
	@Column(name = "FREIGHT")
	@FieldComment(description ="运费", column = "freight")
	private String freight;
	
	@Expose
	@Column(name = "CONTRACT_AMOUNT")
	@FieldComment(description ="合同金额", column = "contractAmount")
	private String contractAmount;
	
	@Expose
	@Column(name = "SETTLEMENT_AMOUNT")
	@FieldComment(description ="已结算金额", column = "settlementAmount")
	private String settlementAmount;
	
	@Expose
	@Column(name = "AMOUNT_RECEIVED")
	@FieldComment(description ="已收款金额", column = "amountReceived")
	private String amountReceived;
	
	@Expose
	@Column(name = "AUTHORIZED_AMOUNT")
	@FieldComment(description ="审定金额", column = "authorizedAmount")
	private String authorizedAmount;
	
	@Expose
	@Column(name = "USER_ID", nullable = false, updatable = false)
	@FieldComment(description ="填报人ID", column = "userId")
	private Long userId;
	
	@Expose
	@Column(name = "USER_NAME", nullable = false, updatable = false)
	@FieldComment(description ="填报人", column = "userName")
	private String userName;
	
	@Expose
	@Column(name = "FILL_DATE", nullable = false, updatable = false)
	@FieldComment(description ="填报日期", column = "fillDate")
	private String fillDate;
	
	@Expose
	@Column(name = "STATUS", nullable = false)
	@FieldComment(description ="状态码", column = "status")
	@CodeFieldDeclare(codeId = "LEASE_CONTRACT_STATUS", valueField = "statusName")
	private String status;
	
	@Expose
	@Transient
	@FieldComment(description ="状态值", column = "statusName")
	private String statusName;
	
	@Expose
	@Column(name = "REMARKS")
	@FieldComment(description ="备注", column = "remarks")
	private String remarks;
	
	@Column(name = "DEL_FLAG")
	@FieldComment(description ="删除标识", column = "delFlag")
	private String delFlag;
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "LEASE_ID")
	private Set<LeaseMaterialsInventory> leaseMaterialsInventorySet = new HashSet<LeaseMaterialsInventory>(0);
	
	@Transient
	private String leaseMaterialsInventorys = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "LEASE_ID")
	private Set<LeasePriceSetting> leasePriceSettingSet = new HashSet<LeasePriceSetting>(0);
	
	@Transient
	private String leasePriceSettings = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "LEASE_ID")
	private Set<LeaseSpoiledIndemnity> leaseSpoiledIndemnitySet = new HashSet<LeaseSpoiledIndemnity>(0);
	
	@Transient
	private String leaseSpoiledIndemnitys = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "LEASE_ID")
	private Set<LeaseScrapCompensation> leaseScrapCompensationSet = new HashSet<LeaseScrapCompensation>(0);
	
	@Transient
	private String leaseScrapCompensations = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "LEASE_ID")
	private Set<LeaseExpenseHandling> leaseExpenseHandlingSet = new HashSet<LeaseExpenseHandling>(0);
	
	@Transient
	private String leaseExpenseHandlings = "";
	
	@Override
	public void setModelSerial(String serial) {
		this.leaseSerial = serial;
	}
	
	@Override
	public Long getApplyforId() {
		return this.leaseId;
	}

	@Override
	public void setApplyforState(String applyforState) {
		this.status = applyforState;
	}

	@Override
	public String getApplyforState() {
		return this.status;
	}
	
	public void setSubLeaseContract () {
		Set<LeaseMaterialsInventory> leaseMaterialsInventorySet = GsonUtil.fromJson(this.getLeaseMaterialsInventorys(), new TypeToken<Set<LeaseMaterialsInventory>>() {});
		if (leaseMaterialsInventorySet != null) {
			for (LeaseMaterialsInventory i : leaseMaterialsInventorySet) {
				i.setLeaseId(this.getLeaseId());
			}
		}
		this.setLeaseMaterialsInventorySet(leaseMaterialsInventorySet);
		
		Set<LeasePriceSetting> leasePriceSettingSet = GsonUtil.fromJson(this.getLeasePriceSettings(), new TypeToken<Set<LeasePriceSetting>>() {});
		if (leasePriceSettingSet != null) {
			for (LeasePriceSetting i : leasePriceSettingSet) {
				i.setLeaseId(this.getLeaseId());
			}
		}
		this.setLeasePriceSettingSet(leasePriceSettingSet);
		
		Set<LeaseSpoiledIndemnity> leaseSpoiledIndemnitySet = GsonUtil.fromJson(this.getLeaseSpoiledIndemnitys(), new TypeToken<Set<LeaseSpoiledIndemnity>>() {});
		if (leaseSpoiledIndemnitySet != null) {
			for (LeaseSpoiledIndemnity i : leaseSpoiledIndemnitySet) {
				i.setLeaseId(this.getLeaseId());
			}
		}
		this.setLeaseSpoiledIndemnitySet(leaseSpoiledIndemnitySet);
		
		Set<LeaseScrapCompensation> leaseScrapCompensationSet = GsonUtil.fromJson(this.getLeaseScrapCompensations(), new TypeToken<Set<LeaseScrapCompensation>>() {});
		if (leaseScrapCompensationSet != null) {
			for (LeaseScrapCompensation i : leaseScrapCompensationSet) {
				i.setLeaseId(this.getLeaseId());
			}
		}
		this.setLeaseScrapCompensationSet(leaseScrapCompensationSet);
		
		Set<LeaseExpenseHandling> leaseExpenseHandlingSet = GsonUtil.fromJson(this.getLeaseExpenseHandlings(), new TypeToken<Set<LeaseExpenseHandling>>() {});
		if (leaseExpenseHandlingSet != null) {
			for (LeaseExpenseHandling i : leaseExpenseHandlingSet) {
				i.setLeaseId(this.getLeaseId());
			}
		}
		this.setLeaseExpenseHandlingSet(leaseExpenseHandlingSet);
	}
}
