/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import com.knight.core.web.paging.PagingBean;
import com.knight.system.application.AppUserSupport;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.dao.AppUserDao;
import com.knight.system.domain.AppUserExtendDomain;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.model.AppUserExtend;
import com.knight.system.model.UserExtend;
import com.knight.system.service.AppUserService;
import com.knight.system.support.AppsUserClient;
import lombok.Setter;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;

import java.util.*;

/**
 * @ClassName:AppUserServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:00:25
 * @since JDK Version 1.5
 */
public class AppUserServiceImpl extends BusinessLongPKServiceImpl<AppUser> implements AppUserService {

	private AppUserDao appUserDao;

	@Setter
	private Map<String, AppUserExtendDomain> appUserExtendDomains = new HashMap<String, AppUserExtendDomain>();

	public AppUserServiceImpl(AppUserDao appUserDao) {
		super(appUserDao);
		this.appUserDao = appUserDao;
	}

	public void loadAppUserExtends(AppUser appUser) {
		for (AppUserExtend aue : appUser.getAppUserExtendSet()) {
			AppUserExtendDomain appUserExtendDomain = appUserExtendDomains.get(aue.getForeignModule());
			if (appUserExtendDomain == null) {
				continue;
			}
			UserExtend extend = appUserExtendDomain.loadAppUserExtend(aue);
			if (extend != null) {
				appUser.getAppUserExtends().put(aue.getForeignModule(), extend);
			}
		}
	}

	public AppUser findByUserName(String username) {
		AppUser appUser = appUserDao.findByUserName(username);
		CodeServiceImpl.translate(appUser, getPersistantStruct());
		return appUser;
	}

	public List<AppUser> findByDepartment(String path, PagingBean pb) {
		List<AppUser> appusers = this.appUserDao.findByDepartment(path, pb);
		CodeServiceImpl.translate(appusers, getPersistantStruct());
		return appusers;
	}

	public List<AppUser> findByRole(Long roleId, PagingBean pb) {
		return this.appUserDao.findByRole(roleId, pb);
	}

	public List<AppUser> findByRoleId(Long roleId) {
		return this.appUserDao.findByRole(roleId);
	}

	public List<AppUser> findByDepId(Long depId) {
		return this.appUserDao.findByDepId(depId);
	}

	private void syncAppUser(String methodName, AppUser user) {
		try {
			String serverUrl = (String) ApplicationContainer.getSystemParam("appAccessUrl");
			String serverNameSpace = "http://webService.rs.com";
			String response = AppsUserClient.callAppsUserService(serverUrl, serverNameSpace, methodName, AppUserSupport.syncAppsUserInfo(methodName, user));
			if (response != null) {
				JSONObject jsonObject = JSONObject.fromObject(response);
				String rtnvalue = jsonObject.getString("rtnvalue");
				if (!"1".equals(rtnvalue)) {
					throw new java.lang.IllegalArgumentException("总控用户信息操作失败");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new java.lang.IllegalArgumentException("总控用户信息同步操作失败");
		}
	}

	public AppUser save(AppUser user) {
		String methodName = "SYSUSER_UPDATE";
		if (user.getUserId() == null) {
			methodName = "SYSUSER_SAVE";
		}
		AppUser appUser = super.save(user);
//		syncAppUser(methodName, appUser);
		return appUser;
	}

	public AppUser merge(AppUser entity) {
		AppUser appUser = super.merge(entity);
//		syncAppUser("SYSUSER_UPDATE", appUser);
		return appUser;
	}

	public void update(AppUser entity) {
		super.update(entity);
//		syncAppUser("SYSUSER_UPDATE", entity);
	}

	@Override
	public AppUser addDataPermission(AppUser au, String permissionFlag) {
		if(StringUtils.isBlank(au.getDataPermission())) {
			au.setDataPermission(permissionFlag);
		}else {
			String[] dataPermissions = au.getDataPermission().split(",");
			for(String str : dataPermissions) {
				if(permissionFlag.startsWith(str)) {
					return au;
				}
			}
			au.setDataPermission(au.getDataPermission()+","+permissionFlag);
		}
		return au;
	}
	
	@Override
	public AppUser findByMobile(String mobile) {
		return this.appUserDao.findByMobile(mobile);
	}
	
	/**权限拼接*/
	private String jointPermission(AppUser currentUser, Set<String> set) {
		StringBuffer sb = new StringBuffer();
		for (Iterator<String> iterator = set.iterator(); iterator.hasNext();) {
			String str = (String) iterator.next();
			sb.append("d").append(str).append(",");
		}
		sb.append("s"+currentUser.getUserId()+"e");
		return sb.toString();
	}
	
	@Override
	public void getRoleDataPermission(AppUser currentUser) {
		Set<String> set1 = new HashSet<String>(0);
		Set<String> set2 = new HashSet<String>(0);
		Set<String> set3 = new HashSet<String>(0);
		for (AppRole role : currentUser.getRoles()) {		//权限去重
			if(StringUtils.isNotEmpty(role.getDataPermission())) {
				String[] items = role.getDataPermission().split("[,]");
				for (int i = 0; i < items.length; ++i) {
					if (!(set1.contains(items[i]))) {
						set1.add(items[i]);
					}
				}
			}
			if(StringUtils.isNotEmpty(role.getEquipPermission())) {
				String[] items = role.getEquipPermission().split("[,]");
				for (int i = 0; i < items.length; ++i) {
					if (!(set2.contains(items[i]))) {
						set2.add(items[i]);
					}
				}
			}
			if(StringUtils.isNotEmpty(role.getLabourPermission())) {
				String[] items = role.getLabourPermission().split("[,]");
				for (int i = 0; i < items.length; ++i) {
					if (!(set3.contains(items[i]))) {
						set3.add(items[i]);
					}
				}
			}
		}
		
		String sb1 = jointPermission(currentUser, set1);
		currentUser.setDataPermission(sb1);
		
		String sb2 = jointPermission(currentUser, set2);
		currentUser.setEquipPermission(sb2);
		
		String sb3 = jointPermission(currentUser, set3);
		currentUser.setLabourPermission(sb3);
	}

}
