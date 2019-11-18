/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ShortMessageServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.Constants;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.dao.AppUserDao;
import com.knight.system.dao.InMessageDao;
import com.knight.system.dao.ShortMessageDao;
import com.knight.system.model.AppUser;
import com.knight.system.model.InMessage;
import com.knight.system.model.ShortMessage;
import com.knight.system.service.ShortMessageService;

/**
 * 
 * @ClassName:ShortMessageServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 上午11:21:08
 * @since JDK Version 1.5
 */
public class ShortMessageServiceImpl extends BusinessLongPKServiceImpl<ShortMessage> implements ShortMessageService {

	private ShortMessageDao messageDao;

	@Resource
	private InMessageDao inMessageDao;

	@Resource
	private AppUserDao appUserDao;

	public ShortMessageServiceImpl(ShortMessageDao dao) {
		super(dao);
		this.messageDao = dao;
	}

	public List<ShortMessage> findAll(Long userId, PagingBean pb) {
		return this.messageDao.findAll(userId, pb);
	}

	public List<ShortMessage> findByUser(Long userId) {
		return this.messageDao.findByUser(userId);
	}

	public List<Object[]> searchShortMessage(Long userId, ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		return this.messageDao.searchShortMessage(userId, shortMessage, from, to, pb);
	}

	public ShortMessage save(Long senderId, String receiveIds, String content, Short msgType) {
		ShortMessage shortMessage = new ShortMessage();
		shortMessage.setContent(content);
		shortMessage.setMsgType(msgType);
		AppUser curUser = (AppUser) this.appUserDao.get(senderId);
		shortMessage.setSender(curUser.getFullname());
		shortMessage.setSenderId(curUser.getUserId());
		shortMessage.setSendTime(new Date());

		this.messageDao.save(shortMessage);

		String[] reIds = receiveIds.split("[,]");
		if (reIds != null) {
			for (String userId : reIds) {
				InMessage inMsg = new InMessage();
				inMsg.setDelFlag(Constants.FLAG_UNDELETED);
				inMsg.setReadFlag(InMessage.FLAG_UNREAD);
				inMsg.setShortMessage(shortMessage);
				AppUser receiveUser = (AppUser) this.appUserDao.get(new Long(userId));

				inMsg.setUserId(receiveUser.getUserId());
				inMsg.setUserFullname(receiveUser.getFullname());
				this.inMessageDao.save(inMsg);
			}
		}

		return shortMessage;
	}

}
