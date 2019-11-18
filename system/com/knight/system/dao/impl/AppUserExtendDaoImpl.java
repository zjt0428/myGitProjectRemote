/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserExtendDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao.impl;

import java.util.List;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.system.dao.AppUserExtendDao;
import com.knight.system.model.AppUserExtend;

/**
 * @ClassName: AppUserExtendDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-3 下午5:35:47
 */
public class AppUserExtendDaoImpl extends BaseLongPKDaoImpl<AppUserExtend> implements AppUserExtendDao {

	public AppUserExtend findByUserModule(AppUserExtend appUserExtend) {
		String hql = "from com.knight.system.model.AppUserExtend aue where aue.foreignModule = ? and aue.userId = ?";
		List<AppUserExtend> list = findByHql(hql, new Object[] { appUserExtend.getForeignModule(), appUserExtend.getUserId() });
		if (list.isEmpty()) {
			return null;
		}
		return list.get(0);
	}

	public AppUserExtend findByForeigeModule(AppUserExtend appUserExtend) {
		String hql = "from com.knight.system.model.AppUserExtend aue where aue.foreignModule = ? and aue.foreignId = ?";
		List<AppUserExtend> list = findByHql(hql, new Object[] { appUserExtend.getForeignModule(), appUserExtend.getForeignId() });
		if (list.isEmpty()) {
			return null;
		}
		return list.get(0);
	}

}
