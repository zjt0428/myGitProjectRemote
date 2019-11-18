/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppTipsAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.web.action.BaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppTips;
import com.knight.system.service.AppTipsService;

/**
 * @ClassName:AppTipsAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 下午4:43:21
 * @since JDK Version 1.5
 */
public class AppTipsAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private AppTipsService appTipsService;

	@Getter
	@Setter
	private AppTips appTips;

	@Getter
	@Setter
	private Long tipsId;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_appUser.userId_L_EQ", ApplicationContainer.getCurrentUserId().toString());
		List<AppTips> list = appTipsService.getAll(filter);

		Type type = new TypeToken<List<AppTips>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		this.jsonString = buff.toString();

		return SUCCESS;
	}

	@ActionLog(description = "删除便签")
	public String multiDel() {
		if (getRequest().getParameter("ids").equals("all")) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addConjunctFilter("Q_appUser.userId_L_EQ", ApplicationContainer.getCurrentUserId().toString());
			List<AppTips> list = appTipsService.getAll(filter);
			for (AppTips tips : list) {
				appTipsService.remove(tips);
			}
		} else {
			String ids[] = getRequest().getParameterValues("ids");
			if (ids != null) {
				String as[];
				int j = (as = ids).length;
				for (int i = 0; i < j; i++) {
					String id = as[i];
					appTipsService.remove(new Long(id));
				}

			}
		}
		jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	public String get() {
		AppTips appTips = appTipsService.get(this.tipsId);

		Gson gson = new Gson();

		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(appTips));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	@ActionLog(description = "保存便签")
	public String save() {
		String data = getRequest().getParameter("data");
		if (StringUtils.isNotEmpty(data)) {
			Gson gson = new Gson();
			AppTips[] tips = gson.fromJson(data, AppTips[].class);
			for (AppTips tip : tips) {
				if (tip.getTipsId().longValue() == -1L) {
					tip.setTipsId(null);
					SimpleDateFormat date = new SimpleDateFormat("yyMMddHHmmssSSS");
					String customerNo = date.format(new Date());
					tip.setTipsName("tips" + customerNo);
					tip.setCreateTime(new Date());
				}
				tip.setAppUser(ApplicationContainer.getCurrentUser());
				appTipsService.save(tip);
			}
		}
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

}
