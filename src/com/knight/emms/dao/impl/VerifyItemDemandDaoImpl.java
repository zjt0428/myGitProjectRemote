/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyItemDemandDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;
import java.util.Map;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.core.filter.QueryFilter;
import com.knight.core.filter.command.CriteriaCommand;
import com.knight.core.filter.command.FieldCommandImpl;
import com.knight.core.script.SqlScriptBuilder;
import com.knight.emms.dao.VerifyItemDemandDao;
import com.knight.emms.model.VerifyItemDemand;

/**
 * @ClassName: VerifyItemDemandDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-6 下午2:25:39
 */
public class VerifyItemDemandDaoImpl extends BaseLongPKDaoImpl<VerifyItemDemand> implements VerifyItemDemandDao {

	public List<Map<String, Object>> queryDemand(QueryFilter queryFilter) {
		String selectorDemand = SqlScriptBuilder.get("verify.vefify_demand");
		StringBuffer sb = new StringBuffer(selectorDemand);
		for (int i = 0; i < queryFilter.getCommands().size(); ++i) {
			CriteriaCommand command = (CriteriaCommand) queryFilter.getCommands().get(i);
			if (command instanceof FieldCommandImpl) {
				sb.append(" AND ").append(((FieldCommandImpl) command).getPartHql());
			}
		}
		Object[] params = queryFilter.getParamValues().toArray();
		String sql = getCountString(sb.toString());
		queryFilter.getPagingBean().setTotalItems(jdbcTemplate.queryForInt(sql, params));
		sql = getLimitString(sb.toString(), queryFilter.getPagingBean().getStart(), queryFilter.getPagingBean().getPageSize());
		return jdbcTemplate.queryForList(sql, params);
	}

}
