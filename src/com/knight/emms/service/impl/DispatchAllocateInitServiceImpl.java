package com.knight.emms.service.impl;

import com.knight.core.dao.GenericDao;
import com.knight.emms.model.DispatchAllocateInit;
import com.knight.emms.service.DispatchAllocateInitService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class DispatchAllocateInitServiceImpl extends BusinessLongPKServiceImpl<DispatchAllocateInit> implements DispatchAllocateInitService {

	public DispatchAllocateInitServiceImpl(GenericDao<DispatchAllocateInit, Long> dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}
	
}
