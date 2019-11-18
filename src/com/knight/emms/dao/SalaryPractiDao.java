/**
 *====================================================
 * 文件名称: SalaryPractiDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao;

import java.util.List;
import java.util.Map;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.emms.model.SalaryPracti;

/**
 * @ClassName: SalaryPractiDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:18:29
 */
public interface SalaryPractiDao extends BaseLongPKDao<SalaryPracti> {

	List<SalaryPracti> queryMonthSalary(String salaryMonth);

	List<Map<String, Object>> findPractiSalaryByMonth(String salaryMonth);

}
