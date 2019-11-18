/**
 *====================================================
 * 文件名称: MaterialsRepair.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: MaterialsRepair
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:41:01
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "repairSerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class MaterialsRepair extends ApplyforState implements Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long materialsRepairId;
	
	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	private Long userId;
	
	/**填报人*/
	@Expose
	private String userName;
	
	/**维修编号*/
	@Expose
	private String repairSerial;

	@Expose
	private String repairPersonnel;
	
	/*维修班组ID*/
	@Expose
	private Long teamId;
	
/*	维修班组*/
	@Expose
	private String teamName;

	/**维修主题*/
	@Expose
	private String repairTheme;

	/**维修日期*/
	@Expose
	private String repairDate;

	/**维修仓库*/
	@Expose
	private Long storeId;

	/**维修仓库*/
	@Expose
	private String storeName;

	/**维修仓库*/
	@Expose
	private String storeAddress;

	/**维修费用*/
	@Expose
	private String repairCost;

	/**维修情况*/
	@Expose
	private String repairSituation;

	/**附属单号*/
	@Expose
	private String affiliatedSerial;
	
	@Expose
	private String remark;
	
	private String delFlag = Constant.ENABLED;
	
	public Long getApplyforId() {
		return this.materialsRepairId;
	}

	@Override
	public Long getUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setModelSerial(String serial) {
		this.repairSerial=serial;
	}
	
	public String getModelSerial() {
		return this.repairSerial;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<BeforeMaterialsRepair> beforeMaterialsRepairSet = new HashSet<BeforeMaterialsRepair>(0);

	private String beforeMaterialsRepairs = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AfterMaterialsRepair> afterMaterialsRepairSet = new HashSet<AfterMaterialsRepair>(0);

	private String afterMaterialsRepairs = "";
	
	public void setSubMaterialsRepair() {
		Set<BeforeMaterialsRepair> beforeMaterialsRepairSet = GsonUtil.fromJson(this.getBeforeMaterialsRepairs(), new TypeToken<Set<BeforeMaterialsRepair>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (beforeMaterialsRepairSet != null) {
			for (BeforeMaterialsRepair p : beforeMaterialsRepairSet) {
				p.setMaterialsRepairId(this.getMaterialsRepairId());
			}
		}
		this.setBeforeMaterialsRepairSet(beforeMaterialsRepairSet);
		
		Set<AfterMaterialsRepair> afterMaterialsRepairSet = GsonUtil.fromJson(this.getAfterMaterialsRepairs(), new TypeToken<Set<AfterMaterialsRepair>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (afterMaterialsRepairSet != null) {
			for (AfterMaterialsRepair p : afterMaterialsRepairSet) {
				p.setMaterialsRepairId(this.getMaterialsRepairId());
			}
		}
		this.setAfterMaterialsRepairSet(afterMaterialsRepairSet);
	}	
	public MaterialsRepair clone() {
		try {
			return (MaterialsRepair) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}
}
