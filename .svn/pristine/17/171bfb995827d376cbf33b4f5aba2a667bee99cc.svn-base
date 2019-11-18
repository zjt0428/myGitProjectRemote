/**
 *====================================================
 * 文件名称: EquipDetect.java
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
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;

/**
 * @ClassName: EquipDetect
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "检测信息汇总", sheetName = "检测信息")
public class EquipDetect extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long detectId;

	@Expose
	private String detectSerial;

	private Long relateId;

	@Expose
	private String relateSerial;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;

	private Long detectEnt;

	@Expose
	private BigDecimal detectAmount;

	@Expose
	private BigDecimal paymentAmount;

	@Expose
	private BigDecimal balanceAmount;

	@Expose
	private String emEntName;

	@Expose
	private String supEntName;

	@Expose
	private String licenseNumber;

	@Expose
	private String installPrincipal;

	@Expose
	private String installCertNum;

	@Expose
	private String projectPrincipal;

	@Expose
	private String projectCertNum;

	@Expose
	private String detectDate;

	@Expose
	private String redetectDate;

	@Expose
	private String reportDate;

	@Expose
	private String safetyPrincipal;

	@Expose
	private String safetyCertNum;

	@Expose
	private String detectEntName;

	private String remark;

	private String delFlag;

	@Expose
	private EquipFlow equipFlow;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<EquipDetectStatement> equipDetectStatementSet = new HashSet<EquipDetectStatement>();

	private String equipDetectStatements = "";

	// ==========================================================================================//
	public void setSubEquipDetect() {
		Set<EquipDetectStatement> equipDetectStatementSet = GsonUtil.fromJson(this.getEquipDetectStatements(), new TypeToken<Set<EquipDetectStatement>>() {}, DateUtil.LINK_DISPLAY_DATE);
		if (equipDetectStatementSet != null) {
			for (EquipDetectStatement e : equipDetectStatementSet) {
				e.setDetectId(this.detectId);
			}
			this.setEquipDetectStatementSet(equipDetectStatementSet);
		}
	}
}
