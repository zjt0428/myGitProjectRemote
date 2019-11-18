/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.knight.core.Constants;
import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.dao.AppUserDao;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;

/**
 * @ClassName:AppUserDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:58:40
 * @since JDK Version 1.5
 */
public class AppUserDaoImpl extends BaseLongPKDaoImpl<AppUser> implements AppUserDao, UserDetailsService {

	@Override
	public AppUser findByUserName(String username) {
		String hql = "from AppUser au where au.username=? ORDER BY USERID DESC";
		Object[] params = { username };
		List<AppUser> list = findByHql(hql, params);
		AppUser user = null;
		if (list.size() != 0) {
			user = (AppUser) list.get(0);
		}
		return user;
	}

	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException, DataAccessException {
		AppUser user = (AppUser) getHibernateTemplate().execute(new HibernateCallback<AppUser>() {
			@Override
			public AppUser doInHibernate(Session session) throws HibernateException, SQLException {
				String hql = "from AppUser ap where ap.username = ? and ap.delFlag = ?";
				Query query = session.createQuery(hql);
				query.setString(0, username);
				query.setShort(1, Constants.FLAG_UNDELETED);
				AppUser user = null;
				try {
					user = (AppUser) query.uniqueResult();
					if (user != null) {
						Hibernate.initialize(user.getRoles());
						Hibernate.initialize(user.getDepartment());
						Hibernate.initialize(user.getAppUserKeySet());
						Hibernate.initialize(user.getAppUserExtendSet());
						for (AppRole role : user.getRoles()) {
							if (role.getRoleId().equals(AppRole.SUPER_ROLEID)) {
								user.getRights().clear();
								user.getRights().add(AppRole.SUPER_RIGHTS);
								return user;
							}
							if (StringUtils.isNotEmpty(role.getRights())) {
								String[] items = role.getRights().split("[,]");
								for (int i = 0; i < items.length; ++i) {
									if (!(user.getRights().contains(items[i]))) {
										user.getRights().add(items[i]);
									}
								}
							}
						}
					}
				} catch (Exception e) {
					logger.error("", e);
					logger.warn("user:" + username + " can't not loding rights:" + e.getMessage());
				}
				return user;
			}
		});
		return user.clone();
	}

	@Override
	public List<AppUser> findByDepartment(String path, PagingBean pb) {
		List<Object> list = new ArrayList<Object>();
		String hql = new String();
		if ("0.".equals(path)) {
			hql = "from AppUser vo2 where vo2.delFlag = ?";
			list.add(Constants.FLAG_UNDELETED);
		} else {
			hql = "select vo2 from Department vo1, AppUser vo2 where vo1=vo2.department and vo1.path like ? and vo2.delFlag = ?";
			list.add(path + "%");
			list.add(Constants.FLAG_UNDELETED);
		}
		return findByHql(hql, list.toArray(), pb);
	}

	@Override
	public List<AppUser> findByDepartment(Department department) {
		String hql = "select vo2 from Department vo1, AppUser vo2 where vo1=vo2.department and vo1.path like ? and vo2.delFlag = ?";
		Object[] params = { department.getPath() + "%", Constants.FLAG_UNDELETED };
		return findByHql(hql, params);
	}

	@Override
	public List<AppUser> findByRole(Long roleId) {
		String hql = "select vo from AppUser vo join vo.roles roles where roles.roleId=? and vo.delFlag = ?";
		Object[] objs = { roleId, Constants.FLAG_UNDELETED };
		return findByHql(hql, objs);
	}

	@Override
	public List<AppUser> findByRole(Long roleId, PagingBean pb) {
		String hql = "select vo from AppUser vo join vo.roles roles where roles.roleId=? and vo.delFlag = ?";
		Object[] objs = { roleId, Constants.FLAG_UNDELETED };
		return findByHql(hql, objs, pb);
	}

	@Override
	public List<AppUser> findByDepartment(String path) {
		String hql = "select vo2 from Department vo1, AppUser vo2 where vo1.depId=vo2.depId and vo1.path like ? and vo2.delFlag =?";
		Object[] params = { path + "%", Constants.FLAG_UNDELETED };
		return findByHql(hql, params);
	}

	@Override
	public List<AppUser> findByRoleId(Long roleId) {
		String hql = "select vo from AppUser vo join vo.roles as roles where roles.roleId=? and vo.delFlag =?";
		return findByHql(hql, new Object[] { roleId, Constants.FLAG_UNDELETED });
	}

	@Override
	public List<AppUser> findByDepId(Long depId) {
		String hql = "from AppUser vo where vo.delFlag=0 and vo.department.depId=?";
		Object[] objs = { depId };
		return findByHql(hql, objs);
	}

	@Override
	public AppUser findByMobile(String tel) {
		String hql = "from AppUser au where au.mobile=? ORDER BY USERID DESC";
		Object[] params = { tel };
		List<AppUser> list = findByHql(hql, params);
		AppUser user = null;
		if (list.size() != 0) {
			user = (AppUser) list.get(0);
		}
		return user;
	}

	@Override
	public AppUser findByFullName(String fullname) {
		String hql = "from AppUser au where au.fullname=? ORDER BY USERID DESC";
		Object[] params = { fullname };
		List<AppUser> list = findByHql(hql, params);
		AppUser user = null;
		if (list.size() != 0) {
			user = (AppUser) list.get(0);
		}
		return user;
	}
}