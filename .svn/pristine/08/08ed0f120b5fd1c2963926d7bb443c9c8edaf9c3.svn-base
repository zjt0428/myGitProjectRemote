/**
 *====================================================
 * 文件名称: Purchase.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.ReceivementMethod;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: Purchase
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 下午10:27:15
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "采购信息汇总", sheetName = "采购信息")
@SerialNumberStrategy(name = "purchaseSerial", strategy = "CG{0}", maxseq = 999999)
public class Purchase extends ApplyforState implements ReceivementMethod, InstalmentMethod, ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long purchaseId;

	@Expose
	private String purchaseSerial;

	@Expose
	@CodeFieldDeclare(codeId = "purchaseTheme", valueField = "purchaseThemeName")
	private String purchaseTheme;

	@Expose
	private String purchaseThemeName;
	
	@Expose
	private String categoryName;
	
	@Expose
	@CodeFieldDeclare(codeId = "category", valueField = "categoryName")
	private String category;

	private Long supplierId;

	@Expose
	private String supplierName;

	private String supplierTel;

	private String linker;

	private String linkerTel;

	private Long purchaserId;

	@Expose
	private String purchaserName;

	private String purchaserMobile;

	private Long purchaserDepId;

	private String purchaserDepName;

	private Long purCorpId;

	private String purCorpName;

	@Expose
	private String purchaseDate;

	private String arrivalDate;

	private String squareUpDate;

	private String instruction;

	private String remark;

	private Long relateId;

	@Expose
	private String relateSerial;

	private String relateTheme;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	private Long equipId;

	@Expose
	private String recordSerial;

	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;

	private String equipCategoryName;

	@CodeFieldDeclare(codeId = "equipGeneric", valueField = "equipGenericName")
	private String equipGeneric;

	private String equipGenericName;

	@Expose
	private BigDecimal purchaseAmount;

	@Expose
	private BigDecimal paymentAmount;

	@Expose
	private String accDate;

	private String applicant;

	private Long userId;

	private String userName;

	private Long depId;

	@Expose
	private String providedDate;
	
	private String squareAccDate;

	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundAccStatusName")
	private String fundAccStatus;

	private String fundAccStatusName;

	@Expose
	@CodeFieldDeclare(codeId = "PURCHASE_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	private Department department;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PurchaseBrief> purchaseBriefSet = new HashSet<PurchaseBrief>(0);

	private String purchaseBriefs = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<Instalment> instalmentSet = new HashSet<Instalment>(0);

	private String instalments = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<Receivement> receivementSet = new HashSet<Receivement>(0);

	private String receivements = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PurchaseAcceptance> purchaseAcceptanceSet = new HashSet<PurchaseAcceptance>(0);

	private String purchaseAcceptances = "";

	// ===============================================================================//
	public Long getApplyforId() {
		return this.purchaseId;
	}

	public void setModelSerial(String serial) {
		this.purchaseSerial = serial;
	}

	public Long getInstalmentRelationId() {
		return this.purchaseId;
	}

	public String getInstalmentRelationSerial() {
		return this.purchaseSerial;
	}

	public String getInstalmentRelationModule() {
		return SystemConstant.MODULE_PURCHASE;
	}

	public Long getReceivementRelationId() {
		return this.purchaseId;
	}

	public String getReceivementRelationSerial() {
		return this.purchaseSerial;
	}

	public String getReceivementRelationModule() {
		return SystemConstant.MODULE_PURCHASE;
	}

	// ===============================================================================//
	public void setSubPurchase() {
		Set<PurchaseBrief> purchaseBriefSet = GsonUtil.fromJson(this.getPurchaseBriefs(), new TypeToken<Set<PurchaseBrief>>() {});
		if (purchaseBriefSet != null) {
			for (PurchaseBrief p : purchaseBriefSet) {
				p.setArrivalDate(this.getArrivalDate());
				p.setPurchaseId(this.getPurchaseId());
			}
		}
		this.setPurchaseBriefSet(purchaseBriefSet);
	}

}
