/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DisableUrlSessionFilter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: DisableUrlSessionFilter
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-28 上午9:36:12
 */
@Slf4j
public class DisableUrlSessionFilter implements Filter {

	/** Filters requests to disable URL-based session identifiers. */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// skip non-http requests
		if (!(request instanceof HttpServletRequest)) {
			chain.doFilter(request, response);
			return;
		}

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		log.debug("session url : " + httpRequest.getServletPath());
		// clear session if session id in URL
		if (httpRequest.isRequestedSessionIdFromURL()) {
			HttpSession session = httpRequest.getSession();
			if (session != null) {
				session.invalidate();
			}
		}

		// wrap response to remove URL encoding
		HttpServletResponseWrapper wrappedResponse = new HttpServletResponseWrapper(httpResponse) {
			@Override
			public String encodeRedirectUrl(String url) {
				return url;
			}

			@Override
			public String encodeRedirectURL(String url) {
				return url;
			}

			@Override
			public String encodeUrl(String url) {
				return url;
			}

			@Override
			public String encodeURL(String url) {
				return url;
			}
		};
		// process next request in chain
		chain.doFilter(request, wrappedResponse);
	}

	public void init(FilterConfig config) throws ServletException {
	}

	public void destroy() {
	}

}
