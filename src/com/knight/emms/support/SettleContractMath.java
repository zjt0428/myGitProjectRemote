/**
 * 版权所有：日升建机信息科技有限公司
 * Copyright 2013 Risit Construction Machinery Information Technology Co., Ltd.
 *====================================================
 * 文件名称: SettleContractMath.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-2-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.knight.core.util.DateUtil;
import com.knight.emms.core.SettleBrief;

/**
 * @ClassName: SettleContractMath
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-2-26 下午4:00:05
 */
public class SettleContractMath {

	public static <T extends SettleBrief> Map<String, List<T>> groupSettleResource(Set<T> tbrief) {
		Calendar startcal = Calendar.getInstance();
		Calendar endcal = Calendar.getInstance();
		// 零配件清单分组
		List<T> tsubs = new ArrayList<T>();
		for (T t : tbrief) {
			int monthsub = t.getMonthSub();
			if (monthsub < 2) {
				@SuppressWarnings("unchecked")
				T temp = (T) t.clone();
				temp.setDeductRentRowspan(monthsub);
				// 判断是否足月
				endcal.setTime(DateUtil.changeStrToDate(temp.getEndSettleDate()));
				if (endcal.get(Calendar.DAY_OF_MONTH) == endcal.getActualMaximum(Calendar.DAY_OF_MONTH)) {
					temp.setSettleDays(0);
				}
				temp.setSummary(temp.getSummary().add(temp.getDeductRent()));
				tsubs.add(temp);
				continue;
			}
			for (int i = 1; i <= monthsub; i++) {
				@SuppressWarnings("unchecked")
				T temp = (T) t.clone();
				if (i == 1) {
					temp.setDeductRentRowspan(monthsub);
				} else {
					temp.setDeductRent(BigDecimal.ZERO);
				}
				startcal.setTime(DateUtil.changeStrToDate(temp.getStartSettleDate()));
				if (i == monthsub) {
					endcal.setTime(DateUtil.changeStrToDate(temp.getEndSettleDate()));
				} else {
					endcal.setTime(startcal.getTime());
					DateUtil.setLastDayOfMonth(endcal);
				}
				temp.setEndSettleDate(DateUtil.changeDateToStr(endcal.getTime(), DateUtil.LINK_DISPLAY_DATE)); // 设置成起始月份最后日期

				// 设置计费天数
				temp.setSettleDays(0);
				if ((i == 1 && startcal.get(Calendar.DAY_OF_MONTH) != 1) || (i == monthsub && endcal.get(Calendar.DAY_OF_MONTH) != endcal.getActualMaximum(Calendar.DAY_OF_MONTH))) {
					temp.setSettleDays(Integer.parseInt(((endcal.getTimeInMillis() - startcal.getTimeInMillis()) / (1000 * 60 * 60 * 24) + 1) + ""));
				}
				// 设置租金累计
				if (temp.getSettleDays() == 0) {
					temp.setSummary(temp.getRentStandard().multiply(new BigDecimal(temp.getQuantity())));
				} else {
					temp.setSummary(temp.getDaysRent().multiply(new BigDecimal(temp.getSettleDays())).multiply(new BigDecimal(temp.getQuantity())));
				}
				tsubs.add(temp);
				// 设置下一月,月初日期
				endcal.add(Calendar.DATE, 1);
				t.setStartSettleDate(DateUtil.changeDateToStr(endcal.getTime(), DateUtil.LINK_DISPLAY_DATE));
			}
		}
		Map<String, Map<String, T>> tgroup = new LinkedHashMap<String, Map<String, T>>(); // Map<品名, Map<groupkey, T>>
		for (T t : tsubs) { // 按品名分组
			Map<String, T> ls = null;
			if (tgroup.containsKey(t.getCategoryName())) {
				ls = tgroup.get(t.getCategoryName());
			} else {
				ls = new LinkedHashMap<String, T>();
				tgroup.put(t.getCategoryName(), ls);
			}
			if (ls.containsKey(t.getGroupKey())) {
				T temp = ls.get(t.getGroupKey());
				temp.setQuantity(temp.getQuantity() + t.getQuantity());
				temp.setDeductRent(temp.getDeductRent().add(t.getDeductRent()));
				temp.setSummary(temp.getSummary().add(t.getSummary()));
			} else {
				ls.put(t.getGroupKey(), t);
			}
		}
		Map<String, List<T>> tsm = new LinkedHashMap<String, List<T>>();
		for (Map.Entry<String, Map<String, T>> entry : tgroup.entrySet()) {
			List<T> ls = new ArrayList<T>();
			for (Map.Entry<String, T> e : entry.getValue().entrySet()) {
				ls.add(e.getValue());
			}
			ls.get(0).setCategoryRowspan(ls.size());
			tsm.put(entry.getKey(), ls);
		}
		return tsm;
	}
}
