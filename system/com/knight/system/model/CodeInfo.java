/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: CodeInfo.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.model;

import lombok.Data;

import com.google.gson.annotations.Expose;
import com.knight.core.table.CodeFieldDeclare;

/**
 * 表码信息
 * @ClassName:CodeInfo
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-1 上午11:51:27
 * @since JDK Version 1.5
 */
@Data
public class CodeInfo {

	/** 表码值. */
	@Expose
	private String code;

	/** 表码名称. */
	@Expose
	private String value;

	@Expose
	private String parentCode;
	
	@Expose
	private String aliasValue;
	
	@Expose
	private String aliasValue1;
	
	@Expose
	private String aliasValue2;
	
	@Expose
    private String equipCategory;


	@Expose
	private String codeId;

	public String toString() {
		return value;
	}

}
