/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: GenericDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import lombok.SneakyThrows;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.engine.SessionFactoryImplementor;
import org.hibernate.hql.ast.QueryTranslatorImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.ApplicationEnvironment;
import com.knight.core.dao.GenericDao;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.BindingParamFilters.ParamFilter;
import com.knight.core.filter.QueryFilter;
import com.knight.core.filter.command.CriteriaCommand;
import com.knight.core.filter.command.FieldCommandImpl;
import com.knight.core.filter.command.SortCommandImpl;
import com.knight.core.model.PersistantStruct;
import com.knight.core.plugin.dialect.Dialect;
import com.knight.core.script.SqlScriptBuilder;
import com.knight.core.support.RestrictionsParser;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName:GenericDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:51:10
 * @since JDK Version 1.5
 */
@Transactional(rollbackFor = {Exception.class, RuntimeException.class, HibernateException.class, SQLException.class})
public abstract class GenericDaoImpl<T, PK extends Serializable> extends HibernateDaoSupport implements GenericDao<T, PK> {

	protected static Logger logger = LoggerFactory.getLogger(GenericDaoImpl.class);

	protected JdbcTemplate jdbcTemplate;

	protected Class<T> persistType;

	protected Dialect dialect = ApplicationEnvironment.dialect;

	@Getter
	protected PersistantStruct persistantStruct = null;

	/** set the query(hql) in the app-dao.xml, then can use by getAllByQueryName(..); */
	@Setter
	protected Map<String, String> querys = new HashMap<String, String>();

