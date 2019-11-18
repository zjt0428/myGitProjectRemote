package com.knight.emms.service.impl;


import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.knight.emms.dao.InspectSelfInitDao;
import com.knight.emms.model.InspectSelfInit;
import com.knight.emms.model.Inventory;
import com.knight.emms.service.InspectSelfInitService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class InspectSelfInitServiceImpl extends BusinessLongPKServiceImpl<InspectSelfInit> implements InspectSelfInitService {
	
	@Resource
	private InspectSelfInitDao inspectSelfInitDao;

	@Autowired(required = true)
	public InspectSelfInitServiceImpl(@Qualifier("inspectInitDao") InspectSelfInitDao dao) {
		super(dao);
		this.inspectSelfInitDao = dao;
	}

	public void saveOrMerge(InspectSelfInit inspectSelfInit) {
		if (inspectSelfInit.getInitId() == null) {
			inspectSelfInitDao.save(inspectSelfInit);
			inspectSelfInit.complete();
		}
		inspectSelfInitDao.merge(inspectSelfInit);
	}
}
