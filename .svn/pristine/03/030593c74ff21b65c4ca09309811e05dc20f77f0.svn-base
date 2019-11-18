/**
 *====================================================
 * 文件名称: EquipEmploy.java
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

import lombok.Data;
import lombok.ToString;

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

/**
 * @ClassName: EquipEmploy
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:40:56
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare(isExportable = false, exportName = "使用信息汇总", sheetName = "使用信息")
@SerialNumberStrategy(name = "employSerial", strategy = "XJ{yyyyMMdd}", maxseq = 99)
public class EquipEmploy extends ApplyforState implements DiaryRelationMethod, ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long employId;

	@Expose
	private String employSerial;

	@Expose
	private String employTheme;

	@Expose
	private Date employDate;

	private Long principalId;
	
	@Expose
	private Date approachDate;

	@Expose
	private String principal;

	private String principalTel;

	private Long captainId;

	private String captain;

	private String captainTel;

	private String partake;

	@Expose
	private Date endPlanDate;

	private String remark;

	private Long userId;

	private String userName;

	@Expose
	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "EQUIP_APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private String delFlag;

	private Department department;

	@Expose
	private EquipFlow equipFlow;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<PractiDiary> practiDiarySet = new HashSet<PractiDiary>();

	private String practiDiarys = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<ComponDiary> componDiarySet = new HashSet<ComponDiary>();

	private String componDiarys = "";

	public Long getApplyforId() {
		return this.employId;
	}

	public void setModelSerial(String serial) {
		this.employSerial = serial;
	}

	public Long getDiaryRelateId() {
		return this.employId;
	}

	public String getDiaryRelateSerial() {
		return this.employSerial;
	}

	public String getDiaryRelateTheme() {
		return this.employTheme;
	}

	public String getDiaryRelateModule() {
		return SystemConstant.MODULE_EQUIP_EMPLOY;
	}

	// ========================================================================//
	public void setSubEquipEmploy() {
		Set<PractiDiary> practiDiarySet = GsonUtil.fromJson(this.practiDiarys, new TypeToken<Set<PractiDiary>>() {});
		if (practiDiarySet != null) {
			for (PractiDiary pd : practiDiarySet) {
				pd.setRelateId(this.getEmployId());
				pd.setRelateModule(SystemConstant.MODULE_EQUIP_EMPLOY);
				pd.setRelateTheme(this.getEmployTheme());
				pd.setRelateSerial(this.getEmploySerial());
			}
			this.setPractiDiarySet(practiDiarySet);
		}
		Set<ComponDiary> componDiarySet = GsonUtil.fromJson(this.componDiarys, new TypeToken<Set<ComponDiary>>() {});
		if (componDiarySet != null) {
			for (ComponDiary ed : componDiarySet) {
				ed.setRelateId(this.getEmployId());
				ed.setRelateModule(SystemConstant.MODULE_EQUIP_EMPLOY);
				ed.setRelateTheme(this.getEmployTheme());
				ed.setRelateSerial(this.getEmploySerial());
			}
			this.setComponDiarySet(componDiarySet);
		}
	}

}
