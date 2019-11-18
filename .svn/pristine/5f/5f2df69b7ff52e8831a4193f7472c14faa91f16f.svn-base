/**
 *====================================================
 * 文件名称: PractiCert.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;

/**
 * @ClassName: PractiCert
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 上午11:28:50
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true, exclude = { "practitioner" })
@PersistantDeclare(isExportable = true, exportName = "从业证书信息汇总", sheetName = "从业证书信息")
public class PractiCert extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long certId;

	@Expose
	private Long practiId;

	@Expose
	private String certNum;

	@CodeFieldDeclare(codeId = "specialtyType", valueField = "specialtyTypeName")
	private String specialtyType;

	@Expose
	private String registrantOrganization;
	
	@Expose
	private String specialtyTypeName;

	
	@CodeFieldDeclare(codeId = "kindWork", valueField = "practiKindworkName")
	private String practiKindwork;

	@Expose
	private String practiKindworkName;

	@CodeFieldDeclare(codeId = "certificateIssue", valueField = "awardDepartName")
	private String awardDepart;

	@Expose
	private String awardDepartName;
	
	@Expose
	private String awardDate;

	@Expose
	private String effectDate;
	
	@Expose
	private String contractDate;
	
	@Expose
	private String stampNum;

	@Expose
	@CodeFieldDeclare(codeId = "ARCHIVES_STATUS", valueField = "qstateName")
	private String qstate;

	@Expose
	private String qstateName;

	private String mark;

	private String remark;

	private String delFlag = Constant.ENABLED;

	@Expose
	private Practitioner practitioner;

}
