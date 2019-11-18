/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserKeyLog.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.model;

import java.util.Date;

import lombok.Data;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

/**
 * @ClassName: AppUserKeyLog
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-2 下午3:02:28
 */
@Data

public class AppUserKeyLog extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long logId;

	@Expose
	private Long keyId;

	@Expose
	private Long userId;

	@Expose
	private String fullname;

	@Expose
	private String keySerial;

	@Expose
	private Date distributeTime;

	@Expose
	private String validPeriodTime;

	@Expose
	private String expirationTime;

	@Expose
	private Date updateTime;

	@Expose
	private String updateUsername;

}
