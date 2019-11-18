/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FileAttachAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-29			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

/**
 * @ClassName: FileAttachAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-29 下午4:55:40
 */
public class FileAttachAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private FileAttachService fileAttachService;

	@Getter
	@Setter
	private FileAttach fileAttach;

	@Getter
	@Setter
	private Long fileId;

	@Getter
	@Setter
	private String filePath;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<FileAttach> list = fileAttachService.getAll(filter);
		Type type = new TypeToken<List<FileAttach>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, type));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listAll() {
		Long relateId = new Long(getRequest().getParameter("relateId"));
		String relateModule = getRequest().getParameter("relateModule");
		List<FileAttach> list = fileAttachService.queryForRelate(relateId, relateModule);
		StringBuffer buff = new StringBuffer("{success:true,data:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				fileAttachService.remove(new Long(id));
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	public String get() {
		FileAttach fileAttach = (FileAttach) fileAttachService.get(this.fileId);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(fileAttach));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String save() {
		fileAttachService.save(this.fileAttach);
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

	public String delete() {
		if (this.fileId != null) {
			fileAttachService.remove(this.fileId);
		} else {
			fileAttachService.removeByPath(this.filePath);
		}
		return SUCCESS;
	}

}
