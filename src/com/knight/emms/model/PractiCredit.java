/**
 *====================================================
 * 文件名称: PractiCredit.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: PractiCredit
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-6 下午6:17:03
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class PractiCredit extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long creditId;

	private Long practiId;

	@Expose
	private String practiName;

	@CodeFieldDeclare(codeId = "kindWork", valueField = "practiKindworkName")
	private String practiKindwork;

	@Expose
	private String practiKindworkName;

	@CodeFieldDeclare(codeId = "CREDIT_TYPE", valueField = "creditTypeName")
	private String creditType;

	@Expose
	private String creditTypeName;

	@Expose
	private String reason;

	private String description;

	@Expose
	private String appraiseOrg;

	@Expose
	private String appraiseDate;

	private String remark;

	private String delFlag;

}
