/**
 *====================================================
 * 文件名称: MaterialsPlan.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月11日			chenxy(创建:创建文件)
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
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: MaterialsPlan
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月11日 下午10:24:16
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "documentSerial", strategy = "XQJH{yyyyMMdd}", maxseq = 999)
public class MaterialsPlan extends ApplyforState {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long materialsPlanId;

	@Expose
	private String documentSerial;

	@Expose
	private String reportingTime;
	
	@Expose
	private Long projectId;

	@Expose
	private String projectName;
	
	@Expose
	private String address;

	@Expose
	@CodeFieldDeclare(codeId = "projectType", valueField = "projectTypeName")
	private String projectType;
	
	@Expose
	private String projectTypeName;

	@Expose
	private String planApplicants;
	
	@Expose
	@CodeFieldDeclare(codeId = "belongToArea", valueField = "belongToAreaName")
	private String belongToArea;
	
	@Expose
	private String belongToAreaName;
	
	@Expose
	@CodeFieldDeclare(codeId = "planType", valueField = "planTypeName")
	private String planType;
	
	@Expose
	private String planTypeName;

	@Expose
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;
	
	@Expose
	private String assetsPropertyName;

	@Expose
	private String workFlow;

	@Expose
	private String title;

	@Expose
	private String approver;

	@Expose
	private String approvalDate;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private String confirmingPerson;
	
	@Expose
	private String confirmationDate;
	
	@Expose
	private String engineeringSchedule;

	@Expose
	private String remark;

	@Expose
	private String fileAttaches;
	
	@Expose
	@CodeFieldDeclare(codeId = "MATERIALS_PLAN_STATUS", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;


	public void setModelSerial(String serial) {
		// TODO Auto-generated method stub
		this.documentSerial = serial;
	}

	@Override
	public Long getApplyforId() {
		return this.materialsPlanId;
	}
	
	private String demandDetails = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<DemandDetail> demandDetailSet = new HashSet<DemandDetail>();

	// ==============================================================================//
		public void setSubMaterialsPlan() {
			Set<DemandDetail> demandDetailSet = GsonUtil.fromJson(this.getDemandDetails(), new TypeToken<Set<DemandDetail>>() {});
			if (demandDetailSet != null) {
				for (DemandDetail p : demandDetailSet) {
					p.setMaterialsPlanId(materialsPlanId);
				}
			}
			this.setDemandDetailSet(demandDetailSet);
		}
}
