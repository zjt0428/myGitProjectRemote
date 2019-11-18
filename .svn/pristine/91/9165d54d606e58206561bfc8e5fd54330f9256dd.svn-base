/**
 *====================================================
 * 文件名称: SerialNumberStrategy.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月7日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.model;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @ClassName: SerialNumberStrategy
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月7日 上午8:49:05
 */
@Target({ java.lang.annotation.ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface SerialNumberStrategy {

	public String name();

	public String strategy();

	public int maxseq();

}
