/**
 *====================================================
 * 文件名称: EquipmentService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;
import java.util.Map;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: EquipmentService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午11:23:27
 */
public interface EquipmentService extends BaseBusinessModelService<Equipment>, ExportService {

	public Equipment getTranslateFull(Long equipId);

	public void removeAffiliated(Long affiliatedId);

	public void saveCreate(Equipment equipment);

	public void saveUpload(List<Equipment> equipmentList);

	public void refresh();

	public List<Map<String, Object>> queryDistributeMapInfo(QueryFilter filter);
	
	public List<Equipment> getEquipment();

	public void bindingDepartmentPermission(Equipment equipment);
	
	public void changeEquip(Equipment equip);

	public void serialExists(Equipment equipment);
}
