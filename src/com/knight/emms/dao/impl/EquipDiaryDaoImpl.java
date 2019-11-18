/**
 *====================================================
 * 文件名称: EquipDiaryDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.model.EquipDiary;

/**
 * @ClassName: EquipDiaryDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:25:47
 */
public class EquipDiaryDaoImpl extends BaseLongPKDaoImpl<EquipDiary> implements EquipDiaryDao {

	public List<EquipDiary> queryRelationEquipmentDiary(EquipDiary diary) {
		String hql = "from EquipDiary d where d.relateId = ? and d.relateModule = ?";
		return findByHql(hql, new Object[] { diary.getRelateId(), diary.getRelateModule() });
	}

	public EquipDiary getByrelateItem(Long relateEquipId, Long relateId, String relateModule) {
		String hql = "from EquipDiary ed where ed.businessEquipId = ? and ed.businessId = ? and ed.businessModule = ?";
		List<EquipDiary> eds = findByHql(hql, new Object[] { relateEquipId, relateId, relateModule });
		if (eds.isEmpty()) {
			return null;
		}
		return eds.get(0);
	}

}
