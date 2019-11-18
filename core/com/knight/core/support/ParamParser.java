/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ParamParser.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.support;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;

import com.knight.core.util.DateUtil;

/**
 * @ClassName:ParamParser
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:54:54
 * @since JDK Version 1.5
 */
@Slf4j
public class ParamParser {

	public static Object convertSingleObject(String type, String paramValue) {
		try {
			if ("S".equals(type)) {
				return paramValue;
			} else if ("L".equals(type)) {
				return new Long(paramValue);
			} else if ("N".equals(type)) {
				return new Integer(paramValue);
			} else if ("BD".equals(type)) {
				return new BigDecimal(paramValue);
			} else if ("FT".equals(type)) {
				return new Float(paramValue);
			} else if ("SN".equals(type)) {
				return new Short(paramValue);
			} else if ("D".equals(type)) {
				return DateUtil.changeObj2Date(paramValue);
			} else if ("DL".equals(type)) {
				Calendar cal = Calendar.getInstance();
				cal.setTime(DateUtils.parseDate(paramValue, new String[] { "yyyy-MM-dd" }));
				return DateUtil.setStartDay(cal);
			} else if ("DG".equals(type)) {
				Calendar cal = Calendar.getInstance();
				cal.setTime(DateUtils.parseDate(paramValue, new String[] { "yyyy-MM-dd" }));
				return DateUtil.setEndDay(cal);
			}
			return paramValue;
		} catch (Exception ex) {
			log.error("the data value is not right for the query filed type:" + ex.getMessage());
			return paramValue;
		}
	}

	public static List<Object> convertSplitObject(String type, String paramValue, String split) {
		if (StringUtils.isEmpty(paramValue)) {
			return null;
		}
		String[] paramValues = paramValue.split(split);
		List<Object> params = new ArrayList<Object>();
		for (int i = 0; i < paramValues.length && StringUtils.isNotBlank(paramValues[i]); i++) {
			params.add(convertSingleObject(type, paramValues[i].trim()));
		}
		return params;
	}

	public static String[] parserParamName(String paramName) {
		String[] p = paramName.replaceAll("(\\_\\[)|(]_)|(\\[)", " ").split("[ ]");
		String[] q = p[p.length - 1].split("[_]");
		String[] fieldInfo = new String[p.length - 1 + q.length];
		for (int i = 0; i < p.length - 1; i++) {
			fieldInfo[i] = p[i];
		}
		for (int i = 0; i < q.length; i++) {
			fieldInfo[i + p.length - 1] = q[i];
		}
		return fieldInfo;
	}
}
