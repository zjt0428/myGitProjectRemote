/**
 *====================================================
 * 文件名称: EquipWarehouseService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.ComponIntoStore;
import com.knight.emms.model.EquipWarehouse;

/**
 * @ClassName: EquipWarehouseService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午10:48:52
 */
public interface ComponIntoStoreService extends BusinessFlowService<ComponIntoStore> {

	public List<ComponIntoStore> queryTranslateAllFull(QueryFilter filter);

	public ComponIntoStore getTranslateFull(Long rowId);

	public void delete(Long rowId);

}
