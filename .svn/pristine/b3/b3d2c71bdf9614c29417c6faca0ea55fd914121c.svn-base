/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: InMessageDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao;

import java.util.List;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.system.model.InMessage;

/**
 * @ClassName:InMessageDao
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 上午11:21:49
 * @since JDK Version 1.5
 */
public interface InMessageDao extends BaseLongPKDao<InMessage> {

	/** 查询用户未读取的消息数量 */
	public Integer findByReadFlag(Long userId);

	/** 查询用户未读取的消息 */
	public List<InMessage> findByRead(Long userId);

}
