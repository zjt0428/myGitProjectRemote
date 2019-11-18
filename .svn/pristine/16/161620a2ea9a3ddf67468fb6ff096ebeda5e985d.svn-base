/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ApplicationContainer.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.application;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.ServletContext;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.knight.core.ApplicationContextHelper;
import com.knight.core.script.SqlScriptBuilder;
import com.knight.core.util.XmlUtil;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppFunction;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.model.Company;
import com.knight.system.model.FunUrl;
import com.knight.system.model.SysConfig;
import com.knight.system.service.AppFunctionService;
import com.knight.system.service.CompanyService;
import com.knight.system.service.FunUrlService;
import com.knight.system.service.SysConfigService;
import com.knight.system.web.filter.SecurityInterceptorFilter;

/**
 * 系统容器
 * @ClassName:ApplicationContainer
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:57:12
 * @since JDK Version 1.5
 */
@Slf4j
public class ApplicationContainer {

	public static final Map<String, Object> pubConfigureMap = new HashMap<String, Object>();

	private static Map<String, Object> configMap = new HashMap<String, Object>();

	private static ServletContext servletContext = null;

	private static Map<String, OnlineUser> onlineUsers = new LinkedHashMap<String, OnlineUser>();

	private static Document lefMenuDocument = null;

	private static Document publicDocument = null;

	private static Set<String> publicMenuIds = null;

	/** Ensures a directory name always ends with a '/'. */
	public static String normalizeDir(String path) {
		return (path != null && (!(path.endsWith("/") || path.endsWith("\\")))) ? path + File.separator : path;
	}

	public static Document getLeftMenuDocument() {
		return lefMenuDocument;
	}

	public static void setLeftMenuDocument(Document doc) {
		lefMenuDocument = doc;
	}

	public static Document getPublicDocument() {
		return publicDocument;
	}

	public static void setPublicDocument(Document pubDoc) {
		publicDocument = pubDoc;
	}

	public static void setPublicMenuIds(Set<String> pubIds) {
		publicMenuIds = pubIds;
	}

	public static Map<String, OnlineUser> getOnlineUsers() {
		return onlineUsers;
	}

	public static void removeOnlineUser(String sessionId) {
		onlineUsers.remove(sessionId);
	}

	public static void addOnlineUser(String sessionId, AppUser user, String moblieFlag) {
		if (!(onlineUsers.containsKey(sessionId))) {
			OnlineUser onlineUser = new OnlineUser();
			onlineUser.setFullname(user.getFullname());
			onlineUser.setSessionId(sessionId);
			onlineUser.setUsername(user.getUsername());
			onlineUser.setUserId(user.getUserId());
			onlineUser.setMoblieFlag(moblieFlag);
			if (!(user.getUserId().equals(AppUser.SUPER_USER))) {
				onlineUser.setDepPath("." + user.getDepartment().getPath());
			}
			Set<AppRole> roles = user.getRoles();
			StringBuffer roleIds = new StringBuffer(",");
			for (AppRole role : roles) {
				roleIds.append(role.getRoleId() + ",");
			}
			onlineUser.setSex(user.getSex());
			onlineUser.setRoleIds(roleIds.toString());
			onlineUsers.put(sessionId, onlineUser);
		}
	}

	/**
	 * 获取WEB绝对路径
	 * @return
	 * @author:chenxy
	 */
	public static String getAppAbsolutePath() {
		return servletContext.getRealPath("/");
	}

	public static void reloadSecurityDataSource() {
		SecurityInterceptorFilter securityInterceptorFilter = (SecurityInterceptorFilter) ApplicationContextHelper.getBean("securityInterceptorFilter");
		securityInterceptorFilter.loadDataSource();
	}

