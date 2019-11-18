/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SchedulerSimpleFactoryBean.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-6-16			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.scheduling.quartz;

import java.lang.reflect.Method;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TimeZone;

import lombok.Setter;

import org.quartz.CronTrigger;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.StatefulJob;
import org.quartz.Trigger;
import org.springframework.scheduling.quartz.JobDetailAwareTrigger;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.util.ReflectionUtils;

import com.knight.core.exception.BusinessException;

/**
 * @ClassName: SchedulerSimpleFactoryBean
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-6-16 上午11:02:48
 */
public class SchedulerSimpleFactoryBean extends SchedulerFactoryBean {

	private static final String DEFAULT_GROUP = "DEFAULT_GROUP";

	@Setter
	private Map<Object, Map<String, String>> scheduljobs;

	@Override
	public void afterPropertiesSet() throws Exception {
		List<Trigger> triggers = new ArrayList<Trigger>();
		for (Entry<Object, Map<String, String>> entry : scheduljobs.entrySet()) {
			Object key = entry.getKey();
			for (Entry<String, String> property : entry.getValue().entrySet()) {
				String methodName = property.getKey();
				String cronExpression = property.getValue();

				Method methodObject = key.getClass().getMethod(methodName, new Class[0]);
				JobDetail jobDetail = new JobDetail(methodName, DEFAULT_GROUP, StatefulMethodInvokingJob.class);
				jobDetail.getJobDataMap().put("targetObject", key);
				jobDetail.getJobDataMap().put("methodObject", methodObject);
				jobDetail.setVolatility(true);
				jobDetail.setDurability(true);

				CronTriggerBean trigger = new CronTriggerBean(jobDetail, cronExpression);
				triggers.add(trigger);
			}
		}
		setTriggers(triggers.toArray(new Trigger[] {}));
		super.afterPropertiesSet();
	}

	public static class StatefulMethodInvokingJob implements StatefulJob {

		public void execute(JobExecutionContext context) throws JobExecutionException {
			JobDataMap jdm = context.getMergedJobDataMap();
			Object targetObject = jdm.get("targetObject");
			Method preparedMethod = (Method) jdm.get("methodObject");
			try {
				ReflectionUtils.makeAccessible(preparedMethod);
				Object result = preparedMethod.invoke(targetObject);
				context.setResult(result);
			} catch (Exception ex) {
				throw new BusinessException("Invocation of method '" + preparedMethod.getName() + "' on target class [" + targetObject.getClass() + "] failed", ex);
			}
		}
	}

	public static class CronTriggerBean extends CronTrigger implements JobDetailAwareTrigger {

		private static final long serialVersionUID = 1L;

		private JobDetail jobDetail;

		public CronTriggerBean(JobDetail jobDetail, String cronExpression) throws ParseException {
			this.jobDetail = jobDetail;
			setJobName(this.jobDetail.getName());
			setJobGroup(this.jobDetail.getGroup());
			if (getName() == null) {
				setName(this.jobDetail.getName() + "CornTrigger");
			}
			if (getGroup() == null) {
				setGroup(DEFAULT_GROUP);
			}
			if (getStartTime() == null) {
				setStartTime(new Date());
			}
			if (getTimeZone() == null) {
				setTimeZone(TimeZone.getDefault());
			}
			this.jobDetail = jobDetail;
			setJobName(this.jobDetail.getName());
			setJobGroup(this.jobDetail.getGroup());
			setCronExpression(cronExpression);
		}

		public JobDetail getJobDetail() {
			return this.jobDetail;
		}

	}
}
