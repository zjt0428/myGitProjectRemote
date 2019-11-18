/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserKeyDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.dao.BaseHibernateDao;
import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.system.dao.AppUserKeyDao;
import com.knight.system.model.AppUserKey;

/**
 * @ClassName: AppUserKeyDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-2 下午2:31:17
 */
public class AppUserKeyDaoImpl extends BaseLongPKDaoImpl<AppUserKey> implements AppUserKeyDao {

	@Resource
	private BaseHibernateDao baseHibernateDao;

	public AppUserKey queryAppUserKey(Long userId, String keySeral) {
		String hql = "from AppUserKey as ak where ak.userId = ? and ak.keySerial = ?";
		List<AppUserKey> list = this.findByHql(hql, new Object[] { userId, keySeral });
		if (list.isEmpty()) {
			return null;
		}
		return list.get(0);
	}

	public AppUserKey existAppUserKey(AppUserKey appUserKey) {
		String hql = "from AppUserKey as ak where ak.userId = ? and ak.keySerial = ?";
		List<AppUserKey> list = this.findByHql(hql, new Object[] { appUserKey.getUserId(), appUserKey.getKeySerial() });
		if (list.isEmpty()) {
			return null;
		}
		return list.get(0);
	}

	public void remove(Long keyid) {
		String hql = "delete from AppUserKey as ak where ak.keyid = ?";
		baseHibernateDao.update(hql, new Object[] { keyid });
	}

}
