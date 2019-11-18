/**
 *====================================================
 * 文件名称: Deduct.java
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
import com.knight.emms.constant.EmmsConstant;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: Deduct
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午2:53:31
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "deductSerial", strategy = "TC{yyyyMMdd}", maxseq = 99)
public class Deduct extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long deductId;

	@Expose
	private String deductSerial;

	private Long contractId;

	@Expose
	private String contractSerial;

	@Expose
	private String contractTheme;

	private BigDecimal contractAmount;

	private BigDecimal disbursement;

	private BigDecimal proportion;

	@CodeFieldDeclare(codeId = "CARDINAL_TYPE", valueField = "acardinalName")
	private String cardinal;

	@Expose
	private String acardinalName;

	@CodeFieldDeclare(codeId = "PROPORTION_TYPE", valueField = "proportionTypeName")
	private String proportionType;

	@Expose
	private String proportionTypeName;

	@Expose
	private BigDecimal deductTotalAmount;

	private String remark;

	private Long userId;

	private String userName;

	private Long depId;

	private String providedDate;

	private Date applyforPassDate;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	private Department department;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DeductPracti> deductPractiSet = new HashSet<DeductPracti>(0);

	private String deductPractis = "";

	public Long getApplyforId() {
		return this.deductId;
	}

	public void setModelSerial(String serial) {
		this.deductSerial = serial;
	}

	// ==================================================================================//
	public void setSubDeduct() {
		Set<DeductPracti> deductPractiSet = GsonUtil.fromJson(this.getDeductPractis(), new TypeToken<Set<DeductPracti>>() {});
		if (deductPractiSet != null) {
			for (DeductPracti p : deductPractiSet) {
				p.setDeductId(this.getDeductId());
				p.setReward(this.deductTotalAmount.multiply(p.getProportion().divide(EmmsConstant.HUNDRED)));
			}
		}
		this.setDeductPractiSet(deductPractiSet);

	}

}
