/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: InitLoadTable.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-2-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.model;

import java.io.Serializable;

import lombok.Data;

import com.google.gson.annotations.Expose;

/**
 * 初始化表T_INIT_LOAD_TABLE对象
 * @ClassName:InitLoadTable
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-9-1 上午11:53:28
 * @since JDK Version 1.5
 */

@Data

public class InitLoadTable implements Serializable {

	private static final long serialVersionUID = 1L;

	/** 表码表-1 */
	public static final int BM_TABLE = 1;

	/** 控制表-2 */
	public static final int KZ_TABLE = 2;

	/** 参数表-3 */
	public static final int CS_TABLE = 3;

	@Expose
	private String tableAlias;

	@Expose
	private String tableName;

	private Integer tableType;

	@Expose
	private Short refresh;

	@Expose
	private String bhFieldName;

	@Expose
	private String mcFieldName;

	private Short bhFieldType;

	@Expose
	private String parentFieldName;

	@Expose
	private String aliasFieldName;

	@Expose
	private String aliasFieldLable;
	
	@Expose
	private String aliasFieldName1;
	
	@Expose
	private String aliasFieldLable1;
	
	@Expose
	private String aliasFieldName2;
	
	@Expose
	private String aliasFieldLable2;
	
	@Expose
	private String aliasFieldName3;
	
	@Expose
	private String aliasFieldLable3;

	@Expose
	private String remark;

	private Short lazyInit;

	private boolean lazy;

	private boolean fresh;

	public void setLazyInit(Short lazyInit) {
		this.lazyInit = lazyInit;
		this.lazy = "1".equals(String.valueOf(lazyInit)) ? true : false;
	}

	public void setRefresh(Short refresh) {
		this.refresh = refresh;
		this.fresh = "1".equals(String.valueOf(refresh)) ? true : false;
	}
}
