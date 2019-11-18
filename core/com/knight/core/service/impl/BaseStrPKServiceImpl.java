/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2011 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseStrPKServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-4-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.service.impl;

import com.knight.core.dao.GenericDao;
import com.knight.core.service.BaseStrPKService;

/**
 * @ClassName:BaseStrPKServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:52:35
 * @since JDK Version 1.5
 */
public class BaseStrPKServiceImpl<T> extends GenericServiceImpl<T, String> implements BaseStrPKService<T> {

	public BaseStrPKServiceImpl(GenericDao<T, String> dao) {
		super(dao);
	}

}
