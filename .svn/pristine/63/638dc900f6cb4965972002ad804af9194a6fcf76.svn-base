/**
 *====================================================
 * 文件名称: AutocraneExpense.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年1月20日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: AutocraneExpense
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年1月20日 下午6:59:56
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AutocraneExpense extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long autocraneExpenseId;

	@Expose
	private Long autocraneId;

	@Expose
	private String specificName;

	@Expose
	private BigDecimal accountPrice;

	@Expose
	private BigDecimal quantity;

	@Expose
	private BigDecimal machineTeam;

	@Expose
	private BigDecimal summary;

	@Expose
	private String remark;
}
