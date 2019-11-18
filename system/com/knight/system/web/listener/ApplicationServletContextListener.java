/**
 *====================================================
 * 文件名称: ApplicationServletContextListener.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月7日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import lombok.extern.slf4j.Slf4j;

import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: ApplicationServletContextListener
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月7日 上午10:22:48
 */
@Slf4j
public class ApplicationServletContextListener implements ServletContextListener {

	public void contextInitialized(ServletContextEvent event) {
		ApplicationContainer.init(event.getServletContext());
		boolean isAynMenu = ApplicationContainer.getIsSynMenu();
		if (isAynMenu) {
			log.debug("isAynMenu ...");
			ApplicationContainer.synMenu();
		}
	}

	public void contextDestroyed(ServletContextEvent arg0) {
	}

}
