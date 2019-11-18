/**
 *====================================================
 * 文件名称: SalaryDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import com.knight.core.script.SqlScriptBuilder;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.SalaryDao;
import com.knight.emms.model.Salary;

/**
 * @ClassName: SalaryDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:21:36
 */
public class SalaryDaoImpl extends BaseBusinessModelDaoImpl<Salary> implements SalaryDao {

	public void updatePractiReward(Salary salary) {
		String sql = SqlScriptBuilder.get("fund.update_unpickup_reward");
		this.jdbcTemplate.update(sql, salary.getDeductPassDate(), salary.getSalaryId());
		sql = SqlScriptBuilder.get("fund.update_unpickup");
		this.jdbcTemplate.update(sql, salary.getSalaryId(), salary.getDeductPassDate());
	}

}
