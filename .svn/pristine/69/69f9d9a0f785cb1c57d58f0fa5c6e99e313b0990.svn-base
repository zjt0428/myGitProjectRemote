/**
 *====================================================
 * 文件名称: SalaryPractiDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;
import java.util.Map;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.SalaryPractiDao;
import com.knight.emms.model.SalaryPracti;

/**
 * @ClassName: SalaryPractiDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:21:55
 */
public class SalaryPractiDaoImpl extends BaseLongPKDaoImpl<SalaryPracti> implements SalaryPractiDao {

	public List<SalaryPracti> queryMonthSalary(String salaryMonth) {
		String hql = "select sp from Salary s, SalaryPracti sp where s.monthId = ? and s.applyforState = '3' and sp.salaryId = s.salaryId";
		return findByHql(hql, new Object[] { Integer.parseInt(salaryMonth.replaceAll("[^0-9]", "")) });
	}

	public List<Map<String, Object>> findPractiSalaryByMonth(String salaryMonth) {
		String sql = "SELECT SP.* FROM T_SALARY_PRACTI SP, T_SALARY S WHERE SP.SALARY_ID = S.SALARY_ID AND S.APPLYFOR_STATE = '3' AND S.MONTH_ID = ?";
		return this.jdbcTemplate.queryForList(sql, Integer.parseInt(salaryMonth));
	}

}
