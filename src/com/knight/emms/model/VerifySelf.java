/**
 *====================================================
 * 文件名称: VerifySelf.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.LinkedHashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: VerifySelf
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-26 上午12:10:23
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "selfSerial", strategy = "ZJ{yyyyMMdd}", maxseq = 99)
public class VerifySelf extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long selfId;

	@Expose
	private String selfSerial;

	private Long relateId;

	private String relateModule;

	private Long inEnt;

	@Expose
	private String inEntName;

	private String inEntCertNum;

	private String inEntCertType;

	private String maxHeight;

	private String selfVerifyMan;

	private Long userId;

	private String userName;

	private String providedDate;

	private String remark;

	private String checkAmplitude;

	private String delFlag;

	private Department department;

	@Expose
	private EquipFlow equipFlow;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<VerifyStandard> selfStandardSet = new LinkedHashSet<VerifyStandard>(0);

	private String selfStandards = "";

	public void setModelSerial(String serial) {
		this.selfSerial = serial;
	}

	// ==========================================================================================//
	public void setSubVerifySelf() {
		Set<VerifyStandard> selfStandardSet = GsonUtil.fromJson(this.selfStandards, new TypeToken<Set<VerifyStandard>>() {});
		if (selfStandardSet != null) {
			for (VerifyStandard s : selfStandardSet) {
				s.setRelateId(this.selfId);
				s.setRelateModule(SystemConstant.MODULE_VERIFY_SELF);
			}
		}
		this.setSelfStandardSet(selfStandardSet);
	}

}
