/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: Memo.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-3-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.model;


import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: Memo
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-3-9 上午11:05:50
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class AttendamceSet extends BaseModel{

	private static final long serialVersionUID = 1L;
	

	@Expose
	private Long sid;
	@Expose
	private String workDays;
	@Expose
	private String workSt;
	@Expose
	private String workEd;	
	@Expose
	private String execDt;	
	@Expose
	private String state;	
	@Expose
	private String createDt;
}
