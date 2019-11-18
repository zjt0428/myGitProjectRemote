/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SecurityDataSource.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.security;

import java.util.Map;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

import com.knight.system.model.AppRole;
import com.knight.system.service.AppRoleService;

/**
 * @ClassName:SecurityDataSource
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:59:31
 * @since JDK Version 1.5
 */
public class SecurityDataSource {

	private AppRoleService appRoleService;

	@Getter
	@Setter
	private Set<String> anonymousUrls = null;

	@Getter
	@Setter
	private Set<String> publicUrls = null;

	@Getter
	@Setter
	private Set<String> matcherurls = null;

	public void setAppRoleService(AppRoleService appRoleService) {
		this.appRoleService = appRoleService;
	}

	public Map<String, Set<String>> getDataSource() {
		Map<String, Set<String>> tmap = this.appRoleService.getSecurityDataSource();
		tmap.put(AppRole.ROLE_ANONYMOUS, this.anonymousUrls);
		tmap.put(AppRole.ROLE_PUBLIC, this.publicUrls);
		tmap.put(AppRole.ROLE_PUBLIC_MATCHER, this.matcherurls);
		return tmap;
	}

}
