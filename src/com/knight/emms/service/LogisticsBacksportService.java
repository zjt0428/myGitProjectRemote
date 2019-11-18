/**
 *====================================================
 * 文件名称: LogisticsBacksportService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月5日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.emms.model.LogisticsBacksport;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: LogisticsBacksportService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月5日 下午8:20:51
 */
public interface LogisticsBacksportService extends BusinessLongPKService<LogisticsBacksport> {

	public LogisticsBacksport getTranslateFull(Long backsportId);

	public void deletedBackdetail(Long backdetailId);

	public void received(LogisticsBacksport logisticsBacksport);

	public void saveOrMergeForEdit(LogisticsBacksport logisticsBacksport);

	public void deletedBackcarfee(Long backcarfeeId);

}
