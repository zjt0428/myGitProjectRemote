/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseLongPKServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.service.impl;

import com.knight.core.dao.GenericDao;
import com.knight.core.model.ExportModel;
import com.knight.core.service.BaseLongPKService;
import com.knight.core.service.ExportService;

/**
 * @ClassName:BaseLongPKServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:52:30
 * @since JDK Version 1.5
 */
public class BaseLongPKServiceImpl<T> extends GenericServiceImpl<T, Long> implements BaseLongPKService<T> {

	public BaseLongPKServiceImpl(GenericDao<T, Long> dao) {
		super(dao);
		// 当前对象是否支持导出
		if (dao.getPersistantStruct() == null || dao.getPersistantStruct().getExportStruct() == null) {
			return;
		}
		// 当前Service是否实现导出接口
		if (!(this instanceof ExportService)) {
			return;
		}
		// 注册导出服务
		@SuppressWarnings("unchecked")
		Class<ExportModel> exportModelClazz = (Class<ExportModel>) dao.getPersistantStruct().getClazz();
		super.registerExportService(exportModelClazz, (ExportService) this);
	}
}
