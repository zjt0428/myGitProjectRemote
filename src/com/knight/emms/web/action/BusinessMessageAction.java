/**
 *====================================================
 * 文件名称: BusinessMessageAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: BusinessMessageAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午2:29:57
 */
public class BusinessMessageAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private BusinessMessage businessMessage;

	@Setter
	@Getter
	private Long messageId;

	@Resource
	private BusinessMessageService businessMessageService;

	private void initialzeAccount() {
		String openurl = (String) ApplicationContainer.getSystemParam("sms.openurl");
		String account = (String) ApplicationContainer.getSystemParam("sms.account");
		String enterprise = (String) ApplicationContainer.getSystemParam("sms.enterprise");
		String authkey = (String) ApplicationContainer.getSystemParam("sms.authkey");
		int cgid = (Integer) ApplicationContainer.getSystemParam("sms.cgid");
		int csid = (Integer) ApplicationContainer.getSystemParam("sms.csid");
		OpenApi.initialzeAccount(openurl, account, enterprise, authkey, cgid, csid);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BusinessMessage> list = businessMessageService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "短信批量发送")
	public String resendQueue() {
		String[] ids = getRequest().getParameterValues("ids");
		initialzeAccount();

		for (String id : ids) {
			BusinessMessage message = businessMessageService.get(new Long(id));
			if (StringUtils.isBlank(message.getReceiveTel()) || StringUtils.isBlank(message.getMessage())) {
				continue;
			}
			businessMessageService.sendOnce(message);
		}
		return SUCCESS;
	}

	@ActionLog(description = "短信发送")
	public String resend() {
		BusinessMessage message = businessMessageService.get(messageId);
		if (StringUtils.isBlank(message.getReceiveTel())) {
			throw new BusinessException("接收手机号码为空!");
		}
		if (StringUtils.isBlank(message.getMessage())) {
			throw new BusinessException("发送内容为空!");
		}
		initialzeAccount();
		businessMessageService.sendOnce(message);
		return SUCCESS;
	}

}
