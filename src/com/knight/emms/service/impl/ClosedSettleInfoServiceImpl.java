package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.ClosedSettleInfoDao;
import com.knight.emms.model.ClosedSettleInfo;
import com.knight.emms.service.ClosedSettleInfoService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class ClosedSettleInfoServiceImpl extends BusinessLongPKServiceImpl<ClosedSettleInfo> implements ClosedSettleInfoService{

	@Resource
	private ClosedSettleInfoDao closedSettleInfoDao;
	
	public ClosedSettleInfoServiceImpl(ClosedSettleInfoDao dao) {
		super(dao);
		this.closedSettleInfoDao = dao;
	}

}
