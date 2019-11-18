/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseDaoHibernate.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.dao.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.knight.core.dao.BaseHibernateDao;

/**
 * 
 * @ClassName:BaseDaoHibernate
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:50:23
 * @since JDK Version 1.5
 */
public class BaseDaoHibernate extends HibernateDaoSupport implements BaseHibernateDao {
	
	private void setQueryParams(Query query, Object[] params) {
		if(params == null || params.length == 0) {
			return;
		}
		for (int i = 0; i < params.length; i++) {
			Object obj = params[i];
			if (obj.getClass().equals(Integer.class)) {
				query.setInteger(i, (Integer) obj);
			} else if (obj.getClass().equals(String.class)) {
				query.setString(i, (String) obj);
			} else if (obj.getClass().equals(Date.class)) {
				query.setDate(i, (Date) obj);
			} else if (obj.getClass().equals(BigDecimal.class)) {
				query.setBigDecimal(i, (BigDecimal) obj);
			} else {
				query.setParameter(i, obj);
			}
		}
	}

	public void saveOrUpdate(Object o) {
		getHibernateTemplate().saveOrUpdate(o);
		getHibernateTemplate().flush();
	}

	public String save(Object o) {
		java.io.Serializable s = getHibernateTemplate().save(o);
		getHibernateTemplate().flush();
		return s.toString();
	}

	public void delete(final String que) {
		HibernateCallback<Object> callback = new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException {
				Query queryObject = session.createQuery(que);
				int i = queryObject.executeUpdate();
				return new Integer(i);
			}
		};
		getHibernateTemplate().execute(callback);
	}

	public void delete(Object entity) {
		this.getHibernateTemplate().delete(entity);
	}

	public <T> T get(Class<T> clazz, Serializable id) {
		T o = (T) getHibernateTemplate().get(clazz, id);
		return o;
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> getObjects(Class<?> clazz) {
		return (List<T>) getHibernateTemplate().loadAll(clazz);
	}

	public <T> T load(Class<T> clazz, Serializable id) {
		return getHibernateTemplate().load(clazz, id);
	}

	public void delete(Class<?> clazz, Serializable id) {
		getHibernateTemplate().delete(get(clazz, id));
	}

	public void deleteAll(Collection<?> arg) {
		getHibernateTemplate().deleteAll(arg);
	}

	public void update(Object o) {
		getHibernateTemplate().update(o);
		getHibernateTemplate().flush();
	}

	public void update(String hql) {
		Session session = getHibernateTemplate().getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		query.executeUpdate();
	}
	
	public void update(String hql, Object[] params) {
		Session session = getHibernateTemplate().getSessionFactory().getCurrentSession();
		Query query = session.createQuery(hql);
		setQueryParams(query, params);
		query.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> find(String queryString) {
		return (List<T>) getHibernateTemplate().find(queryString);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> find(String queryString, Object value) {
		return (List<T>) getHibernateTemplate().find(queryString, value);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> find(String queryString, Object[] params) {
		return (List<T>) getHibernateTemplate().find(queryString, params);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> find(DetachedCriteria dcri) {
		return (List<T>) dcri.getExecutableCriteria(this.getSession()).list();

	}

	public Object findUniqueResult(DetachedCriteria dcri) {
		return dcri.getExecutableCriteria(this.getSession()).uniqueResult();
	}

	public void initialize(Object o) {
		getHibernateTemplate().initialize(o);
	}

	public void refresh(Object o) {
		getHibernateTemplate().refresh(o);
	}

	/**
	 * 获得有限个数据对象
	 * @param hql
	 * @param maxResult
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T> List<T> getLimitedObjects(final String hql, final int maxResult) {
		HibernateCallback<?> hc = new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setMaxResults(maxResult);
				List<T> result = (List<T>) query.list();
				return result;
			}
		};
		return (List<T>) getHibernateTemplate().executeFind(hc);
	}

	/**
	 * 计算总数
	 * @param hql
	 * @return
	 */
	public int countByHql(final String hql) {
		return ((Long) getHibernateTemplate().find(hql).get(0)).intValue();
	}

	/**
	 * 获得分页数据对象
	 * @param hql
	 * @param pageStart
	 * @param maxResult
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <T> List<T> getPagingObjects(final String hql, final int pageStart, final int maxResult) {
		HibernateCallback<?> hc = new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setMaxResults(maxResult);
				query.setFirstResult(pageStart);
				List<T> result = (List<T>) query.list();
				return result;
			}
		};
		return (List<T>) getHibernateTemplate().executeFind(hc);
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> findWithLock(final String hql) {
		HibernateCallback<?> hc = new HibernateCallback<Object>() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setLockMode("t", LockMode.UPGRADE_NOWAIT);
				List<T> result = (List<T>) query.list();
				return result;
			}
		};
		return (List<T>) getHibernateTemplate().executeFind(hc);
	}

	@SuppressWarnings("unchecked")
	public <T> Iterator<T> iterate(String queryString) {
		return (Iterator<T>) getHibernateTemplate().iterate(queryString);
	}

	public void merge(Object obj) {
		getHibernateTemplate().merge(obj);
	}

	public int createQuery(final String hql) {
		return this.getSession().createQuery(hql).executeUpdate();
	}

	@SuppressWarnings("unchecked")
	public <T> List<T> find(final String hql, Map<String, ?> params) {
		Query query = this.getSession().createQuery(hql);
		Iterator<String> paramIter = params.keySet().iterator();
		while (paramIter.hasNext()) {
			String name = paramIter.next();
			query.setString(name, (String) params.get(name));
		}
		return (List<T>) query.list();
	}

}
