/**
 *====================================================
 * 文件名称: StatusAnalyze.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;

/**
 * @ClassName: StatusAnalyze
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 上午6:28:42
 */
public class StatusAnalyze {

	/**
	 * 资质状态解析
	 * @param date
	 * @return
	 */
	public static String parserArchivesValid(String date) {
		if (StringUtils.isBlank(date)) {
			return Status.Archives.enabled;
		}
		int i = Integer.parseInt(date.replaceAll("[^0-9]", ""));
		int j = Integer.parseInt(DateUtil.getCurrentDateStr());
		if (i >= j) {
			return Status.Archives.enabled;
		} else {
			return Status.Archives.overdue;
		}
	}

	/**
	 * 设备/零配件状态解析
	 * @param date
	 * @return
	 */
	public static String parserECValid(Date date, String status) {
		try {
			int i = Integer.parseInt(DateUtil.changeDateToStr(date, DateUtil.DB_STORE_DATE));
			int j = Integer.parseInt(DateUtil.getCurrentDateStr());
			if (i >= j) {
				if (status.equals(Status.EquipCompon.scrap)) { // 报废状态的恢复闲置
					return Status.EquipCompon.unused;
				}
				return status;
			} else {
				if (status.equals(Status.EquipCompon.unused)) { // 闲置状态的变为报废
					return Status.EquipCompon.scrap;
				}
				return status;
			}
		} catch (Exception e) {
			return status;
		}
	}

}
