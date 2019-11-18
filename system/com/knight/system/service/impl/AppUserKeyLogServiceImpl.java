/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserKeyLogServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.system.dao.AppUserKeyLogDao;
import com.knight.system.model.AppUserKeyLog;
import com.knight.system.service.AppUserKeyLogService;

/**
 * @ClassName: AppUserKeyLogServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-2 下午3:10:57
 */
public class AppUserKeyLogServiceImpl extends BaseLongPKServiceImpl<AppUserKeyLog> implements AppUserKeyLogService {

	public AppUserKeyLogServiceImpl(AppUserKeyLogDao dao) {
		super(dao);
	}

}
