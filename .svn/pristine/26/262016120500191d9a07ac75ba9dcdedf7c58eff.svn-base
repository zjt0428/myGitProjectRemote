/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: GlobalTypeAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-28			Chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.web.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.support.ExcelSupport;
import com.knight.core.util.XmlUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.constant.SystemUtil;
import com.knight.system.service.SystemSqlService;

/**
 * @ClassName: GlobalTypeAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Chenxy
 * @date 2012-10-28 上午11:37:58
 */
public class GlobalTypeAction extends BaseAction {

	protected static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private String contentType = "text/xml;charset=UTF-8";

	@Setter
	@Getter
	private String extension = "xml";

	@Setter
	@Getter
	private String filename = ExcelSupport.encodeFileName("emmsData");

	private File dataFile;

	@Resource
	private SystemSqlService systemSqlService;

	public String exportSystemData() throws Exception {
		systemSqlService.createSystemDataFile();
		return EXPORT;
	}

	public InputStream getInputStream() {
		try {
			dataFile = new File(SystemUtil.getSystemExportDataFilePath());
			XmlUtil.docToXmlFile(XmlUtil.load(dataFile), SystemUtil.getSystemExportDataFilePath());
			return new FileInputStream(dataFile);
		} catch (Exception e) {
			logger.error("", e);
			throw new BusinessException("文件导出失败!");
		}
	}

}
