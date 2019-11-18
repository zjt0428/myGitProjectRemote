/**
 *====================================================
 * 文件名称: Accident.java
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
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: ScrapApply
 * @Description: TODO(发货调度)
 * @author jlh
 * @date 2017年7月11日 下午4:34:46
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "dispatchSerial", strategy = "DD{yyyyMMdd}", maxseq = 999)
public class MaterialsDispatch extends ApplyforState implements ExportModel{

	private static final long serialVersionUID = 1L;

	@Expose
	private Long materialsId;

	/*调度单号*/
	@Expose
	private String dispatchSerial;
	
	/*调度主题*/
	@Expose
	private String dispatchTheme;

	/*制单时间*/
	@Expose
	private String applyDate;
	
	/*制单人ID*/
	@Expose
	private Long userId;
	
	/*制单人*/
	@Expose
	private String userName;
	
	/*仓库Id*/
	@Expose
	private Long storeId;

	/*仓库名称*/
	@Expose
	private String storeName;

	/*库位id*/
	@Expose
	private Long locationId;
	
	/*出库库位*/
	@Expose
	private String storageLocation;

	/*状态*/
	@Expose
	private String status;
	
	/*合同ID*/
	@Expose
	private Long contractId;
	
	/*合同编号*/
	@Expose
	private String contractSerial;
	
	/*合同流水号*/
	@Expose
	private String contractNumber;
	
	/*承租单位ID*/
	@Expose
	private Long pbEntId;
	
	/*承租单位*/
	@Expose
	private String pbEntName;
	
	/*工程名称*/
	@Expose
	private Long projectId;
	
	/*工程名称*/
	@Expose
	private String  projectName;
	
	
	/*运输车辆号*/
	@Expose
	private String  vehicleNum;
	
	/*运输车辆人员*/
	@Expose
	private String  vehiclePerson;
	
	@Expose
	@CodeFieldDeclare(codeId = "MATERIALS_DISPATCH_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;
	
	@Expose
	private String address;
	
	@Expose
	private String remark;
	
	private String delFlag = Constant.ENABLED;

	/**
	 * 是否通过APP二维码生成过装车单
	 * 是 ：1，否 ：0
	 * */
	@Expose
	private String generatePackageFlag;
	
	public void setModelSerial(String serial) {
		this.dispatchSerial = serial;
	}
	
	public Long getApplyforId() {
		return this.materialsId;
	}		
	
	@Expose(deserialize = false, serialize = true)
	@Since(value = 2.0)
	private Set<DispatchMaterials> dispatchMaterialsSet = new HashSet<DispatchMaterials>(0);
	
	private String dispatchMaterialss = "";

	// ==============================================================================//
		public void setMaterialsDispatch() {
			Set<DispatchMaterials> dispatchMaterialsSet = GsonUtil.fromJson(this.getDispatchMaterialss(), new TypeToken<Set<DispatchMaterials>>() {});
			if (dispatchMaterialsSet != null) {
				for (DispatchMaterials p : dispatchMaterialsSet) {
					p.setMaterialsId(this.getMaterialsId());
				}
			}
			this.setDispatchMaterialsSet(dispatchMaterialsSet);
		}

}
