/**
 *====================================================
 * 文件名称: AccidentReportService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.AccidentReport;

/**
 * @ClassName: AccidentReportService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:50:52
 */
public interface AccidentReportService extends BaseBusinessModelService<AccidentReport> {

	public void saveOrUpdate(AccidentReport accidentReport);

	public List<AccidentReport> queryTranslateAllFull(QueryFilter filter);

	public AccidentReport getTranslateFull(Long accidentReportId);

	public void delete(Long accidentReportId);

}
