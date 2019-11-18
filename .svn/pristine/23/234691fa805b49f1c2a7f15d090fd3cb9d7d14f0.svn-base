/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: StoreHouse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-1-13			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;

/**
 * @ClassName: StoreHouse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-1-13 下午8:27:10
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
@SerialNumberStrategy(name = "storeSerial", strategy = "CK{yyyyMMdd}", maxseq = 99)
public class StoreHouse extends BusinessModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long storeId;

	@Expose
	private String storeSerial;

	@Expose
	private String storeName;

	@Expose
	private String address;

	@Expose
	private BigDecimal area;

	@Expose
	private String linker;

	@Expose
	private String linkTel;
	
	private String storeHouseJoinComponents = "";
	
	private String delFlag;
	@Expose
	private Long taskId;
	public void setModelSerial(String serial) {
		this.storeSerial = serial;
	}

}
