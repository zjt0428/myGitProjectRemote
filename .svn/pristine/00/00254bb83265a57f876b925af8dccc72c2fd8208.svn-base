/**
 *====================================================
 * 文件名称: ComponDiaryDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.List;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.model.ComponDiary;

/**
 * @ClassName: ComponDiaryDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-20 上午8:01:40
 */
public class ComponDiaryDaoImpl extends BaseLongPKDaoImpl<ComponDiary> implements ComponDiaryDao {

	public ComponDiary getByrelateItem(Long relateComponId, Long relateId, String relateModule) {
		String hql = "from ComponDiary cd where cd.businessComponId = ? and cd.businessId = ? and cd.businessModule = ?";
		List<ComponDiary> cds = findByHql(hql, new Object[] { relateComponId, relateId, relateModule });
		if (cds.isEmpty()) {
			return null;
		}
		return cds.get(0);
	}

}
