/**
 *====================================================
 * 文件名称: ContractArrange.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
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

/**
 * @ClassName: ContractArrange
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:34:20
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "arrangeSerial", strategy = "YW{yyyyMMdd}", maxseq = 999)
public class ContractArrange extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long arrangeId;

	@Expose
	private String arrangeSerial;

	private String arrangeType;
	
	@Expose
	private Long inEnt;
	
	@Expose
	private String inEntModule;

	@Expose
	private String inEntName;

	@Expose
	private String inEntCertNum;
	
	@Expose
	private String inEntTitleLevel;

	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;

	@Expose
	private String equipCategoryName;

	@Expose
	@CodeFieldDeclare(codeId = "province", valueField = "provinceName")
	private String province;

	@Expose
	private String provinceName;

	@Expose
	private Long customerId;

	@Expose
	private String customerName;

	@Expose
	private String customerAddress;

	@Expose
	private String linker;

	@Expose
	private String linkerTel;

	@Expose
	private Long corpId;

	@Expose
	private String corpName;

	@Expose
	private String dutyman;

	@Expose
	private String dutymanTel;

	@Expose
	private Integer quantity;

	@Expose
	private Long projectId;

	@Expose
	private String projectName;

	@Expose
	private String projectAddress;

	@Expose
	private String projectTimeLimit;

	@Expose
	private BigDecimal overallHeight;

	@Expose
	private String projectStatus;
	
	@Expose
	private String taxMode;

	@Expose
	private String startDate;

	@Expose
	private Long userId;

	@Expose
	private String userName;
	
	@Expose
	private String taxModeName;

	@Expose
	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	@Expose
	private String inuse;
	
	@Expose
	private String competentDepartment;

	/**合同类型*/
	@Expose
	@CodeFieldDeclare(codeId = "CONTRACT_TYPE", valueField = "contractTypeName")
	private String contractType;

	private String contractTypeName;
	
	/**合作方式*/
	@Expose
	@CodeFieldDeclare(codeId = "COOPERATION_WAY", valueField = "cooperationWayName")
	private String cooperationWay;
	
	private String cooperationWayName;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ContractArrangeEquipment> contractArrangeEquipmentSet = new HashSet<ContractArrangeEquipment>();

	private String contractArrangeEquipments = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ContractArrangeSituation> contractArrangeSituationSet = new HashSet<ContractArrangeSituation>();

	private String contractArrangeSituations = "";

	public void setModelSerial(String serial) {
		this.arrangeSerial = serial;
	}

	public Long getApplyforId() {
		return this.arrangeId;
	}

	// ==============================================================================//
	public void setSubContractArrange() {
		Set<ContractArrangeEquipment> contractArrangeEquipmentSet = GsonUtil.fromJson(this.getContractArrangeEquipments(), new TypeToken<Set<ContractArrangeEquipment>>() {});
		if (contractArrangeEquipmentSet != null) {
			for (ContractArrangeEquipment p : contractArrangeEquipmentSet) {
				p.setArrangeId(arrangeId);
			}
		}
		this.setContractArrangeEquipmentSet(contractArrangeEquipmentSet);

		Set<ContractArrangeSituation> contractArrangeSituationSet = GsonUtil.fromJson(this.getContractArrangeSituations(), new TypeToken<Set<ContractArrangeSituation>>() {});
		if (contractArrangeSituationSet != null) {
			for (ContractArrangeSituation p : contractArrangeSituationSet) {
				p.setArrangeId(arrangeId);
			}
		}
		this.setContractArrangeSituationSet(contractArrangeSituationSet);
	}

}
