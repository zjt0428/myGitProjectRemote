/**
 *====================================================
 * 文件名称: SalaryService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;
import java.util.Map;

import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.Salary;
import com.knight.emms.model.SalaryPracti;

/**
 * @ClassName: SalaryService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:24:52
 */
public interface SalaryService extends BusinessFlowService<Salary> {

	public Salary getTranslateFull(Long salaryId);

	public void deletedPracti(Long salaryPractiId);

	public Map<Long, SalaryPracti> loadPreMonthSalary(String salaryMonth);

	public List<Map<String, Object>> findPractiSalaryByMonth(String salaryMonth);

}
