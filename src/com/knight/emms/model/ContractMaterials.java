/**
 *====================================================
 * 文件名称: ContractMaterials.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
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
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: ContractMaterials
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午9:36:30
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "周材合同信息汇总", sheetName = "周材合同")
@SerialNumberStrategy(name = "contractNumber", strategy = "", maxseq = 999999)
public class ContractMaterials extends ApplyforState implements ExportModel{

	private static final long serialVersionUID = 1L;

	@Expose
	private Long contractmaId;

	@Expose
	private String contractNumber;

	@Expose
	private String contractSerial;

	@Expose
	private String contractTheme;
	
	@Expose
	@CodeFieldDeclare(codeId = "contractCategory", valueField = "contractCategoryName")
	private String contractCategory;

	@Expose
	private String contractCategoryName;
	
	@Expose
	@CodeFieldDeclare(codeId = "CONTRACT_MATERIALS_STATUS", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;
	
	@Expose
	@CodeFieldDeclare(codeId = "assetsProperty", valueField = "assetsPropertyName")
	private String assetsProperty;
	
	@Expose
	private String assetsPropertyName;
	
	@Expose
	private Long projectId;
	
	@Expose
	private String projectName;
	
	@Expose
	private String address;
	
	@Expose
	private Long paEnt;

	@Expose
	private String paModule;

	@Expose
	private String paEntName;

	@Expose
	private String paEntLinkMan;
	
	@Expose
	private Long pbEnt;
	
	@Expose
	private String pbModule;
	
	@Expose
	private String pbEntName;

	@Expose
	private String pbEntLinkMan;
	
	@Expose
	private String	sigingTime;
	
	@Expose
	@CodeFieldDeclare(codeId = "TRANPORT_CACULATE_TYPE", valueField = "tranportCaculateTypeName")
	private String tranportCaculateType;
	
	@Expose
	private String tranportCaculateTypeName;
	
	@Expose
	@CodeFieldDeclare(codeId = "TAX_CACULATE_TYPE", valueField = "taxCaculateTypeName")
	private String taxCaculateType;
	
	@Expose
	private String taxCaculateTypeName;

//	@Expose
//	@CodeFieldDeclare(codeId = "engineeringType", valueField = "engineeringTypeName")
//	private String engineeringType;
//	
//	@Expose
//	private String engineeringTypeName;
	
	@Expose
	@CodeFieldDeclare(codeId = "projectType", valueField = "projectTypeName")
	private String projectType;
	
	@Expose
	private String projectTypeName;
	
	@Expose
	@CodeFieldDeclare(codeId = "belongToArea", valueField = "belongToAreaName")
	private String belongToArea;
	
	@Expose
	private String belongToAreaName;
	
	@Expose
	private String buildingArea;
	
	@Expose
	@CodeFieldDeclare(codeId = "province", valueField = "provinceName")
	private String province;

	@Expose
	private String provinceName;

	@Expose
	@CodeFieldDeclare(codeId = "city", valueField = "cityName")
	private String city;

	@Expose
	private String cityName;

	@Expose
	@CodeFieldDeclare(codeId = "county", valueField = "countyName")
	private String county;

	@Expose
	private String countyName;
	
	@Expose
	private String street;
	
	@Expose
	private BigDecimal taxRate;
	
	@Expose
	private BigDecimal rentalRate;
	
	@Expose
	private BigDecimal freight;
	
	@Expose
	private BigDecimal contractAmount;
	
	@Expose
	private BigDecimal preReceivable;
	
	@Expose
	private BigDecimal finSettingAmount;
	
	@Expose
	private BigDecimal finReceivableAmount;
	
	@Expose
	private BigDecimal validationAmount;
	
	//项目主管部门
	@Expose
	private String competentDepartment;
	
	@Expose
	private String remark;
	
	//新增合同时被授权的用户
	@Expose
	private Long grantedUserId;
	
	private String delFlag;

	// ===============================================================================//

	public Long getApplyforId() {
		return this.contractmaId;
	}

	public void setModelSerial(String serial) {
		this.contractNumber = serial;
	}

	public String getModelSerial() {
		return this.contractNumber;
	}

	@Override
	public Long getUserId() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<MaterialsDetail> materialsDetailSet = new HashSet<MaterialsDetail>(0);

	private String materialsDetails = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PriceSetting> priceSettingSet = new HashSet<PriceSetting>(0);

	private String priceSettings = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<MatDamage> matDamageSet = new HashSet<MatDamage>(0);

	private String matDamages = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<CostHandle> costHandleSet = new HashSet<CostHandle>(0);

	private String costHandles = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<CompensationScrap> compensationScrapSet = new HashSet<CompensationScrap>(0);

	private String compensationScraps = "";
	
	// ===============================================================================//
	public void setSubContractMaterials() {
		Set<MaterialsDetail> materialsDetailSet = GsonUtil.fromJson(this.getMaterialsDetails(), new TypeToken<Set<MaterialsDetail>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (materialsDetailSet != null) {
			for (MaterialsDetail p : materialsDetailSet) {
				p.setContractmaId(this.getContractmaId());
			}
		}
		this.setMaterialsDetailSet(materialsDetailSet);

		Set<PriceSetting> priceSettingSet = GsonUtil.fromJson(this.getPriceSettings(), new TypeToken<Set<PriceSetting>>() {});
		if (priceSettingSet != null) {
			for (PriceSetting p : priceSettingSet) {
				p.setContractmaId(this.getContractmaId());
			}
		}
		this.setPriceSettingSet(priceSettingSet);

		Set<MatDamage> matDamageSet = GsonUtil.fromJson(this.getMatDamages(), new TypeToken<Set<MatDamage>>() {});
		if (matDamageSet != null) {
			for (MatDamage p : matDamageSet) {
				p.setContractmaId(this.contractmaId);
			}
		}
		this.setMatDamageSet(matDamageSet);

		Set<CostHandle> costHandleSet = GsonUtil.fromJson(this.getCostHandles(), new TypeToken<Set<CostHandle>>() {});
		if (costHandleSet != null) {
			for (CostHandle p : costHandleSet) {
				p.setContractmaId(this.contractmaId);
			}
		}
		this.setCostHandleSet(costHandleSet);
		
		Set<CompensationScrap> compensationScrapSet = GsonUtil.fromJson(this.getCompensationScraps(), new TypeToken<Set<CompensationScrap>>() {});
		if (compensationScrapSet != null) {
			for (CompensationScrap p : compensationScrapSet) {
				p.setContractmaId(this.contractmaId);
			}
		}
		this.setCompensationScrapSet(compensationScrapSet);
	}

}
