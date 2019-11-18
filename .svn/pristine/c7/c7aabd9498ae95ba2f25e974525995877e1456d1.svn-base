/**
 *====================================================
 * 文件名称: EquipBlockupService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.EquipBlockup;

/**
 * @ClassName: EquipBlockupService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-23 上午7:07:13
 */
public interface EquipBlockupService extends BaseBusinessModelService<EquipBlockup> {

	public List<EquipBlockup> queryTranslateAllFull(QueryFilter filter);

	public EquipBlockup getTranslateFull(Long blockupId);

	public void saveOrUpdate(EquipBlockup equipBlockup);

	public void activate(Long blockupId, String reactivateDate);

	public void effective(EquipBlockup equipBlockup);

	public void loseEffective(EquipBlockup equipBlockup);

}
