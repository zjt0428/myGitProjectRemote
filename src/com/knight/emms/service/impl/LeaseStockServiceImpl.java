/**
 *====================================================
 * 文件名称: LeaseStockService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月20日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：租借库存
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.dao.LeaseStockDao;
import com.knight.emms.model.LeaseStock;
import com.knight.emms.service.LeaseStockService;

/**
 * @ClassName: LeaseStockService
 * @Description: 租借库存
 * @author 陈光毅
 * @date 2017年11月20日
 */
@Service("leaseStockService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class LeaseStockServiceImpl extends BaseLongPKServiceImpl<LeaseStock> implements LeaseStockService {

	@Resource
	private LeaseStockDao leaseStockDao;
	
	@Autowired(required = true)
	public LeaseStockServiceImpl(@Qualifier("leaseStockDao") LeaseStockDao dao) {
		super(dao);
		this.leaseStockDao = dao;
	}

}