	@Autowired(required = true)
	public void setJdbcTemplate(@Qualifier("jdbcTemplate") JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@SuppressWarnings("unchecked")
	public GenericDaoImpl() {
		this.persistType = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		PersistantDeclare declare = this.persistType.getAnnotation(PersistantDeclare.class);
		if (declare != null) {
			persistantStruct = new PersistantStruct(this.persistType, declare);
			ApplicationDaoEnvironment.registerPersistantStruct(persistantStruct);
		}
			
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public T save(T entity) throws RuntimeException {
		getHibernateTemplate().saveOrUpdate(entity);
		return entity;
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public T merge(T entity) throws RuntimeException {
		getHibernateTemplate().merge(entity);
		return entity;
	}

	public T get(PK id) throws RuntimeException {
		return (T) getHibernateTemplate().get(this.persistType, id);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void remove(PK id) throws RuntimeException {
		getHibernateTemplate().delete(get(id));
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void remove(T entity) throws RuntimeException {
		getHibernateTemplate().delete(entity);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void update(T entity) throws RuntimeException {
		getHibernateTemplate().update(entity);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void evict(T entity) throws RuntimeException {
		getHibernateTemplate().evict(entity);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void load(T entity, PK id) throws RuntimeException {
		getHibernateTemplate().load(entity, id);
	}

	protected List<T> find(final String hql, final Object[] values, final int firstResult, final int pageSize) {
		return getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = getSession().createQuery(hql);
				if (values != null) {
					for (int i = 0; i < values.length; ++i) {
						query.setParameter(i, values[i]);
					}
				}
				if (pageSize > 0) {
					query.setFirstResult(firstResult).setMaxResults(pageSize).setFetchSize(pageSize);
				}
				@SuppressWarnings("unchecked")
				List<T> list = query.list();
				return list;
			}
		});
	}

	@Override
	public int getCountByFilter(final QueryFilter filter) throws RuntimeException {
		try {
			Long count = getHibernateTemplate().execute(new HibernateCallback<Long>() {
				@Override
				public Long doInHibernate(Session session) throws HibernateException, SQLException {
					Criteria criteria = session.createCriteria(persistType);
					for (int i = 0; i < filter.getCommands().size(); ++i) {
						CriteriaCommand command = (CriteriaCommand) filter.getCommands().get(i);
						if (!(command instanceof SortCommandImpl)) {
							criteria = command.execute(criteria);
						}
					}
					criteria.setProjection(Projections.rowCount());
					return (Long) criteria.uniqueResult();
				}
			});
			if (count == null) {
				return 0;
			}
			return count.intValue();
		} catch (Throwable t) {
			logger.error("统计异常:", t);
		}
		return 0;
	}

	/**
	 * 返回queryString查询返回的记录数
	 * @param queryString
	 * @param values
	 * @return
	 * @author:Administrator
	 */
	@SneakyThrows(RuntimeException.class)
	public Long getTotalItems(String queryString, final Object[] values) {
		int orderByIndex = queryString.toUpperCase().indexOf(" ORDER BY ");
		if (orderByIndex != -1) {
			queryString = queryString.substring(0, orderByIndex);
		}
		QueryTranslatorImpl queryTranslator = new QueryTranslatorImpl(queryString, queryString, Collections.EMPTY_MAP, (SessionFactoryImplementor) getSessionFactory());
		queryTranslator.compile(Collections.EMPTY_MAP, false);
		final String sql = "select count(*) from (" + queryTranslator.getSQLString() + ") tmp_count_t";
		Object reVal = getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				SQLQuery query = session.createSQLQuery(sql);
				if (values != null) {
					for (int i = 0; i < values.length; ++i) {
						query.setParameter(i, values[i]);
					}
				}
				return query.uniqueResult();
			}
		});
		return new Long(reVal.toString());
	}

	/**
	 * 按Hql查询并返回
	 * @param queryFilter
	 * @return
	 * @author:Administrator
	 */
	@SneakyThrows(RuntimeException.class)
	private List<T> getAllByQuery(QueryFilter queryFilter) {
		String hql = this.querys.get(queryFilter.getFilterName()).trim();
		StringBuffer hqlsb = new StringBuffer();
		// 重新设置排序
		int whereIndex = hql.toUpperCase().indexOf(" WHERE ");
		int groupIndex = hql.toUpperCase().indexOf(" GROUP BY");
		int orderIndex = hql.toUpperCase().indexOf(" ORDER BY ");

		int whereEndIndex = groupIndex > 0 ? groupIndex : (orderIndex > 0 ? orderIndex : hql.length());
		int selectEndIndex = whereIndex > 0 ? whereIndex : whereEndIndex;

		StringBuffer select = new StringBuffer(hql.substring(0, selectEndIndex));
		StringBuffer condition = new StringBuffer();
		StringBuffer groupby = new StringBuffer();
		StringBuffer orderby = new StringBuffer();

		if (whereIndex < 0) {
			condition.append(" where 1=1 ");
		} else {
			condition.append(hql.substring(whereIndex, whereEndIndex));
		}
		if (StringUtils.isNotBlank(queryFilter.getDefaultQueryConditions())) {
			condition.append(queryFilter.getDefaultQueryConditions());
		}

		if (groupIndex > 0) {
			int groupEndIndex = orderIndex > 0 ? orderIndex : hql.length();
			groupby.append(hql.substring(groupIndex, groupEndIndex));
		}

		if (orderIndex > 0) {
			orderby.append(hql.substring(orderIndex));
		}
		// 取得条件以及排序
		for (int i = 0; i < queryFilter.getCommands().size(); ++i) {
			CriteriaCommand command = (CriteriaCommand) queryFilter.getCommands().get(i);
			if (command instanceof FieldCommandImpl) {
				String parthql = command.getPartHql();
				if (parthql.indexOf(".") == -1) {
					condition.append(" and vo.").append(parthql);
				} else {
					condition.append(" and ").append(parthql);
				}
			} else if (command instanceof SortCommandImpl) {
				if (orderby.length() > 1) {
					orderby.append(",");
				} else {
					orderby.append(" order by ");
				}
				String parthql = command.getPartHql();
				if (parthql.indexOf(".") == -1) {
					orderby.append("vo.").append(command.getPartHql());
				} else {
					orderby.append(command.getPartHql());
				}
			}
		}
		hqlsb.append(select).append(condition).append(groupby).append(orderby);
		queryFilter.getDefaultQueryParamValues().addAll(queryFilter.getParamValues());
		Object[] params = queryFilter.getDefaultQueryParamValues().toArray();
		PagingBean pb = queryFilter.getPagingBean();
		// 显示多少条记录
		int totalItems = getTotalItems(hqlsb.toString(), params).intValue();
		pb.setTotalItems(totalItems);
		return find(hqlsb.toString(), params, pb.getFirstResult(), pb.getPageSize());
	}

	@SneakyThrows(RuntimeException.class)
	private Criteria setCriteriaByQueryFilter(Criteria criteria, QueryFilter filter) {
		for (int i = 0; i < filter.getCommands().size(); ++i) {
			criteria = ((CriteriaCommand) filter.getCommands().get(i)).execute(criteria);
		}
		if (filter.getPagingBean().isLimitSize()) {
			criteria.setFirstResult(filter.getPagingBean().getFirstResult());
			criteria.setMaxResults(filter.getPagingBean().getPageSize().intValue());
		}
		return criteria;
	}

	/**
	 * 通过hql查找某个唯一的实体对象
	 * @param hql
	 * @param values
	 * @return
	 * @author:Administrator
	 */
	@SneakyThrows(RuntimeException.class)
	protected T findUnique(final String hql, final Object[] values) {
		return getHibernateTemplate().execute(new HibernateCallback<T>() {
			@Override
			public T doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (values != null) {
					for (int i = 0; i < values.length; ++i) {
						query.setParameter(i, values[i]);
					}
				}
				@SuppressWarnings("unchecked")
				T t = (T) query.uniqueResult();
				return t;
			}
		});
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void updateScirpt(String sqlId, Object... params) throws RuntimeException {
		String sql = SqlScriptBuilder.get(sqlId);
		if (StringUtils.isBlank(sql)) {
			throw new BusinessException("未定义[" + sqlId + "]脚本");
		}
		this.jdbcTemplate.update(sql, params);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<Map<String, Object>> queryByScript(String sqlId, Object... params) throws RuntimeException {
		String sql = SqlScriptBuilder.get(sqlId);
		if (StringUtils.isBlank(sql)) {
			throw new BusinessException("未定义[" + sqlId + "]脚本");
		}
		return this.jdbcTemplate.queryForList(sql, params);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<Map<String, Object>> queryLimitByScript(int offset, int limit, String sqlId, Object... params) throws RuntimeException {
		String sql = SqlScriptBuilder.get(sqlId);
		if (StringUtils.isBlank(sql)) {
			throw new BusinessException("未定义[" + sqlId + "]脚本");
		}
		sql = this.dialect.getLimitString(sql, offset, limit);
		return this.jdbcTemplate.queryForList(sql, params);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public <R> R queryForObjectByScript(String sqlId, Class<R> requiredType, Object... params) throws RuntimeException {
		String sql = SqlScriptBuilder.get(sqlId);
		if (StringUtils.isBlank(sql)) {
			throw new BusinessException("未定义[" + sqlId + "]脚本");
		}
		return this.jdbcTemplate.queryForObject(sql, requiredType, params);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public <R> R queryForDefaultObjectByScript(String sqlId, Class<R> requiredType, R r, Object... params) throws RuntimeException {
		R r1 = queryForObjectByScript(sqlId, requiredType, params);
		if (r1 != null) {
			return r1;
		}
		return r;
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> getAll() {
		return (getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
				String hql = "from " + persistType.getName();
				Query query = session.createQuery(hql);
				@SuppressWarnings("unchecxked")
				List<T> list = query.list();
				return list;
			}
		}));
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> getAll(final BindingParamFilters params) {
		if (params == null || params.isEmpty()) {
			return getAll();
		}
		final StringBuffer hql = new StringBuffer("from " + this.persistType.getName() + " vo where 1 = 1 ");
		for (ParamFilter param : params) {
			hql.append(" and ").append(" vo.").append(RestrictionsParser.parserPreparedBindingHql(param.getOperation(), param.getProperty(), param.getBindingName()));
		}
		return getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException {
				Query query = session.createQuery(hql.toString());
				for (ParamFilter param : params) {
					if (param.getValue() == null) {
						continue;
					} else if (param.getValue() instanceof Collection<?>) {
						query.setParameterList(param.getBindingName(), (Collection<?>) param.getValue());
					} else if (param.getValue() instanceof Object[]) {
						query.setParameterList(param.getBindingName(), (Object[]) param.getValue());
					} else {
						query.setParameter(param.getBindingName(), param.getValue());
					}
				}
				if (params.getPageNumber() != null && params.getPageSize() != null) {
					query.setFirstResult(params.getFirstResult());
					query.setMaxResults(params.getPageSize());
				}
				@SuppressWarnings("unchecked")
				List<T> list = query.list();
				return list;
			}
		});
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> getAll(final PagingBean pb) {
		final String hql = "from " + this.persistType.getName();
		int totalItems = getTotalItems(hql, null).intValue();
		pb.setTotalItems(totalItems);
		return (getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				query.setFirstResult(pb.getFirstResult()).setFetchSize(pb.getPageSize().intValue());
				query.setMaxResults(pb.getPageSize().intValue());
				@SuppressWarnings("unchecked")
				List<T> list = query.list();
				return list;
			}
		}));
	}

	@Transactional(propagation=Propagation.SUPPORTS)
	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> getAll(final QueryFilter queryFilter) {
		if (StringUtils.isNotEmpty(queryFilter.getFilterName())) {
			return getAllByQuery(queryFilter);
		}
		if (queryFilter.getPagingBean().isTotalCounts()) { // 获取总数
			// 设置总记录数
			int totalCounts = getCountByFilter(queryFilter);
			queryFilter.getPagingBean().setTotalItems(totalCounts);
		}
		List<T> resultList = getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
				Criteria criteria = session.createCriteria(persistType);
				// 重新清除alias的命名，防止计算记录行数后名称还存在该处
				queryFilter.getAliasSet().clear();
				setCriteriaByQueryFilter(criteria, queryFilter);
				List<T> list = criteria.list();
				return list;
			}
		});
		return resultList;
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> findByHql(String hql) throws RuntimeException {
		return findByHql(hql, null);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> findByHql(final String hql, Object[] objs) throws RuntimeException {
		return findByHql(hql, objs, -1, -1);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> findByHql(String hql, Object[] objs, PagingBean pb) throws RuntimeException {
		int totalItems = getTotalItems(hql, objs).intValue();
		pb.setTotalItems(totalItems);
		return findByHql(hql, objs, pb.getFirstResult(), pb.getPageSize().intValue());
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> findByHql(final String hql, final Object[] objs, final int firstResult, final int pageSize) {
		return (getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (firstResult > 0) {
					query.setFirstResult(firstResult);
				}
				if (pageSize > 0) {
					query.setMaxResults(pageSize);
				}
				if (objs != null) {
					for (int i = 0; i < objs.length; ++i) {
						query.setParameter(i, objs[i]);
					}
				}
				@SuppressWarnings("unchecked")
				List<T> list = query.list();
				return list;
			}
		}));
	}

	/**
	 * 通过hql查找某个唯一的实体对象
	 * @param hql
	 * @param values
	 * @return
	 * @author:Administrator
	 */
	@SneakyThrows(RuntimeException.class)
	public Object findOtherUnique(final String hql, final Object[] values) {
		return getHibernateTemplate().execute(new HibernateCallback<Object>() {
			@Override
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (values != null) {
					for (int i = 0; i < values.length; ++i) {
						query.setParameter(i, values[i]);
					}
				}
				return query.uniqueResult();
			}
		});
	}

	@SneakyThrows(RuntimeException.class)
	public <P> List<P> findOtherByHql(String hql) throws RuntimeException {
		return findOtherByHql(hql, null);
	}

	@SneakyThrows(RuntimeException.class)
	public <P> List<P> findOtherByHql(final String hql, final Object[] objs) throws RuntimeException {
		return findOtherByHql(hql, objs, -1, -1);
	}

	@SneakyThrows(RuntimeException.class)
	public <P> List<P> findOtherByHql(String hql, Object[] objs, PagingBean pb) throws RuntimeException {
		int totalItems = getTotalItems(hql, objs).intValue();
		pb.setTotalItems(totalItems);
		return findOtherByHql(hql, objs, pb.getFirstResult(), pb.getPageSize().intValue());
	}

	@SneakyThrows(RuntimeException.class)
	public <P> List<P> findOtherByHql(final String hql, final Object[] objs, final int firstResult, final int pageSize) {
		return (getHibernateTemplate().execute(new HibernateCallback<List<P>>() {
			@Override
			public List<P> doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery(hql);
				if (firstResult > 0) {
					query.setFirstResult(firstResult);
				}
				if (pageSize > 0) {
					query.setMaxResults(pageSize);
				}
				if (objs != null) {
					for (int i = 0; i < objs.length; ++i) {
						query.setParameter(i, objs[i]);
					}
				}
				List<P> list = query.list();
				return list;
			}
		}));
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public void flush() throws RuntimeException {
		getHibernateTemplate().flush();
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public String getLimitString(String sql, int offset, int limit) {
		return dialect.getLimitString(sql, offset, limit);
	}

	@SneakyThrows(RuntimeException.class)
	public String getCountString(String sql) {
		return dialect.getCountString(sql);
	}

	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> findByFilter(final QueryFilter queryFilter, String filterName, Map<String,Object> map) throws RuntimeException {
		if (StringUtils.isNotEmpty(queryFilter.getFilterName())) {
			return getAllByQuery(queryFilter);
		}
		if (queryFilter.getPagingBean().isTotalCounts()) { // 获取总数
			// 设置总记录数
			int totalCounts = getCountByFilter(queryFilter);
			queryFilter.getPagingBean().setTotalItems(totalCounts);
		}
		getHibernateTemplate().enableFilter(filterName).setParameter((String)map.get("name"), (Object)map.get("value"));
		List<T> resultList = getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException, SQLException {
				Criteria criteria = session.createCriteria(persistType);
				// 重新清除alias的命名，防止计算记录行数后名称还存在该处
				queryFilter.getAliasSet().clear();
				setCriteriaByQueryFilter(criteria, queryFilter);
				List<T> list = criteria.list();
				return list;
			}
		});
		CodeServiceImpl.translate(resultList);
		return resultList;
	}
	
	@Override
	@SneakyThrows(RuntimeException.class)
	public T getByFilter(PK id, String filterName, Map<String,Object> map) throws RuntimeException {
		getHibernateTemplate().enableFilter(filterName).setParameter((String)map.get("name"), (Object)map.get("value"));
		return (T) getHibernateTemplate().get(this.persistType, id);
	}
	
	@Override
	@SneakyThrows(RuntimeException.class)
	public List<T> getAll(final BindingParamFilters params, String queryString) {
		if (params == null || params.isEmpty()) {
			return getAll();
		}
		final StringBuffer hql = new StringBuffer(queryString);
		for (ParamFilter param : params) {
			hql.append(" and ").append(" vo.").append(RestrictionsParser.parserPreparedBindingHql(param.getOperation(), param.getProperty(), param.getBindingName()));
		}
		return getHibernateTemplate().execute(new HibernateCallback<List<T>>() {
			@Override
			public List<T> doInHibernate(Session session) throws HibernateException {
				Query query = session.createQuery(hql.toString());
				for (ParamFilter param : params) {
					if (param.getValue() == null) {
						continue;
					} else if (param.getValue() instanceof Collection<?>) {
						query.setParameterList(param.getBindingName(), (Collection<?>) param.getValue());
					} else if (param.getValue() instanceof Object[]) {
						query.setParameterList(param.getBindingName(), (Object[]) param.getValue());
					} else {
						query.setParameter(param.getBindingName(), param.getValue());
					}
				}
				if (params.getPageNumber() != null && params.getPageSize() != null) {
					query.setFirstResult(params.getFirstResult());
					query.setMaxResults(params.getPageSize());
				}
				@SuppressWarnings("unchecked")
				List<T> list = query.list();
				return list;
			}
		});
	}
}
