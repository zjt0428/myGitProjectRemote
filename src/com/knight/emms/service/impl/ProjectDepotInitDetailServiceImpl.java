package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.ProjectDepotInitDetailDao;
import com.knight.emms.model.ProjectDepotInitDetail;
import com.knight.emms.service.ProjectDepotInitDetailService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class ProjectDepotInitDetailServiceImpl extends BusinessLongPKServiceImpl<ProjectDepotInitDetail> implements ProjectDepotInitDetailService {

	@Resource
	private ProjectDepotInitDetailDao projectDepotInitDetailDao;
	
	public ProjectDepotInitDetailServiceImpl(ProjectDepotInitDetailDao dao) {
		super(dao);
		this.projectDepotInitDetailDao = dao;
	}

}