	public static void reloadSysConfig() {
		SysConfigService sysConfigService = (SysConfigService) ApplicationContextHelper.getBean("sysConfigService");
		List<SysConfig> list = sysConfigService.getAll();
		for (SysConfig conf : list) {
			Object value = null;
			if ("2".equals(conf.getDataType().toString())) {
				if ("1".equals(conf.getDataValue().trim())) {
					value = true;
				} else {
					value = false;
				}
			} else if ("1".equals(conf.getDataType().toString())) {
				value = Integer.parseInt(conf.getDataValue());
			} else {
				value = conf.getDataValue();
			}
			pubConfigureMap.put(conf.getConfigKey(), value);
			configMap.put(conf.getConfigKey(), value);
		}
		CompanyService companyService = (CompanyService) ApplicationContextHelper.getBean("companyService");
		List<Company> cList = companyService.findCompany();
		if (cList.size() > 0) {
			Company company = cList.get(0);
			configMap.put("app.logoPath", company.getLogo());
			configMap.put("app.companyName", company.getCompanyName());
		}
	}

	public static void reLoadMenu() {
		String xslStyle = servletContext.getRealPath("/js/menu") + "/menu-left.xsl";
		Document doc = getOrignalMenuDocument();
		try {
			Document finalDoc = XmlUtil.styleDocument(doc, xslStyle);
			finalDoc.asXML();
			setLeftMenuDocument(finalDoc);
		} catch (Exception ex) {
			log.error("menux.xml trasform has error:" + ex.getMessage());
		}

		String publicStyle = servletContext.getRealPath("/js/menu") + "/menu-public.xsl";
		try {
			Document publicDoc = XmlUtil.styleDocument(doc, publicStyle);
			Set<String> pubIds = new HashSet<String>();
			Element rootEl = publicDoc.getRootElement();
			@SuppressWarnings("unchecked")
			List<Element> idNodes = rootEl.selectNodes("/Menus//*");
			for (int i = 0; i < idNodes.size(); ++i) {
				Element el = (Element) idNodes.get(i);
				Attribute attr = el.attribute("id");
				if (attr != null) {
					pubIds.add(attr.getValue());
				}
			}

			setPublicMenuIds(pubIds);
			setPublicDocument(publicDoc);
		} catch (Exception ex) {
			log.error("menu.xml + menu-public.xsl transform has error:" + ex.getMessage());
		}
	}

	/**
	 * 容器初始化
	 * @param in_servletContext ServletContext
	 * @author:chenxy
	 */
	public static void init(ServletContext in_servletContext) {
		servletContext = in_servletContext;
		SqlScriptBuilder.build();
		// 系统常量定义初始化
		SystemConstant.WEB_ROOT = normalizeDir(servletContext.getRealPath("/"));
		log.info("系统根目录:" + SystemConstant.WEB_ROOT);

		String filePath = servletContext.getRealPath("/WEB-INF/classes/resource/");
		Properties props = new Properties();
		try {
			InputStream is = new BufferedInputStream(new FileInputStream(filePath + "/systemConfig.properties"));
			props.load(is);
			Iterator<Object> it = props.keySet().iterator();
			while (it.hasNext()) {
				String key = (String) it.next();
				configMap.put(key, props.get(key));
			}
		} catch (Exception ex) {
			log.error(ex.getMessage());
		}

		reloadSysConfig();

		String xslStyle = servletContext.getRealPath("/js/menu") + "/menu-left.xsl";
		Document doc = getOrignalMenuDocument();
		try {
			Document finalDoc = XmlUtil.styleDocument(doc, xslStyle);
			finalDoc.asXML();
			setLeftMenuDocument(finalDoc);
		} catch (Exception ex) {
			log.error("menux.xml trasform has error:" + ex.getMessage());
		}

		String publicStyle = servletContext.getRealPath("/js/menu") + "/menu-public.xsl";
		try {
			Document publicDoc = XmlUtil.styleDocument(doc, publicStyle);
			Set<String> pubIds = new HashSet<String>();
			Element rootEl = publicDoc.getRootElement();
			@SuppressWarnings("unchecked")
			List<Element> idNodes = rootEl.selectNodes("/Menus//*");
			for (int i = 0; i < idNodes.size(); ++i) {
				Element el = (Element) idNodes.get(i);
				Attribute attr = el.attribute("id");
				if (attr != null) {
					pubIds.add(attr.getValue());
				}
			}

			setPublicMenuIds(pubIds);
			setPublicDocument(publicDoc);
		} catch (Exception ex) {
			log.error("menu.xml + menu-public.xsl transform has error:" + ex.getMessage());
		}

	}

