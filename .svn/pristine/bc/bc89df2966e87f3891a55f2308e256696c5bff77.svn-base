/**
 *====================================================
 * 文件名称: Salary.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: Salary
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午3:08:47
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "salarySerial", strategy = "XZ{yyyyMMdd}", maxseq = 99)
public class Salary extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long salaryId;

	@Expose
	private String salarySerial;

	@Expose
	private String salaryTheme;

	private Integer monthId;

	@Expose
	private String salaryMonth;

	private String salaryDate;

	private Long entId;

	@Expose
	private String entName;

	private Long entAccountId;

	@Expose
	private String bank;

	@Expose
	private String account;

	@Expose
	private BigDecimal salaryAmount;

	private String remark;

	private Date deductPassDate;

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

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SalaryPracti> salaryPractiSet = new HashSet<SalaryPracti>();

	private String salaryPractis = "";

	public Long getApplyforId() {
		return this.salaryId;
	}

	public void setModelSerial(String serial) {
		this.salarySerial = serial;
	}

	// =====================================================================//
	public void setSubSalary() {
		Set<SalaryPracti> salaryPractiSet = GsonUtil.fromJson(this.getSalaryPractis(), new TypeToken<Set<SalaryPracti>>() {});
		for (SalaryPracti p : salaryPractiSet) {
			p.setSalaryId(this.getSalaryId());
			p.setMonthId(this.getMonthId());
			p.setSalaryMonth(this.getSalaryMonth());
		}
		this.setSalaryPractiSet(salaryPractiSet);
	}

}
