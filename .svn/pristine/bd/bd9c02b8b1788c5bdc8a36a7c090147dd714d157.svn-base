/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: RestrictionsParser.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.support;

import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

/**
 * @ClassName: RestrictionsParser
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-2 下午8:55:38
 */
public class RestrictionsParser {

	public static Criterion parserCriterion(String operation, String property, Object value) {
		if ("EQ".equals(operation)) {
			return Restrictions.eq(property, value);
		} else if ("LT".equals(operation)) {
			return Restrictions.lt(property, value);
		} else if ("GT".equals(operation)) {
			return Restrictions.gt(property, value);
		} else if ("LE".equals(operation)) {
			return Restrictions.le(property, value);
		} else if ("GE".equals(operation)) {
			return Restrictions.ge(property, value);
		} else if ("LK".equals(operation)) {
			return Restrictions.like(property, "%" + value + "%").ignoreCase();
		} else if ("LFK".equals(operation)) {
			return Restrictions.like(property, value + "%").ignoreCase();
		} else if ("RHK".equals(operation)) {
			return Restrictions.like(property, "%" + value).ignoreCase();
		} else if ("NULL".equals(operation)) {
			return Restrictions.isNull(property);
		} else if ("NOTNULL".equals(operation)) {
			return Restrictions.isNotNull(property);
		} else if ("EMP".equals(operation)) {
			return Restrictions.isEmpty(property);
		} else if ("NOTEMP".equals(operation)) {
			return Restrictions.isNotEmpty(property);
		} else if ("NEQ".equals(operation)) {
			return Restrictions.ne(property, value);
		} else {
			return Restrictions.eq(property, value);
		}
	}

	public static String parserPreparedHql(String operation, String property, Object value, List<Object> paramValues) {
		String partHql = null;
		if ("EQ".equals(operation)) {
			partHql = property + " = ? ";
		} else if ("LT".equals(operation)) {
			partHql = property + " < ? ";
		} else if ("GT".equals(operation)) {
			partHql = property + " > ? ";
		} else if ("LE".equals(operation)) {
			partHql = property + " <= ? ";
		} else if ("GE".equals(operation)) {
			partHql = property + " >= ? ";
		} else if ("LK".equals(operation)) {
			partHql = property + " like ? ";
			value = "%" + value.toString() + "%";
		} else if ("LFK".equals(operation)) {
			partHql = property + " like ? ";
			value = value.toString() + "%";
		} else if ("RHK".equals(operation)) {
			partHql = property + " like ? ";
			value = "%" + value.toString();
		} else if ("NULL".equals(operation)) {
			partHql = property + " is null ";
			value = null;
		} else if ("NOTNULL".equals(operation)) {
			partHql = property + " is not null ";
			value = null;
		} else if ("NEQ".equals(operation)) {
			partHql = property + " != ? ";
		} else {
			partHql = property + " = ? ";
		}
		if (value != null) {
			paramValues.add(value);
		}
		return partHql;
	}

	public static String parserPreparedBindingHql(String operation, String property, String bindingName) {
		String partHql = null;
		if ("EQ".equals(operation)) {
			partHql = property + " = :" + bindingName + " ";
		} else if ("LT".equals(operation)) {
			partHql = property + " < :" + bindingName + " ";
		} else if ("GT".equals(operation)) {
			partHql = property + " > :" + bindingName + " ";
		} else if ("LE".equals(operation)) {
			partHql = property + " <= :" + bindingName + " ";
		} else if ("GE".equals(operation)) {
			partHql = property + " >= :" + bindingName + " ";
		} else if ("LK".equals(operation)) {   //两者皆可
//			partHql = property + " like concat('%',:" + bindingName + ",'%') ";
			partHql = property + " like '%'+:" + bindingName + "+'%' ";
		} else if ("NULL".equals(operation)) {
			partHql = property + " is null ";
		} else if ("NOTNULL".equals(operation)) {
			partHql = property + " is not null ";
		} else if ("NEQ".equals(operation)) {
			partHql = property + " != :" + bindingName + " ";
		} else {
			partHql = property + " = :" + bindingName + " ";
		}
		return partHql;
	}

}
