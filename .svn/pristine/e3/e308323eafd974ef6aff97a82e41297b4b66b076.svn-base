package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.OtherBetsDao;
import com.knight.emms.dao.OtherBetsDetailDao;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipWarehouse;
import com.knight.emms.model.OtherBets;
import com.knight.emms.model.OtherBetsDetail;
import com.knight.emms.service.OtherBetsService;
import com.knight.system.service.impl.CodeServiceImpl;

public class OtherBetsServiceImpl extends BusinessFlowServiceImpl<OtherBets> implements OtherBetsService,ExportService {

	private OtherBetsDao otherBetsDao;
	
	@Resource
	private OtherBetsDetailDao otherBetsDetailDao;

	public OtherBetsServiceImpl(OtherBetsDao dao) {
		super(dao);
		this.otherBetsDao = dao;
	}
	
	public List<OtherBets> queryTranslateAllFull(QueryFilter filter) {
		List<OtherBets> list = otherBetsDao.getAll(filter);
		for (OtherBets lc : list) {
			CodeServiceImpl.translate(lc, getPersistantStruct());
		}
		return list;
	}
	
	public OtherBets getTranslateFull(Long otherBetsId) {
		OtherBets lc = otherBetsDao.get(otherBetsId);
		CodeServiceImpl.translate(lc, getPersistantStruct());
		for (OtherBetsDetail p : lc.getOtherBetsDetailSet()) {
			CodeServiceImpl.translate(p, otherBetsDetailDao.getPersistantStruct());
		}
		return lc;
	}
	
	public void delete(Long otherBetsId) {
		OtherBets otherBets = otherBetsDao.get(otherBetsId);
//		EquipFlow ef = equipWarehouse.getEquipFlow();
//		ef.setFlowState(Status.EquipFlow.dismantled);
		otherBetsDao.remove(otherBets);
	}

	@Override
	public void saveOrMergeForEdit(OtherBets t) {
		if (t.getOtherBetsId() == null) {
			otherBetsDao.saveSerialModel(t);
//			EquipFlow ef = lostCompensation.getEquipFlow();
//			equipFlowDao.load(ef, ef.getFlowId());
//			ef.setFlowState(Status.EquipFlow.warehousing);
//			equipFlowDao.save(ef);
		}
		if(t.getContractNumber()!=null){
			t.setOtherBetsSerial(t.getContractNumber()+"-"+t.getOtherBetsSerial());
		}
		t.setSubOtherBets();
		otherBetsDao.merge(t);
	}

	@Override
	public void deleteDetail(Long detailId) {
		otherBetsDetailDao.remove(detailId);
	}
	
	
}
