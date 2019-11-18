/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ConjunctCommandImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.filter.command;

import org.hibernate.Criteria;

import com.knight.core.filter.QueryFilter;
import com.knight.core.support.RestrictionsParser;

import lombok.Getter;

/**
 * @ClassName: ConjunctCommandImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-2 下午8:52:18
 */
public class ConjunctCommandImpl extends FieldCommandImpl implements CriteriaCommand {

	/** 属性名称 */
	@Getter
	private String property;

	/** 属性值 */
	@Getter
	private Object value;

	/** 查询属性的操作 */
	@Getter
	private String operation;

	private QueryFilter filter;

	public ConjunctCommandImpl(String property, Object value, String operation, QueryFilter filter) {
		this.property = property;
		this.value = value;
		this.operation = operation;
		this.filter = filter;
	}

	public Criteria execute(Criteria criteria) {
		String propertyName = null;
		// 支持外键属性的查询
		String[] propertys = property.split("[.]");
		if (("vo".equals(propertys[0]) && propertys.length == 2) || (propertys.length == 1)) {
			propertyName = property;
		} else if (propertys.length > 1) {
			String multiple = propertys[0];
			for (int i = 0; i < propertys.length - 1; i++) {
				if (i > 0) {
					multiple = multiple + "." + propertys[i];
				}
				if (!this.filter.getAliasSet().contains(multiple)) { // 防止别名重复
					criteria.createAlias(multiple, propertys[i]);
					this.filter.getAliasSet().add(multiple);
				}
			}
			propertyName = property.replace(multiple, propertys[propertys.length - 2]);
		}
		return criteria.add(RestrictionsParser.parserCriterion(operation, propertyName, value));
	}

	public String getPartHql() {
		// 处理外键的问题
		String[] propertys = this.property.split("[.]");
		// 防止别名重复
		if (propertys != null && propertys.length > 1 && !"vo".equals(propertys[0]) && !this.filter.getAliasSet().contains(propertys[0])) {
			this.filter.getAliasSet().add(propertys[0]);
		}
		String partHql = RestrictionsParser.parserPreparedHql(operation, property, value, filter.getParamValues());
		return partHql;
	}

}
