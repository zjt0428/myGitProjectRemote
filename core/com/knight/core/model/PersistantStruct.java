/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: PersistantDeclare.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-27			Chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.model;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.knight.core.table.PersistantDeclare;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: PersistantDeclare
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Chenxy
 * @date 2012-10-27 下午3:26:37
 */
@Slf4j
public class PersistantStruct {

	@Getter
	private Class<?> clazz;

	@Getter
	private final List<CodeField> codeFields = new ArrayList<CodeField>();

	@Getter
	private ExportStruct exportStruct;

	private void addExportFiled(PersistantDeclare declare, CodeField codeField, Field field, Class<?> clazz) {
		if (!declare.isExportable()) {
			return;
		}
		Map<String, ExportField> exportFileds = exportStruct.getExportFileds();
		if (exportFileds.containsKey(field.getName())) {
			return;
		}
		ExportField ef = ExportField.parser(codeField, field, clazz);
		if (ef == null) {
			return;
		}
		exportFileds.put(ef.getFieldName(), ef);
		if (codeField != null) {
			exportFileds.put(codeField.getValueFieldName(), ef);
		}
	}

	public <T> PersistantStruct(Class<T> clazz, PersistantDeclare declare) {
		this.clazz = clazz;
		Field[] fields = clazz.getDeclaredFields();
		if (declare.isExportable()) {
			boolean exportable = false;
			for (Class<?> iclazz : clazz.getInterfaces()) {
				if (iclazz.equals(ExportModel.class)) {
					exportable = true;
				}
			}
			if (!exportable) {
				throw new java.lang.IllegalArgumentException("导出对象 >>>> " + declare.exportName() + "未实现导出模型...");
			}
			log.debug("导出对象 >>>> " + declare.exportName());
			exportStruct = new ExportStruct(declare.exportName(), declare.sheetName());
		}
		for (Field f : fields) {
			int modify = f.getModifiers();
			if (Modifier.isFinal(modify) || Modifier.isStatic(modify) || Modifier.isPublic(modify)) {
				continue;
			}
			CodeField c = CodeField.parser(f, clazz);
			if (c != null) {
				codeFields.add(c);
			}
			addExportFiled(declare, c, f, clazz);
		}
	}

	public PersistantStruct(ExportStruct exportStruct) {
		this.exportStruct = exportStruct;
	}
}
