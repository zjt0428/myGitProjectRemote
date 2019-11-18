/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BusinessLongPKServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-6-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.util.List;

import com.knight.core.dao.GenericDao;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.ExportModel;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: BusinessLongPKServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-6-6 上午8:04:14
 */
public class BusinessLongPKServiceImpl<T> extends BaseLongPKServiceImpl<T> implements BusinessLongPKService<T> {

	public BusinessLongPKServiceImpl(GenericDao<T, Long> dao) {
		super(dao);
	}

	public List<? extends ExportModel> queryExportData(QueryFilter queryFilter) {
		if (dao.getPersistantStruct() == null || dao.getPersistantStruct().getExportStruct() == null) {
			return null;
		}
		@SuppressWarnings("unchecked")
		List<ExportModel> list = (List<ExportModel>) dao.getAll(queryFilter);
		return list;
	}

	public T getTranslate(Long pk) {
		T t = dao.get(pk);
		CodeServiceImpl.translate(t);
		return t;
	}

	public List<T> queryTranslateAll(QueryFilter queryFilter) {
		List<T> list = dao.getAll(queryFilter);
		CodeServiceImpl.translate(list);
		return list;
	}

}
