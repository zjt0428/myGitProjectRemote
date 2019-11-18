/**
 *====================================================
 * 文件名称: IndisSchema.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: IndisSchema
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午7:24:03
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "schemaSerial", strategy = "FA{yyyyMMdd}", maxseq = 99)
public class IndisSchema extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long schemaId;

	@Expose
	private String schemaSerial;

	@Expose
	private String providedDate;

	private Long emEnt;

	private String emEntModule;

	@Expose
	private String emEntName;

	private Long inEnt;

	private String inEntModule;

	@Expose
	private String inEntName;

	@Expose
	private String inEntCertNum;

	@Expose
	private String inEntTitleLevel;

	private String technicalDirector;

	private String technicalPhone;

	private String secureDirector;

	private String securePhone;

	private String schemaDesigner;

	private String schemaPhone;

	private BigDecimal overallHeight;

	private String finalHeight;

	@Expose
	private String blockNumber;

	private String remark;

	private Long userId;

	private String userName;

	private String boomLength;

	private String axisPosition;

	private String projectPrincipal;

	private Long depId;

	@Expose
	private String issuer;

	@Expose
	private String issuerDepartment;

	@Expose
	private String applyforUserId;

	@Expose
	@CodeFieldDeclare(codeId = "INDIS_SCHEMA_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String relateModule;

	private Department department;

	@Expose
	private Project project;

	//private ContractLease contractLease;
	@Expose
	private ContractArrange contractArrange;

	@Expose
	private Equipment equipment;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<IndisSchemaPracti> indisSchemaPractiSet = new HashSet<IndisSchemaPracti>();

	private String indisSchemaPractis = "";

	// ==========================================================================================//
	public void setSubIndisSchema() {
		Set<IndisSchemaPracti> indisSchemaPractiSet = GsonUtil.fromJson(this.getIndisSchemaPractis(), new TypeToken<Set<IndisSchemaPracti>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (indisSchemaPractiSet != null) {
			for (IndisSchemaPracti e : indisSchemaPractiSet) {
				e.setSchemaId(this.schemaId);
			}
			this.setIndisSchemaPractiSet(indisSchemaPractiSet);
		} else {
			this.setIndisSchemaPractiSet(new HashSet<IndisSchemaPracti>());
		}
	}

	public void setModelSerial(String serial) {
		this.schemaSerial = serial;
	}

	@Override
	public Long getApplyforId() {
		return this.schemaId;
	}

}
