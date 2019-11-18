/**
 *====================================================
 * 文件名称: InventoryService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.Inventory;

/**
 * @ClassName: InventoryService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-26 下午10:02:50
 */
public interface InventoryService extends BaseBusinessModelService<Inventory> {

	public Inventory getTranslateFull(Long inventoryId);

	public void saveOrMerge(Inventory inventory);

	public void deleteCategory(Long invCategoryId);

	public Collection<Map<String, Object>> calculateCategory(String category, Date startTime, Date endTime);

}
