/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: InMessageAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.InMessage;
import com.knight.system.model.ShortMessage;
import com.knight.system.service.InMessageService;
import com.knight.system.service.ShortMessageService;

/**
 * 消息请求
 * @ClassName:InMessageAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 上午11:15:42
 * @since JDK Version 1.5
 */
public class InMessageAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private InMessageService inMessageService;

	@Resource
	private ShortMessageService shortMessageService;

	static short HAVE_DELETE = 1;

	@Getter
	@Setter
	private InMessage inMessage;

	@Getter
	@Setter
	private ShortMessage shortMessage;

	public String display() {
		QueryFilter queryFilter = new QueryFilter(getRequest());
		queryFilter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		queryFilter.addSorted("readFlag", QueryFilter.ORDER_ASC);
		queryFilter.addSorted("receiveId", QueryFilter.ORDER_DESC);
		List<InMessage> inList = inMessageService.queryTranslateAll(queryFilter);
		getRequest().setAttribute("messageList", inList);
		return "display";
	}

	public String list() {
		QueryFilter queryFilter = new QueryFilter(getRequest());
		List<InMessage> list = inMessageService.queryTranslateFullAll(queryFilter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(queryFilter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String count() {
		Integer in = inMessageService.findByReadFlag(ApplicationContainer.getCurrentUser().getUserId());
		setJsonString("{success:true,count:'" + in + "'}");
		return SUCCESS;
	}

	public String read() {
		Long userId = ApplicationContainer.getCurrentUser().getUserId();
		if (userId == null) {
			setJsonString(JSON_SUCCESS);
			return SUCCESS;
		}
		List<InMessage> ims = inMessageService.findByRead(userId);
		boolean haveNextMessage = false;
		InMessage im = null;
		if (ims.isEmpty()) {
			im = inMessageService.findLatest(userId);
		} else {
			im = ims.get(0);
			haveNextMessage = ims.size() > 1;
		}
		if (im == null) {
			setJsonString(JSON_FAIL);
			return SUCCESS;
		}
		im.setReadFlag(InMessage.FLAG_READ);
		inMessageService.save(im);

		this.shortMessage = im.getShortMessage().clone();
		this.shortMessage.setMessages(null);
		this.inMessage = im.clone();
		this.inMessage.setShortMessage(this.shortMessage);
		this.inMessage.setHaveNext(haveNextMessage);
		StringBuffer sb = new StringBuffer("{success:true,message:");
		sb.append(GsonUtil.toJson(this.inMessage, false));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String multiRemove() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				this.inMessage = ((InMessage) inMessageService.get(Long.valueOf(Long.parseLong(id))));
				this.inMessage.setDelFlag((short) (HAVE_DELETE));
				inMessageService.save(this.inMessage);
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	public String multiRead() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				this.inMessage = inMessageService.get(Long.parseLong(id));
				this.inMessage.setReadFlag(InMessage.FLAG_READ);
				inMessageService.save(this.inMessage);
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

}
