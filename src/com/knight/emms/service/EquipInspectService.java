/**
 *====================================================
 * 文件名称: EquipInspectService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.app.core.service.RemindModuleService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.EquipInspect;

/**
 * @ClassName: EquipInspectService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:28:24
 */
public interface EquipInspectService extends BusinessFlowService<EquipInspect>, ExportService,RemindModuleService<EquipInspect> {

	public void submit(Long inspectId);

	public EquipInspect getTranslateFull(Long inspectId);

	public void saveUpload(List<EquipInspect> list);

	public void clean(Long inspectId);

	public void deleteDetail(Long detailId);
	
	public void deleteCost(Long costInspectId);

	public boolean immediate(EquipInspect inspect);

	public List<EquipInspect> queryWaitInspect(QueryFilter filter, String keyword);
	
	public List<EquipInspect> queryTranslateAllFull(QueryFilter filter);

}
