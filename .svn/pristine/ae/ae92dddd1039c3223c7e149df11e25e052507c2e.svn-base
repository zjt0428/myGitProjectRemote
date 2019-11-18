/**
 *====================================================
 * 文件名称: EquipDiaryDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao;

import java.util.List;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.emms.model.EquipDiary;

/**
 * @ClassName: EquipDiaryDao
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:22:20
 */
public interface EquipDiaryDao extends BaseLongPKDao<EquipDiary> {

	public List<EquipDiary> queryRelationEquipmentDiary(EquipDiary diary);

	/**
	 * 关联业务的设备工作日历(关联业务不允许对同一台设备多次引用)
	 * @param relateEquipId
	 * @param relateId
	 * @param relateModule
	 * @return
	 */
	public EquipDiary getByrelateItem(Long relateEquipId, Long relateId, String relateModule);

}
