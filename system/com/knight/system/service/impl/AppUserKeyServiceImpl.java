/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserKeyServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.system.dao.AppUserKeyDao;
import com.knight.system.domain.AppUserExtendKeyDomain;
import com.knight.system.model.AppUserKey;
import com.knight.system.model.AppUserKeyExtend;
import com.knight.system.service.AppUserKeyService;

/**
 * @ClassName: AppUserKeyServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-2 下午2:33:05
 */
public class AppUserKeyServiceImpl extends BaseLongPKServiceImpl<AppUserKey> implements AppUserKeyService {

	private AppUserKeyDao appUserKeyDao;

	@Setter
	private Map<String, AppUserExtendKeyDomain> appUserExtendKeyDomains = new HashMap<String, AppUserExtendKeyDomain>();

	public AppUserKeyServiceImpl(AppUserKeyDao dao) {
		super(dao);
		this.appUserKeyDao = dao;
	}

	public List<AppUserKey> queryExportData(QueryFilter filter) {
		return appUserKeyDao.getAll(filter);
	}

	public AppUserKey queryAppUserKey(Long userId, String keySeral) {
		return appUserKeyDao.queryAppUserKey(userId, keySeral);
	}

	public AppUserKey existAppUserKey(AppUserKey appUserKey) {
		return appUserKeyDao.existAppUserKey(appUserKey);
	}

	public void loadAppUserKeyExtends(AppUserKey appUserKey) {
		for (AppUserKeyExtend auke : appUserKey.getAppUserKeyExtendSet()) {
			AppUserExtendKeyDomain extendDomain = appUserExtendKeyDomains.get(auke.getForeignModule());
			if (extendDomain == null) {
				continue;
			}
			AppUserKeyExtend extend = extendDomain.loadAppUserKeyExtend(auke);
			if (extend != null) {
				appUserKey.getAppUserKeyExtends().put(auke.getForeignModule(), extend);
			}
		}
	}

	public void saveOrMerge(AppUserKey appUserKey) {
		if (appUserKey.getKeyId() == null) {
			appUserKeyDao.save(appUserKey);
		} else {
			appUserKeyDao.merge(appUserKey);
		}
		for (AppUserKeyExtend auke : appUserKey.getAppUserKeyExtendSet()) {
			AppUserExtendKeyDomain extendDomain = appUserExtendKeyDomains.get(auke.getForeignModule());
			if (extendDomain == null) {
				continue;
			}
			extendDomain.saveOrUpdateAppUserKeyExtend(auke);
		}
	}

}
