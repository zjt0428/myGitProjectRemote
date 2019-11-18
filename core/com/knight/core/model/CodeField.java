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
package com.knight.core.model;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

import com.knight.core.exception.KnightException;
import com.knight.core.table.CodeFieldDeclare;

import lombok.Data;

/**
 * @ClassName: CodeFieldDeclare
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Chenxy
 * @date 2012-10-27 下午3:29:06
 */
@Data
public class CodeField {

	private String codeId;

	private String codeFieldName;

	private Method codeReadMethod;

	public String valueFieldName;

	private Method valueWriteMethod;

	private boolean array;

	public static CodeField parser(Field f, Class<?> clazz) {
		CodeFieldDeclare c = f.getAnnotation(CodeFieldDeclare.class);
		if (c == null) {
			return null;
		}
		CodeField cf = new CodeField();
		try {
			cf.setCodeId(c.codeId());
			cf.setCodeFieldName(f.getName());
			PropertyDescriptor r = new PropertyDescriptor(f.getName(), clazz);
			cf.setCodeReadMethod(r.getReadMethod());

			cf.setValueFieldName(c.valueField());
			PropertyDescriptor w = new PropertyDescriptor(cf.getValueFieldName(), clazz);
			cf.setValueWriteMethod(w.getWriteMethod());

			cf.setArray(c.array());
			return cf;
		} catch (Exception e) {
			throw new KnightException(e);
		}

	}
}
