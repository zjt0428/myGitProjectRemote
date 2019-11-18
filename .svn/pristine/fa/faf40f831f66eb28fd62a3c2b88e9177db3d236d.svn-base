/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ShortMessageDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.dao.ShortMessageDao;
import com.knight.system.model.ShortMessage;

/**
 * @ClassName:ShortMessageDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 上午11:23:03
 * @since JDK Version 1.5
 */
public class ShortMessageDaoImpl extends BaseLongPKDaoImpl<ShortMessage> implements ShortMessageDao {

	public List<ShortMessage> findAll(Long userId, PagingBean pb) {
		String hql = "from ShortMessage vo where vo.senderId=?";
		Object[] objs = { userId };
		return findByHql(hql, objs, pb);
	}

	public List<ShortMessage> findByUser(Long userId) {
		String hql = "from ShortMessage vo where vo.senderId=?";
		Object[] objs = { userId };
		return findByHql(hql, objs);
	}

	public List<Object[]> searchShortMessage(Long userId, ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		List<Object> paramList = new ArrayList<Object>();
		StringBuffer hql = new StringBuffer("select vo1, vo2 from InMessage vo1,ShortMessage vo2 where vo1.shortMessage=vo2 and vo1.delFlag=0 and vo1.userId=?");
		paramList.add(userId);
		if (shortMessage != null) {
			if (shortMessage.getMsgType() != null) {
				hql.append(" and vo2.msgType=?");
				paramList.add(shortMessage.getMsgType());
			}
			if (StringUtils.isNotEmpty(shortMessage.getSender())) {
				hql.append(" and vo2.sender=?");
				paramList.add(shortMessage.getSender());
			}
		}
		if (to != null) {
			hql.append("and vo2.sendTime <= ?");
			paramList.add(to);
		}
		if (from != null) {
			hql.append("and vo2.sendTime >= ?");
			paramList.add(from);
		}
		hql.append(" order by vo2.sendTime desc");
		return findOtherByHql(hql.toString(), paramList.toArray(), pb);
	}

}
