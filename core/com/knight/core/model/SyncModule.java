/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SyncModule.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-11-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.model;

import lombok.Data;

/**
 * @ClassName: SyncModule
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-11-14 下午2:39:15
 */
@Data
public class SyncModule {

	private String moduleName;

	private String dataSource;

	public SyncModule(String moduleName, String dataSource) {
		this.moduleName = moduleName;
		this.dataSource = dataSource;
	}

}
