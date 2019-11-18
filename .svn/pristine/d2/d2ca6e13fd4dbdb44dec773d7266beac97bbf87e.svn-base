/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ExportStruct.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.model;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

/**
 * @ClassName: ExportStruct
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-10 上午9:40:29
 */
@Data
public class ExportStruct {

	private Map<String, ExportField> exportFileds = new HashMap<String, ExportField>();

	private String sheetName;

	private String exportName;

	public ExportStruct() {
	}

	public ExportStruct(String exportName, String sheetName) {
		this.exportName = exportName;
		this.sheetName = sheetName;
	}

}
