/**
 *====================================================
 * 文件名称: SchemaMethod.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-11			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.model;

import java.util.Date;

/**
 * @ClassName: SchemaMethod
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-11 下午10:03:59
 */
public interface SchemaMethod {

	public Date getCycleActivateDate();

	public void setCycleActivateDate(Date cycleActivateDate);

	public Integer getCycleDays();

	public void setCycleDays(Integer cycleDays);

	public Integer getTimesInCycle();

	public void setTimesInCycle(Integer timesInCycle);

	public Integer getCycleTimes();

	public void setCycleTimes(Integer cycleTimes);

	public Integer getCycleDaysTimes();

	public void setCycleDaysTimes(Integer cycleDaysTimes);

	public Date getThisStartCycleDate();

	public void setThisStartCycleDate(Date thisStartCycleDate);

	public Date getThisEndCycleDate();

	public void setThisEndCycleDate(Date thisEndCycleDate);

	public Date getNextFormTime();

	public void setNextFormTime(Date nextFormTime);

	public Date getNextStartCycleDate();

	public void setNextStartCycleDate(Date nextStartCycleDate);
}
