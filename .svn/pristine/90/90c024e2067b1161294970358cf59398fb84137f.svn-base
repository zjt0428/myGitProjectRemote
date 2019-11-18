/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: BaseModel.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.model;

import java.io.Serializable;

import flexjson.JSON;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName:BaseModel
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:51:56
 * @since JDK Version 1.5
 */
@Slf4j
public class BaseModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer version;

	/**
	 * optimistic-lock="version"
	 * @return
	 * @author:chenxy
	 */
	@JSON(include = false)
	public Integer getVersion() {
		return this.version;
	}

	public void setVersion(Integer version) {
		log.debug("Version:" + version);
		this.version = version;
	}

	@Getter
	@Setter
	private String permissionFlag;
}
