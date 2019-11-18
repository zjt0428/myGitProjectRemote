package com.knight.emms.service.impl;


import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.PermissionManagerDao;
import com.knight.emms.model.PermissionManager;
import com.knight.emms.service.PermissionManagerService;
import com.knight.system.dao.DepartmentDao;
import com.knight.system.model.Department;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

import javax.annotation.Resource;
import java.util.List;

public class PermissionManagerServiceImpl extends BusinessLongPKServiceImpl<PermissionManager> implements PermissionManagerService {

	@Resource
	private PermissionManagerDao permissionManagerDao;

	@Resource
	private DepartmentDao departmentDao;

	public PermissionManagerServiceImpl(PermissionManagerDao dao) {
		super(dao);
		this.permissionManagerDao = dao;
	}

	public String concatPermission(Long depId) {
		StringBuffer sb = new StringBuffer();
		if(depId!=null) {
			Department dep = departmentDao.get(depId);
			if(dep!=null) {
				sb.append("d").append(dep.getDepSerial()).append("d,");
				if(dep.getParentId()!=null) {
					sb.append(concatPermission(dep.getParentId()));
				}
			}
		}
		return sb.toString();
	}

	@Override
	public PermissionManager createModel(Long depId, Long relateId, String relateModule) {
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_relateId_L_EQ",relateId+"");
		filter.addConjunctFilter("Q_relateModule_S_EQ",relateModule);
		List<PermissionManager> list = permissionManagerDao.getAll(filter);
		if(list.size()>0) {
			return list.get(0);
		}
		if(depId!=null) {
			String permissionFlag = concatPermission(depId);
			PermissionManager pm = new PermissionManager();
			pm.setRelateId(relateId);
			pm.setRelateModule(relateModule);
			pm.setPermissionFlag(permissionFlag);
			permissionManagerDao.save(pm);
			return pm;
		}
		return null;
	}

}
