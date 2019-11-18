/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: UserSessionListener.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.knight.system.application.ApplicationContainer;

/**
 * 
 * @ClassName:UserSessionListener
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:01:22
 * @since JDK Version 1.5
 */
public class UserSessionListener implements HttpSessionListener {

	public void sessionCreated(HttpSessionEvent arg0) {
	}

	public void sessionDestroyed(HttpSessionEvent event) {
		String sessionId = event.getSession().getId();
		ApplicationContainer.removeOnlineUser(sessionId);
	}

}
