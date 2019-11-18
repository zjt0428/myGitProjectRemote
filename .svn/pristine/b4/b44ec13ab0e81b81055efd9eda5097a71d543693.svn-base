/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ApplicationStartupListener.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core;

import javax.servlet.ServletContextEvent;

import org.springframework.web.context.ContextLoaderListener;

/**
 * @ClassName:ApplicationStartupListener
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:01:18
 * @since JDK Version 1.5
 */
public class ApplicationStartupListener extends ContextLoaderListener {

	public void contextInitialized(ServletContextEvent event) {
		super.contextInitialized(event);
		FreemarkerContextHelper.init(event.getServletContext());
		ApplicationEnvironment.CONTEXT_ROOT_PATH = event.getServletContext().getRealPath("/");
	}
}
