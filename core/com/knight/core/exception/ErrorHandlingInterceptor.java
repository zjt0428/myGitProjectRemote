/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ErrorHandlingInterceptor.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.exception;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

/**
 * @ClassName:ErrorHandlingInterceptor
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-9 上午9:37:27
 * @since JDK Version 1.5
 */
@Slf4j
public class ErrorHandlingInterceptor extends AbstractInterceptor {

	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unused")
	private HttpServletRequest getRequest() {
		return (HttpServletRequest) ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
	}

	private HttpServletResponse getResponse() {
		return (HttpServletResponse) ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
	}

	private void fillWarning4Display(String msg) {
		getResponse().setContentType("text/xml");
		try {
			OutputStream out = getResponse().getOutputStream();
			out.write(("{\"success\":false,\"warning\":\"" + msg + "\"}").getBytes("UTF-8"));
			out.flush();
			out.close();
		} catch (Exception e) {
			log.error("", e);
		}
	}

	private void fillError4Display(String msg) {
		getResponse().setContentType("text/xml");
		try {
			OutputStream out = getResponse().getOutputStream();
			out.write(("{\"success\":false,\"msg\":\"" + msg + "\"}").getBytes("UTF-8"));
			out.flush();
			out.close();
		} catch (Exception e) {
			log.error("", e);
		}
	}

	private void handleException(Throwable e) {
		if (e instanceof BusinessWarningException) {
			BusinessWarningException be = (BusinessWarningException) e;
			fillWarning4Display(be.getMessage());
		} else if (e instanceof BusinessException) {
			BusinessException be = (BusinessException) e;
			fillError4Display(be.getMessage());
		} else {
			fillError4Display(BusinessException.createFriendlyErrMsg(e));
		}
	}

	public String intercept(ActionInvocation invocation) throws BusinessException {
		try {
			return invocation.invoke();
		} catch (Throwable e) {
			log.error("请求异常:", e);
			handleException(e);
		}
		return Action.ERROR;
	}

}
