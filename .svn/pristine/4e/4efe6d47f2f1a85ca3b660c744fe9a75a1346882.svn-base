/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ReportFilter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.filter;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.knight.core.support.ParamParser;

/**
 * @ClassName:ReportFilter
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:48:12
 * @since JDK Version 1.5
 */
public class ReportFilter {

	@Getter
	@Setter
	Map<String, Object> variables = new HashMap<String, Object>();

	public ReportFilter(HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		Enumeration<String> paramEnu = request.getParameterNames();
		while (paramEnu.hasMoreElements()) {
			String paramName = (String) paramEnu.nextElement();
			if (paramName.startsWith("Q_")) {
				String paramValue = request.getParameter(paramName);
				if (StringUtils.isNotBlank(paramValue)) {
					addConjunctFilter(paramName, paramValue);
				}
			}
		}
	}

	public void addConjunctFilter(String paramName, String value) {
		String[] fieldInfo = ParamParser.parserParamName(paramName);
		if (fieldInfo.length == 3) {
			this.variables.put(fieldInfo[1], ParamParser.convertSingleObject(fieldInfo[2], value.trim()));
		} else if (fieldInfo.length == 2) {
			this.variables.put(fieldInfo[1], value.trim());
		}
	}

}
