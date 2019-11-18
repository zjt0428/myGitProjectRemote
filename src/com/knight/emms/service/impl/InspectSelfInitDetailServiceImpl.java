package com.knight.emms.service.impl;


import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.knight.emms.dao.InspectSelfInitDetailDao;
import com.knight.emms.model.InspectSelfInitDetail;
import com.knight.emms.service.InspectSelfInitDetailService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class InspectSelfInitDetailServiceImpl extends BusinessLongPKServiceImpl<InspectSelfInitDetail> implements InspectSelfInitDetailService {
	
	@Resource
	private InspectSelfInitDetailDao inspectInitDetailDao;

	@Autowired(required = true)
	public InspectSelfInitDetailServiceImpl(@Qualifier("inspectInitDetailDao") InspectSelfInitDetailDao dao) {
		super(dao);
		this.inspectInitDetailDao = dao;
	}

	public void saveOrMerge(InspectSelfInitDetail inspectInitDetail) {
		//TODO
	}
}
