package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.dao.ProjectDepotInOutDao;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.service.ProjectDepotInOutService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: ProjectDepotInOutServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenzj
 * @date 2018-6-23 16:17:52
 */
public class ProjectDepotInOutServiceImpl extends BusinessLongPKServiceImpl<ProjectDepotInOut> implements ProjectDepotInOutService {

	@Resource
	private ProjectDepotInOutDao projectDepotInOutDao;
	
	public ProjectDepotInOutServiceImpl(ProjectDepotInOutDao dao) {
		super(dao);
		this.projectDepotInOutDao = dao;
	}

	@Override
	public boolean alreadyRecord(Long relateId, String relateModule) {
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_relateId_L_EQ", relateId+"");
		filter.addConjunctFilter("Q_relateModule_S_EQ", relateModule);
		List<ProjectDepotInOut> list = projectDepotInOutDao.getAll(filter);
		if(list.size()>0) {
			logger.info("模块："+relateModule+";  ID："+relateId+"  已存在出入库记录！");
			return true;
		}else{
			return false;
		}
	}
	
	@Override
	public void saveCreate(ProjectDepotInOut p) {
		p.setCreateTime(DateUtil.getCurrentLinkTimeStr());
		projectDepotInOutDao.save(p);
	}
}
