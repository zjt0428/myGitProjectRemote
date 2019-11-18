/**
 *====================================================
 * 文件名称: SafeCheckContent.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年2月4日			chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: SafeCheckContent
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2016年1月20日 下午4:20:06
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class SafeCheckContent extends BaseModel{

	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long safeCheckContentId;
	
	@Expose
	private Long safeCheckId;
	
	@Expose
	private String checkContent;
	
	@Expose
	private String rectificationStatus;
	
	@Expose
	@CodeFieldDeclare(codeId="INSPECT_RESULT",valueField="inspectionResultName")
	private String inspectionResult;
	
	@Expose
	private String inspectionResultName;
	
	@Expose
	private String inspectionResultSet;
	
	@Expose
	private String recordId;
	
	@Expose
	private String exwSerial;
	
	@Expose
	private String enclosuerBeforRectification;
	
	@Expose
	private String enclosuerAfterRectification;
	
	@Expose
	private String rectificationExplain;

}
