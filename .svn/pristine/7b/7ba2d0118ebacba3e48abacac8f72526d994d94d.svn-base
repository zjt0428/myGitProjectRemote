/**
 *====================================================
 * 文件名称: DeductScaleDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-21			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.DeductScaleDao;
import com.knight.emms.model.DeductScale;

/**
 * @ClassName: DeductScaleDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-21 下午9:06:13
 */
public class DeductScaleDaoImpl extends BaseLongPKDaoImpl<DeductScale> implements DeductScaleDao {

	public BigDecimal getPercent(BigDecimal deductBaseAmount) {
		String sql = "SELECT SCALE_PERCENT FROM T_DEDUCT_SCALE WHERE SCALE_START < ? AND SCALE_END > ? AND SCALE_TYPE = '1'";
		List<Map<String, Object>> result = this.jdbcTemplate.queryForList(sql, deductBaseAmount, deductBaseAmount);
		if (result.isEmpty() || result.get(0).get("SCALE_PERCENT") == null) {
			return BigDecimal.ZERO;
		}
		return (BigDecimal) result.get(0).get("SCALE_PERCENT");
	}

}
