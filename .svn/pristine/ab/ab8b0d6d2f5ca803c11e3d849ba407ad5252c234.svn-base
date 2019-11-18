package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.OtherLeaseBusinessDao;
import com.knight.emms.dao.OtherLeaseDetailDao;
import com.knight.emms.model.OtherLeaseBusiness;
import com.knight.emms.model.OtherLeaseDetail;
import com.knight.emms.service.OtherLeaseBusinessService;
import com.knight.system.service.impl.CodeServiceImpl;

public class OtherLeaseBusinessServiceImpl extends BusinessFlowServiceImpl<OtherLeaseBusiness> implements OtherLeaseBusinessService {

	private OtherLeaseBusinessDao otherLeaseBusinessDao;
	
	@Resource
	private OtherLeaseDetailDao otherLeaseDetailDao;

	public OtherLeaseBusinessServiceImpl(OtherLeaseBusinessDao dao) {
		super(dao);
		this.otherLeaseBusinessDao = dao;
	}
	
	public List<OtherLeaseBusiness> queryTranslateAllFull(QueryFilter filter) {
		List<OtherLeaseBusiness> list = otherLeaseBusinessDao.getAll(filter);
		for (OtherLeaseBusiness lc : list) {
			CodeServiceImpl.translate(lc, getPersistantStruct());
		}
		return list;
	}
	
	public OtherLeaseBusiness getTranslateFull(Long otherBusinessId) {
		OtherLeaseBusiness lc = otherLeaseBusinessDao.get(otherBusinessId);
		CodeServiceImpl.translate(lc, getPersistantStruct());
		for (OtherLeaseDetail p : lc.getOtherLeaseDetailSet()) {
			CodeServiceImpl.translate(p, otherLeaseDetailDao.getPersistantStruct());
		}
		return lc;
	}
	
	public void delete(Long otherBusinessId) {
		OtherLeaseBusiness otherLeaseBusiness = otherLeaseBusinessDao.get(otherBusinessId);
		otherLeaseBusinessDao.remove(otherLeaseBusiness);
	}

	@Override
	public void saveOrMergeForEdit(OtherLeaseBusiness t) {
		if (t.getOtherId() == null) {
			otherLeaseBusinessDao.saveSerialModel(t);
			if(t.getLeaseContract()!=null){
				t.setBusinessSerial(t.getLeaseContract().getLeaseSerial()+"-"+t.getBusinessSerial());
			}
		}
		t.setSubOtherBusiness();
		otherLeaseBusinessDao.merge(t);
	}

	@Override
	public void deleteDetail(Long detailId) {
		otherLeaseDetailDao.remove(detailId);
	}
	
}
