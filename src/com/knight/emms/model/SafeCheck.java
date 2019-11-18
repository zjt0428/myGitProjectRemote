/**
 *====================================================
 * 文件名称: SafeCheck.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-1-22			chengy(创建:创建文件)
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
import com.knight.emms.core.BusinessModel;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: SafeCheck
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017-1-22 下午16:23
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class SafeCheck extends BusinessModel implements ExportModel{

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long safeCheckId;
	
	@Expose
	@CodeFieldDeclare(codeId = "SAFE_CHECK_STATUS", valueField = "statusName")
	private String status;
	
	@Expose
	private String statusName;
	
	@Expose
	private String projectName;
	
	@Expose
	private String buildingNum;
	
	@Expose
	@CodeFieldDeclare(codeId = "equipSpecific", valueField = "equipSpecificName")
	private String equipSpecific;
	
	@Expose
	private String equipSpecificName;
	
	@Expose
	@CodeFieldDeclare(codeId = "equipGeneric", valueField = "equipGenericName")
	private String equipGeneric;
	
	@Expose
	private String equipGenericName;
	
	@Expose
	private String checkStaff;
	
	@Expose
	private String checkDate;
	
	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<SafeCheckContent> safeCheckContentSet = new HashSet<SafeCheckContent>(0);
	
	private String safeCheckContents = "";
	
	@Expose
	private Project project;
	
	@Expose
	private Component component;
	
	@Override
	public void setModelSerial(String serial) {
		
	}
	
	public void setSubSafeCheck(){
		Set<SafeCheckContent> safeCheckContentSet = GsonUtil.fromJson(this.getSafeCheckContents(), new TypeToken<Set<SafeCheckContent>>(){});
		if(safeCheckContentSet != null){
			for(SafeCheckContent  p : safeCheckContentSet){
				p.setSafeCheckId(this.safeCheckId);			
			}
		}
		this.setSafeCheckContentSet(safeCheckContentSet);
	}
}
