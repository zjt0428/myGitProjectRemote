/**
* 版权所有：福建顶点软件股份有限公司
* Copyright 2011 Fujian Apex Software Shares Co., Ltd.
* All right reserved. 
*====================================================
* 文件名称: SystemLogAction.java
* 修订记录：
* No    日期				作者(操作:具体内容)
* 1.    2011-9-15			chenxy(创建:创建文件)
*====================================================
* 类描述：(说明未实现或其它不应生成javadoc的内容)
*/
package com.knight.system.web.action;

import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.web.action.BaseAction;
import com.knight.system.model.SystemLog;
import com.knight.system.service.SystemLogService;

/**
 * @ClassName:SystemLogAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-15 上午11:51:25
 * @since JDK Version 1.5
 */
public class SystemLogAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private SystemLogService systemLogService;

	@Getter
	@Setter
	private SystemLog systemLog;

	@Getter
	@Setter
	private Long logId;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SystemLog> list = systemLogService.getAll(filter);

		Type type = new TypeToken<List<SystemLog>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				systemLogService.remove(new Long(id));
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	public String get() {
		SystemLog systemLog = systemLogService.get(this.logId);
		Gson gson = new Gson();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(systemLog));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String save() {
		systemLogService.save(this.systemLog);
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}
	
}
