/**
 *====================================================
 * 文件名称: Autocrane.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年1月20日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
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
import com.knight.emms.core.model.SerialNumberStrategy;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: Autocrane
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年1月20日 下午6:56:41
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "汽吊信息汇总", sheetName = "汽吊信息")
@SerialNumberStrategy(name = "autocraneSerial", strategy = "QD{yyyyMMdd}", maxseq = 99)
public class Autocrane extends BusinessModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long autocraneId;

	@Expose
	private String autocraneSerial;

	@Expose
	private String emEntName;

	@Expose
	private String inEntName;

	@Expose
	@CodeFieldDeclare(codeId = "autocraneDepend", valueField = "autocraneDependName")
	private String autocraneDepend;

	@Expose
	private String autocraneDependName;

	@Expose
	private BigDecimal autocraneAmount;

	@Expose
	private BigDecimal paymentAmount;

	@Expose
	private BigDecimal balanceAmount;

	@Expose
	private String remark;

	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private String providedDate;

	@Expose
	@CodeFieldDeclare(codeId = "EFFECTIVE_FLAG", valueField = "effectiveName")
	private String effective;

	@Expose
	private String effectiveName;

	@CodeFieldDeclare(codeId = "FUND_PLAN_STATUS", valueField = "fundStatusName")
	private String fundStatus;

	@Expose
	private String fundStatusName;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AutocraneExpense> autocraneExpenseSet = new HashSet<AutocraneExpense>(0);

	private String autocraneExpenses = "";

	@Expose
	private Project project;

	@Expose
	private Equipment equipment;

	@Override
	public void setModelSerial(String serial) {
		this.autocraneSerial = serial;
	}

	@Override
	public String getModelSerial() {
		return this.autocraneSerial;
	}

	// ==============================================================================//
	public void setSubAutocrane() {
		Set<AutocraneExpense> autocraneExpenseSet = GsonUtil.fromJson(this.getAutocraneExpenses(), new TypeToken<Set<AutocraneExpense>>() {});
		if (autocraneExpenseSet != null) {
			for (AutocraneExpense p : autocraneExpenseSet) {
				p.setAutocraneId(this.autocraneId);
			}
		}
		this.setAutocraneExpenseSet(autocraneExpenseSet);
	}

}
