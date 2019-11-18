/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseHibernateDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.criterion.DetachedCriteria;

/**
 * DAO基类的抽象出来的接口. 每一个自己编写的Dao都要实现这个接口
 * @ClassName:BaseHibernateDao
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:49:28
 * @since JDK Version 1.5
 */
public interface BaseHibernateDao {

	public <T> T get(Class<T> clazz, Serializable id);

	public <T> T load(Class<T> clazz, Serializable id);

	public void saveOrUpdate(Object o);

	public void update(Object o);

	public void update(String hql);
	
	public void update(String hql, Object[] params);

	public String save(Object o);

	public void delete(Class<?> clazz, Serializable id);

	public void delete(String hql);

	public void delete(Object entity);

	public void deleteAll(Collection<?> arg);

	public <T> List<T> find(String hql);

	public <T> List<T> find(String hql, Object value);

	public <T> List<T> find(String hql, Object[] params);

	public <T> List<T> find(DetachedCriteria dcri);

	public <T> List<T> find(final String hql, Map<String, ?> params);

	public <T> List<T> getObjects(Class<?> className);

	public Object findUniqueResult(DetachedCriteria dcri);

	public void initialize(Object o);

	public <T> List<T> getLimitedObjects(final String hql, final int maxResult);

	public int countByHql(final String hql);

	public <T> List<T> getPagingObjects(final String hql, final int pageStart, final int maxResult);

	public <T> List<T> findWithLock(final String hql);

	public <T> Iterator<T> iterate(String queryString);

	public void merge(Object obj);

	public int createQuery(final String hql);
}
