package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.ProjectDepotInitDao;
import com.knight.emms.dao.ProjectDepotInitDetailDao;
import com.knight.emms.model.ProjectDepotInit;
import com.knight.emms.service.ProjectDepotInitService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class ProjectDepotInitServiceImpl extends BusinessLongPKServiceImpl<ProjectDepotInit> implements ProjectDepotInitService {

	@Resource
	private ProjectDepotInitDao projectDepotInitDao;
	
	@Resource
	private ProjectDepotInitDetailDao projectDepotInitDetailDao;
	
	public ProjectDepotInitServiceImpl(ProjectDepotInitDao dao) {
		super(dao);
		this.projectDepotInitDao = dao;
	}

	@Override
	public void deleteDetail(Long id) {
		projectDepotInitDetailDao.remove(id);
	}

}
