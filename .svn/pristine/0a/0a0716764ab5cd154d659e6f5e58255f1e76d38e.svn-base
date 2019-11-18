package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.BaseDepotDao;
import com.knight.emms.model.BaseDepot;
import com.knight.emms.service.BaseDepotService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class BaseDepotServiceImpl extends BusinessLongPKServiceImpl<BaseDepot> implements BaseDepotService {

	@Resource
	private BaseDepotDao baseDepotDao;
	
	public BaseDepotServiceImpl(BaseDepotDao dao) {
		super(dao);
		this.baseDepotDao = dao;
	}

}
