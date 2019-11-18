/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyItem.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-5-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Constant;

/**
 * @ClassName: VerifyItem
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-5-20 下午8:34:26
 */
@Data
@ToString(callSuper = false)
@PersistantDeclare
public class VerifyItem extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long itemId;

	@Expose
	private String itemName;

	@Expose
	private Long itemParent;

	@Expose
	private String itemParentName;

	@Expose
	@CodeFieldDeclare(codeId = "VITEM_TYPE", valueField = "vitemTypeName")
	private String vitemType;

	@Expose
	private String vitemTypeName;

	@Expose
	private String path;

	@Expose
	private Integer level;

	private String delFlag = Constant.ENABLED;
}
