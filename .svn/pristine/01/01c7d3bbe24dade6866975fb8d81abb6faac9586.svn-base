/**
 *====================================================
 * 文件名称: FieldComment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月13日		Chen·G·Y(创建:创建文件)
 *====================================================
 * 类描述：字段说明注解
 */
package com.knight.core.annotation;

import java.lang.annotation.*;  

/**
 * @ClassName: FieldComment
 * @Description: 字段名说明注解
 * @author Chen·G·Y
 * @date 2017年11月13日 下午5:12:52
 */
@Target(ElementType.FIELD)  
@Retention(RetentionPolicy.RUNTIME)  
@Inherited
@Documented  
public @interface FieldComment {
	
	/**
	 * @return 字段描述
	 */
	public String description();
	
	/**
	 * @return 字段名
	 */
	public String column() default "undefined";
	
}
