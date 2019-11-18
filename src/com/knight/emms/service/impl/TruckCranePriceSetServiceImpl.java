package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.TruckCranePriceSetDao;
import com.knight.emms.model.TruckCranePriceSet;
import com.knight.emms.service.TruckCranePriceSetService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class TruckCranePriceSetServiceImpl extends BusinessLongPKServiceImpl<TruckCranePriceSet> implements TruckCranePriceSetService{

	@Resource
	TruckCranePriceSetDao truckCranePriceSetDao;
	
	public TruckCranePriceSetServiceImpl(TruckCranePriceSetDao dao) {
		super(dao);
		this.truckCranePriceSetDao = dao;
	}

}
