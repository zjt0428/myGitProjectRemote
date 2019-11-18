/**
 *====================================================
 * 文件名称: LeaseStockDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：租借库存
 */
package com.knight.emms.dao.impl;

import org.springframework.stereotype.Repository;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.LeaseStockDao;
import com.knight.emms.model.LeaseStock;
/**
 * @ClassName: LeaseStockDaoImpl
 * @Description: 租借库存
 * @author 陈光毅
 * @date 2017年11月20日
 */
@Repository("leaseStockDao")
public class LeaseStockDaoImpl extends BaseLongPKDaoImpl<LeaseStock> implements LeaseStockDao {

}
