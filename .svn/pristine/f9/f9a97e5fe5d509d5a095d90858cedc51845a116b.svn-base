/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: Memo.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-3-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: Memo
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-3-9 上午11:05:50
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "memoSerial", strategy = "SJ{yyyyMMdd}", maxseq = 99)
public class Memo extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long memoId;

	@Expose
	private String memoSerial;

	@Expose
	private String memoTheme;

	private Long practiId;

	@Expose
	private String practiName;

	@CodeFieldDeclare(codeId = "incidentType", valueField = "incidentTypeName")
	private String incidentType;

	@Expose
	private String incidentTypeName;

	private Long projectId;

	@Expose
	private String projectName;

	private String address;

	private Long equipId;

	@CodeFieldDeclare(codeId = "equipGeneric", valueField = "equipGenericName")
	private String equipGeneric;

	@Expose
	private String equipGenericName;

	@Expose
	private String recordId;

	@Expose
	private String exwSerial;

	private Long customId;

	@Expose
	private String customName;

	@Expose
	private String processStatus;

	@Expose
	private String status;

	private String remark;

	private Long userId;

	private String userName;

	private Set<MemoDeputy> memoDeputySet = new HashSet<MemoDeputy>(0);

	private String memoDeputys = "";

	private Set<MemoDetail> memoDetailSet = new HashSet<MemoDetail>(0);

	private String memoDetails = "";

	public void setModelSerial(String serial) {
		this.memoSerial = serial;
	}

	public void setSubMemo() {
		Set<MemoDeputy> memoDeputySet = GsonUtil.fromJson(this.getMemoDeputys(), new TypeToken<Set<MemoDeputy>>() {});
		if (memoDeputySet != null) {
			for (MemoDeputy p : memoDeputySet) {
				p.setMemoId(memoId);
			}
			this.setMemoDeputySet(memoDeputySet);
		}

		Set<MemoDetail> memoDetailSet = GsonUtil.fromJson(this.getMemoDetails(), new TypeToken<Set<MemoDetail>>() {});
		if (memoDetailSet != null) {
			for (MemoDetail p : memoDetailSet) {
				p.setMemoId(memoId);
			}
			this.setMemoDetailSet(memoDetailSet);
		}
	}

}
