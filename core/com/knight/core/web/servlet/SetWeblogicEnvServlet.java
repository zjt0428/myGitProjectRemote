/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SetWeblogicEnvServlet.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-9-17			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName:SetWeblogicEnvServlet
 * @Description:TODO(这里用一句话描述这个类的作用) JDK版本：JDK1.5
 * @author:Administrator
 * @date 2011-9-17 上午7:12:23
 */
@Slf4j
public class SetWeblogicEnvServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	static {
		System.setProperty("javax.xml.stream.XMLInputFactory", "com.ctc.wstx.stax.WstxInputFactory");
		System.setProperty("javax.xml.stream.XMLOutputFactory", "com.ctc.wstx.stax.WstxOutputFactory");
		System.setProperty("javax.xml.stream.XMLEventFactory", "com.ctc.wstx.stax.evt.WstxEventFactory");
	}

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		log.debug("set Property javax.xml.stream.XMLInputFactory=com.ctc.wstx.stax.WstxInputFactory");
		log.debug("set Property javax.xml.stream.XMLOutputFactory=com.ctc.wstx.stax.WstxOutputFactory");
		log.debug("set Property javax.xml.stream.XMLEventFactory=com.ctc.wstx.stax.WstxEventFactory");
		System.setProperty("javax.xml.stream.XMLInputFactory", "com.ctc.wstx.stax.WstxInputFactory");
		System.setProperty("javax.xml.stream.XMLOutputFactory", "com.ctc.wstx.stax.WstxOutputFactory");
		System.setProperty("javax.xml.stream.XMLEventFactory", "com.ctc.wstx.stax.evt.WstxEventFactory");
	}

}
