/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserExtendKeyDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-6-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.domain;

import com.knight.system.model.AppUserKeyExtend;

/**
 * @ClassName: AppUserExtendKeyDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-6-23 上午11:28:48
 */
public interface AppUserExtendKeyDomain {

	public AppUserKeyExtend loadAppUserKeyExtend(AppUserKeyExtend appUserKeyExtend);

	public void saveOrUpdateAppUserKeyExtend(AppUserKeyExtend appUserKeyExtend);

}
