/**
 *====================================================
 * 文件名称: AdvanceReceive.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
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
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: AdvanceReceive
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午2:32:07
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "advanceSerial", strategy = "SKDJ-{yyyyMMdd}-", maxseq = 999)
public class AdvanceReceive extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long adreceiveId;

	@Expose
	private long contractId;
	
	@Expose
	private Long userId;

	@Expose
	private String userName;
	
	@Expose
	private String advanceSerial;
	
	@Expose
	private String advanceTheme;
	
	private Long depId;
	
	@Expose
	private String providedDate;
	
	@Expose
	private Long receiveEntId;
	
	@Expose
	private String receiveModule;
	
	@Expose
	private String receiveEntName;
	
	@Expose
	private Long paymentId;
	
	@Expose
	private String paymentModule;
	
	@Expose
	private String paymentName;
	
	@CodeFieldDeclare(codeId = "paymentType", valueField = "paymentTypeName")
	private String paymentType;

	private String paymentTypeName;
	
	@Expose
	private Long practiId;

	@Expose
	private String practiName;
	
	@Expose
	private BigDecimal advanceReceiveAmount;
	
	@Expose
	private String advanceDate;
	
	@Expose
	private String remark;

	private String delFlag;
	
	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	private ContractLease contractLease;
	
	@Expose
	private Department department;
	
	/**
	 * 该字段有值则表示预收款已对冲至相应的结算单上
	 * */
	@Expose
	private Long settleId;

	@Override
	public Long getApplyforId() {
		// TODO Auto-generated method stub
		return this.adreceiveId;
	}

	public String getModelSerial() {
	return this.advanceSerial;
	}
	
	@Override
	public void setModelSerial(String serial) {
		this.advanceSerial = serial;
	}
}
