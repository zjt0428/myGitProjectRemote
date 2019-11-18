/**
* 版权所有：厦门市巨龙软件工程有限公司
* Copyright 2010 Xiamen Dragon Software Eng. Co., Ltd.
* All right reserved. 
*====================================================
* 文件名称: GzipJsFilter.java
* 修订记录：
* No    日期				作者(操作:具体内容)
* 1.    2010-12-24			administrator(创建:创建文件)
*====================================================
* 类描述：(说明未实现或其它不应生成javadoc的内容)
* 
*/
package com.knight.core.web.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @ClassName:GzipJsFilter
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:56:34
 * @since JDK Version 1.5
 */
public class GzipJsFilter implements Filter {

	Map<String, String> headers = new HashMap<String, String>();

	public void init(FilterConfig config) throws ServletException {
		String headersStr = config.getInitParameter("headers");
		String[] headers = headersStr.split(",");
		for(String header : headers) {
			String[] temp = header.split("=");
			this.headers.put(temp[0].trim(), temp[1].trim());
		}
	}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		if (req instanceof HttpServletRequest) {
			doFilter((HttpServletRequest) req, (HttpServletResponse) res, chain);
		} else {
			chain.doFilter(req, res);
		}
	}

	public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
		request.setCharacterEncoding("UTF-8");
		for (Map.Entry<String, String> entry : this.headers.entrySet()) {
			response.addHeader(entry.getKey(), entry.getValue());
		}
		chain.doFilter(request, response);
	}

	public void destroy() {

	}
}