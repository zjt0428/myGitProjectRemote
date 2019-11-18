/**
 *====================================================
 * 文件名称: ApplicationContextHelper.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月7日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * @ClassName: ApplicationContextHelper
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月7日 上午10:00:25
 */
public class ApplicationContextHelper implements ApplicationContextAware {

	private static ApplicationContext applicationContext;

	/**
	 * 此方法可以把ApplicationContext对象inject到当前类中作为一个静态成员变量。
	 * @param applicationContext ApplicationContext 对象.
	 * @throws BeansException
	 */
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		ApplicationContextHelper.applicationContext = applicationContext;
	}

	/**
	 * 这是一个便利的方法，帮助我们快速得到一个BEAN
	 * @param beanName bean的名字
	 * @return 返回一个bean对象
	 */
	public static Object getBean(String beanName) {
		return applicationContext.getBean(beanName);
	}

}
