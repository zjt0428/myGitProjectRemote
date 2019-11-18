/**
 *====================================================
 * 文件名称: SchedularArchiveDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain;

/**
 * @ClassName: SchedularArchiveDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-10 下午2:44:16
 */
public interface SchedularArchiveDomain {

	/** 企业资质到期验证及预警信息 */
	public void corpCertDueToRemind();

	/** 人员资质到期验证及预警信息 */
	public void practiCertDueToRemind();
	
	/** 下次检测时间提醒 */
	public void detectDateRemind();

	/** 设备到期预警信息及设备/零配件报废 */
	public void equipScrapToRemind();

	/** 设备/零配件 折旧率设置 */
	public void setDepreciateRate();

	/** 客户/供应商 联系人生日提醒 */
	public void birthdayRemind();

	/** 设备保险逾期提醒 */
	public void equipInsureOvertimeRemind();
	
	public void componentMthStocks();
	

}
