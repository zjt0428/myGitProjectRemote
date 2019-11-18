package com.knight.emms.domain;

public interface ScheduleAppRepairDomain {
	
	
	/**
	 * 接收方：企业负责人、维修负责人）：故障申报超过4小时（申报时间+4小时）没有进行派工的故障，立即触发短信。
	 */
	public void listenApply();
	
	

	
	
}
