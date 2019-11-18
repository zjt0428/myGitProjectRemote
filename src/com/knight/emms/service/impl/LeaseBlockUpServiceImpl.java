package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.LeaseBlockUpDao;
import com.knight.emms.model.LeaseBlockUp;
import com.knight.emms.service.LeaseBlockUpService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:39:56
* 类说明
*/
public class LeaseBlockUpServiceImpl extends BusinessLongPKServiceImpl<LeaseBlockUp> implements LeaseBlockUpService {

	@Resource
	private LeaseBlockUpDao leaseBlockUpDao;
	
	public LeaseBlockUpServiceImpl(LeaseBlockUpDao dao) {
		super(dao);
		this.leaseBlockUpDao = dao;
	}
	
	public List<LeaseBlockUp> queryTranslateAllFull(QueryFilter filter) {
		List<LeaseBlockUp> list = leaseBlockUpDao.getAll(filter);
	
		return list;
	}
	
	public LeaseBlockUp getTranslateFull(Long blockId) {
		LeaseBlockUp r = leaseBlockUpDao.get(blockId);
		CodeServiceImpl.translate(r);
		CodeServiceImpl.translate(r.getLeaseContract());
		return r;
	}

	@Override
	public void saveOrUpdate(LeaseBlockUp leaseBlockUp) {
		if (leaseBlockUp.getBlockId() == null) {
			leaseBlockUpDao.saveSerialModel(leaseBlockUp);
		}
		leaseBlockUp.setSubLeaseBlockUp();
		leaseBlockUpDao.merge(leaseBlockUp);
	}
	
}
