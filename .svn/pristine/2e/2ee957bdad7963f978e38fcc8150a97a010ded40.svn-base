/**
 *====================================================
 * 文件名称: LogisticsTransportService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-22			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.emms.model.LogisticsTransport;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: LogisticsTransportService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-22 下午9:42:43
 */
public interface LogisticsTransportService extends BusinessLongPKService<LogisticsTransport> {

	public LogisticsTransport getTranslateFull(Long transportId);

	public void deletedTrandetail(Long trandetailId);
	
	public void deletedDestribution(Long trandetailId);
	
	public void deletedTranDestribution(Long trandetailId);

	public void received(LogisticsTransport logisticsTransport);

	public void saveOrMergeForEdit(LogisticsTransport logisticsTransport);

	public void deletedTrancarfee(Long trancarfeeId);
	
//	public void createEquipActivate(LogisticsTransport logisticsTransport);

}
