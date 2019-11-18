/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FieldUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    Jan 6, 2010			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import org.apache.commons.lang.StringUtils;

/**
 * 对象反射操作类
* @ClassName: FieldUtil 
* @Description: TODO(这里用一句话描述这个类的作用) 
* @author chenxy 
* @date 2011-9-28 下午9:45:35
 */
public class FieldUtil {

	/**
	 * 获取对象属性数组
	 * @param object Object 对象
	 * @return Field[] 属性数组
	 */
	protected static Field[] getProperties(Object object) {
		if (object == null) {
			return null;
		}
		Field[] fields = object.getClass().getDeclaredFields();
		return fields;
	}

	/**
	 * 判断对象属性字段是否是数据库中的字段
	 * @param field
	 * @return
	 * @author:chenxy
	 */
	public static boolean isDataColumnField(Field field) {
		if (field == null) {
			return false;
		}
		boolean flag = true;
		int modify = field.getModifiers();
		if (Modifier.isFinal(modify)) {
			flag = false;
		} else if (Modifier.isStatic(modify)) {
			flag = false;
		} else if (Modifier.isPublic(modify)) {
			flag = false;
		} else if (Modifier.isProtected(modify)) {
			flag = false;
		}
		if (flag) {
			if (!"java.lang.String".equals(field.getType().getName())) {
				flag = false;
			}
		}
		return flag;
	}

	/**
	 * 将对象中的属性转化成数据库中的字段(针对数据库中的字段以_做为分隔符)
	 * @param fieldName String 对象属性名称
	 * @return String 属性对应数据字段
	 * @author:chenxy
	 */
	public static String getDataColumnField(String fieldName) {
		if (StringUtils.isBlank(fieldName)) {
			return null;
		}
		StringBuffer sourceFieldName = new StringBuffer();
		for (int i = 0; i < fieldName.length(); i++) {
			if (fieldName.charAt(i) >= 65 && fieldName.charAt(i) <= 90) { // 如果是大写字母则在字符前加 "_"
				sourceFieldName.append("_");
			}
			sourceFieldName.append(fieldName.charAt(i));
		}
		return sourceFieldName.toString().toUpperCase();
	}

	/**
	 * 将数据库中的字段转化成对象中的属性(针对数据库中的字段以_做为分隔符)
	 * @param fieldName String 对象属性名称
	 * @return String 属性对应数据字段
	 * @author:chenxy
	 */
	public static String getObjectPropertiesField(String columnField) {
		if (StringUtils.isBlank(columnField)) {
			return null;
		}
		String lowColumnField = columnField.toLowerCase();
		StringBuffer propertiesFieldName = new StringBuffer();
		boolean flag = false;
		for (int i = 0; i < lowColumnField.length(); i++) {
			if (lowColumnField.charAt(i) == '_') {
				flag = true;
			} else if (flag && lowColumnField.charAt(i) >= 97 && lowColumnField.charAt(i) <= 122) {
				propertiesFieldName.append((char) (lowColumnField.charAt(i) - 32));
				flag = false;
			} else {
				propertiesFieldName.append(lowColumnField.charAt(i));
				flag = false;
			}
		}
		return propertiesFieldName.toString();
	}

}
