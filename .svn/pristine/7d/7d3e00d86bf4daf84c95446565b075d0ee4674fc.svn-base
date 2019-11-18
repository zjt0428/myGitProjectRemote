/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseJDBCDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.dao;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

/**
 * DAO基类的抽象出来的接口. 每一个自己编写的Dao都要实现这个接口
 * @ClassName:BaseJDBCDao
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:49:41
 * @since JDK Version 1.5
 */
public interface BaseJDBCDao {

	public JdbcTemplate jdbcTemplate();

	public List<?> query(final String sql, RowMapper<?> rowMapper);

	public List<Map<String, Object>> queryForList(final String sql);

	public List<?> queryForList(final String sql, Class<?> clazz);

	public List<Map<String, Object>> queryForList(final String sql, Object[] params);

	public List<Map<String, Object>> queryForList(final String sql, Object object);

	public Map<String, Object> queryForMap(final String sql);

	public int queryForInt(final String sql);

	public void update(final String sql);

	public void update(final String sql, Object[] params);

	public void execute(final String sql);

	public Object callProcedure(final String sql);

}
