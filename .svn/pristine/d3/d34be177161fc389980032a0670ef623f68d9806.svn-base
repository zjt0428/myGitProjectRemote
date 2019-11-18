/**
 *====================================================
 * 文件名称: RentContract.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月11日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: RentContract
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月11日 下午10:24:16
 */
@Data
@PersistantDeclare(isExportable = true, exportName = "代租结算汇总", sheetName = "代租结算")
@SerialNumberStrategy(name = "rentSerial", strategy = "JS{yyyyMMdd}", maxseq = 999)
public class RentContract extends BusinessModel implements InstalmentMethod, ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long rentId;

	@Expose
	private String rentSerial;

	@Expose
	private String rentTheme;

	@Expose
	private String contractor;

	@Expose
	private String propertyName;

	@Expose
	private Long contractId;

	@Expose
	private String contractSerial;

	@Expose
	private String contractTheme;

	@Expose
	private Long paEnt;

	@Expose
	private String paModule;

	@Expose
	private String paEntName;

	@Expose
	private Long pbEnt;

	@Expose
	private String pbModule;

	@Expose
	private String pbEntName;

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;

	@Expose
	private String projectName;

	@Expose
	private String address;

	@Expose
	private String startRentDate;

	@Expose
	private String endRentDate;

	@Expose
	private BigDecimal rentAmount;

	@Expose
	private BigDecimal deductAmount;

	@Expose
	private BigDecimal paymentAmount;

	@Expose
	private BigDecimal finishedAmount;

	@Expose
	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;

	@Expose
	private String remark;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private Long depId;

	@Expose
	private String providedDate;

	private Department department;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<Instalment> instalmentSet = new HashSet<Instalment>(0);

	private String instalments = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<RentEquipBrief> rentEquipBriefSet = new HashSet<RentEquipBrief>(0);

	private String rentEquipBriefs = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<RentComponBrief> rentComponBriefSet = new HashSet<RentComponBrief>(0);

	private String rentComponBriefs = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<RentItemBrief> rentItemBriefSet = new HashSet<RentItemBrief>(0);

	private String rentItemBriefs = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<RentDeductBrief> rentDeductBriefSet = new HashSet<RentDeductBrief>(0);

	private String rentDeductBriefs = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AmountPayment> amountPaymentSet = new HashSet<AmountPayment>(0);

	// ===============================================================================//
	@Expose
	private BigDecimal arrearsAmount;

	public void setModelSerial(String serial) {
		this.rentSerial = serial;
	}

	public Long getInstalmentRelationId() {
		return this.rentId;
	}

	public String getInstalmentRelationSerial() {
		return this.rentSerial;
	}

	public String getInstalmentRelationModule() {
		return SystemConstant.MODULE_RENT_CONTRACT;
	}

	public void setSubRentContract() {
		Set<RentEquipBrief> rentEquipBriefSet = GsonUtil.fromJson(this.getRentEquipBriefs(), new TypeToken<Set<RentEquipBrief>>() {});
		if (rentEquipBriefSet != null) {
			for (RentEquipBrief p : rentEquipBriefSet) {
				p.setRentId(this.getRentId());
				if(p.getMonthTag() == "false"){
					p.setMonthTag(null);
				}
			}
		}
		this.setRentEquipBriefSet(rentEquipBriefSet);

		Set<RentComponBrief> rentComponBriefSet = GsonUtil.fromJson(this.getRentComponBriefs(), new TypeToken<Set<RentComponBrief>>() {});
		if (rentComponBriefSet != null) {
			for (RentComponBrief p : rentComponBriefSet) {
				p.setRentId(this.getRentId());
			}
		}
		this.setRentComponBriefSet(rentComponBriefSet);

		Set<RentItemBrief> rentItemBriefSet = GsonUtil.fromJson(this.getRentItemBriefs(), new TypeToken<Set<RentItemBrief>>() {});
		if (rentItemBriefSet != null) {
			for (RentItemBrief p : rentItemBriefSet) {
				p.setRentId(this.getRentId());
			}
		}
		this.setRentItemBriefSet(rentItemBriefSet);

		Set<RentDeductBrief> rentDeductBriefSet = GsonUtil.fromJson(this.getRentDeductBriefs(), new TypeToken<Set<RentDeductBrief>>() {});
		if (rentDeductBriefSet != null) {
			for (RentDeductBrief p : rentDeductBriefSet) {
				p.setRentId(this.getRentId());
			}
		}
		this.setRentDeductBriefSet(rentDeductBriefSet);
	}

}
