/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: StoreEquipStock.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-1-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: StoreEquipStock
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-1-13 下午8:27:31
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class StoreEquipStock extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long equipStockId;

	@Expose
	private Long storeId;

	@Expose
	private Long equipId;

	@Expose
	private Long projectId;

	@Expose
	private String stockType;

	@Expose
	private String boundDate;

	@Expose
	private Equipment equipment;

	@Expose
	private Project project;

	@Expose
	private StoreHouse storeHouse;

}
