package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.OtherBusinessDao;
import com.knight.emms.dao.OtherBusinessDetailDao;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipWarehouse;
import com.knight.emms.model.OtherBusiness;
import com.knight.emms.model.OtherBusinessDetail;
import com.knight.emms.service.OtherBusinessService;
import com.knight.system.service.impl.CodeServiceImpl;

public class OtherBusinessServiceImpl extends BusinessFlowServiceImpl<OtherBusiness> implements OtherBusinessService {

	private OtherBusinessDao otherBusinessDao;
	
	@Resource
	private OtherBusinessDetailDao otherBusinessDetailDao;

	public OtherBusinessServiceImpl(OtherBusinessDao dao) {
		super(dao);
		this.otherBusinessDao = dao;
	}
	
	public List<OtherBusiness> queryTranslateAllFull(QueryFilter filter) {
		List<OtherBusiness> list = otherBusinessDao.getAll(filter);
		for (OtherBusiness lc : list) {
			CodeServiceImpl.translate(lc, getPersistantStruct());
		}
		return list;
	}
	
	public OtherBusiness getTranslateFull(Long otherBusinessId) {
		OtherBusiness lc = otherBusinessDao.get(otherBusinessId);
		CodeServiceImpl.translate(lc, getPersistantStruct());
		for (OtherBusinessDetail p : lc.getOtherBusinessDetailSet()) {
			CodeServiceImpl.translate(p, otherBusinessDetailDao.getPersistantStruct());
		}
		return lc;
	}
	
	public void delete(Long otherBusinessId) {
		OtherBusiness otherBusiness = otherBusinessDao.get(otherBusinessId);
		otherBusinessDao.remove(otherBusiness);
	}

	@Override
	public void saveOrMergeForEdit(OtherBusiness t) {
		if (t.getOtherBusinessId() == null) {
			otherBusinessDao.saveSerialModel(t);
			if(t.getContractNumber()!=null){
				t.setOtherBusinessSerial(t.getContractNumber()+"-"+t.getOtherBusinessSerial());
			}
		}
		t.setSubOtherBusiness();
		otherBusinessDao.merge(t);
	}

	@Override
	public void deleteDetail(Long detailId) {
		otherBusinessDetailDao.remove(detailId);
	}
	
}
