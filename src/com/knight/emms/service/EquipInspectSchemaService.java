/**
 *====================================================
 * 文件名称: EquipInspectSchemaService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Date;

import com.knight.emms.model.EquipInspectSchema;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: EquipInspectSchemaService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:00:06
 */
public interface EquipInspectSchemaService extends BusinessLongPKService<EquipInspectSchema> {

	public void saveOrUpdate(EquipInspectSchema equipInspectSchema);

	/** 生成巡检任务单 */
	public void createWaitEquipInspect(EquipInspectSchema equipInspectSchema);

	void caculateSchemaDate(EquipInspectSchema schema, String generatedOpportunity, Date dateTime);

}
