/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: StoreEquipStockService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-1-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.StoreEquipStock;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: StoreEquipStockService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-1-13 下午8:52:23
 */
public interface StoreEquipStockService extends BusinessLongPKService<StoreEquipStock> {

	public List<StoreEquipStock> queryTranslateAllFull(QueryFilter filter);

}
