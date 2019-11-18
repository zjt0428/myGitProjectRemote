/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: StoreEquipStockServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-1-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.StoreEquipStockDao;
import com.knight.emms.model.StoreEquipStock;
import com.knight.emms.service.StoreEquipStockService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: StoreEquipStockServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-1-13 下午8:53:05
 */
public class StoreEquipStockServiceImpl extends BusinessLongPKServiceImpl<StoreEquipStock> implements StoreEquipStockService {

	private StoreEquipStockDao storeEquipStockDao;

	public StoreEquipStockServiceImpl(StoreEquipStockDao dao) {
		super(dao);
		this.storeEquipStockDao = dao;
	}

	public List<StoreEquipStock> queryTranslateAllFull(QueryFilter filter) {
		List<StoreEquipStock> list = storeEquipStockDao.getAll(filter);
		for (StoreEquipStock ses : list) {
			CodeServiceImpl.translate(ses.getEquipment());
		}
		return list;
	}

}
