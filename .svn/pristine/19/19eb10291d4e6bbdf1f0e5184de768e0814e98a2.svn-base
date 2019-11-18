/**
 *====================================================
 * 文件名称: LeaseApplicationServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月18日		陈光毅(创建:创建文件)
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
import com.knight.emms.dao.LeaseApplicationDao;
import com.knight.emms.dao.LeaseListDao;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LeaseApplication;
import com.knight.emms.service.LeaseApplicationService;

/**
 * @ClassName: LeaseApplicationServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月18日
 */
@Service("leaseApplicationService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class LeaseApplicationServiceImpl extends BusinessFlowServiceImpl<LeaseApplication> implements LeaseApplicationService {

	private LeaseApplicationDao leaseApplicationDao;
	
	@Resource
	private LeaseListDao leaseListDao;
	
	@Autowired(required = true)
	public LeaseApplicationServiceImpl(@Qualifier("leaseApplicationDao") LeaseApplicationDao dao) {
		super(dao);
		this.leaseApplicationDao = dao;
	}

	@Override
	public void removeLease(Long listId) {
		leaseListDao.remove(listId);
	}

	@Override
	public void saveOrMergeForEdit(LeaseApplication t) {}
	
	protected LeaseApplication passFlowAcceptApplication(FormAccept formAccept) {
		LeaseApplication leaseApplication = super.passFlowAcceptApplication(formAccept);
		return leaseApplication;
	}
	
	public void passApproveApplication(FormApprove formApprove) {
		LeaseApplication leaseApplication = passFlowApproveApplication(formApprove);
		leaseApplicationDao.save(leaseApplication);
	}

}
