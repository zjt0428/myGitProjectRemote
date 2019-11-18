/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SecurityInterceptorFilter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.filter;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.security.SecurityDataSource;

/**
 * @ClassName:SecurityInterceptorFilter
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:01:12
 * @since JDK Version 1.5
 */
@Slf4j
public class SecurityInterceptorFilter extends OncePerRequestFilter {

	private Map<String, Set<String>> roleUrlsMap = null;

	@Setter
	private SecurityDataSource securityDataSource;

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
		String url = request.getRequestURI();
		if (StringUtils.hasLength(request.getContextPath())) {
			String contextPath = request.getContextPath();
			int index = url.indexOf(contextPath);
			if (index != -1) {
				url = url.substring(index + contextPath.length());
			}
		}
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		boolean isSuperUser = false;
		for (GrantedAuthority authority : auth.getAuthorities()) {
			if ("超级管理员".equals(authority.getAuthority())) {
				isSuperUser = true;
				break;
			}
		}
		logger.info("Request Url:" + url + " User:" + auth.getName());
		if (!isSuperUser && !isUrlGrantedRight(url, auth)) {
			if (url.startsWith("/terminal")) {
				Object principal = auth.getPrincipal();
				String msg = null;
				if (principal instanceof AppUser) {
					msg = "登陆用户" + ((AppUser) principal).getFullname() + "未授权操作:" + url;
				} else {
					msg = "未登录用户不允许接入服务器:" + url;
				}
				response.setContentType("text/xml");
				try {
					OutputStream out = response.getOutputStream();
					out.write(("{\"success\":false,\"msg\":'" + msg + "'}").getBytes("UTF-8"));
					out.flush();
					out.close();
					return;
				} catch (Exception e) {
					logger.error("", e);
				}
			}
			throw new AccessDeniedException("Access is denied! Url:" + url + " User:" + auth.getName());
		}
		logger.debug("pass the url:" + url);
		chain.doFilter(request, response);
	}

	private boolean isUrlGrantedRight(String url, Authentication auth) {
		Object principal = auth.getPrincipal();
		if (principal instanceof AppUser) {
			return true;
		}
		for (GrantedAuthority ga : auth.getAuthorities()) {
			if (AppRole.ROLE_PUBLIC_MATCHER.equals(ga.getAuthority())) {
				Set<String> matcherurls = this.roleUrlsMap.get(AppRole.ROLE_PUBLIC_MATCHER);
				for (String matcherurl : matcherurls) {
					Pattern regex = Pattern.compile(matcherurl);
					Matcher matcher = regex.matcher(url);
					if (matcher.matches()) {
						return true;
					}
				}
			} else {
				Set<String> urlSet = this.roleUrlsMap.get(ga.getAuthority());
				if (urlSet != null && urlSet.contains(url)) {
					return true;
				}
			}
		}
		return false;
	}

	public void loadDataSource() {
		this.roleUrlsMap = this.securityDataSource.getDataSource();
	}

	public void afterPropertiesSet() throws ServletException {
		loadDataSource();
		if (this.roleUrlsMap == null) {
			throw new RuntimeException("没有进行设置系统的权限匹配数据源");
		}
	}
}
