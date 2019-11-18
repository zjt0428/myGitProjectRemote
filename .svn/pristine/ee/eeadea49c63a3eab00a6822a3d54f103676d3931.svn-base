/**
 *====================================================
 * 文件名称: ContractPractiBrief.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: ContractPractiBrief
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:53:17
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ContractPractiBrief extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long cpBriefId;

	@Expose
	private Long contractId;

	@Expose
	@CodeFieldDeclare(codeId = "kindWork", valueField = "kindWorkName")
	private String kindWork;

	@Expose
	private String kindWorkName;

	@Expose
	private Short quantity;

	@Expose
	private String startDate;

	@Expose
	private BigDecimal expense;

	@Expose
	private String measurement;

	@Expose
	private String endDate;

	@Expose
	private BigDecimal summary;

	@Expose
	private String remark;

}
