/**
 *====================================================
 * 文件名称: MoneyBack.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-16			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: MoneyBack
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-16 下午5:28:31
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "backSerial", strategy = "HK{yyyyMMdd}", maxseq = 99)
public class MoneyBack extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long backId;

	@Expose
	private String backSerial;

	@Expose
	private String backTheme;

	private Long receiveEntId;

	private String receiveModule;

	private String receiveEntName;

	private Long receiveEntAccountId;

	private String receiveBank;

	private String receiveAccount;

	private Long lendId;

	@Expose
	private String lendSerial;

	private String lendTheme;

	private Long lendPractiId;

	private String lendPractiName;

	private BigDecimal lendAmount;

	private Long practiId;

	@Expose
	private String practiName;

	private String practiTel;

	@Expose
	private String backDate;

	@Expose
	private BigDecimal backAmount;

	@Expose
	private BigDecimal arrearsAmount;

	private String description;

	private Long userId;

	private String userName;

	private Long depId;

	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	private Department department;

	public Long getApplyforId() {
		return this.backId;
	}

	public void setModelSerial(String serial) {
		this.backSerial = serial;
	}
}
