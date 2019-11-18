/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseDaoJdbcTemplate.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.dao.impl;

import java.sql.CallableStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import com.knight.core.dao.BaseJDBCDao;

/**
 * @ClassName:BaseDaoJdbcTemplate
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:50:28
 * @since JDK Version 1.5
 */
public class BaseDaoJdbcTemplate extends JdbcDaoSupport implements BaseJDBCDao {

	public JdbcTemplate jdbcTemplate() {
		return getJdbcTemplate();
	}

	public List<?> query(final String sql, RowMapper<?> rowMapper) {
		return getJdbcTemplate().query(sql, rowMapper);
	}

	public List<Map<String, Object>> queryForList(final String sql) {
		return getJdbcTemplate().queryForList(sql);
	}

	public List<?> queryForList(final String sql, Class<?> clazz) {
		return getJdbcTemplate().queryForList(sql, clazz);
	}

	public List<Map<String, Object>> queryForList(final String sql, Object[] params) {
		return getJdbcTemplate().queryForList(sql, params);
	}

	public List<Map<String, Object>> queryForList(final String sql, Object object) {
		return getJdbcTemplate().queryForList(sql, object);
	}

	public Map<String, Object> queryForMap(final String sql) {
		return getJdbcTemplate().queryForMap(sql);
	}

	public int queryForInt(final String sql) {
		return getJdbcTemplate().queryForInt(sql);
	}

	public void update(final String sql) {
		getJdbcTemplate().update(sql);
	}

	public void update(final String sql, Object[] params) {
		getJdbcTemplate().update(sql, params);
	}

	public void execute(final String sql) {
		getJdbcTemplate().execute(sql);
	}

	public Object callProcedure(final String sql) {
		// 使用 Object execute(String callString, CallableStatementCallback action)接口
		Object obj = getJdbcTemplate().execute(sql, new CallableStatementCallback<Object>() {
			public Object doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
				cs.execute();
				return null;
			}
		});
		return obj;
	}

}
