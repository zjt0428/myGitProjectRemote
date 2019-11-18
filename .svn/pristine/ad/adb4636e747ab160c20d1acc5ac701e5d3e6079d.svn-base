/**
 *====================================================
 * 文件名称: EquipHitch.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;

/**
 * @ClassName: EquipHitch
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午11:22:27
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "故障信息汇总", sheetName = "故障信息")
@SerialNumberStrategy(name = "hitchSerial", strategy = "GZ{yyyyMMdd}", maxseq = 99)
public class EquipHitch extends ApplyforState implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long hitchId;

	@Expose
	private String hitchSerial;

	private Long relateId;

	@Expose
	private String relateSerial;

	@CodeFieldDeclare(codeId = "RELATE_MODULE", valueField = "relateModuleName")
	private String relateModule;

	private String relateModuleName;

	private String location;

	private String content;

	private Long projectId;

	private Long equipId;

	@Expose
	private String spendDate;

	private String hitchResult;

	private String description;

	private String remark;

	@Expose
	private String handleDate;

	@Expose
	private String handleResult;

	@Expose
	private String handleMans;

	private String handleDescription;

	@Expose
	@CodeFieldDeclare(codeId = "HANDLE_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	private Long userId;

	private String userName;

	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "APPLYFOR_STATE", valueField = "applyforStateName")
	private String applyforState;

	@Expose
	private String applyforStateName;

	private Department department;

	@Expose
	private Project project;

	@Expose
	private Equipment equipment;

	public void setModelSerial(String serial) {
		this.hitchSerial = serial;
	}

	public Long getApplyforId() {
		return this.hitchId;
	}

}
