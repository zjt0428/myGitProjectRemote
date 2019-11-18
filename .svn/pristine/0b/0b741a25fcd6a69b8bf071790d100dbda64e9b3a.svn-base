/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SysConfigAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.SysConfig;
import com.knight.system.service.SysConfigService;

/**
 * @ClassName:SysConfigAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 下午4:07:15
 * @since JDK Version 1.5
 */
public class SysConfigAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private SysConfigService sysConfigService;

	@Getter
	@Setter
	private SysConfig sysConfig;

	@Getter
	@Setter
	private Long configId;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SysConfig> list = sysConfigService.getAll(filter);
		Type type = new TypeToken<List<SysConfig>>() {
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
				sysConfigService.remove(new Long(id));
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	public String get() {
		SysConfig sysConfig = (SysConfig) sysConfigService.get(this.configId);
		Gson gson = new Gson();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(sysConfig));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String save() {
		Map<String, Object> con = ApplicationContainer.getSysConfig();
		Map<?, ?> map = getRequest().getParameterMap();
		for (Map.Entry<?, ?> entry : map.entrySet()) {
			String key = (String) entry.getKey();
			SysConfig conf = sysConfigService.findByKey(key);
			String[] value = (String[]) entry.getValue();
			conf.setDataValue(value[0]);
			sysConfigService.relevancy(conf);
			con.remove(key);
			con.put(key, value[0]);
		}
		ApplicationContainer.reloadSysConfig();
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

	public String load() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_delFlag_SN_EQ", "1");
		List<SysConfig> configList = sysConfigService.getAll(filter);
		setJsonString("{success:true,data:" + GsonUtil.toJson(configList) + "}");
		return SUCCESS;
	}

}
