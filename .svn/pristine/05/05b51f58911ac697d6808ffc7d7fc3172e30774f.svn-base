/**
 *====================================================
 * 文件名称: SideReporting.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-7-2			KI·C(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: SideReporting
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author KI·C
 * @date 2017-7-2 	17:03:40
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class SideReporting extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long reportingId;
	
	@Expose
	private Long sideId;
	
	/** 旁站内容 */
	@Expose
	private String reportingDetail;
	
	/** 检查结果 */
	@Expose
	private String examineUpshot;
	
	/** 存在问题 */
	@Expose
	private String existQuestion;

}
