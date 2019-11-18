/**
 *====================================================
 * 文件名称: CorpInfo.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-25			chenxy(创建:创建文件)
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
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.system.model.Department;

/**
 * @ClassName: CorpInfo
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-25 下午9:57:41
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true, exclude = { "department", "practitionerSet", "corpAccountSet" })
@PersistantDeclare(isExportable = true, exportName = "注册企业信息汇总", sheetName = "注册企业")
public class CorpInfo extends BaseModel implements ExportModel, Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long corpId;

	@Expose
	private String corpName;

	@Expose
	private String corpCode;

	@CodeFieldDeclare(codeId = "corpType", valueField = "corpTypeName", array = true)
	private String corpType;

	@Expose
	private String corpTypeName;

	@Expose
	private String license;

	@CodeFieldDeclare(codeId = "province", valueField = "provinceName")
	private String province;

	private String provinceName;

	@CodeFieldDeclare(codeId = "city", valueField = "cityName")
	private String city;

	private String cityName;

	@CodeFieldDeclare(codeId = "county", valueField = "countyName")
	private String county;

	private String countyName;

	private String regAddress;

	private String safetyProdCert;

	@CodeFieldDeclare(codeId = "econType", valueField = "economicName")
	private String economic;

	private String economicName;

	private BigDecimal regPrin;

	@Expose
	private String birthDate;

	@Expose
	private String legalMan;

	@Expose
	private String legalMobile;

	private String legalManIdcard;

	private String legalManDuty;

	private String legalManProtitle;

	@Expose
	private String dutyman;

	@Expose
	private String dutymanTel1;

	private String dutymanTel2;

	private String dutymanTel3;

	private String finance;

	private String financeTel;

	private String capital;

	private String capitalTel;

	private String market;

	private String marketTel;
	

	private String postalCode;

	private String address;

	private String fax;

	private String officeTel;

	private String linkEmail;

	private String corpDesc;

	private String remark;

	private Long photo;
	
	private String technology;
	
	private String maintenance;
	
	private String engineering;

	private String technologyTel;

	private String maintenanceTel;
	
	private String engineeringTel;

	private String security;

	private String securityTel;

	private String chiefEngineer;

	private String chiefEngineerTel;
	
	private String maintenances;
	
	private String maintenancesTel;
	
	private String chiefEconomist;
	
	private String chiefEconomistTel;
	
	private String material;
	
	private String materialTel;
	
	private String safety;
	
	private String safetyTel;

	@Expose
	private String certNum;

	@Expose
	private String certLevel;

	@Expose
	@CodeFieldDeclare(codeId = "ARCHIVES_STATUS", valueField = "corpStatusName")
	private String corpStatus = Status.Archives.enabled;

	private String corpStatusName;

	private String delFlag = Constant.ENABLED;

	private Long certId;

	@Expose
	private CorpCert corpCert;

	@Expose
	@Since(2.0)
	protected Department department;

	@Expose(deserialize = false, serialize = false)
	@Since(2.0)
	private transient Set<CorpAccount> corpAccountSet = new HashSet<CorpAccount>(0);

	private String corpAccounts = "";

	@Expose(deserialize = false, serialize = false)
	@Since(3.0)
	private transient Set<Practitioner> practitionerSet = new HashSet<Practitioner>(0);

	// ==========================================================================================//
	public CorpInfo clone() {
		CorpInfo entity = null;
		try {
			entity = (CorpInfo) super.clone();
			entity.setCorpCert(this.getCorpCert() != null ? this.getCorpCert() : null);
			entity.setCorpAccountSet(null);
			entity.setPractitionerSet(null);
			entity.setDepartment(null);
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return entity;
	}

	public void setSubCorpInfo() {
		Set<CorpAccount> corpAccountSet = GsonUtil.fromJson(this.getCorpAccounts(), new TypeToken<Set<CorpAccount>>() {});
		if (corpAccountSet != null) {
			for (CorpAccount sa : corpAccountSet) {
				sa.setCorpId(this.getCorpId());
			}
			this.setCorpAccountSet(corpAccountSet);
		}
	}

}
