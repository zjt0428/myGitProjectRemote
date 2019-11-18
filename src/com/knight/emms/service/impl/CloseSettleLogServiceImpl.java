package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.CloseSettleLogDao;
import com.knight.emms.model.CloseSettleLog;
import com.knight.emms.service.CloseSettleLogService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class CloseSettleLogServiceImpl extends BusinessLongPKServiceImpl<CloseSettleLog> implements CloseSettleLogService{

	@Resource
	private CloseSettleLogDao closeSettleLogDao;
	
	public CloseSettleLogServiceImpl(CloseSettleLogDao dao) {
		super(dao);
		this.closeSettleLogDao = dao;
	}

}
