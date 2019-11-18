/**
* 版权所有：厦门市巨龙软件工程有限公司
* Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
* All right reserved. 
*====================================================
* 文件名称: AppRoleService.java
* 修订记录：
* No    日期				作者(操作:具体内容)
* 1.    2010-12-26			chenxy(创建:创建文件)
*====================================================
* 类描述：(说明未实现或其它不应生成javadoc的内容)
* 
*/
package com.knight.system.service;

import java.util.Map;
import java.util.Set;

import com.knight.core.service.BaseLongPKService;
import com.knight.system.model.AppRole;

/**
 * 
 * @ClassName:AppRoleService
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:59:43
 * @since JDK Version 1.5
 */
public interface AppRoleService extends BaseLongPKService<AppRole> {
	
	public AppRole getByRoleName(String paramString);

	public Map<String, Set<String>> getSecurityDataSource();
	
}
