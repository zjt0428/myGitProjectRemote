/**
 *====================================================
 * 文件名称: InspectManage.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.google.gson.annotations.Expose;
import com.knight.app.model.InspectRectify;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: InspectManage
 * @Description: 安全巡检
 * @author chenxy
 * @date 2014-10-26 下午4:07:43
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class InspectManage extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long inspectId;

	@Expose
	private String projectName;
	
	@Expose
	private Long projectId;

	@Expose
	private Date inspectDate;

	@Expose
	private String inspectPepoles;

	@Expose
	@CodeFieldDeclare(codeId = "INSPECT_RESULT", valueField = "inspectResultName")
	private String inspectResult;

	@Expose
	private String inspectResultName;

	@Expose
	private String remark;

	@Expose
	private String longitude;

	@Expose
	private String latitude;

	@Expose
	private String address;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private String providedDate;
	
	@Expose
	@CodeFieldDeclare(codeId = "RECTIFICATION", valueField = "rectificationName")
	private String rectification;
	
	@Expose
	private String rectificationName;

	@Expose
	private String fileAttaches;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private String buildingNum;
	
	@Expose
	private String recordId;

	// ========================================================================== //
	@Expose
	private EquipInspectSchema equipInspectSchema;
	
	@Expose
	private Long inspectRectifyId;
	
	@Expose
	private InspectRectify inspectRectify;
	

	/** 整改进度(代码 0:计划中/1:待整改/2:待复查:/3:完成:/4:结案)（未完成=计划中+待整改）*/
	@Expose
	private String inspectSchedule;
	
	@Expose
	List<Map> images;



	
	/**设备id*/
	@Expose
	private Long equipId;
	
	/**设备型号*/
	@Expose
	private String equipSpecific;

	
	
}
