/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AopTargetUtils.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.lang.reflect.Field;

import org.springframework.aop.framework.AdvisedSupport;
import org.springframework.aop.framework.AopProxy;
import org.springframework.aop.support.AopUtils;

/**
 * @ClassName: AopTargetUtils
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-24 下午4:21:07
 */
public class AopTargetUtils {

	/**
	 * 获取 目标对象
	 * @param proxy 代理对象
	 * @return
	 * @throws Exception
	 */
	public static Object getTarget(Object proxy) throws Exception {
		if (!AopUtils.isAopProxy(proxy)) {
			return proxy;// 不是代理对象
		}
		if (AopUtils.isJdkDynamicProxy(proxy)) {
			return getJdkDynamicProxyTargetObject(proxy);
		} else {
			return getCglibProxyTargetObject(proxy);
		}
	}

	private static Object getCglibProxyTargetObject(Object proxy) throws Exception {
		Field h = proxy.getClass().getDeclaredField("CGLIB$CALLBACK_0");
		h.setAccessible(true);
		Object dynamicAdvisedInterceptor = h.get(proxy);

		Field advised = dynamicAdvisedInterceptor.getClass().getDeclaredField("advised");
		advised.setAccessible(true);

		Object target = ((AdvisedSupport) advised.get(dynamicAdvisedInterceptor)).getTargetSource().getTarget();

		return target;
	}

	private static Object getJdkDynamicProxyTargetObject(Object proxy) throws Exception {
		Field h = proxy.getClass().getSuperclass().getDeclaredField("h");
		h.setAccessible(true);
		AopProxy aopProxy = (AopProxy) h.get(proxy);

		Field advised = aopProxy.getClass().getDeclaredField("advised");
		advised.setAccessible(true);

		Object target = ((AdvisedSupport) advised.get(aopProxy)).getTargetSource().getTarget();
		return target;
	}

}
