/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.xwork.StringUtils;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.knight.core.ApplicationContextHelper;
import com.knight.core.filter.QueryFilter;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;
import com.knight.system.support.AppsUserClient;

/**
 * @ClassName:BaseAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:56:28
 * @since JDK Version 1.5
 */
public class BaseAction implements Serializable {

	private static final long serialVersionUID = 1L;

	protected static transient Logger logger = LoggerFactory.getLogger(BaseAction.class);

	public static final String JSON_SUCCESS = "{\"success\":true}";

	public static final String JSON_FAIL = "{\"success\":false}";

	public static final String SUCCESS = "success";

	public static final String EXPORT = "export";

	public static final String INPUT = "input";

	public static final String CANCEL = "disenabled";

	public static final String VIEW = "view";

	protected boolean isCreateFileAttach = false;
	
	private  Map<String, String> secParam = new HashMap<String, String>();

	@Setter
	@Getter
	protected String dir;

	@Setter
	@Getter
	protected String sort;

	@Setter
	@Getter
	protected Integer limit = Integer.valueOf(25);

	@Setter
	@Getter
	protected Integer start = Integer.valueOf(0);

	@Setter
	@Getter
	protected String jsonString = JSON_SUCCESS;

	@Setter
	@Getter
	private String successResultValue;

	public BaseAction() {
		setSuccessResultValue("/jsonString.jsp");
	}

	protected HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	protected HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	protected HttpSession getSession() {
		return getRequest().getSession();
	}

	protected PagingBean getInitPagingBean() {
		PagingBean pb = new PagingBean(this.start.intValue(), this.limit.intValue());
		return pb;
	}

	public <T> List<T> loadAll(QueryFilter filter) {
		List<T> result = new ArrayList<T>();
		return result;
	}

	protected void setFileAttach(Long relateId) {
		FileAttachService fileAttachService = (FileAttachService) ApplicationContextHelper.getBean("fileAttachService");
		String fileIds = getRequest().getParameter("file_attaches");
		if (StringUtils.isNotBlank(fileIds)) {
			String[] fileIdarray = fileIds.split(",");
			for (String fi : fileIdarray) {
				if (StringUtils.isBlank(fi)) {
					continue;
				}
				FileAttach fileAttach = fileAttachService.get(new Long(fi));
				if (fileAttach == null) {
					continue;
				}
				fileAttach.setDependId(relateId);
				fileAttachService.save(fileAttach);
			}
		}
	}

	protected void createFileAttach(Long relateId) {
		if (!isCreateFileAttach) {
			return;
		}
		setFileAttach(relateId);
	}

	public String execute() throws Exception {
		HttpServletRequest request = getRequest();
		String uri = request.getRequestURI();
		String url = uri.substring(request.getContextPath().length());
		url = url.replace(".do", ".jsp");
		url = "/pages" + url;
		logger.info("forward url:" + url);
		setSuccessResultValue(url);
		return SUCCESS;
	}
	
	protected  Boolean registerToA9(String externalName,String externalAddress,String mobile,String password,Long externalId){
		  CloseableHttpClient httpClient = HttpClients.custom().build();
		  String url = (String) ApplicationContainer.getSysConfig().get("a9_address");
		  String serverUrl = (String) ApplicationContainer.getSystemParam("sitUrl");
		  secParam.put("externalName",externalName);
		  secParam.put("externalId",Long.toString(externalId));
		  secParam.put("externalAddress",serverUrl);
		  secParam.put("mobile",mobile);
		  secParam.put("password",password);
		  
		 String responseText = AppsUserClient.post(httpClient, url, secParam);
		 if(responseText.contains("false")){
			 return false;
		 }
		 return true;
	}

}
