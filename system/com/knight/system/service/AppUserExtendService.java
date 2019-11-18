/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserExtendService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service;

import com.knight.core.service.BaseLongPKService;
import com.knight.system.model.AppUserExtend;

/**
 * @ClassName: AppUserExtendService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-3 下午5:38:23
 */
public interface AppUserExtendService extends BaseLongPKService<AppUserExtend> {

	public boolean isExistByModule(AppUserExtend appUserExtend);

	public void saveByModule(AppUserExtend appUserExtend);

	public void removeByModule(AppUserExtend appUserExtend);

}
