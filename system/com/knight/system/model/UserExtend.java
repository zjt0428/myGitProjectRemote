/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: UserExtend.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.model;

import com.knight.core.model.BaseModel;

/**
 * @ClassName: UserExtend
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午1:05:09
 */
public abstract class UserExtend extends BaseModel {

	private static final long serialVersionUID = 1L;

	public abstract Long getUserId();

	public abstract Long getForeignId();

	public abstract String getForeignName();

	public abstract String getForeignModule();

}
