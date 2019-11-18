/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 *====================================================
 * 文件名称: VerifyStandard.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-5-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

/**
 * @ClassName: VerifyStandard
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-5-28 下午8:30:16
 */
@Data
@ToString(callSuper = false)
public class VerifyStandard extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long standardId;

	@Expose
	private Long relateId;

	@Expose
	private String relateModule;

	@Expose
	private String itemName;

	@Expose
	private String parentName;

	@Expose
	private Integer level;

	@Expose
	private String demandDes;

	@Expose
	private String standardResult;

	@Expose
	private String remark;

	@Expose
	private String summary;

	// ==========================================================================================//
	private int parentColspan = 0;

	private int colspan = 0;

	public boolean equalstandard(VerifyStandard vs) {
		if (this.level == 2) {
			return this.parentName.equals(vs.getParentName()) && this.itemName.equals(vs.getItemName());
		} else {
			return this.itemName.equals(vs.getItemName());
		}
	}

}
