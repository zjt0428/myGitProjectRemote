/**
 *====================================================
 * 文件名称: LeaseSettlementServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月30日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.LeaseSettlementDao;
import com.knight.emms.dao.SettlementListDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LeaseSettlement;
import com.knight.emms.service.LeaseSettlementService;

import lombok.SneakyThrows;

/**
 * @ClassName: LeaseSettlementServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年8月30日
 */
@Service("leaseSettlementService")
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class LeaseSettlementServiceImpl extends BusinessFlowServiceImpl<LeaseSettlement> implements LeaseSettlementService {

	private LeaseSettlementDao leaseSettlementDao;
	
	@Resource
	private SettlementListDao settlementListDao;
	
	@Autowired(required = true)
	public LeaseSettlementServiceImpl(@Qualifier("leaseSettlementDao") LeaseSettlementDao dao) {
		super(dao);
		this.leaseSettlementDao = dao;
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void delList(Long listId) throws RuntimeException {
		settlementListDao.remove(listId);
	}

	@Override
	@Deprecated
	public void saveOrMergeForEdit(LeaseSettlement t) {}

	/** 审批 */
	@Override
	@SneakyThrows(RuntimeException.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		LeaseSettlement leaseSettlement = passFlowApproveApplication(formApprove);
		leaseSettlementDao.save(leaseSettlement);
	}
}
