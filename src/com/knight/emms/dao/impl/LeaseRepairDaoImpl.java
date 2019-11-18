/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: LeaseRepairDaoImpl.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月18日
 *====================================================
 * 文件描述: 租借维修 DAO接口实现
 */
package com.knight.emms.dao.impl;

import org.springframework.stereotype.Repository;

import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.LeaseRepairDao;
import com.knight.emms.model.LeaseRepair;

/**
 * @ClassName: LeaseRepairDaoImpl
 * @Description: 租借维修 DAO接口实现
 * @author 陈光毅
 * @date 2018年1月18日 上午10:10:30
 * @version v1.0
 */
@Repository("leaseRepairDao")
public class LeaseRepairDaoImpl extends BaseBusinessModelDaoImpl<LeaseRepair> implements LeaseRepairDao {

}
