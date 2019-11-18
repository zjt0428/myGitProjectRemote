/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ResponseHeaderFilter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.filter;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @ClassName:ResponseHeaderFilter
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:56:40
 * @since JDK Version 1.5
 */
public class ResponseHeaderFilter implements Filter {

	private FilterConfig filterConfig;

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
		@SuppressWarnings("unchecked")
		Enumeration<String> e = this.filterConfig.getInitParameterNames();
		while (e.hasMoreElements()) {
			String headerName = (String) e.nextElement();
			response.addHeader(headerName, this.filterConfig.getInitParameter(headerName));
		}
		chain.doFilter(req, response);
	}

	public void init(FilterConfig filterConfig) {
		this.filterConfig = filterConfig;
	}

	public void destroy() {
		this.filterConfig = null;
	}

}
