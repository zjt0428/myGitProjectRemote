/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseLongPKDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.dao.impl;

import com.knight.core.dao.BaseLongPKDao;

/**
 * <T> 基础表类，对于主键为long类型　，则直接继承该类，若主键为其他类型，需要直接继承GenericDaoImpl
 * @ClassName:BaseLongPKDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:50:44
 * @since JDK Version 1.5
 */
public class BaseLongPKDaoImpl<T> extends GenericDaoImpl<T, Long> implements BaseLongPKDao<T> {

}
