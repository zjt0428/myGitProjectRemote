/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserExtendServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.system.dao.AppUserExtendDao;
import com.knight.system.model.AppUserExtend;
import com.knight.system.service.AppUserExtendService;

/**
 * @ClassName: AppUserExtendServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-3 下午5:38:38
 */
public class AppUserExtendServiceImpl extends BaseLongPKServiceImpl<AppUserExtend> implements AppUserExtendService {

	private AppUserExtendDao appUserExtendDao;

	public AppUserExtendServiceImpl(AppUserExtendDao dao) {
		super(dao);
		this.appUserExtendDao = dao;
	}

	public boolean isExistByModule(AppUserExtend appUserExtend) {
		AppUserExtend extend = appUserExtendDao.findByUserModule(appUserExtend);
		if (extend != null) {
			if (!extend.getForeignId().equals(appUserExtend.getForeignId())) {
				return true;
			}
		}
		return false;
	}

	public void saveByModule(AppUserExtend appUserExtend) {
		AppUserExtend extend = appUserExtendDao.findByForeigeModule(appUserExtend);
		if (extend != null) {
			if (!extend.getUserId().equals(appUserExtend.getUserId())) {
				extend.setUserId(appUserExtend.getUserId());
				appUserExtendDao.save(extend);
			}
			return;
		}
		appUserExtendDao.save(appUserExtend);
	}

	public void removeByModule(AppUserExtend appUserExtend) {
		AppUserExtend extend = appUserExtendDao.findByForeigeModule(appUserExtend);
		if (extend != null) {
			appUserExtendDao.remove(extend);
		}
	}

}
