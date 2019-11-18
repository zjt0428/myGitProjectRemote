/**
 *====================================================
 * 文件名称: TableName.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月13日		Chen·G·Y(创建:创建文件)
 *====================================================
 * 类描述：数据表名称注解
 */
package com.knight.core.annotation;

import java.lang.annotation.*;

/**
 * @ClassName: TableName
 * @Description: 数据表名称注解
 * @author Chen·G·Y
 * @date 2017年11月13日 下午5:12:52
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface TableName {

	/**
	 * @return 数据表名
	 */
	public String tableName();
	
	/**
	 * @return 类名
	 */
	public String className() default "";
	
	/**
	 * @return 描述
	 */
	public String description() default "";
}
