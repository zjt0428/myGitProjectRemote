/**
 *====================================================
 * 文件名称: EquipVerifyService.java
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
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.EquipVerify;
import com.knight.system.service.BusinessLongPKService;

/**
 * @ClassName: EquipVerifyService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:29:27
 */
public interface EquipVerifyService extends BusinessLongPKService<EquipVerify>, ExportService {

	public List<EquipVerify> queryTranslateAllFull(QueryFilter filter);

	public EquipVerify getTranslateFull(Long verifyId);

	public void saveOrUpdate(EquipVerify equipVerify);
	
	public void effective(EquipVerify equipVerify);

}
