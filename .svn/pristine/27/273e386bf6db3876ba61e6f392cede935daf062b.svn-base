package com.knight.app.core.service.impl;

import org.springframework.transaction.annotation.Transactional;

import com.knight.app.core.mode.RemindModule;
import com.knight.app.core.service.RemindModuleService;
import com.knight.core.dao.GenericDao;
import com.knight.core.filter.QueryFilter;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * Created by YaoFl on 2016/8/19.
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class RemindModuleServiceImpl<T> extends BusinessLongPKServiceImpl<T> implements RemindModuleService<T> {

	public RemindModuleServiceImpl(GenericDao<T, Long> dao) {
		super(dao);
	}

	public int getCount(RemindModule remindModule) throws RuntimeException {
		QueryFilter filter = new QueryFilter();
		filter.setPagingBean(new PagingBean(0, 100000));
		filter.addConjunctFilter("Q_" + remindModule.getParams() + "_S_EQ", remindModule.getValue());
		return dao.getCountByFilter(filter);
	}

	public int getCount(RemindModule remindModule, long projectId) throws RuntimeException {
		QueryFilter filter = new QueryFilter();
		filter.setPagingBean(new PagingBean(0, 100000));
		filter.addConjunctFilter("Q_" + remindModule.getParams() + "_S_EQ", remindModule.getValue());
		filter.addConjunctFilter("Q_project.projectId_L_EQ", String.valueOf(projectId));
		return dao.getCountByFilter(filter);
	}
}
