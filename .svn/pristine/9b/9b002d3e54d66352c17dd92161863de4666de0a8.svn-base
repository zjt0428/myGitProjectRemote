/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: InitLoadTableDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeansException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.core.RowCallbackHandler;

import com.knight.core.Constants;
import com.knight.core.dao.impl.BaseStrPKDaoImpl;
import com.knight.core.filter.QueryFilter;
import com.knight.system.dao.InitLoadTableDao;
import com.knight.system.model.CodeInfo;
import com.knight.system.model.InitLoadTable;

/**
 * @ClassName:InitLoadTableDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-1 上午11:54:18
 * @since JDK Version 1.5
 */
@Slf4j
public class InitLoadTableDaoImpl extends BaseStrPKDaoImpl<InitLoadTable> implements InitLoadTableDao {

	@SuppressWarnings("unchecked")
	private Collection<? extends Map<String, Object>> extracted(List<Map<String, Object>> resultList) {
		return (Collection<? extends Map<String, Object>>) resultList;
	}

	public List<InitLoadTable> findByTableType(int tableType, boolean allTable) {
		String hql = "from InitLoadTable i where i.tableType = ? ";
		if (!allTable) {
			hql += "and i.refresh = 0";
		}
		Object[] params = { tableType };
		return findByHql(hql, params);
	}

	public InitLoadTable findByTablAlias(String tableAlias) {
		return get(tableAlias);
	}

