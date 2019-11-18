/**
 *====================================================
 * 文件名称: EquipDetectService.java
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
import com.knight.emms.model.EquipDetect;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: EquipDetectService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:18:18
 */
public interface EquipDetectService extends BusinessLongPKService<EquipDetect>, ExportService {

	public List<EquipDetect> queryTranslateAllFull(QueryFilter filter);

	public EquipDetect getTranslateFull(Long detectId);

	public void saveOrUpdate(EquipDetect equipDetect);

}
