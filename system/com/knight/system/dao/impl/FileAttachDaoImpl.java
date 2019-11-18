/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FileAttachDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao.impl;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.system.dao.FileAttachDao;
import com.knight.system.model.FileAttach;

/**
 * @ClassName:FileAttachDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:59:05
 * @since JDK Version 1.5
 */
public class FileAttachDaoImpl extends BaseLongPKDaoImpl<FileAttach> implements FileAttachDao {

	public void removeByPath(final String filePath) {
		final String hql = "delete from FileAttach fa where fa.filePath = ?";
		getHibernateTemplate().execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setString(0, filePath);
				return Integer.valueOf(query.executeUpdate());
			}
		});
	}

	public FileAttach getByPath(String filePath) {
		String hql = "from FileAttach fa where fa.filePath = ?";
		return findUnique(hql, new Object[] { filePath });
	}

	public List<FileAttach> getByDepend(Long dependId, String dependName) {
		String hql = "from FileAttach fa where fa.dependId = ? and fa.dependName = ?";
		return findOtherByHql(hql, new Object[] { dependId, dependName });
	}

	public List<Long> getFileIdByDepend(Long dependId, String dependName) {
		String hql = "select fa.fileId from FileAttach fa where fa.dependId = ? and fa.dependName = ?";
		return findOtherByHql(hql, new Object[] { dependId, dependName });
	}

}
