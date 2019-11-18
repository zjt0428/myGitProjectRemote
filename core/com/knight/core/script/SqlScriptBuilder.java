/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SqlScriptBuilder.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-6-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.script;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Element;

import com.knight.core.util.XmlUtil;

/**
 * @ClassName: SqlScriptBuilder
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-6-14 上午11:48:32
 */
@Slf4j
public class SqlScriptBuilder {

	private static Map<String, String> sqlscriptMap = new HashMap<String, String>();

	public static void initScriptMap(File configFile) {
		Element root = XmlUtil.load(configFile).getRootElement();
		String namespace = XmlUtil.getAttributeValue(root, "namespace", "");
		@SuppressWarnings("unchecked")
		List<Element> selectNodeList = root.selectNodes("select");
		for (Element selectNode : selectNodeList) {
			String id = XmlUtil.getAttributeValue(selectNode, "id", "");
			String sql = XmlUtil.getTextValue(selectNode);
			String properties = XmlUtil.getAttributeValue(selectNode, "properties");
			if (StringUtils.isNotBlank(properties)) {
				String property = " #" + properties + "# ";
				if (sql.indexOf(property) == -1) {
					throw new java.lang.IllegalArgumentException("未发现[" + namespace + "." + id + "]的sql片段[" + property + "]属性");
				}
				sql = sql.replace(property, sqlscriptMap.get(namespace + "." + properties));
			}
			sqlscriptMap.put(namespace + "." + id, sql);
		}
	}

	public static void build() {
		log.info("脚本初始化...");
		File[] configFiles = null;
		try {
			String dir = SqlScriptBuilder.class.getClassLoader().getResource("").toURI().getPath() + "resource/sqlscript/";
			File scriptDirectory = new File(dir);
			configFiles = scriptDirectory.listFiles();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (configFiles != null && configFiles.length > 0) {
			for (File configFile : configFiles) {
				initScriptMap(configFile);
			}
		}
	}

	public static String get(String id) {
		return sqlscriptMap.get(id);
	}

}
