/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: InMessageDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao.impl;

import java.util.List;

import org.hibernate.Query;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.system.dao.InMessageDao;
import com.knight.system.model.InMessage;

/**
 * @ClassName:InMessageDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 上午11:22:53
 * @since JDK Version 1.5
 */
public class InMessageDaoImpl extends BaseLongPKDaoImpl<InMessage> implements InMessageDao {

	public Integer findByReadFlag(Long userId) {
		String sql = "select count(*) from InMessage vo where vo.readFlag=0 and vo.delFlag=0 and vo.userId=" + userId;
		Query query = getSession().createQuery(sql);
		return Integer.parseInt(query.list().iterator().next().toString());
	}

	public List<InMessage> findByRead(Long userId) {
		String hql = "from InMessage vo where vo.readFlag=0 and vo.delFlag=0 and vo.userId=?";
		Object[] objs = { userId };
		return findByHql(hql, objs);
	}

}
