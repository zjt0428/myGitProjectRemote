/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: LogAspect.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.logger;

import java.lang.reflect.Method;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import lombok.extern.slf4j.Slf4j;

import org.apache.struts2.ServletActionContext;

import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.SystemLog;
import com.knight.system.service.SystemLogService;

/**
 * @ClassName:LogAspect
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-29 下午4:15:23
 * @since JDK Version 1.5
 */
@Slf4j
public class LogAspect {

	@Resource
	private SystemLogService systemLogService;

	public void doSystemLog(Method method) {
		HttpServletRequest req = ServletActionContext.getRequest();
		boolean hasAnnotation = method.isAnnotationPresent(ActionLog.class);
		if (hasAnnotation) {
			ActionLog annotation = (ActionLog) method.getAnnotation(ActionLog.class);
			String description = annotation.description();
			log.debug("Action method:" + method.getName() + " Description:" + description);
			SystemLog sysLog = new SystemLog();
			sysLog.setUserIp(req.getRemoteAddr());
			sysLog.setDescription(description);
			String clazzName = method.getDeclaringClass().getName();
			sysLog.setOperatPath(clazzName.substring(clazzName.lastIndexOf("."), clazzName.length()) + "." + method.getName());
			String r = GsonUtil.toJson(req.getParameterMap()).replace("\\\"", "").replace("\"", "").replaceAll("\\[", "").replaceAll("]", "");
			sysLog.setRemark(r.length() > 3000 ? r.substring(0, 3000) : r);
			AppUser appUser = ApplicationContainer.getCurrentUser();
			if (appUser != null) {
				sysLog.setUserId(appUser.getUserId());
				sysLog.setUsername(appUser.getFullname());
			}
			try {
				systemLogService.save(sysLog);
			} catch (Exception ex) {
				log.error(ex.getMessage());
			}
		}
	}

}
