/**
 *====================================================
 * 文件名称: InventoryDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.knight.core.script.SqlScriptBuilder;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.InventoryDao;
import com.knight.emms.model.Inventory;

/**
 * @ClassName: InventoryDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-26 下午10:02:08
 */
public class InventoryDaoImpl extends BaseBusinessModelDaoImpl<Inventory> implements InventoryDao {

	public List<Map<String, Object>> queryPeriod(String category, Date startTime, Date endTime) {
		String sql = SqlScriptBuilder.get("inventory.period");
		return this.jdbcTemplate.queryForList(sql, category, startTime, endTime);
	}

	public List<Map<String, Object>> queryFinalExam(String category, Date startTime, Date endTime) {
		String sql = SqlScriptBuilder.get("inventory.final_exam");
		return this.jdbcTemplate.queryForList(sql, category, startTime, endTime);
	}

	public List<Map<String, Object>> queryScrap(String category, Date startTime, Date endTime) {
		String sql = SqlScriptBuilder.get("inventory.scrap");
		return this.jdbcTemplate.queryForList(sql, category, startTime, endTime);
	}

	public List<Map<String, Object>> queryMiss(String category, Date startTime, Date endTime) {
		String sql = SqlScriptBuilder.get("inventory.miss");
		return this.jdbcTemplate.queryForList(sql, category, startTime, endTime);
	}

	public List<Map<String, Object>> queryInused(String category, Date startTime, Date endTime) {
		String sql = SqlScriptBuilder.get("inventory.inused");
		return this.jdbcTemplate.queryForList(sql, category, startTime, endTime);
	}

}
