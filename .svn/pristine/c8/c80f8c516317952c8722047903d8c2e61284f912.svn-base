/**
 *====================================================
 * 文件名称: EquipInstall.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.Date;
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
import com.knight.emms.constant.Constant;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: EquipInstall
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:14:40
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "安装信息汇总", sheetName = "安装信息")
@SerialNumberStrategy(name = "installSerial", strategy = "AZ{yyyyMMdd}", maxseq = 999)
public class EquipInstall extends ApplyforState implements DiaryRelationMethod, ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long installId;

	@Expose
	private String installSerial;

	@Expose
	private String installTheme;

	@Expose
	private Date startinDate;

	@Expose
	private Date endinDate;

	private Long spendTime;

	private Short practiCount;

	private Long principalId;

	@Expose
	private String principal;

	private String principalTel;
	@Expose
	private String partake;

	@Expose
	private BigDecimal installHeight;

	@Expose
	private Integer firstKnotCount;//首次标准节数
	
	@Expose
	private Integer firstAttach;//首次附墙数
	
	@Expose
	private Integer wallAttachePoleNum;//首次附墙杆数量
	
	@Expose
	private Integer wallAttacheFrameNum;//首次附墙框数量
	
	@Expose
	private Integer knotCounts;//累计标准节总数
	
	@Expose
	private Integer wallAttacheQty;//累计附墙总数
	
	@Expose
	private Integer wallAttachePoleCount;//累计附墙杆总数
	
	@Expose
	private Integer wallAttacheFrameCount;//累计附墙框总数
	@Expose
	private BigDecimal brachium;

	@Expose
	private String remark;
	
	@Expose
	private String buildingNum;

	private Long userId;

	private String userName;

	@Expose
	private String providedDate;

	@Expose
	private String longitude;

	@Expose
	private String latitude;

	@Expose
	private String address;

	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	@Expose
	private String fileAttaches;

	@Expose
	private String jackFileAttaches;

	@Expose
	private String dropFileAttaches;
	
	@Expose
	private String installtype;
	
	/*合同编号*/
	@Expose
	private String contractSerial;
	/*区域*/
	@Expose
	private String belongToArea;
	/*设备自编号*/
	@Expose
	private String equipmentNo;
	/*出厂日期*/
	@Expose
	private String exwDate;
	/*生产厂家*/
	@Expose
	private String equipVender;

	private Department department;

	@Expose
	private EquipFlow equipFlow;
	
	@Expose
	private String approachNumber;
	

	@Expose
	private String competentDepartment;
	
	@Expose
	private Integer equipAmount;//整机数量
	
	@Expose
	private String currentInstallHeight;//当前高度
	
	@Expose
	private String installLocation;//安装位置
	
	@Expose
	private String checkAttach;//自检照片
	
	@Expose
	private Long disclosureId;//安全交底ID
	
	@Expose
	@CodeFieldDeclare(codeId = "APP_INSTALL_STATUS", valueField = "appInstallStateName")
	private String appInstallState;

	@Expose
	private String appInstallStateName;
	
	
	//**************************************************
	//安装费用
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<InstallFee> installFeeSet = new HashSet<InstallFee>();

	private String installFees = "";
	//汽吊费用
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AutocraneFee> autocraneFeeSet = new HashSet<AutocraneFee>();

	private String autocraneFees = "";
	//安拆班组
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<InstallDismantelTeam> installDismantelTeamSet = new HashSet<InstallDismantelTeam>();

	private String installDismantelTeams = "";
	//汽吊单位
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AutocraneUnit> autocraneUnitSet = new HashSet<AutocraneUnit>();

	private String autocraneUnits = "";
	//***************************************************
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PractiDiary> practiDiarySet = new HashSet<PractiDiary>();

	private String practiDiarys = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ComponDiary> componDiarySet = new HashSet<ComponDiary>();

	private String componDiarys = "";
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<InstallJjCompon> jjComponSet = new HashSet<InstallJjCompon>();

	private String jjCompons = "";

	public Long getApplyforId() {
		return this.installId;
	}

	public void setModelSerial(String serial) {
		this.installSerial = serial;
	}

	public Long getDiaryRelateId() {
		return this.installId;
	}

	public String getDiaryRelateSerial() {
		return this.installSerial;
	}

	public String getDiaryRelateTheme() {
		return this.installTheme;
	}

	public String getDiaryRelateModule() {
		return SystemConstant.MODULE_EQUIP_INSTALL;
	}

	// ========================================================================//
	private CorpInfo inEntInfo;

	public void setSubEquipInstall() {
		Set<PractiDiary> practiDiarySet = GsonUtil.fromJson(this.practiDiarys, new TypeToken<Set<PractiDiary>>() {});
		if (practiDiarySet != null) {
			this.setPractiDiarySet(practiDiarySet);
		}
		Set<ComponDiary> componDiarySet = GsonUtil.fromJson(this.componDiarys, new TypeToken<Set<ComponDiary>>() {});
		if (componDiarySet != null) {
			this.setComponDiarySet(componDiarySet);
		}
		//************************************************************************
		Set<InstallFee> installFeeSet = GsonUtil.fromJson(this.installFees, new TypeToken<Set<InstallFee>>() {});
		if (installFeeSet != null) {
			for (InstallFee p : installFeeSet) {
				p.setRelateId(this.installId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_INSTALL);
				p.setRelateSerial(this.getInstallSerial());
			}
			this.setInstallFeeSet(installFeeSet);
		}
		Set<AutocraneFee> autocraneFeeSet = GsonUtil.fromJson(this.autocraneFees, new TypeToken<Set<AutocraneFee>>() {});
		if (autocraneFeeSet != null) {
			for (AutocraneFee p : autocraneFeeSet) {
				p.setRelateId(this.installId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_INSTALL);
				p.setRelateSerial(this.getInstallSerial());
			}
			this.setAutocraneFeeSet(autocraneFeeSet);
		}
		Set<InstallDismantelTeam> installDismantelTeamSet = GsonUtil.fromJson(this.installDismantelTeams, new TypeToken<Set<InstallDismantelTeam>>() {});
		if (installDismantelTeamSet != null) {
			for (InstallDismantelTeam p : installDismantelTeamSet) {
				p.setRelateId(this.installId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_INSTALL);
				p.setRelateSerial(this.getInstallSerial());
			}
			this.setInstallDismantelTeamSet(installDismantelTeamSet);
		}
		Set<AutocraneUnit> autocraneUnitSet = GsonUtil.fromJson(this.autocraneUnits, new TypeToken<Set<AutocraneUnit>>() {});
		if (autocraneUnitSet != null) {
			for (AutocraneUnit p : autocraneUnitSet) {
				p.setRelateId(this.installId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_INSTALL);
				p.setRelateSerial(this.getInstallSerial());
			}
			this.setAutocraneUnitSet(autocraneUnitSet);
		}
		//************************************************************************************************
	}
	
	public void setSubComponInstall() {
        Set<InstallJjCompon> jjComponSet = GsonUtil.fromJson(this.jjCompons, new TypeToken<Set<InstallJjCompon>>() {});
		if (jjComponSet != null) {
			for(InstallJjCompon jj:jjComponSet){
				jj.setInstallId(this.getInstallId());
			}			
			this.setJjComponSet(jjComponSet);
		}
	}

}
