/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: MenuAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;

import com.google.gson.Gson;
import com.knight.core.util.XmlUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppRole;

/**
 * 菜单请求
 * @ClassName:MenuAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:01:06
 * @since JDK Version 1.5
 */
public class MenuAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private static final String USER_MENU_DOC = "_USER_MENU_DOC";

	@Getter
	@Setter
	private String id = null;

	private Document getCurDocument() {
		HttpSession session = getSession();
		Document userDoc = (Document) session.getAttribute(USER_MENU_DOC);
		if (userDoc != null) {
			return userDoc;
		}

		Document doc = ApplicationContainer.getLeftMenuDocument();
		Set<String> rights = ApplicationContainer.getCurrentUser().getRights();
		if (rights.contains(AppRole.SUPER_RIGHTS)) {
			return doc;
		}

		rights.addAll(ApplicationContainer.getPublicMenuIds());
		Document newDoc = DocumentHelper.createDocument();
		Element root = newDoc.addElement("Menus");
		createSubMenus(rights, doc.getRootElement(), root);
		session.setAttribute(USER_MENU_DOC, newDoc);
		return newDoc;
	}

	@SuppressWarnings("unused")
	private Document getModuleDocument() {
		String topMenuId = getRequest().getParameter("topMenuId");
		if (StringUtils.isEmpty(topMenuId)) {
			topMenuId = "oa";
		}

		String menuXmlPath = ApplicationContainer.getAppAbsolutePath() + "/js/menu-" + topMenuId + ".xml";

		Document doc = XmlUtil.load(menuXmlPath);

		return doc;
	}

	private void createSubMenus(Set<String> rights, Element curNodes, Element newCurNodes) {
		@SuppressWarnings("rawtypes")
		List els = curNodes.elements();
		if (els.size() == 0)
			return;

		for (int i = 0; i < els.size(); ++i) {
			Element el = (Element) els.get(i);
			Attribute id = el.attribute("id");
			if (id != null) {
				String idVal = id.getValue();
				if ((rights.contains(idVal)) || (idVal == null)) {
					Element newNodes = newCurNodes.addElement(el.getName());
					@SuppressWarnings("unchecked")
					Iterator<Attribute> it = el.attributeIterator();
					while (it.hasNext()) {
						Attribute at = (Attribute) it.next();
						newNodes.addAttribute(at.getName(), at.getValue());
					}
					createSubMenus(rights, el, newNodes);
				}
			}
		}
	}

	/** @deprecated */
	public String items() {
		Document doc = getCurDocument();

		if (doc != null) {
			StringBuffer sb = new StringBuffer("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r");

			Element el = doc.getRootElement();
			@SuppressWarnings("unchecked")
			List<Node> nodes = el.selectNodes("/Menus/Items[@id='" + this.id + "']/*");

			sb.append("<Menus>\r");
			for (int i = 0; i < nodes.size(); ++i) {
				Node node = (Node) nodes.get(i);
				sb.append(node.asXML());
			}

			sb.append("\r</Menus>\r");
			setJsonString(sb.toString());
		}

		return SUCCESS;
	}

	/** @deprecated */
	public String models() {
		Document doc = getCurDocument();
		StringBuffer sb = new StringBuffer("[");

		if (doc != null) {
			Element root = doc.getRootElement();
			@SuppressWarnings("unchecked")
			List<Element> els = root.elements();

			for (int i = 0; i < els.size(); ++i) {
				Element el = (Element) els.get(i);

				Attribute id = el.attribute("id");
				Attribute text = el.attribute("text");
				Attribute iconCls = el.attribute("iconCls");

				sb.append("{id:'").append((id == null) ? "" : id.getValue()).append("',");
				sb.append("text:'").append((text == null) ? "" : text.getValue()).append("',");
				sb.append("iconCls:'").append((iconCls == null) ? "" : iconCls.getValue()).append("'},");
			}

			if (els.size() > 0) {
				sb.deleteCharAt(sb.length() - 1);
			}
		}

		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String panelTree() {
		Gson gson = new Gson();
		Document doc = getCurDocument();
		StringBuffer sb = new StringBuffer("[");
		if (doc != null) {
			Element root = doc.getRootElement();
			@SuppressWarnings("unchecked")
			List<Element> els = root.elements();
			for (int i = 0; i < els.size(); ++i) {
				Element el = (Element) els.get(i);

				Attribute id = el.attribute("id");
				Attribute text = el.attribute("text");
				Attribute iconCls = el.attribute("iconCls");

				sb.append("{id:'").append((id == null) ? "" : id.getValue()).append("',");
				sb.append("text:'").append((text == null) ? "" : text.getValue()).append("',");
				sb.append("iconCls:'").append((iconCls == null) ? "" : iconCls.getValue()).append("',");
				sb.append("subXml:").append(gson.toJson(getModelXml(doc, id.getValue()))).append("},");
			}
			if (els.size() > 0) {
				sb.deleteCharAt(sb.length() - 1);
			}
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	protected String getModelXml(Document doc, String modelId) {
		StringBuffer sb = new StringBuffer("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r");
		Element el = doc.getRootElement();
		@SuppressWarnings("unchecked")
		List<Node> nodes = el.selectNodes("/Menus/Items[@id='" + modelId + "']/*");
		sb.append("<Menus>\r");
		for (int i = 0; i < nodes.size(); ++i) {
			Node node = (Node) nodes.get(i);
			sb.append(node.asXML());
		}
		sb.append("\r</Menus>\r");
		return sb.toString();
	}

}
