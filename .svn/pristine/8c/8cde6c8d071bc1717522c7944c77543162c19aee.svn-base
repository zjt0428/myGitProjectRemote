package com.knight.emms.service.impl;


import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.knight.emms.dao.InspectSelfChooseDetailDao;
import com.knight.emms.model.InspectSelfChooseDetail;
import com.knight.emms.service.InspectSelfChooseDetailService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class InspectSelfChooseDetailServiceImpl extends BusinessLongPKServiceImpl<InspectSelfChooseDetail> implements InspectSelfChooseDetailService {
	
	@Resource
	private InspectSelfChooseDetailDao inspectSelfChooseDetailDao;

	@Autowired(required = true)
	public InspectSelfChooseDetailServiceImpl(@Qualifier("inspectSelfChooseDetailDao") InspectSelfChooseDetailDao dao) {
		super(dao);
		this.inspectSelfChooseDetailDao = dao;
	}

	public void saveOrMerge(InspectSelfChooseDetail	 inspectSelfChooseDetail) {
		//TODO
	}
}
