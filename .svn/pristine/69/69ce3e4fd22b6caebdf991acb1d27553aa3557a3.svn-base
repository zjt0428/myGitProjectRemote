/**
 *====================================================
 * 文件名称: TruckPlan.java
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
 * @ClassName: TruckPlan
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:34:20
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "truckPlanSerial", strategy = "BC{yyyyMMdd}", maxseq = 999)
public class TruckPlan extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long truckPlanId;

	@Expose
	private String truckPlanSerial;
	
	@Expose
	private String truckPlanTheme;
	
	@Expose
	private Long userId;
	
	@Expose
	private String userName;

	@Expose
	private String providedDate;

	@Expose
	private String customerId;
	
	@Expose
	private String customerName;

	@Expose
	private String projectId;

	@Expose
	private String projectName;

	@Expose
	private String sigingTime;

	@Expose
	private Long practiId;

	@Expose
	private String practiName;

	@Expose
	private String projectManger;

	@Expose
	private String tel;

	@Expose
	private Long pbEnt;

	@Expose
	private String pbModule;

	@Expose
	private String pbEntName;

	@Expose
	private String pbEntLinkMan;

	private String pbEntLinkTel;

	@Expose
	private String startDate;

	@Expose
	private String projectAdress;

	@Expose
	private String remark;
	
	@Expose
	private String fileAttaches;

	@Expose
	@CodeFieldDeclare(codeId = "TRUCK_PLAN_STATUS", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	public void setModelSerial(String serial) {
		this.truckPlanSerial = serial;
	}

	public Long getApplyforId() {
		return this.truckPlanId;
	}

	// ==============================================================================//
	/*public void setSubContractArrange() {
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
	}*/

}
