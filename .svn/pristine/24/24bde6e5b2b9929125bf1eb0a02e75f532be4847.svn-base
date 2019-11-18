/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: StoreEquipStockDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-1-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.StoreEquipStockDao;
import com.knight.emms.model.StoreEquipStock;

/**
 * @ClassName: StoreEquipStockDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-1-13 下午8:51:41
 */
public class StoreEquipStockDaoImpl extends BaseLongPKDaoImpl<StoreEquipStock> implements StoreEquipStockDao {

	public StoreEquipStock getLateastStock(Long storeId, Long equipId) {
		String hql = "from StoreEquipStock s where s.storeId = ? and s.equipId = ? order by s.inboundDate desc";
		List<StoreEquipStock> list = findOtherByHql(hql, new Object[] { storeId, equipId }, 0, 1);
		if (!list.isEmpty()) {
			return list.get(0);
		}
		return null;
	}

}
