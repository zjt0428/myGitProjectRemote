/**
 *====================================================
 * 文件名称: PractiResume.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: PractiResume
 * @Description: 从业资格记录
 * @author chenxy
 * @date 2013-8-6 下午6:16:53
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PractiResume extends BaseModel {

	private static final long serialVersionUID = 1L;

	private Long resumeId;

	private Long practiDiaryId;

	private Long practiId;

	private Long projectId;

	private Long equipId;

	@Expose
	private String projectName;

	@Expose
	private String practiName;

	@Expose
	private String recordId;

	@CodeFieldDeclare(codeId = "kindWork", valueField = "practiKindworkName")
	private String practiKindwork;

	@Expose
	private String practiKindworkName;

	@Expose
	private Date startDate;

	@Expose
	private Date endDate;

	private String delFlag;

}
