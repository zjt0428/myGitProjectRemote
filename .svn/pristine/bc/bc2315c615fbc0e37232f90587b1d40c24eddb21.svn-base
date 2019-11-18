/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: StringConverter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-11-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.converter;

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.opensymphony.xwork2.conversion.impl.DefaultTypeConverter;

/**
 * @ClassName: StringConverter
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-11-28 下午4:59:38
 */
public class StringConverter extends DefaultTypeConverter {

	@SuppressWarnings("rawtypes")
	public Object convertValue(Map context, Object value, Class toType) {
		if (toType == String.class) {
			if (value instanceof String[]) { // 浏览器向办事器提交时
				String[] params = (String[]) value;
				if (StringUtils.isBlank(params[0])) {
					return null;
				}
				return params[0].trim();
			}
		}
		return value;
	}

}
