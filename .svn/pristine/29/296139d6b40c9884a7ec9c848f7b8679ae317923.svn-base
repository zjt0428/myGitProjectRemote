/**
 *====================================================
 * 文件名称: Practitioner.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.model.UserExtend;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: Practitioner
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 上午11:25:10
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true, exclude = { "appUser", "department" })
@PersistantDeclare(isExportable = true, exportName = "从业人员信息汇总", sheetName = "从业人员")
public class Practitioner extends UserExtend implements ExportModel, Cloneable {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long practiId;

	private Long corpId;

	private Long depId;

	private Long userId;

	@Expose
	private String practiName;

	@CodeFieldDeclare(codeId = "SEX", valueField = "sexName")
	private String sex;

	private String sexName;

	@Expose
	private String idCard;

	@Expose
	private String mobile;

	private String birthDate;

	@CodeFieldDeclare(codeId = "nation", valueField = "nationName")
	private String nation;

	private String nationName;

	@Expose
	private String station;

	@Expose
	private String divisionDate;

	@Expose
	private String separationDate;
	
	/**人员状态 1在岗2待岗0离职*/
	@Expose
	private String incumbent;

	@Expose
	@CodeFieldDeclare(codeId = "kindWork", valueField = "kindWorkName")
	private String kindWork;

	@Expose
	private String kindWorkName;

	@Expose
	private BigDecimal baseSalary;

	@CodeFieldDeclare(codeId = "degree", valueField = "degreeName")
	private String degree;

	private String degreeName;

	@CodeFieldDeclare(codeId = "edulevel", valueField = "eduLevelName")
	private String eduLevel;

	private String eduLevelName;

	private String university;

	private String major;

	@Expose
	private String professionTitle;

	private String birthplace;

	@Expose
	private String homeTel;

	@Expose
	private String email;

	private String address;
	
	@Expose
	private Long photo;

	@Expose
	private String bankDeposit;

	@Expose
	private String account;

	private String remark;

	@Expose
	private String teams;

	@Expose
	private String certFlag;
	
	@Expose
	@CodeFieldDeclare(codeId = "ARCHIVES_STATUS", valueField = "practiStatusName")
	private String practiStatus = Status.Archives.enabled;

	private String practiStatusName;

	//参保状态
    @Expose
    @CodeFieldDeclare(codeId = "INSURE_STATUS", valueField = "insureStatusName")
    private String insureStatus = "0";
    @Expose
    private String insureStatusName;
    //参保时间
    @Expose
    private String insureTime;
    
	
	private String delFlag = Constant.ENABLED;

	@Expose
	private CorpInfo corpInfo;

	@Expose
	private Department department;

//	@Expose
	private AppUser appUser;

	@Expose
	private Long projectId;

	@Expose
	private String projectName;
	
	@Expose
	private Project project;
	
	/**安全教育教育时间*/
	@Expose
	private String edcationTime;
	
	/**安全交底时间*/
	@Expose
	private String clarificaTime;

	//挂靠状态（0非挂靠；1挂靠。默认非挂靠）
	@Expose
	private String isAffiliate = "0";
	
	//是否进入黑名单（0否1是）
	@Expose
	private String blacklist;
	
	//评价星级
	@Expose
	private String starsLevel;
	
	//上班状态(1)下班(2)上班
	@Expose
	private String workState;
	
	//评价次数
	@Expose
	private Integer evaluaCount=0;
	/*设备名称**/
	@Expose
	private String equipGenericName;
	
	//交底状态
	@Expose
	@CodeFieldDeclare(codeId = "PRACTI_DISCLOSE_STATE", valueField = "clarificaStatusName")
	private String clarificaStatus = "0";
	@Expose
	private String clarificaStatusName;
	
	//最新教育确认状态
	@Expose
	@CodeFieldDeclare(codeId = "EDU_CLA_CONFIRM_STATE", valueField = "eduConfirmStateName")
	private String eduConfirmState;
	@Expose
	private String eduConfirmStateName;
	
	//最新交底确认状态
	@Expose
	@CodeFieldDeclare(codeId = "EDU_CLA_CONFIRM_STATE", valueField = "claConfirmStateName")
	private String claConfirmState;
	@Expose
	private String claConfirmStateName;
	
    @Expose
    private PermissionManager permissionManager;
	
	@Override
	public Long getForeignId() {
		return this.practiId;
	}

	@Override
	public String getForeignName() {
		return this.practiName;
	}

	@Override
	public String getForeignModule() {
		return SystemConstant.MODULE_PRACTITIONER;
	}

	// ==========================================================================================//
	public Practitioner clone() {
		Practitioner entity = null;
		try {
			entity = (Practitioner) super.clone();
			entity.department = null;
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return entity;
	}

}
