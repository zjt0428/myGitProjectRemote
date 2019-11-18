/**
 *====================================================
 * 文件名称: InsureEquip.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: InsureEquip
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "设备保险信息汇总", sheetName = "保险信息")
@SerialNumberStrategy(name = "insureSerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class EquipInsurance extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long insureId;

	/**保险单号*/
	@Expose
	private String insureSerial;

	/**起保日期*/
	@Expose
	private String startInsureDate;

	/**停保日期*/
	@Expose
	private String endInsureDate;

	/**保费总额*/
	@Expose
	private BigDecimal totalPremium;

	/**保险公司*/
	@Expose
	private String insuranceCompany;

	/**理赔电话*/
	@Expose
	private String claimPhone;

	/**联系人*/
	@Expose
	private String linkman;
	
	/**保障数量*/
	@Expose
	private Integer equipNum;

	@Expose
	@CodeFieldDeclare(codeId = "INSURE_EFFECTIVE", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;
	
	private String remark;

	private String delFlag;

	private Long userId;

	private String userName;

	private String providedDate;

	@Expose
	private String linkmanPhone;
	
	private Department department;
	
	@Expose
	private String claims;//是否理赔

	private Set<EquipInsuranceDetail> equipInsuranceDetailSet = new HashSet<EquipInsuranceDetail>(0);

	private String equipInsuranceDetails = "";

	// ================================================================================//
	public void setSubInsureClaim() {
		Set<EquipInsuranceDetail> equipInsuranceDetailSet = GsonUtil.fromJson(this.equipInsuranceDetails, new TypeToken<Set<EquipInsuranceDetail>>() {});
		if (equipInsuranceDetailSet != null) {
			for (EquipInsuranceDetail p : equipInsuranceDetailSet) {
				p.setInsureId(this.insureId);
			}
		}
		this.setEquipInsuranceDetailSet(equipInsuranceDetailSet);
	}

}
