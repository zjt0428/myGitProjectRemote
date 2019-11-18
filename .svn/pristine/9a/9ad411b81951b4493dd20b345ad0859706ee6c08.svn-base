/**
 *====================================================
 * 文件名称: BusinessMessageServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;

import com.knight.emms.constant.Status;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: BusinessMessageServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午2:29:20
 */
public class BusinessMessageServiceImpl extends BusinessLongPKServiceImpl<BusinessMessage> implements BusinessMessageService {

    private String openurl ;
    private String account ;
    private String enterprise ;
    private String authkey;
    private int cgid ;
    private int csid ;

	private BusinessMessageDao businessMessageDao;

	public BusinessMessageServiceImpl(BusinessMessageDao dao) {
		super(dao);
		this.businessMessageDao = dao;
	}

	public void initialzeAccount() {
        openurl = openurl==null?(String) ApplicationContainer.getSystemParam("sms.openurl"):openurl;
        account = account==null?(String) ApplicationContainer.getSystemParam("sms.account"):account;
        enterprise = enterprise==null?(String) ApplicationContainer.getSystemParam("sms.enterprise"):enterprise;
        authkey = authkey==null?(String) ApplicationContainer.getSystemParam("sms.authkey"):authkey;
		cgid = (Integer) ApplicationContainer.getSystemParam("sms.cgid")==null?0:(Integer) ApplicationContainer.getSystemParam("sms.cgid");
		csid = (Integer) ApplicationContainer.getSystemParam("sms.csid")==null?0:(Integer) ApplicationContainer.getSystemParam("sms.csid");
		OpenApi.initialzeAccount(openurl, account, enterprise, authkey, cgid, csid);
	}

	public int sendOnce(BusinessMessage message) {
        initialzeAccount();
		int result = 1;
		try {
			result = OpenApi.sendOnce(message.getReceiveTel(), message.getMessage());
		} catch (Exception e) {
			logger.error("", e);
			result = 99;
		}
        message.setCreateTime(new Date());
		message.setSendTime(new Date());
		message.setSendFlag(result == 1 ? Status.SMS.sendSuccess : Status.SMS.sendFail);
		message.setReplyCode(result + "");
		businessMessageDao.save(message);
		return result;
	}
}
