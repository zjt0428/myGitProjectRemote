/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: MenuAuthority.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-22			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.action;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @ClassName: MenuAuthority
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-22 上午11:36:07
 */
@Target({ java.lang.annotation.ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
public @interface MenuAuthority {

	public String id() default "";

	public String iconCls();

	public String text();

	public int array() default 1;

}
