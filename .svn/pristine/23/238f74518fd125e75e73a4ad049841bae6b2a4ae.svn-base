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

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

/**
 * @ClassName: InsureEquip
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "设备保险信息汇总", sheetName = "保险信息")
public class InsureEquip extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long insureId;

	@Expose
	private String insureSerial;

	@Expose
	private String startInsureDate;

	@Expose
	private String endInsureDate;

	@Expose
	private BigDecimal coverage;

	@CodeFieldDeclare(codeId = "insureProgram", valueField = "insureProgramName", array = true)
	private String insureProgram;

	private String insureProgramName;

	private BigDecimal premium;

	@Expose
	private String insuranceCompany;

	@Expose
	private String claimPhone;

	private String linkman;

	private String stopInsureDate;

	private String recoverInsureDate;

	private String remark;

	private String delFlag;

	@Expose
	private Equipment equipment;

	@Expose
	private Project project;

	private Set<InsureClaim> insureClaimSet = new HashSet<InsureClaim>(0);

	private String insureClaims = "";

	// ================================================================================//
	public void setSubInsureClaim() {
		Set<InsureClaim> contractEquipSet = GsonUtil.fromJson(this.insureClaims, new TypeToken<Set<InsureClaim>>() {});
		if (contractEquipSet != null) {
			for (InsureClaim p : contractEquipSet) {
				p.setInsureId(this.insureId);
				p.setInsureSerial(this.insureSerial);
				p.setEquipId(this.getEquipment().getEquipId());
			}
		}
		this.setInsureClaimSet(contractEquipSet);
	}
}
