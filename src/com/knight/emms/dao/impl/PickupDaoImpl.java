/**
 *====================================================
 * 文件名称: PickupDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;
import java.util.Map;

import com.knight.core.script.SqlScriptBuilder;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.PickupDao;
import com.knight.emms.model.Pickup;

/**
 * @ClassName: PickupDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 上午8:34:49
 */
public class PickupDaoImpl extends BaseBusinessModelDaoImpl<Pickup> implements PickupDao {

	public List<Map<String, Object>> queryExistPickup(Pickup pickup) {
		String sql = SqlScriptBuilder.get("pickup.component_not_unused");
		return this.jdbcTemplate.queryForList(sql, pickup.getPickupId());
	}

}
