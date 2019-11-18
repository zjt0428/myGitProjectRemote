/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: LeaseRepairService.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月18日
 *====================================================
 * 文件描述: 租借维修 Service接口
 */
package com.knight.emms.service;

import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.LeaseRepair;

/**
 * @ClassName: LeaseRepairService
 * @Description: 租借维修 Service接口
 * @author 陈光毅
 * @date 2018年1月18日 上午10:14:14
 * @version v1.0
 */
public interface LeaseRepairService extends BusinessFlowService<LeaseRepair> {
	
	/** 删除维修前页签数据 */
	public void delBefore(Long beforeId);
	
	/** 删除维修后页签数据 */
	public void delAfter(Long afterId);
}
