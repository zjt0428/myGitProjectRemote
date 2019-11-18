/**
 *====================================================
 * 文件名称: BusinessMessageDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import com.knight.app.core.service.AppMessagePushService;
import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.core.exception.BusinessWarningException;
import com.knight.core.exception.KnightException;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.system.dao.AppUserDao;
import com.knight.system.model.AppUser;
import groovy.util.logging.Slf4j;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @ClassName: BusinessMessageDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午2:28:17
 */
@Slf4j
public class BusinessMessageDaoImpl extends BaseLongPKDaoImpl<BusinessMessage> implements BusinessMessageDao {

	@Resource
	private AppUserDao appUserDao;

	@Resource
	private AppMessagePushService appMessagePushService;

	public BusinessMessage save(BusinessMessage paramT) {
		AppUser appUser = appUserDao.findByMobile(paramT.getReceiveTel());
		if (appUser != null) {
			if (appUser.getDeviceToken() != null) {
				logger.info("消息推送：" + paramT.getMessage());
				logger.info("消息推送detail：" + paramT.getDetail());
				String module = paramT.getModule()==null?"NONE":paramT.getModule();
				if (module.equals("REPAIR")||module.equals("CONSTRUCT")|| module.equals("OTHERS")) {
					appMessagePushService.sendAndroidUnicast(appUser.getDeviceToken(), "中塔在线-您有一条新消息",
							paramT.getSenderName(), paramT.getMessage());
					appMessagePushService.sendIOSUnicast(appUser.getDeviceToken(), "中塔在线-您有一条新消息",
							paramT.getSenderName(), paramT.getMessage());
				} else {
					appMessagePushService.sendAndroidUnicast(appUser.getDeviceToken(), "中塔在线-您有一条新消息",
							paramT.getSenderName(), paramT.getMessage(), paramT.getDetail(), module);
					appMessagePushService.sendIOSUnicast(appUser.getDeviceToken(), "中塔在线-您有一条新消息",
							paramT.getSenderName(), paramT.getMessage(), paramT.getDetail(), module);

				}
			} else {
				logger.info("消息推送:" + appUser.getFullname() + "未绑定手机设备");
			}
		}
		paramT.setCreateTime(new Date());
		paramT.setSendTime(new Date());
		paramT.setSendFlag(Status.SMS.sendWaiting);
		return super.save(paramT);
	}
}
