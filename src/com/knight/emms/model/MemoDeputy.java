/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: MemoDeputy.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-3-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

/**
 * @ClassName: MemoDeputy
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-3-9 上午11:08:45
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class MemoDeputy extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long memoDeputyId;

	@Expose
	private Long memoId;

	@Expose
	private Long practiId;

	@Expose
	private String practiName;

}
