/**
 *====================================================
 * 文件名称: SchemaSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import java.util.Calendar;
import java.util.Date;

import com.knight.core.util.DateUtil;
import com.knight.emms.core.model.SchemaMethod;
import com.knight.emms.model.EquipInspectSchema;

/**
 * @ClassName: SchemaSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-10 上午9:57:45
 */
public class SchemaSupport {

	/** 计算下一周期起始时间、当前周期截止日期、下一任务生成时间 */
	public static void caculateSchemaNextDate(SchemaMethod schema) {
		Date activateDate = schema.getCycleActivateDate();
		int cycleDays = schema.getCycleDays(); // 周期天数
		int timesInCycle = schema.getTimesInCycle(); // 周期频率
		if (schema.getCycleDaysTimes() >= schema.getTimesInCycle()) {
			schema.setCycleDaysTimes(0);
			schema.setCycleTimes(schema.getCycleTimes() + 1);
		}

		int cycleTimes = schema.getCycleTimes(); // 周期次数
		int cycleDaysTimes = schema.getCycleDaysTimes(); // 周期内执行次数
		// 当前周期起始日期
		Date thisStartCycleDate = DateUtil.transpositionDate(activateDate, Calendar.DATE, cycleDays * (cycleTimes - 1));
		schema.setThisStartCycleDate(thisStartCycleDate);
		// 下一周期起始日期
		Date nextStartCycleDate = DateUtil.transpositionDate(thisStartCycleDate, Calendar.DATE, cycleDays);
		schema.setNextStartCycleDate(nextStartCycleDate);
		// 当前周期截止日期
		Date thisEndCycleDate = DateUtil.setEndDay(DateUtil.transpositionDate(nextStartCycleDate, Calendar.DATE, -1));
		schema.setThisEndCycleDate(thisEndCycleDate);
		// 下一任务生成时间
		Date nextFormTime = new Date(thisStartCycleDate.getTime() + ((nextStartCycleDate.getTime() - thisStartCycleDate.getTime()) / timesInCycle * cycleDaysTimes));
		schema.setNextFormTime(nextFormTime);
	}

	public static void caculateCurrentExeSchemaTimes(SchemaMethod schema) {
		schema.setCycleDaysTimes(schema.getCycleDaysTimes() + 1);
		if (schema.getCycleDaysTimes() > schema.getTimesInCycle()) {
			schema.setCycleDaysTimes(1);
			schema.setCycleTimes(schema.getCycleTimes() + 1);
		}
	}

	public static void main(String[] args) {
		int i1, i2, j1, j2;
		EquipInspectSchema schema = new EquipInspectSchema();
		schema.setCycleActivateDate(DateUtil.changeStrToDate("2014-05-01"));
		schema.setCycleDays(3);
		schema.setTimesInCycle(3);

		schema.setCycleTimes(1);
		schema.setCycleDaysTimes(0);
		caculateSchemaNextDate(schema);
		System.out.println(schema.getCycleActivateDate());
		System.out.println(schema.getThisStartCycleDate());
		System.out.println(schema.getThisEndCycleDate());
		System.out.println(schema.getNextFormTime());
		System.out.println(schema.getNextStartCycleDate());
		System.out.println(">>>>>>>>>>>>>>>>>");
		i1 = schema.getCycleTimes();
		j1 = schema.getCycleDaysTimes();
		caculateCurrentExeSchemaTimes(schema);
		i2 = schema.getCycleTimes();
		j2 = schema.getCycleDaysTimes();
		System.out.println(i1 + " -> " + i2);
		System.out.println(j1 + " -> " + j2);
		caculateSchemaNextDate(schema);
		System.out.println(schema.getCycleActivateDate());
		System.out.println(schema.getThisStartCycleDate());
		System.out.println(schema.getThisEndCycleDate());
		System.out.println(schema.getNextFormTime());
		System.out.println(schema.getNextStartCycleDate());
		System.out.println(">>>>>>>>>>>>>>>>>");
		i1 = schema.getCycleTimes();
		j1 = schema.getCycleDaysTimes();
		caculateCurrentExeSchemaTimes(schema);
		i2 = schema.getCycleTimes();
		j2 = schema.getCycleDaysTimes();
		System.out.println(i1 + " -> " + i2);
		System.out.println(j1 + " -> " + j2);
		caculateSchemaNextDate(schema);
		System.out.println(schema.getThisStartCycleDate());
		System.out.println(schema.getThisEndCycleDate());
		System.out.println(schema.getNextFormTime());
		System.out.println(schema.getNextStartCycleDate());
		System.out.println(">>>>>>>>>>>>>>>>>");
		i1 = schema.getCycleTimes();
		j1 = schema.getCycleDaysTimes();
		caculateCurrentExeSchemaTimes(schema);
		i2 = schema.getCycleTimes();
		j2 = schema.getCycleDaysTimes();
		System.out.println(i1 + " -> " + i2);
		System.out.println(j1 + " -> " + j2);
		caculateSchemaNextDate(schema);
		System.out.println(schema.getThisStartCycleDate());
		System.out.println(schema.getThisEndCycleDate());
		System.out.println(schema.getNextFormTime());
		System.out.println(schema.getNextStartCycleDate());
		System.out.println(">>>>>>>>>>>>>>>>>");
		i1 = schema.getCycleTimes();
		j1 = schema.getCycleDaysTimes();
		caculateCurrentExeSchemaTimes(schema);
		i2 = schema.getCycleTimes();
		j2 = schema.getCycleDaysTimes();
		System.out.println(i1 + " -> " + i2);
		System.out.println(j1 + " -> " + j2);
		caculateSchemaNextDate(schema);
		System.out.println(schema.getThisStartCycleDate());
		System.out.println(schema.getThisEndCycleDate());
		System.out.println(schema.getNextFormTime());
		System.out.println(schema.getNextStartCycleDate());
		System.out.println(">>>>>>>>>>>>>>>>>");
		i1 = schema.getCycleTimes();
		j1 = schema.getCycleDaysTimes();
		caculateCurrentExeSchemaTimes(schema);
		i2 = schema.getCycleTimes();
		j2 = schema.getCycleDaysTimes();
		System.out.println(i1 + " -> " + i2);
		System.out.println(j1 + " -> " + j2);
		caculateSchemaNextDate(schema);
		System.out.println(schema.getThisStartCycleDate());
		System.out.println(schema.getThisEndCycleDate());
		System.out.println(schema.getNextFormTime());
		System.out.println(schema.getNextStartCycleDate());

	}
}
