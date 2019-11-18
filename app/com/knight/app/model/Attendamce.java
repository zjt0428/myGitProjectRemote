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
package com.knight.app.model;


import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Project;
import com.knight.system.model.FileAttach;

/**
 * @ClassName: Attendamce
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "考勤信息汇总", sheetName = "考勤信息")
public class Attendamce extends BaseModel  implements ExportModel, Cloneable {

	private static final long serialVersionUID = 1L;
	

	@Expose
	private Long aid;

	/**签到人员*/
	@Expose
	private Long userId;
	/**签到人员姓名*/
	@Expose
	private String userName;
	/**日期*/
	@Expose
	private Date sgDate;
	/**签到时间*/
	@Expose
	private String sginTime;
	/**签到位置*/
	@Expose
	private String sginLocation;
	/**签退时间*/
	@Expose
	private String sgouTime;
	/**签退位置*/
	@Expose
	private String sgouLocation;

	@Expose
	private String remark;
	/**创建时间*/
	@Expose
	private String createDt;
	
	@Expose
	private Long sgSum;
	
	@Expose
	private String sgWeekday;
	
	@Expose
	private String fileAttaches;
	/**部门Id*/
	@Expose
	private Long depId;
	/**部门名称*/
	@Expose
	private String depName;
	/**设备ID*/
	@Expose
	private Long equipId;
	/**项目ID*/
	@Expose
	private Long projectId;
	@Expose
	private String delFlag;
	@Expose
	private Project project;
	@Expose
	private Equipment equipment;

	@Expose
	private  String formId;
	
	@Expose
	private Integer count;

	private Set<AttendamceLocation> locationSet = new HashSet<AttendamceLocation>(0);
	private Set<FileAttach> photoSet = new HashSet<FileAttach>(0);

/*	private String memoDetails = "";*/

/*	public void setSubMemo() {
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
	}*/

}
