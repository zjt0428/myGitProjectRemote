/**
 *====================================================
 * 文件名称: EquipmentDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
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
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: EquipmentDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午11:23:16
 */
public class EquipmentDaoImpl extends BaseBusinessModelDaoImpl<Equipment> implements EquipmentDao {

	@Resource
	private BaseJDBCDao baseJdbcDao;

	private Dialect dialect = ApplicationEnvironment.dialect;

	public List<Map<String, Object>> queryDistributeMapInfo(QueryFilter queryFilter) {
		StringBuffer sb = null;
		if ("2".equals(queryFilter.getFilterName())) {
			sb = new StringBuffer(SqlScriptBuilder.get("equipdoc.country_map_info"));
		} else if ("1".equals(queryFilter.getFilterName())) {
			sb = new StringBuffer(SqlScriptBuilder.get("equipdoc.city_map_info"));
		} else {
			sb = new StringBuffer(SqlScriptBuilder.get("equipdoc.province_map_info"));
		}
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
