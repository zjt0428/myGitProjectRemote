/**
 *====================================================
 * 文件名称: AnnounceCategoryDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import java.util.Set;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.emms.dao.AnnounceCategoryDao;
import com.knight.emms.model.AnnounceCategory;

/**
 * @ClassName: AnnounceCategoryDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:43:16
 */
public class AnnounceCategoryDaoImpl extends BaseLongPKDaoImpl<AnnounceCategory> implements AnnounceCategoryDao {

	public void saveOrUpdate(Set<AnnounceCategory> announceCategorySet) {
		if (announceCategorySet == null) {
			return;
		}
		for (AnnounceCategory i : announceCategorySet) {
			if (i.getAnnounceCategoryId() == null) {
				super.save(i);
			} else {
				super.merge(i);
			}
		}

	}

}
