/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ExportField.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.model;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: ExportField
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-9 下午9:39:41
 */
@Data
@Slf4j
public class ExportField {

	private static final Set<Class<?>> BASE_FIELD_TYPE = new HashSet<Class<?>>();

	static {
		BASE_FIELD_TYPE.add(String.class);
		BASE_FIELD_TYPE.add(Long.class);
		BASE_FIELD_TYPE.add(BigDecimal.class);
		BASE_FIELD_TYPE.add(Short.class);
		BASE_FIELD_TYPE.add(Integer.class);
	}

	private boolean code;

	private boolean array;

	private boolean baseType;

	private Class<?> fieldType;

	private String codeId;

	private String fieldName;

	private Method readMethod;

	public static ExportField parser(CodeField codeField, Field field, Class<?> clazz) {
		if (codeField != null) {
			ExportField e = new ExportField();
			e.setBaseType(true);
			e.setCode(true);
			e.setArray(codeField.isArray());
			e.setCodeId(codeField.getCodeId());
			e.setFieldName(codeField.getCodeFieldName());
			e.setReadMethod(codeField.getCodeReadMethod());
			return e;
		}
		try {
			ExportField e = new ExportField();
			Class<?> fieldType = field.getType();
			e.setFieldType(fieldType);
			if (BASE_FIELD_TYPE.contains(fieldType)) {
				e.setBaseType(true);
			} else {
				e.setBaseType(false);
			}
			e.setFieldName(field.getName());
			e.setReadMethod(new PropertyDescriptor(e.getFieldName(), clazz).getReadMethod());
			return e;
		} catch (Exception e) {
			log.error("", e);
			return null;
		}

	}

}
