/**
 *====================================================
 * 文件名称: EquipInspectCalendar.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-15			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import lombok.Data;

import org.apache.commons.lang.builder.HashCodeBuilder;

/**
 * @ClassName: EquipInspectCalendar
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-15 下午8:13:12
 */
@Data
public class EquipInspectCalendar {

	private Integer dayOfMonth;

	private String result;

	private String flag;

	public boolean equals(Object object) {
		if (!(object instanceof EquipInspectCalendar)) {
			return false;
		}
		EquipInspectCalendar rhs = (EquipInspectCalendar) object;
		return this.dayOfMonth.equals(rhs.dayOfMonth);
	}

	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.dayOfMonth).toHashCode();
	}

}