	public Map<String, CodeInfo> loadCodeToMap(String sql, final InitLoadTable initLoadTable) {
		final boolean parent;
		if (StringUtils.isNotBlank(initLoadTable.getParentFieldName())) {
			parent = true;
		} else {
			parent = false;
		}
		final boolean alias;
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName())) {
			alias = true;
		} else {
			alias = false;
		}
		final Map<String, CodeInfo> datas = new HashMap<String, CodeInfo>();
		try {
			jdbcTemplate.query(sql, new RowCallbackHandler() {
				public void processRow(ResultSet rs) throws SQLException {
					CodeInfo code = new CodeInfo();
					code.setCode(rs.getString(initLoadTable.getBhFieldName()).trim());
					code.setValue(rs.getString(initLoadTable.getMcFieldName()));
					if (parent) {
						code.setParentCode(rs.getString(initLoadTable.getParentFieldName()));
					}
					if (alias) {
						code.setAliasValue(rs.getString(initLoadTable.getAliasFieldName()));
					}
					datas.put(code.getCode(), code);
				}
			});
		} catch (BadSqlGrammarException e) {
			logger.error(e.getMessage());
		} catch (BeansException e) {
			logger.error(e.getMessage());
		}
		return datas;
	}

	public List<Map<String, Object>> loadConfigTable(InitLoadTable initLoadTable) {
		List<Map<String, Object>> configTabel = new ArrayList<Map<String, Object>>();
		try {
			String sql = "SELECT * FROM " + initLoadTable.getTableName();
			Collection<? extends Map<String, Object>> resultList = extracted(jdbcTemplate.queryForList(sql));
			configTabel.addAll(resultList);
		} catch (BeansException e) {
			logger.error(e.getMessage());
		}
		return configTabel;
	}

	public void setUNRefreshDicTB(String codeId) {
		String sql = "UPDATE INIT_LOAD_TABLE SET REFRESH = " + Constants.FLAG_UNREFRESH + " WHERE TABLE_ALIAS = ?";
		jdbcTemplate.update(sql, codeId);
	}

	public List<CodeInfo> queryCodeInfo(final InitLoadTable initLoadTable, String bhField, String mcField, QueryFilter filter) {
		String sql = " FROM " + initLoadTable.getTableName() + " WHERE 1=1 ";
		if (StringUtils.isNotBlank(bhField)) {
			sql = sql + "AND " + initLoadTable.getBhFieldName() + " LIKE '%" + bhField + "%'";
		}
		if (StringUtils.isNotBlank(mcField)) {
			sql = sql + "AND " + initLoadTable.getMcFieldName() + " LIKE '%" + mcField + "%'";
		}
		final boolean parent;
		if (StringUtils.isNotBlank(initLoadTable.getParentFieldName())) {
			parent = true;
		} else {
			parent = false;
		}
		final boolean alias;
		if (StringUtils.isNotBlank(initLoadTable.getAliasFieldName())) {
			alias = true;
		} else {
			alias = false;
		}
		final List<CodeInfo> datas = new ArrayList<CodeInfo>();
		int total = jdbcTemplate.queryForInt("SELECT COUNT(*) " + sql);
		filter.getPagingBean().setTotalItems(total);
		try {
			if(initLoadTable.getTableAlias().equals("repertoryCategory")){
				sql = sql + " group by CODE, VALUE,PARENT,NAME order by convert(int, CODE) desc";
			}else if(initLoadTable.getTableAlias().equals("reimburseType")||initLoadTable.getTableAlias().equals("econType")){
				sql = sql + " group by CODE, VALUE,PARENT order by convert(int, CODE) desc";
			}else if(initLoadTable.getTableAlias().equals("equipSpecific")){
				sql = sql + " group by CODE, VALUE,NAME, EQUIP_TYPE  order by convert(int, CODE) desc";
			}else if(initLoadTable.getTableAlias().equals("county")||initLoadTable.getTableAlias().equals("city")){
				sql = sql + " group by CODE, VALUE,NAME,LONGITUDE,LATITUDE order by convert(int, CODE) desc";
			}else if(initLoadTable.getTableAlias().equals("componGeneric")){
				sql = sql + " group by CODE, VALUE,NAME order by convert(int, CODE) desc";
			}else if(initLoadTable.getTableAlias().equals("constructTask")){
				sql = sql + " group by CODE, VALUE,UNIT_PRICE order by convert(int, CODE) desc";
			}else if(initLoadTable.getTableAlias().equals("appRepairType")){
				sql = sql + " group by ID, NAME,PARENTID order by ID desc";
			}else if(initLoadTable.getTableAlias().equals("province")){
				sql = sql + " group by CODE, VALUE,NAME,LONGITUDE,LATITUDE order by convert(int, CODE) desc";
			}else if(initLoadTable.getTableAlias().equals("equipGeneric")){
				sql = sql + " group by CODE, VALUE order by CODE desc";
			}
			else{
				sql = sql + " group by CODE, VALUE order by convert(int, CODE) desc";
			}
			jdbcTemplate.query(getLimitString("SELECT  top 100 percent *" + sql, filter.getPagingBean().getStart(), filter.getPagingBean().getPageSize()),
					new RowCallbackHandler() {
						public void processRow(ResultSet rs) throws SQLException {
							CodeInfo code = new CodeInfo();
							code.setCodeId(initLoadTable.getTableAlias());
							code.setCode(rs.getString(initLoadTable.getBhFieldName()));
							code.setValue(rs.getString(initLoadTable.getMcFieldName()));
							if (parent) {
								code.setParentCode(rs.getString(initLoadTable.getParentFieldName()));
							}
							if (alias) {
								code.setAliasValue(rs.getString(initLoadTable.getAliasFieldName()));
							}
							if(StringUtils.isNotBlank(initLoadTable.getAliasFieldName1())){
								code.setAliasValue1(rs.getString(initLoadTable.getAliasFieldName1()));
							}
							if(StringUtils.isNotBlank(initLoadTable.getAliasFieldName2())){
								code.setAliasValue2(rs.getString(initLoadTable.getAliasFieldName2()));
							}
							if(StringUtils.isNotBlank(initLoadTable.getAliasFieldName3())){
								code.setEquipCategory(rs.getString(initLoadTable.getAliasFieldName3()));
							}
							datas.add(code);
						}
					});
		} catch (BadSqlGrammarException e) {
			logger.error(e.getMessage());
		} catch (BeansException e) {
			logger.error(e.getMessage());
		}
		return datas;
	}

	public List<Map<String, Object>> queryCodeInfo(InitLoadTable initLoadTable, String bhField, String mcField) {
		String sql = " FROM " + initLoadTable.getTableName() + " WHERE 1=1 ";
		if (StringUtils.isNotBlank(bhField)) {
			sql = sql + "AND " + initLoadTable.getBhFieldName() + " LIKE '" + bhField + "%'";
		}
		if (StringUtils.isNotBlank(mcField)) {
			sql = sql + "AND " + initLoadTable.getMcFieldName() + " LIKE '%" + mcField + "%'";
		}
		return jdbcTemplate.queryForList("SELECT *" + sql);
	}

}
