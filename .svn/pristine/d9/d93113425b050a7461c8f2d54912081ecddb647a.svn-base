/**
 *====================================================
 * 文件名称: AppUserSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年11月5日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.application;

import com.knight.system.model.AppUser;

/**
 * @ClassName: AppUserSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年11月5日 上午10:07:54
 */
public class AppUserSupport {

	public static Object[] syncAppsUserInfo(String method, AppUser user) {
		Object[] params = new Object[19];
		if ("SYSUSER_SAVE".equals(method)) {
			params[0] = user.getUserId();
			params[1] = user.getUsername();
			params[2] = user.getPassword();
			params[3] = user.getFullname();
			params[4] = user.getEmail();
			params[5] = user.getPhone();
			params[6] = user.getMobile();
			params[7] = user.getAddress();
			params[8] = user.getZip();
			params[9] = user.getSex();
			params[10] = user.getStatus();
			params[11] = user.getDelFlag();
			params[12] = ApplicationContainer.getSystemParam("sitUrl");
			params[13] = user.getQq();
			params[14] = 0;
			params[15] = user.getPosition();
			params[16] = ApplicationContainer.getSystemParam("companyName");
			params[17] = ApplicationContainer.getSystemParam("companyType");
			params[18] = ApplicationContainer.getSystemParam("companyAddress");
		} else {
			params[0] = user.getUserId();
			params[1] = ApplicationContainer.getSystemParam("sitUrl");
			params[2] = user.getUsername();
			params[3] = user.getPassword();
			params[4] = user.getFullname();
			params[5] = user.getEmail();
			params[6] = user.getPhone();
			params[7] = user.getMobile();
			params[8] = user.getAddress();
			params[9] = user.getZip();
			params[10] = user.getSex();
			params[11] = user.getStatus();
			params[12] = user.getDelFlag();
			params[13] = user.getQq();
			params[14] = 0;
			params[15] = user.getPosition();
			params[16] = ApplicationContainer.getSystemParam("companyName");
			params[17] = ApplicationContainer.getSystemParam("companyType");
			params[18] = ApplicationContainer.getSystemParam("companyAddress");
		}
		return params;
	}

	public static Object[] syncAppsUserPassword(AppUser user) {
		Object[] params = new Object[19];
		params[0] = user.getUserId();
		params[1] = ApplicationContainer.getSystemParam("sitUrl");
		params[2] = user.getPassword();
		return params;
	}

}
