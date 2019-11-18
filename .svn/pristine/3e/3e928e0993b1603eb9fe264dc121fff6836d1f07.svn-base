/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: StatusAnalyze.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-1			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.support;

import java.util.Date;

import com.knight.core.Constants;
import com.knight.core.util.DateUtil;

/**
 * @ClassName: StatusAnalyze
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-1 上午10:54:26
 */
public class StatusParser {

	/**
	 * 判断是否过期 1:未过期,0:已过期
	 * @param date
	 * @return
	 */
	public static Short parserIkeyExpiration(Date date) {
		int i = Integer.parseInt(DateUtil.changeDateToStr(date, DateUtil.DB_STORE_DATE));
		int j = Integer.parseInt(DateUtil.getCurrentDateStr());
		if (i >= j) {
			return Constants.ENABLED;
		} else {
			return Constants.DISENABLED;
		}
	}

	/**
	 * 判断是否过期 1:未过期,0:已过期
	 * @param date
	 * @return
	 */
	public static Short parserIkeyExpiration(String date) {
		int i = Integer.parseInt(date.replaceAll("[^0-9]", ""));
		int j = Integer.parseInt(DateUtil.getCurrentDateStr());
		if (i >= j) {
			return Constants.ENABLED;
		} else {
			return Constants.DISENABLED;
		}
	}

	public static boolean isLocked(String lockDate) {
		if (lockDate == null) {
			return false;
		}
		long a = Long.parseLong(DateUtil.getCurrentDateStr());
		long b = Long.parseLong(lockDate.replaceAll("[^0-9]", ""));
		if (a > b) {
			return false;
		}
		return true;
	}

	public static String maxLockDate(String orgDate, String tagDate) {
		if (orgDate == null) {
			return tagDate;
		}
		long a = Long.parseLong(orgDate.replaceAll("[^0-9]", ""));
		long b = Long.parseLong(tagDate.replaceAll("[^0-9]", ""));
		if (a > b) {
			return orgDate;
		}
		return tagDate;
	}

}
