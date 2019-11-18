/**
 *====================================================
` * 文件名称: EquipVerify.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

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
import com.knight.system.constant.SystemConstant;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: EquipVerify
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-26 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = false, exportName = "验收信息汇总", sheetName = "验收信息")
@SerialNumberStrategy(name = "verifySerial", strategy = "YS{yyyyMMdd}", maxseq = 999)
public class EquipVerify extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long verifyId;

	@Expose
	private String verifySerial;

	private Long relateId;

	@Expose
	private String relateSerial;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	@Expose
	private String relateModuleName;
	
	private Long inEnt;

	private String inEntName;

	private Long emEnt;

	private String emEntName;

	private Long supEnt;

	private String supEntName;

	private Long leaseEnt;

	private String leaseEntName;

	@Expose
	private String verifyDate;
	
	//验收人员
	@Expose
	private String practiName;

	@Expose
	private String verifyResult;

	private String suggest;

	private String remark;

	private String delFlag;	
	//启用单号
	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;

	@Expose
	private EquipFlow equipFlow;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<VerifyStandard> verifyStandardSet = new HashSet<VerifyStandard>(0);

	private String verifyStandards = "";

	// ==========================================================================================//
	public void setSubEquipVerify() {
		Set<VerifyStandard> verifyStandardSet = GsonUtil.fromJson(this.verifyStandards, new TypeToken<Set<VerifyStandard>>() {});
		if (verifyStandardSet != null) {
			for (VerifyStandard s : verifyStandardSet) {
				s.setRelateId(this.verifyId);
				s.setRelateModule(SystemConstant.MODULE_EQUIP_VERIFY);
			}
			this.setVerifyStandardSet(verifyStandardSet);
		}
	}

	@Override
	public Long getUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Long getApplyforId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setApplyforState(String applyforState) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getApplyforState() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setModelSerial(String serial) {
		this.verifySerial = serial;
		
	}

}
