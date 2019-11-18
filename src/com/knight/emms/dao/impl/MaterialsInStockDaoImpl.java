/**
 *====================================================
 * 文件名称: MaterialsInStockDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年12月07日		Chen·G·Y(创建:创建文件)
 *====================================================
 * 类描述：周材入库
 */
package com.knight.emms.dao.impl;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.MaterialsInStockDao;
import com.knight.emms.model.MaterialsInStock;

/**
 * @ClassName: MaterialsInStockDaoImpl
 * @Description: 周材入库
 * @author Chen·G·Y
 * @date 2017年12月07日
 */
@Repository("materialsInStockDao")
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class MaterialsInStockDaoImpl extends BaseLongPKDaoImpl<MaterialsInStock> implements MaterialsInStockDao{
	
}