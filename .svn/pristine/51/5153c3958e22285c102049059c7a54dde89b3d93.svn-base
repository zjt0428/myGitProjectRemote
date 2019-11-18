/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: InMessageServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.system.dao.InMessageDao;
import com.knight.system.model.InMessage;
import com.knight.system.service.CodeService;
import com.knight.system.service.InMessageService;

/**
 * @ClassName:InMessageServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 上午11:20:59
 * @since JDK Version 1.5
 */
public class InMessageServiceImpl extends BusinessLongPKServiceImpl<InMessage> implements InMessageService {

	private InMessageDao inMessageDao;

	@Resource
	private CodeService codeService;

	public InMessageServiceImpl(InMessageDao dao) {
		super(dao);
		this.inMessageDao = dao;
	}

	public List<InMessage> queryTranslateFullAll(QueryFilter queryFilter) {
		List<InMessage> list = inMessageDao.getAll(queryFilter);
		for (InMessage in : list) {
			in.getShortMessage().setMsgTypeName(codeService.getValue("MESSAGE_TYPE", in.getShortMessage().getMsgType().toString()));
		}
		return list;
	}

	public Integer findByReadFlag(Long userId) {
		return inMessageDao.findByReadFlag(userId);
	}

	public List<InMessage> findByRead(Long userId) {
		return inMessageDao.findByRead(userId);
	}

	public InMessage findLatest(Long userId) {
		QueryFilter filter = new QueryFilter();
		filter.getPagingBean().setPageSize(1);
		filter.addConjunctFilter("Q_userId_L_EQ", userId.toString());
		filter.addConjunctFilter("Q_delFlag_SN_EQ", "0");
		filter.addSorted("receiveId", QueryFilter.ORDER_DESC);
		List<InMessage> ims = inMessageDao.getAll(filter);
		if (ims.isEmpty()) {
			return null;
		}
		return ims.get(0);
	}

}
