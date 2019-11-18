/**
 *====================================================
 * 文件名称: SettleBrief.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.model.BaseModel;

/**
 * @ClassName: SettleBrief
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-26 下午12:59:37
 */
public abstract class SettleBrief extends BaseModel implements Cloneable {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	protected int categoryRowspan = 0;

	@Setter
	@Getter
	protected int deductRentRowspan = 0;

	public abstract String getCategoryName();

	public abstract BigDecimal getDeductRent();

	public abstract void setDeductRent(BigDecimal deductRent);

	public abstract String getStartSettleDate();

	public abstract void setStartSettleDate(String startSettleDate);

	public abstract String getEndSettleDate();

	public abstract void setEndSettleDate(String endSettleDate);

	public abstract void setQuantity(Integer quantity);

	public abstract Integer getQuantity();

	public abstract Integer getSettleDays();

	public abstract void setSettleDays(Integer settleDays);

	public abstract BigDecimal getRentStandard();

	public abstract BigDecimal getDaysRent();

	public abstract BigDecimal getSummary();

	public abstract void setSummary(BigDecimal summary);

	public abstract int getMonthSub();

	public abstract String getGroupKey();

	public Object clone() {
		try {
			return super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

}
