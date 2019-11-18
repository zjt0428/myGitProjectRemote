/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: GenericServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.GenericServiceEnvironment;
import com.knight.core.dao.GenericDao;
import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.PersistantStruct;
import com.knight.core.service.GenericService;
import com.knight.core.web.paging.PagingBean;

/**
 * @ClassName:GenericServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:52:41
 * @since JDK Version 1.5
 */
@Transactional(rollbackFor = {Exception.class, RuntimeException.class})
public class GenericServiceImpl<T, PK extends Serializable> extends GenericServiceEnvironment implements GenericService<T, PK> {

	protected static Logger logger = LoggerFactory.getLogger(GenericServiceImpl.class);

	protected GenericDao<T, PK> dao = null;

	public GenericServiceImpl(GenericDao<T, PK> dao) {
		super();
		this.dao = dao;
	}

	public PersistantStruct getPersistantStruct() {
		return this.dao.getPersistantStruct();
	}

	public T get(PK id) {
		return this.dao.get(id);
	}

	public T save(T entity) {
		return this.dao.save(entity);
	}

	public T merge(T entity) {
		return this.dao.merge(entity);
	}

	public void update(T entity) {
		this.dao.update(entity);
	}

	public void evict(T entity) {
		this.dao.evict(entity);
	}

	public void load(T paramT, PK id) {
		this.dao.load(paramT, id);
	}

	public List<T> getAll() {
		return this.dao.getAll();
	}

	public List<T> getAll(BindingParamFilters params) {
		return this.dao.getAll(params);
	}

	public List<T> getAll(PagingBean pb) {
		return this.dao.getAll(pb);
	}

	public List<T> getAll(QueryFilter filter) {
		return this.dao.getAll(filter);
	}

	public void updateScirpt(String sqlId, Object... params) {
		this.dao.updateScirpt(sqlId, params);
	}

	public List<Map<String, Object>> queryByScript(String sqlId, Object... params) {
		return this.dao.queryByScript(sqlId, params);
	}

	public <R> R queryForDefaultObjectByScript(String sqlId, Class<R> requiredType, R r, Object... params) {
		return this.dao.queryForDefaultObjectByScript(sqlId, requiredType, r, params);
	}

	public List<Map<String, Object>> queryLimitByScript(int offset, int limit, String sqlId, Object... params) {
		return this.dao.queryLimitByScript(offset, limit, sqlId, params);
	}

	public void remove(PK id) {
		this.dao.remove(id);
	}

	public void remove(T entity) {
		this.dao.remove(entity);
	}

	public void flush() {
		this.dao.flush();
	}
	
	public List<T> findByHql(String hql){
		return this.dao.findByHql(hql);
	}

	public List<T> findByHql(String paramString, Object[] paramArrayOfObject) {
		return this.dao.findByHql(paramString, paramArrayOfObject);
	}
	
	@Override
	public List<T> findByHql(String paramString, Object[] paramArrayOfObject, PagingBean pb) {
		return this.dao.findByHql(paramString, paramArrayOfObject, pb);
	}
	
}
