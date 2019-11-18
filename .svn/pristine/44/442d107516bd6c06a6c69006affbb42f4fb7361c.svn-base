package com.knight.emms.dao.impl;

import java.util.List;
import java.util.Map;

import com.knight.core.script.SqlScriptBuilder;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.ReceiveManageDao;
import com.knight.emms.model.ReceiveManage;

public class ReceiveManageDaoImpl extends BaseBusinessModelDaoImpl<ReceiveManage> implements ReceiveManageDao {

	public List<Map<String, Object>> queryExistPickup(ReceiveManage receiveManage) {
		String sql = SqlScriptBuilder.get("pickup.component_not_unused");
		return this.jdbcTemplate.queryForList(sql, receiveManage.getReceiveId());
	}
}
