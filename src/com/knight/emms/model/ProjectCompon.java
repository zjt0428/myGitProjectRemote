/**
 *====================================================
 * 文件名称: DispatchCompon.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: DispatchCompon
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-13 下午2:36:06
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = false, exportName = "项目配件", sheetName = "调度配件信息")
@SerialNumberStrategy(name = "dispatchSerial", strategy = "DB{yyyyMMdd}", maxseq = 99)
public class ProjectCompon extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long projectComponId;

	@Expose
	private Long projectId;

	@Expose
	private Long componDiaryId;

	@Expose
	private String projectName;

	@Expose
	private Long componId;

	@Expose
	private Integer counts;

	@Expose
	@CodeFieldDeclare(codeId = "PROJECT_COMPON_STATUS", valueField = "statusName")
	private String status;

	@Expose
	private String statusName;

	@Expose
	private Component component;

	public ProjectCompon(Long projectComponId, Long projectId, String projectName, Long componId, Integer counts,
			String status, Component component) {
		super();
		this.projectComponId = projectComponId;
		this.projectId = projectId;
		this.projectName = projectName;
		this.componId = componId;
		this.counts = counts;
		this.status = status;
	}

	public ProjectCompon() {
	}
}
