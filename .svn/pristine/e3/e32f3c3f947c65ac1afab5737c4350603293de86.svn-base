/**
 *====================================================
 * 文件名称: LeasePaymentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年9月04日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.LeasePaymentDao;
import com.knight.emms.dao.SettlementInfoDao;
import com.knight.emms.model.LeasePayment;
import com.knight.emms.service.LeasePaymentService;

import lombok.SneakyThrows;

/**
 * @ClassName: LeasePaymentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年9月04日
 */
@Service("leasePaymentService")
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class LeasePaymentServiceImpl extends BaseBusinessModelServiceImpl<LeasePayment> implements LeasePaymentService, ExportService {

	private LeasePaymentDao leasePaymentDao;
	
	@Resource
	private SettlementInfoDao settlementInfoDao;
	
	@Autowired(required = true)
	public LeasePaymentServiceImpl(@Qualifier("leasePaymentDao")LeasePaymentDao dao) {
		super(dao);
		this.leasePaymentDao = dao;
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void delInfo(Long infoId) throws RuntimeException {
		settlementInfoDao.remove(infoId);
	}

}
