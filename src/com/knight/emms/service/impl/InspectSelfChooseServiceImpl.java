package com.knight.emms.service.impl;


import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.knight.emms.dao.InspectSelfChooseDao;
import com.knight.emms.model.InspectSelfChoose;
import com.knight.emms.service.InspectSelfChooseService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class InspectSelfChooseServiceImpl extends BusinessLongPKServiceImpl<InspectSelfChoose> implements InspectSelfChooseService {
	
	@Resource
	private InspectSelfChooseDao inspectSelfChooseDao;

	@Autowired(required = true)
	public InspectSelfChooseServiceImpl(@Qualifier("inspectSelfChooseDao") InspectSelfChooseDao dao) {
		super(dao);
		this.inspectSelfChooseDao = dao;
	}

}
