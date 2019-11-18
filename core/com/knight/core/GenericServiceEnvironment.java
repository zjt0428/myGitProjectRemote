/**
 *====================================================
 * 文件名称: GenericServiceEnvironment.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core;

import com.knight.core.model.ExportModel;
import com.knight.core.service.ExportService;

/**
 * @ClassName: GenericServiceEnvironment
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-24 下午10:37:59
 */
public abstract class GenericServiceEnvironment {

	protected void registerExportService(Class<ExportModel> model, ExportService service) {
		ApplicationEnvironment.registerExportService(model, service);
	}

}
