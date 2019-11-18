/**
 *====================================================
 * 文件名称: EquipHitchService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.EquipHitch;

/**
 * @ClassName: EquipHitchService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午10:59:46
 */
public interface EquipHitchService extends BusinessFlowService<EquipHitch>, ExportService {

	/**
	 * 生成故障单
	 * @param relateId 关联业务ID
	 * @param relateSerial 关联业务编号
	 * @param relateModule 关联业务模块
	 * @param projectId
	 * @param equipId
	 * @param spendDate
	 * @param hitchResult
	 * @param description
	 */
	public void createRelateHitch(Long relateId, String relateSerial, String relateModule, Long projectId, Long equipId, String spendDate, String hitchResult, String description, String location, String content);

}
