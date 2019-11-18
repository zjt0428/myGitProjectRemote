/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ShortMessageAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.knight.core.Constants;
import com.knight.core.util.DateUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.InMessage;
import com.knight.system.model.ShortMessage;
import com.knight.system.service.AppUserService;
import com.knight.system.service.InMessageService;
import com.knight.system.service.ShortMessageService;

/**
 * @ClassName:ShortMessageAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 下午2:53:52
 * @since JDK Version 1.5
 */
public class ShortMessageAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private ShortMessageService shortMessageService;

	@Resource
	private InMessageService inMessageService;

	@Resource
	private AppUserService appUserService;

	@Getter
	@Setter
	private ShortMessage shortMessage;

	@Getter
	@Setter
	private Date from;

	@Getter
	@Setter
	private Date to;

	@Getter
	@Setter
	private List<InMessage> inList = new ArrayList<InMessage>();

	public String list() {
		PagingBean pb = getInitPagingBean();
		AppUser appUser = ApplicationContainer.getCurrentUser();
		List<Object[]> list = shortMessageService.searchShortMessage(appUser.getUserId(), this.shortMessage, this.from, this.to, pb);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':" + pb.getTotalItems() + ",result:");
		List<InMessage> inList = new ArrayList<InMessage>();
		for (int i = 0; i < list.size(); ++i) {
			InMessage inMessage = (InMessage) ((Object[]) list.get(i))[0];
			inList.add(inMessage);
		}
		Gson gson = new GsonBuilder().setDateFormat(DateUtil.LINK_DISPLAY_DATE_FULL).create();
		Type type = new TypeToken<List<InMessage>>() {
		}.getType();
		buff.append(gson.toJson(inList, type));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String send() {
		String reIds = getRequest().getParameter("userId");
		String content = getRequest().getParameter("content");

		AppUser appUser = ApplicationContainer.getCurrentUser();
		if ((StringUtils.isNotEmpty(reIds)) && (StringUtils.isNotEmpty(content))) {
			String[] st = reIds.split(",");
			ShortMessage message = new ShortMessage();
			message.setContent(content);
			message.setMsgType(Constants.MSG_PERSONAL_INFO);
			message.setSenderId(appUser.getUserId());
			message.setSender(appUser.getFullname());
			message.setSendTime(new Date());
			shortMessageService.save(message);
			for (int i = 0; i < st.length; ++i) {
				InMessage in = new InMessage();
				Long receiveUserId = Long.parseLong(st[i]);
				in.setUserId(receiveUserId);
				AppUser user = appUserService.get(receiveUserId);
				in.setUserFullname(user.getFullname());
				in.setDelFlag(Constants.DISENABLED);
				in.setReadFlag(Constants.DISENABLED);
				in.setShortMessage(message);
				this.inMessageService.save(in);
			}
			setJsonString(JSON_SUCCESS);
		} else {
			setJsonString(JSON_FAIL);
		}
		return SUCCESS;
	}

}
