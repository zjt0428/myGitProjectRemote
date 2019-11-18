/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ApplicationEnvironment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core;

import java.util.HashMap;
import java.util.Map;

import org.hibernate.cfg.Environment;

import com.knight.core.model.ExportModel;
import com.knight.core.plugin.dialect.Dialect;
import com.knight.core.plugin.dialect.Dialect.DialectType;
import com.knight.core.plugin.dialect.OracleDialect;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.core.service.ExportService;

/**
 * @ClassName: ApplicationEnvironment
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-26 下午2:04:50
 */
public final class ApplicationEnvironment {

	public static final Dialect dialect;

	private static final Map<Class<? extends ExportModel>, ExportService> registerExportService = new HashMap<Class<? extends ExportModel>, ExportService>();

	public static String CONTEXT_ROOT_PATH;

	static {
		String dialectDeclare = Environment.getProperties().getProperty("hibernate.dialect");
		DialectType dt = DialectType.getDialectType(dialectDeclare);
		switch (dt) {
		case ORACLE:
			dialect = new OracleDialect();
			break;
		case SQLSERVER:
			dialect = new SQLServerDialect();
			break;
		default:
			dialect = null;
		}
	}

	static void registerExportService(Class<ExportModel> model, ExportService service) {
		registerExportService.put(model, service);
	}

	public static ExportService provideExportService(Class<? extends ExportModel> model) {
		return registerExportService.get(model);
	}

}
