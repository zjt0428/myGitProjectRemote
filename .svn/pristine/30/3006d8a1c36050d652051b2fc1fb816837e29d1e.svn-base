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
import com.knight.emms.core.BusinessModel;
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
public class ProductPlan extends BusinessModel  {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long productPlanId;

	@Expose
	private String startDate;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private String delFlag;
	
	@Expose
	private String endDate;

	@Override
	public void setModelSerial(String serial) {
		// TODO Auto-generated method stub
		
	}

	
	// ==============================================================================//
/*	public void setSubContractArrange() {
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
