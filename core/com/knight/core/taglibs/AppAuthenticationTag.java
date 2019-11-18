/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppAuthenticationTag.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.taglibs;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.Tag;
import javax.servlet.jsp.tagext.TagSupport;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanWrapperImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @ClassName: AppAuthenticationTag
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-3 下午9:13:20
 */
@Slf4j
public class AppAuthenticationTag extends TagSupport {

	private static final long serialVersionUID = 1L;

	/** 必须要有Set方法，因为是属性可以设值 */
	@Setter
	private String property;

	@Setter
	private String lable;

	public int doStartTag() throws JspException {
		return super.doStartTag();
	}

	public int doEndTag() throws JspException {
		Object result = null;
		if (property != null) {
			if ((SecurityContextHolder.getContext() == null) || !(SecurityContextHolder.getContext() instanceof SecurityContext)
					|| (SecurityContextHolder.getContext().getAuthentication() == null)) {
				return Tag.EVAL_PAGE;
			}
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if (auth.getPrincipal() == null) {
				return Tag.EVAL_PAGE;
			}
			try {
				BeanWrapperImpl wrapper = new BeanWrapperImpl(auth);
				result = wrapper.getPropertyValue(property);
				JspWriter out = pageContext.getOut();
				if (lable != null) {
					out.write(lable + "：");
				}
				out.write(String.valueOf(result));
			} catch (Exception e) {
				log.debug("", e);
			}
		}
		// 表示JSP页面继续运行
		return Tag.EVAL_PAGE;
	}
}
