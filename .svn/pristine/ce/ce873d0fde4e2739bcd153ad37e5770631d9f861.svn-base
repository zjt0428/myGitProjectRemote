/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SysConfigDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.dao.impl;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.system.dao.SysConfigDao;
import com.knight.system.model.SysConfig;

/**
 * @ClassName:SysConfigDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:59:20
 * @since JDK Version 1.5
 */
@Slf4j
public class SysConfigDaoImpl extends BaseLongPKDaoImpl<SysConfig> implements SysConfigDao {

	public SysConfig findByKey(String key) {
		String hql = "from SysConfig vo where vo.configKey = ?";
		Object[] objs = { key };
		List<SysConfig> list = findByHql(hql, objs);
		if (list.isEmpty()) {
			logger.error("系统未配置[" + key + "]参数!");
			return null;
		}
		return list.get(0);
	}

}
