/**
 *====================================================
 * 文件名称: Project.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * @ClassName: Project
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 上午11:57:58
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "项目信息汇总", sheetName = "项目信息")
@SerialNumberStrategy(name = "projectSerial", strategy = "XM{yyyyMMdd}", maxseq = 999)
public class Project extends BusinessModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	public static final Project DEFAULT = new Project();

	@Expose
	private Long projectId;

	@Expose
	private String projectSerial;
	
	@Expose
	private Long contractId;

	@Expose
	private String projectName;

	@Expose
	@CodeFieldDeclare(codeId = "projectType", valueField = "projectTypeName")
	private String projectType;

	@Expose
	private String projectTypeName;

	@Expose
	private String depName;
	

	@Expose
	protected Long depId;

	@Expose
	protected Department department;

	@Expose
	@CodeFieldDeclare(codeId = "province", valueField = "provinceName")
	private String province;

	private String provinceName;

	@CodeFieldDeclare(codeId = "city", valueField = "cityName")
	private String city;

	private String cityName;

	@CodeFieldDeclare(codeId = "county", valueField = "countyName")
	private String county;

	private String countyName;

	@Expose
	private String street;

	@Expose
	private String address;

	@Expose
	@CodeFieldDeclare(codeId = "projectScale", valueField = "scaleName")
	private String scale;

	@Expose
	private String scaleName;

	@Expose
	private String startPlanDate;

	@Expose
	private String endPlanDate;

	@Expose
	private BigDecimal projectCost;

	@Expose
	private BigDecimal cover;

	@Expose
	private BigDecimal overallHeight;

	private String remark;

	private Long ctCustomId;
	@Expose
	private String ctCustomName;

	private String ctCustomLinker;

	private String ctCustomLinkTel;
	@Expose
	private Long unCustomId;

	@Expose
	private String unCustomName;

	@Expose
	private String unCustomLinker;

	@Expose
	private String unCustomLinkTel;

	private Long supCustomId;
	@Expose
	private String supCustomName;

	private String supCustomLinker;

	private String supCustomLinkTel;

	private Long practiId;

	@Expose
	private String practiName;
	
	private Long projectPractiId;

	@Expose
	private String projectPractiName;
	
	@Expose
	private BigDecimal projectMobile;
	
	private Long materialPractiId;

	@Expose
	private String materialPractiName;
	
	@Expose
	private BigDecimal materialMobile;

	@Expose
	private String expectEndDate;
	
	@Expose
	private String customerNickName;

	private String reqsDesc;

	@CodeFieldDeclare(codeId = "PROJECT_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;
	
	@Expose
	@CodeFieldDeclare(codeId = "TAX_MODE", valueField = "taxModeName")
	private String taxMode;
	
	@Expose
	private String taxModeName;
	
	@Expose
	private String constructPermit;

	@Expose
	private String projectRegister;
	
	@Expose
	private String constractNo;

	@Expose
	private String leaseProjectHead;
	
	@Expose
	private String contracted; //是否做过合同 0未  1做过
	
	@Expose
	private String materialsed; //是否做过周材合同 0未  1做过
	
	@Expose
	private String contractSerial;//周材合同编号

	private String delFlag = Constant.ENABLED;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ProjectExpense> projectExpenseSet = new HashSet<ProjectExpense>(0);

	private String projectExpenses = "";

	// ==========================================================================================//
	public void setModelSerial(String serial) {
		this.projectSerial = serial;
	}

	public void setSubProject() {
		Set<ProjectExpense> projectExpenseSet = GsonUtil.fromJson(this.getProjectExpenses(), new TypeToken<Set<ProjectExpense>>() {});
		if (projectExpenseSet != null) {
			for (ProjectExpense pe : projectExpenseSet) {
				pe.setProjectId(this.getProjectId());
			}
		}
		this.setProjectExpenseSet(projectExpenseSet);
	}

}
