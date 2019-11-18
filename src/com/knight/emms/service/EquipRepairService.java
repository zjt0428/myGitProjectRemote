/**
 *====================================================
 * 文件名称: EquipRepairService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.EquipRepair;

/**
 * @ClassName: EquipRepairService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:00:53
 */
public interface EquipRepairService extends BusinessFlowService<EquipRepair>, ExportService {

	public List<EquipRepair> queryTranslateAllFull(QueryFilter filter);

	public EquipRepair getTranslateFull(Long repairId);

}
