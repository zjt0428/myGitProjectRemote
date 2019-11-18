package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.BaseLocationDao;
import com.knight.emms.model.BaseLocation;
import com.knight.emms.model.BeforeMaterialsRepair;
import com.knight.emms.service.BaseLocationService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

public class BaseLocationServiceImpl extends BusinessLongPKServiceImpl<BaseLocation> implements BaseLocationService {

	@Resource
	private BaseLocationDao baseLocationDao;
	
	public BaseLocationServiceImpl(BaseLocationDao dao) {
		super(dao);
		this.baseLocationDao = dao;
	}
	
	public List<BaseLocation> queryBeforeRepairAll(QueryFilter filter) {
		filter.getPagingBean().setPageSize(1000);
		List<BaseLocation> before = baseLocationDao.getAll(filter);
		for (BaseLocation b : before) {
			CodeServiceImpl.translate(b, baseLocationDao.getPersistantStruct());
		}
		return before;
	}
}
