/**
 *====================================================
 * 文件名称: EquipDismantleService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.MaterialsRepair;

/**
 * @ClassName: EquipDismantleService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:27:43
 */
public interface MaterialsRepairService extends BusinessFlowService<MaterialsRepair>, ExportService {

	void deleteBefore(Long beforeRepairId);
	
	void deleteAfter(Long afterRepairId);

	void addMaterialsIn(MaterialsRepair materialsRepair);

	void addMaterialsOut(MaterialsRepair materialsRepair);
}
