/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DateConverter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.converter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.knight.core.util.DateUtil;
import com.opensymphony.xwork2.conversion.impl.DefaultTypeConverter;

/**
 * @ClassName: DateConverter
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-24 下午3:28:11
 */
public class DateConverter extends DefaultTypeConverter {

	@SuppressWarnings("rawtypes")
	public Object convertValue(Map context, Object value, Class toType) {
		if (toType == Date.class) { // 浏览器向办事器提交时,进行String to Date的转换
			String[] params = (String[]) value;
			String dateString = params[0]; // 获取日期的字符串
			Date convertValue = DateUtil.changeStrToDate(dateString);
			return convertValue;
		} else if (toType == String.class) { // 办事器向浏览器输出时,进行Date to String的类型转换
			if (value instanceof Date) { // 输出的格局是yyyy-MM-dd
				Date date = (Date) value;
				return new SimpleDateFormat("yyyy-MM-dd").format(date);
			}
			return value;
		}
		return null;
	}

}
