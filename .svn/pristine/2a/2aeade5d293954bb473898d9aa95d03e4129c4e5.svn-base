/**
 *====================================================
 * 文件名称: SideSystem.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-7-3			KI·C(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;

/**
 * @ClassName: SideSystem
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author KI·C
 * @date 2017-7-3 	8:54:40
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class SideSystem extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long sideId;
	
	/** 项目名称 */
	@Expose
	private String projectName;
	
	/** 作业时间 */
	@Expose
	private String operationDate;
	
	/** 作业内容 */
	@Expose
	private String operationDetail;
	
	/** 设备名称 */
	@Expose
	@CodeFieldDeclare(codeId = "equipGeneric", valueField = "equipGenericName")
	private String equipGeneric;
	
	@Expose
	private String equipGenericName;

	/** 设备型号 */
	@Expose
	@CodeFieldDeclare(codeId = "repertoryCategory", valueField = "equipCategoryName")
	private String equipCategory;
	
	@Expose
	private String equipCategoryName;
	
	/** 作业人员 */
	@Expose
	private String operationPersonnel;
	
	/** 旁站人员 */
	@Expose
	private String reportingPersonnel;
	
	/** 过程问题及处理措施 */
	@Expose
	private String measure;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SideReporting> sideReportingSet = new HashSet<SideReporting>(0);
	
	private String sideReportings = "";
	
	public void setSubSideSystem() {
		Set<SideReporting> sideReportingSet = GsonUtil.fromJson(this.getSideReportings(), new TypeToken<Set<SideReporting>>() {});
		if(sideReportingSet != null) {
			for(SideReporting s : sideReportingSet) {
				s.setSideId(this.sideId);
			}
		}
		this.setSideReportingSet(sideReportingSet);
	}
}
