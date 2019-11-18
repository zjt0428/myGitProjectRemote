/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SortCommandImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.filter.command;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;

import com.knight.core.filter.QueryFilter;

/**
 * 排序查询条件
 * @ClassName:SortCommandImpl
 * @Description:TODO(排序查询条件)
 * @author:chenxy
 * @date 2011-8-24 上午9:48:23
 * @since JDK Version 1.5
 */
public class SortCommandImpl implements CriteriaCommand {

	@Getter
	@Setter
	private String sortName;

	@Getter
	@Setter
	private String ascDesc;

	private QueryFilter filter;

	public Criteria execute(Criteria criteria) {
		String[] propertys = this.sortName.split("[.]");
		if ((propertys != null) && (propertys.length > 1)) {
			for (int i = 0; i < propertys.length - 1; ++i) {
				// 防止别名重复
				if (!(this.filter.getAliasSet().contains(propertys[i]))) {
					criteria.createAlias(propertys[i], propertys[i]);
					this.filter.getAliasSet().add(propertys[i]);
				}
			}
		}
		if (SORT_DESC.equalsIgnoreCase(this.ascDesc))
			criteria.addOrder(Order.desc(this.sortName));
		else if (SORT_ASC.equalsIgnoreCase(this.ascDesc)) {
			criteria.addOrder(Order.asc(this.sortName));
		}
		return criteria;
	}

	public SortCommandImpl(String sortName, String ascDesc, QueryFilter filter) {
		this.sortName = sortName;
		this.ascDesc = ascDesc;
		this.filter = filter;
	}

	public String getPartHql() {
		return this.sortName + " " + this.ascDesc;
	}

	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.sortName).append(this.ascDesc).toHashCode();
	}
}
