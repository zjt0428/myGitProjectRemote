/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: IndexDisplayAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-12-18			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.google.gson.Gson;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.IndexDisplay;
import com.knight.system.model.PanelItem;
import com.knight.system.service.IndexDisplayService;

/**
 * @ClassName: IndexDisplayAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-12-18 下午1:37:04
 */
public class IndexDisplayAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private IndexDisplay indexDisplay;

	@Getter
	@Setter
	private Long indexId;

	@Resource
	private IndexDisplayService indexDisplayService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<IndexDisplay> list = indexDisplayService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				this.indexDisplayService.remove(new Long(id));
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	public String get() {
		IndexDisplay indexDisplay = (IndexDisplay) this.indexDisplayService.get(this.indexId);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(GsonUtil.toJson(indexDisplay));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	public String save() {
		String items = getRequest().getParameter("items");
		Gson gson = new Gson();
		PanelItem[] panelItems = gson.fromJson(items, PanelItem[].class);
		AppUser user = ApplicationContainer.getCurrentUser();
		List<IndexDisplay> list = this.indexDisplayService.findByUser(user.getUserId());
		for (IndexDisplay id : list) {
			this.indexDisplayService.remove(id);
		}
		for (PanelItem item : panelItems) {
			IndexDisplay indexDisplay = new IndexDisplay();
			indexDisplay.setAppUser(user);
			indexDisplay.setPortalId(item.getPanelId());
			indexDisplay.setColNum(Integer.valueOf(item.getColumn()));
			indexDisplay.setRowsNum(Integer.valueOf(item.getRow()));
			this.indexDisplayService.save(indexDisplay);
		}
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

}
