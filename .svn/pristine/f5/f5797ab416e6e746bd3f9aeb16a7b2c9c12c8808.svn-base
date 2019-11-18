/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: LogAfterAdvice.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.logger;

import java.lang.reflect.Method;

import org.springframework.aop.AfterReturningAdvice;

/**
 * @ClassName:LogAfterAdvice
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-29 下午4:08:44
 * @since JDK Version 1.5
 */
public class LogAfterAdvice implements AfterReturningAdvice {

	public void afterReturning(Object returnObj, Method method, Object[] args, Object targetObj) throws Throwable {
		if (method.getName().equals("saveLog")) {
			return;
		}
		System.out.println("save log is ------------>:" + method.getName());
	}

}
