/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: GenericService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.PersistantStruct;
import com.knight.core.web.paging.PagingBean;

/**
 * @ClassName:GenericService
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:52:23
 * @since JDK Version 1.5
 */
public interface GenericService<T, PK extends Serializable> {

	public PersistantStruct getPersistantStruct();

	public T save(T paramT);

	public T merge(T paramT);

	public T get(PK paramPK);

	public void load(T paramT, PK id);

	public void update(T entity);

	public void evict(T paramT);

	public List<T> getAll();

	public List<T> getAll(BindingParamFilters params);

	public List<T> getAll(PagingBean paramPagingBean);

	public List<T> getAll(QueryFilter paramQueryFilter);

	public void updateScirpt(String sqlId, Object... params);

	public List<Map<String, Object>> queryByScript(String sqlId, Object... params);
	
	public <R> R queryForDefaultObjectByScript(String sqlId, Class<R> requiredType, R r, Object... params);

	public List<Map<String, Object>> queryLimitByScript(int offset, int limit, String sqlId, Object... params);

	public void remove(PK paramPK);

	public void remove(T paramT);

	public void flush();
	
	public List<T> findByHql(String hql);
	
	public List<T> findByHql(String paramString, Object[] paramArrayOfObject);

	public List<T> findByHql(String paramString, Object[] paramArrayOfObject, PagingBean pb);

}
