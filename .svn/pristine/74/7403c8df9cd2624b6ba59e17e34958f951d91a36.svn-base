/**
 *====================================================
 * 文件名称: IncomeExpenseDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.ApplicationEnvironment;
import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.filter.QueryFilter;
import com.knight.core.filter.command.CriteriaCommand;
import com.knight.core.filter.command.FieldCommandImpl;
import com.knight.core.plugin.dialect.Dialect;
import com.knight.core.script.SqlScriptBuilder;
import com.knight.emms.dao.IncomeExpenseDao;

/**
 * @ClassName: IncomeExpenseDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-1 下午11:01:02
 */
public class IncomeExpenseDaoImpl implements IncomeExpenseDao {

	@Resource
	private BaseJDBCDao baseJdbcDao;

	private Dialect dialect = ApplicationEnvironment.dialect;

	public List<Map<String, Object>> getAll(QueryFilter queryFilter) {
		StringBuffer sb = new StringBuffer(SqlScriptBuilder.get("fund.income_expense_detail"));
		for (int i = 0; i < queryFilter.getCommands().size(); ++i) {
			CriteriaCommand command = (CriteriaCommand) queryFilter.getCommands().get(i);
			if (command instanceof FieldCommandImpl) {
				sb.append(" AND ").append(((FieldCommandImpl) command).getPartHql());
			}
		}
		Object[] params = queryFilter.getParamValues().toArray();
		String sql = dialect.getCountString(sb.toString());
		queryFilter.getPagingBean().setTotalItems(baseJdbcDao.jdbcTemplate().queryForInt(sql, params));
		sql = dialect.getLimitString(sb.toString(), queryFilter.getPagingBean().getStart(), queryFilter.getPagingBean().getPageSize());
		return baseJdbcDao.jdbcTemplate().queryForList(sql, params);
	}

}
