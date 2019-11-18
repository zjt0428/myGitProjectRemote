package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.InstallPriceSetDao;
import com.knight.emms.model.InstallPriceSet;
import com.knight.emms.service.InstallPriceSetService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class InstallPriceSetServiceImpl extends BusinessLongPKServiceImpl<InstallPriceSet> implements InstallPriceSetService{

	@Resource
	private InstallPriceSetDao installPriceSetDao;
	
	public InstallPriceSetServiceImpl(InstallPriceSetDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
		this.installPriceSetDao = dao;
	}

}