	public static Map<String, Object> getSysConfig() {
		return configMap;
	}

	public static Document getOrignalMenuDocument() {
		String menuFilePath = servletContext.getRealPath("/js/menu") + "/menu.xml";
		Document doc = XmlUtil.load(menuFilePath);
		return doc;
	}

	public static Document getGrantMenuDocument() {
		String xslStyle = servletContext.getRealPath("/js/menu") + "/menu-grant.xsl";
		Document finalDoc = null;
		try {
			finalDoc = XmlUtil.styleDocument(getOrignalMenuDocument(), xslStyle);
		} catch (Exception ex) {
			log.error("menu.xml + menu-grant.xsl transform has error:" + ex.getMessage());
		}
		return finalDoc;
	}

	public static Document getPublicMenuDocument() {
		return publicDocument;
	}

	public static Set<String> getPublicMenuIds() {
		return publicMenuIds;
	}

	public static void synMenu() {
		AppFunctionService appFunctionService = (AppFunctionService) ApplicationContextHelper.getBean("appFunctionService");
		FunUrlService funUrlService = (FunUrlService) ApplicationContextHelper.getBean("funUrlService");

		@SuppressWarnings("unchecked")
		List<Element> funNodeList = getOrignalMenuDocument().getRootElement().selectNodes("/Menus/Items//Item/Function");
		for (int i = 0; i < funNodeList.size(); ++i) {
			Element funNode = (Element) funNodeList.get(i);
			String key = funNode.attributeValue("id");
			String name = funNode.attributeValue("text");
			AppFunction appFunction = appFunctionService.getByKey(key);
			if (appFunction == null) {
				appFunction = new AppFunction(key, name);
			} else {
				appFunction.setFunName(name);
			}
			@SuppressWarnings("unchecked")
			List<Element> urlNodes = funNode.selectNodes("./url");
			appFunctionService.save(appFunction);
			for (int k = 0; k < urlNodes.size(); ++k) {
				Node urlNode = (Node) urlNodes.get(k);
				String path = urlNode.getText();
				FunUrl fu = funUrlService.getByPathFunId(path, appFunction.getFunctionId());
				if (fu == null) {
					fu = new FunUrl();
					fu.setUrlPath(path);
					fu.setAppFunction(appFunction);
					funUrlService.save(fu);
				}
			}
		}
	}

	public static boolean getIsSynMenu() {
		String synMenu = (String) configMap.get("isSynMenu");
		return ("true".equals(synMenu));
	}

	public static String getCompanyName() {
		String defaultName = "";
		String companyName = (String) configMap.get("app.companyName");
		if (StringUtils.isNotEmpty(companyName)) {
			defaultName = companyName;
		}
		return defaultName;
	}

	public static AppUser getCurrentUser() {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null) {
			Authentication auth = securityContext.getAuthentication();
			if (auth != null) {
				Object principal = auth.getPrincipal();
				if (principal instanceof AppUser) {
					return ((AppUser) principal);
				}
			} else {
				log.warn("WARN: securityContext cannot be lookuped using SecurityContextHolder.");
			}
		}
		return null;
	}

	public static Long getCurrentUserId() {
		AppUser curUser = getCurrentUser();
		if (curUser != null) {
			return curUser.getUserId();
		}
		return -1L;
	}

	public static boolean isCurrentSuperAdmin() {
		AppUser curUser = getCurrentUser();
		return curUser.getUserId().intValue() == 1;
	}

	public static Object getSystemParam(String key) {
		return configMap.get(key);
	}

}
