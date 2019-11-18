/**
 *====================================================
 * 文件名称: StoreComponStockServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月22日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.StoreComponStockDao;
import com.knight.emms.model.StoreComponStock;
import com.knight.emms.service.StoreComponStockService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: StoreComponStockServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月22日 下午11:33:39
 */
public class StoreComponStockServiceImpl extends BusinessLongPKServiceImpl<StoreComponStock> implements StoreComponStockService {

	private StoreComponStockDao storeComponStockDao;

	public StoreComponStockServiceImpl(StoreComponStockDao dao) {
		super(dao);
		this.storeComponStockDao = dao;
	}

	public List<StoreComponStock> queryTranslateAllFull(QueryFilter filter) {
		List<StoreComponStock> list = storeComponStockDao.getAll(filter);
		for (StoreComponStock ses : list) {
			CodeServiceImpl.translate(ses.getComponent());
		}
		return list;
	}

}
