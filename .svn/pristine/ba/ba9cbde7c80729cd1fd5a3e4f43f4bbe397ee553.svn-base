/**
 *====================================================
 * 文件名称: Borrow.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-12			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

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
 * @ClassName: Borrow
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-12 上午9:55:14
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "借用信息汇总", sheetName = "借用信息")
@SerialNumberStrategy(name = "borrowSerial", strategy = "JY{yyyyMMdd}", maxseq = 99)
public class Borrow extends ApplyforState implements ReceivementMethod, InstalmentMethod, ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long borrowId;

	@Expose
	private String borrowSerial;

	@Expose
	private String borrowTheme;

	@Expose
	@CodeFieldDeclare(codeId = "BORROW_TYPE", valueField = "borrowTypeName")
	private String borrowType;

	@Expose
	private String borrowTypeName;

	private Long inrelateId;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "inrelateModuleName")
	private String inrelateModule;

	private String inrelateModuleName;

	@Expose
	private String inrelateName;

	private String inOfficeTel;

	private String inHandler;

	private String inPhone;

	private Long outrelateId;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "outrelateModuleName")
	private String outrelateModule;

	private String outrelateModuleName;

	@Expose
	private String outrelateName;

	private String outOfficeTel;

	private String outHandler;

	private String outPhone;

	@Expose
	private String borrowDate;

	@Expose
	private String returnDate;

	private String instruction;

	private String remark;

	private Long userId;

	private String userName;

	private Long depId;

	@Expose
	private String providedDate;

	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	private String squareAccDate;

	@Expose
	@CodeFieldDeclare(codeId = "BORROW_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	private String renewDate;

	private Department department;
	
	@Expose
	private String address;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<BorrowComponent> borrowComponentSet = new HashSet<BorrowComponent>(0);

	private String borrowComponents = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<BorrowEquip> borrowEquipSet = new HashSet<BorrowEquip>(0);

	private String borrowEquips = "";

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
	private Set<BorrowAcceptance> borrowAcceptanceSet = new HashSet<BorrowAcceptance>(0);

	private String borrowAcceptances = "";

	// ==============================================================================//
	public Long getApplyforId() {
		return this.borrowId;
	}

	public void setModelSerial(String serial) {
		this.borrowSerial = serial;
	}

	public Long getInstalmentRelationId() {
		return this.borrowId;
	}

	public String getInstalmentRelationSerial() {
		return this.borrowSerial;
	}

	public String getInstalmentRelationModule() {
		return SystemConstant.MODULE_BORROW;
	}

	public Long getReceivementRelationId() {
		return this.borrowId;
	}

	public String getReceivementRelationSerial() {
		return this.borrowSerial;
	}

	public String getReceivementRelationModule() {
		return SystemConstant.MODULE_BORROW;
	}

	// ==============================================================================//
	public void setSubBorrow() {
		Set<BorrowComponent> borrowComponentSet = GsonUtil.fromJson(this.getBorrowComponents(), new TypeToken<Set<BorrowComponent>>() {});
		if (borrowComponentSet != null) {
			for (BorrowComponent p : borrowComponentSet) {
				p.setBorrowDate(this.getBorrowDate());
				p.setBorrowId(this.getBorrowId());
			}
		}
		this.setBorrowComponentSet(borrowComponentSet);

		Set<BorrowEquip> borrowEquipSet = GsonUtil.fromJson(this.getBorrowEquips(), new TypeToken<Set<BorrowEquip>>() {});
		if (borrowEquipSet != null) {
			for (BorrowEquip p : borrowEquipSet) {
				p.setBorrowDate(this.getBorrowDate());
				p.setBorrowId(this.getBorrowId());
			}
		}
		this.setBorrowEquipSet(borrowEquipSet);
	}

}
