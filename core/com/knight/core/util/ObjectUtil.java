/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ObjectUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-1-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Date;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

/**
 * 对象反射操作类
 * @ClassName: ObjectUtil
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2011-9-28 下午9:45:47
 */
@Slf4j
public class ObjectUtil {

	private static final String TRUE_STR = "1";

	private static final String TRUE = "true";

	public static final Object[] EMPTY_PRAMAS = new Object[0];

	/**
	 * 给对象设值
	 * @param dest 目标对象
	 * @param field 属性
	 * @param value 值
	 */
	private static void setSimpleProperty(Object dest, Field field, String value) {
		Class<?> fieldType = field.getType();
		String fildTypeName = fieldType.getName();
		try {
			if (fieldType.equals(java.lang.String.class)) {
				field.set(dest, value);
			} else if (fieldType.equals(java.util.Date.class)) {
				Date date = DateUtil.changeStrToDate(value);
				field.set(dest, date);
			} else if (fieldType.equals(java.lang.Integer.class) || fildTypeName.equals("int")) {
				int in = Integer.parseInt(value);
				field.setInt(dest, in);
			} else if (fieldType.equals(java.lang.Long.class) || fildTypeName.equals("long")) {
				long l = Long.parseLong(value);
				field.setLong(dest, l);
			} else if (fieldType.equals(java.lang.Short.class) || fildTypeName.equals("short")) {
				short s = Short.parseShort(value);
				field.setShort(dest, s);
			} else if (fieldType.equals(java.lang.Byte.class) || fildTypeName.equals("byte")) {
				byte b = Byte.parseByte(value);
				field.setByte(dest, b);
			} else if (fieldType.equals(java.lang.Boolean.class) || fildTypeName.equals("boolean")) {
				boolean z = false;
				if (TRUE_STR.equals(value) || TRUE.equalsIgnoreCase(value)) {
					z = true;
				} else {
					z = false;
				}
				field.setBoolean(dest, z);
			} else if (fieldType.equals(java.lang.Float.class) || fildTypeName.equals("float")) {
				float f = Float.parseFloat(value);
				field.setFloat(dest, f);
			} else if (fieldType.equals(java.lang.Double.class) || fildTypeName.equals("double")) {
				double d = Double.parseDouble(value);
				field.setDouble(dest, d);
			} else if (fieldType.equals(java.lang.Character.class) || fildTypeName.equals("char")) {
				char c = (value).toCharArray()[0];
				field.setChar(dest, c);
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 给dest属性赋值
	 * @param dest
	 * @param field
	 * @param value
	 */
	public static void setProperty(Object dest, Field field, Object value) {
		Class<?> fieldType = field.getType();
		try {
			if (value instanceof java.lang.String) {
				setSimpleProperty(dest, field, value.toString());
			} else if (value.getClass().equals(fieldType)) {
				field.set(dest, value);
			} else if (value.getClass().getName().indexOf("java.lang.Object") != -1) {
				field.set(dest, value);
			} else {
				log.debug("不支持的属性类型：" + fieldType);
			}
		} catch (IllegalArgumentException e) {
			log.error("", e);
		} catch (IllegalAccessException e) {
			log.error("", e);
		}
	}

	/**
	 * 给dest属性赋值
	 * @param dest
	 * @param field
	 * @param value
	 */
	public static Object getProperty(Object dest, Field field) {
		try {
			field.setAccessible(true);
			return field.get(dest);
		} catch (IllegalArgumentException e) {
			log.error("", e);
		} catch (IllegalAccessException e) {
			log.error("", e);
		}
		return null;
	}

	/**
	 * 设置对象属性值
	 * @param property String 属性
	 * @param object Object 对象
	 * @param value 值
	 */
	public static void writeProperty(String property, Object obj, Object value) {
		try {
			PropertyDescriptor pd = new PropertyDescriptor(property, obj.getClass());
			Method setMethod = pd.getWriteMethod();// 取出当字段的set方法.
			setMethod.invoke(obj, value);
		} catch (IntrospectionException e) {
			log.debug("设置属性值：" + property + "出错;" + e.getMessage());
		} catch (IllegalArgumentException e) {
			log.debug("设置属性值：" + property + "出错;" + e.getMessage());
		} catch (IllegalAccessException e) {
			log.debug("设置属性值：" + property + "出错;" + e.getMessage());
		} catch (InvocationTargetException e) {
			log.debug("设置属性值：" + property + "出错;" + e.getMessage());
		}
	}

	/**
	 * 获取对象属性值
	 * @param property String 属性
	 * @param object Object 对象
	 */
	public static Object readProperty(String property, Object obj) {
		Object value = null;
		try {
			PropertyDescriptor pd = new PropertyDescriptor(property, obj.getClass());
			Method getMethod = pd.getReadMethod();// 取出当字段的get方法.
			value = getMethod.invoke(obj, EMPTY_PRAMAS);
		} catch (IntrospectionException e1) {
			e1.printStackTrace();
		} catch (IllegalArgumentException e) {
			log.debug("获取属性值：" + property + "出错;" + e.getMessage());
		} catch (IllegalAccessException e) {
			log.debug("获取属性值：" + property + "出错;" + e.getMessage());
		} catch (InvocationTargetException e) {
			log.debug("获取属性值：" + property + "出错;" + e.getMessage());
		}
		return value;
	}

	/**
	 * 利用反射方法构造对应的Class实例
	 * @param packageObject String 包.类
	 * @return Object
	 * @author:chenxy
	 */
	protected static Object call(String packageObject) {
		Object object = null;
		try {
			object = Class.forName(packageObject).newInstance();
			return object;
		} catch (ClassNotFoundException e) {
			log.debug("类未找到ClassNotFoundException：" + e.getMessage());
			return null;
		} catch (InstantiationException e) {
			log.debug("实例化类：" + packageObject + "出错;" + e.getMessage());
			return null;
		} catch (IllegalAccessException e) {
			log.debug("实例化类：" + packageObject + "出错;" + e.getMessage());
			return null;
		}
	}

	/**
	 * 将orig中的数据拷贝到dest中的静态属性
	 * @param dest
	 * @param orig
	 * @author:chenxy
	 */
	public static void copyStaticMustProperties(Object dest, Map<String, ?> orig) throws Exception {
		Field[] fields = FieldUtil.getProperties(dest);
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			int modify = field.getModifiers();
			if (Modifier.isFinal(modify) || (!Modifier.isPublic(modify) && !Modifier.isStatic(modify))) {
				continue;
			}
			String fieldName = field.getName();
			Object value = orig.get(fieldName);
			if (value == null) {
				throw new IllegalArgumentException("配置信息项[" + fieldName + "]读取失败,检查参数表数据是否已经配置完成...");
			}
			setProperty(dest, field, value);
		}
	}

	/**
	 * 将orig中的数据拷贝到dest中的静态属性
	 * @param dest
	 * @param orig
	 * @author:chenxy
	 */
	public static void copyStaticProperties(Object dest, Map<String, ?> orig) {
		Field[] fields = FieldUtil.getProperties(dest);
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			int modify = field.getModifiers();
			if (Modifier.isFinal(modify) || (!Modifier.isPublic(modify) && !Modifier.isStatic(modify))) {
				continue;
			}
			String fieldName = field.getName();
			Object value = orig.get(fieldName);
			if (value == null) {
				continue;
			}
			setProperty(dest, field, value);
		}
	}

}
