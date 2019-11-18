/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SysConfigServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.util.HashMap;
import java.util.Map;

import lombok.Setter;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.system.dao.SysConfigDao;
import com.knight.system.domain.SysConfigDomain;
import com.knight.system.model.SysConfig;
import com.knight.system.service.SysConfigService;

/**
 * @ClassName:SysConfigServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:00:49
 * @since JDK Version 1.5
 */
public class SysConfigServiceImpl extends BaseLongPKServiceImpl<SysConfig> implements SysConfigService {

	private SysConfigDao sysConfigDao;

	@Setter
	private Map<String, SysConfigDomain> sysConfigDomains = new HashMap<String, SysConfigDomain>(0);

	public SysConfigServiceImpl(SysConfigDao dao) {
		super(dao);
		this.sysConfigDao = dao;
	}

	public SysConfig findByKey(String key) {
		return this.sysConfigDao.findByKey(key);
	}

	public void relevancy(SysConfig conf) {
		SysConfigDomain sysConfigDomain = sysConfigDomains.get(conf.getConfigKey());
		if (sysConfigDomain != null) {
			sysConfigDomain.systemConfigureRelevancy(conf);
		}
		this.sysConfigDao.save(conf);
	}

}
