/**
 *====================================================
 * 文件名称: DispatchEquipDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.DispatchEquipDao;
import com.knight.emms.model.DispatchEquip;

/**
 * @ClassName: DispatchEquipDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:31:58
 */
public class DispatchEquipDaoImpl extends BaseLongPKDaoImpl<DispatchEquip> implements DispatchEquipDao {

	public DispatchEquip findDispatchUnDismantleEquip(Long dispatchId) {
		String hql = "from DispatchEquip de where de.dispatchId = ? and de.workStatus < '2'";
		List<DispatchEquip> des = findByHql(hql, new Object[] { dispatchId });
		if (des.isEmpty()) {
			return null;
		}
		return des.get(0);
	}
}
