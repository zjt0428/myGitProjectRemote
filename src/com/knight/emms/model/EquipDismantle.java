/**
 *====================================================
 * 文件名称: EquipDismantle.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: EquipDismantle
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:43:36
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare(isExportable = false, exportName = "拆卸信息汇总", sheetName = "拆卸信息")
@SerialNumberStrategy(name = "dismantleSerial", strategy = "CX{yyyyMMdd}", maxseq = 99)
public class EquipDismantle extends ApplyforState implements DiaryRelationMethod, ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long dismantleId;

	@Expose
	private String dismantleSerial;

	@Expose
	private String dismantleTheme;

	@Expose
	private Date startdisDate;

	@Expose
	private Date enddisDate;

	private Long spendTime;

	private Long principalId;

	@Expose
	private String principal;

	private String partake;

	private String dismantleHeight;

	@Expose
	private String remark;

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
	private String dismantleType;

	private Department department;
	
	@Expose
	private String personNum;

	@Expose
	private EquipFlow equipFlow;
	
	@Expose
	private Long installId;
	
	@Expose 
	private  Integer knotCounts;//标准节总数
	
	@Expose
	private Integer wallAttacheQty;//附墙总数
	
	@Expose
	private Integer equipAmount;//整机数量
	
	@Expose
	private String currentInstallHeight;//当前高度
	
	@Expose
	private String dismantleLocation;//拆卸位置
	
	@Expose
	private String checkAttach;//自检照片
	
	@Expose
	private Long disclosureId;//安全交底ID
	
	@Expose
	@CodeFieldDeclare(codeId = "APP_DISMANTLE_STATE", valueField = "appDismantleStateName")
	private String appDismantleState;

	@Expose
	private String appDismantleStateName;
	/*@Expose
	private EquipAddReduceDetail  equipAddReduceDetail;
	*/
	
	
	@Expose
	private Integer knotDisQty;//减少的的标准节数
	
	@Expose
	private Integer wallAttacheDisQty;//减少的附墙数
	
	
	@Expose
	private Integer wallAttachePoleQty;//减少的的附墙杆数
	
	@Expose
	private Integer wallAttacheFrameQty;//减少的附墙框数
	
	
	
	
	

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PractiDiary> practiDiarySet = new HashSet<PractiDiary>();

	private String practiDiarys = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ComponDiary> componDiarySet = new HashSet<ComponDiary>();

	private String componDiarys = "";

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
	
	public Long getApplyforId() {
		return this.dismantleId;
	}

	public void setModelSerial(String serial) {
		this.dismantleSerial = serial;
	}

	public Long getDiaryRelateId() {
		return this.dismantleId;
	}

	public String getDiaryRelateSerial() {
		return this.dismantleSerial;
	}

	public String getDiaryRelateTheme() {
		return this.dismantleTheme;
	}

	public String getDiaryRelateModule() {
		return SystemConstant.MODULE_EQUIP_DISMANTLE;
	}

	// ========================================================================//
	public void setSubEquipDismantle() {
		Set<PractiDiary> practiDiarySet = GsonUtil.fromJson(this.practiDiarys, new TypeToken<Set<PractiDiary>>() {});
		if (practiDiarySet != null) {
			for (PractiDiary pd : practiDiarySet) {
				pd.setRelateId(this.getDismantleId());
				pd.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
				pd.setRelateTheme(this.getDismantleTheme());
				pd.setRelateSerial(this.getDismantleSerial());
			}
			this.setPractiDiarySet(practiDiarySet);
		}
		Set<ComponDiary> componDiarySet = GsonUtil.fromJson(this.componDiarys, new TypeToken<Set<ComponDiary>>() {});
		if (componDiarySet != null) {
			for (ComponDiary ed : componDiarySet) {
				ed.setRelateId(this.getDismantleId());
				ed.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
				ed.setRelateTheme(this.getDismantleTheme());
				ed.setRelateSerial(this.getDismantleSerial());
			}
			this.setComponDiarySet(componDiarySet);
		}
		//************************************************************************
		Set<InstallFee> installFeeSet = GsonUtil.fromJson(this.installFees, new TypeToken<Set<InstallFee>>() {});
		if (installFeeSet != null) {
			for (InstallFee p : installFeeSet) {
				p.setRelateId(this.dismantleId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
				p.setRelateSerial(this.getDismantleSerial());
			}
			this.setInstallFeeSet(installFeeSet);
		}
		Set<AutocraneFee> autocraneFeeSet = GsonUtil.fromJson(this.autocraneFees, new TypeToken<Set<AutocraneFee>>() {});
		if (autocraneFeeSet != null) {
			for (AutocraneFee p : autocraneFeeSet) {
				p.setRelateId(this.dismantleId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
				p.setRelateSerial(this.getDismantleSerial());
			}
			this.setAutocraneFeeSet(autocraneFeeSet);
		}
		Set<InstallDismantelTeam> installDismantelTeamSet = GsonUtil.fromJson(this.installDismantelTeams, new TypeToken<Set<InstallDismantelTeam>>() {});
		if (installDismantelTeamSet != null) {
			for (InstallDismantelTeam p : installDismantelTeamSet) {
				p.setRelateId(this.dismantleId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
				p.setRelateSerial(this.getDismantleSerial());
			}
			this.setInstallDismantelTeamSet(installDismantelTeamSet);
		}
		Set<AutocraneUnit> autocraneUnitSet = GsonUtil.fromJson(this.autocraneUnits, new TypeToken<Set<AutocraneUnit>>() {});
		if (autocraneUnitSet != null) {
			for (AutocraneUnit p : autocraneUnitSet) {
				p.setRelateId(this.dismantleId);
				p.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
				p.setRelateSerial(this.getDismantleSerial());
			}
			this.setAutocraneUnitSet(autocraneUnitSet);
		}
		//************************************************************************************************
	}

}
