/**
* 版权所有：厦门市巨龙软件工程有限公司
* Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
* All right reserved. 
*====================================================
* 文件名称: AppRoleDaoImpl.java
* 修订记录：
* No    日期				作者(操作:具体内容)
* 1.    2010-12-26			chenxy(创建:创建文件)
*====================================================
* 类描述：(说明未实现或其它不应生成javadoc的内容)
* 
*/
package com.knight.system.dao.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.system.dao.AppRoleDao;
import com.knight.system.model.AppFunction;
import com.knight.system.model.AppRole;
import com.knight.system.model.FunUrl;

/**
 * 
 * @ClassName:AppRoleDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:58:29
 * @since JDK Version 1.5
 */
public class AppRoleDaoImpl extends BaseLongPKDaoImpl<AppRole> implements AppRoleDao {
	
	public AppRole getByRoleName(String roleName) {
		String hql = "from AppRole ar where ar.roleName=?";
		return ((AppRole) findUnique(hql, new Object[] { roleName }));
	}

	public Map<String, Set<String>> getSecurityDataSource() {
		final Map<String, Set<String>> source = new HashMap<String, Set<String>>();
		getHibernateTemplate().execute(new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				String hql = "from AppRole";
				Query query = session.createQuery(hql);
				@SuppressWarnings("unchecked")
				List<AppRole> roleList = query.list();
				for (AppRole role : roleList) {
					Set<String> urlSet = new TreeSet<String>();
					for (AppFunction fun : role.getFunctions()) {
						for (FunUrl funUrl : fun.getFunUrls()) {
							urlSet.add(funUrl.getUrlPath());
						}
					}
					source.put(role.getName(), urlSet);
				}
				return null;
			}
		});
		return source;
	}
}
