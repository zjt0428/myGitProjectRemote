/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: CodeFieldDeclare.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-27			Chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.table;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @ClassName: CodeFieldDeclare
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Chenxy
 * @date 2012-10-27 上午9:12:03
 */
@Target({ java.lang.annotation.ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface CodeFieldDeclare {

	public abstract String codeId();

	public abstract String valueField();

	public abstract boolean array() default false;

}
