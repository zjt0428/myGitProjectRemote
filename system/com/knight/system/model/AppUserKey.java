/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserKey.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-21			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.model;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: AppUserKey
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-21 下午12:25:19
 */
@Data

@ToString(exclude = { "appUser" })
@PersistantDeclare(isExportable = false, exportName = "用户IKEY信息汇总信息", sheetName = "IKEY信息")
public class AppUserKey extends BaseModel implements ExportModel, Cloneable {

	private static final long serialVersionUID = 1L;

	public static Short KEY_FORBIDDEN = 0;

	public static Short KEY_ACTIVATE = 1;

	@Expose
	private Long keyId;

	@Expose
	private Long userId;

	@Expose
	private String username;

	@Expose
	private String fullname;

	@Expose
	private AppUser appUser;

	@Expose
	private Short keyStatus;

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

	private Set<AppUserKeyExtend> appUserKeyExtendSet = new HashSet<AppUserKeyExtend>(0);

	// ====================================================================================//
	/** 相同模块绑定的扩展信息限制一个 */
	private Map<String, AppUserKeyExtend> appUserKeyExtends = new HashMap<String, AppUserKeyExtend>(0);

	private AppUserKeyExtend keyExtend;

	public AppUserKey clone() {
		try {
			return (AppUserKey) super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

}
