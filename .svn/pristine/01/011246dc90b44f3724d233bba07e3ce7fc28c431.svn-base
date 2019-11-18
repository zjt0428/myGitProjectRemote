/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppFunctionServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.system.dao.AppFunctionDao;
import com.knight.system.model.AppFunction;
import com.knight.system.service.AppFunctionService;

/**
 * 
 * @ClassName:AppFunctionServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:00:16
 * @since JDK Version 1.5
 */
public class AppFunctionServiceImpl extends BaseLongPKServiceImpl<AppFunction> implements AppFunctionService {

	private AppFunctionDao dao;

	public AppFunctionServiceImpl(AppFunctionDao dao) {
		super(dao);
		this.dao = dao;
	}

	public AppFunction getByKey(String key) {
		return this.dao.getByKey(key);
	}

}
