package com.knight.emms.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ReceiveManageDao;
import com.knight.emms.dao.ReceiveManageDetailDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.ReceiveManage;
import com.knight.emms.model.ReceiveManageDetail;
import com.knight.emms.service.ReceiveManageService;
import com.knight.system.service.impl.CodeServiceImpl;

public class ReceiveManageServiceImpl extends BusinessFlowServiceImpl<ReceiveManage> implements ReceiveManageService {

	private ReceiveManageDao receiveManageDao;

	@Resource
	private ReceiveManageDetailDao receiveManageDetailDao;

	public ReceiveManageServiceImpl(ReceiveManageDao dao) {
		super(dao);
		this.receiveManageDao = dao;
	}

	public ReceiveManage getTranslateFull(Long receiveId) {
		ReceiveManage p = receiveManageDao.get(receiveId);
		CodeServiceImpl.translate(p, getPersistantStruct());
		for (ReceiveManageDetail c : p.getReceiveManageDetailSet()) {
			CodeServiceImpl.translate(c, receiveManageDetailDao.getPersistantStruct());
		}
		return p;
	}

	public void saveOrMergeForEdit(ReceiveManage receiveManage) {
		if (receiveManage.getReceiveId() == null) {
			receiveManageDao.saveSerialModel(receiveManage,receiveManage.getProvideDate().replace("-", ""));
		}
		receiveManage.setSubPickup();
		receiveManageDao.merge(receiveManage);
	}

	public void deletedDetail(Long detailId) {
		receiveManageDetailDao.remove(detailId);
	}

	public void passApproveApplication(FormApprove formApprove) {
		ReceiveManage t = super.passFlowApproveApplication(formApprove);
		t.setStatus(Status.Pickup.execute);
//		for (ReceiveManageDetail pc : t.getReceiveManageDetailSet()) {
//			pc.setStatus(Status.Pickup.execute);
//		}
//		componDiaryService.startPickupComponDiary(t, t.getPickupComponentSet());
		receiveManageDao.save(t);
	}

	public void returnMaterials(Long receivesId, Map<Long, ReceiveManageDetail> receiveManageDetails) {
		/*Pickup p = pickupDao.get(pickupId);
		boolean fullReturnFlag = true;
		for (PickupComponent pc : p.getPickupComponentSet()) {
			if (Status.Pickup.returned.equals(pc.getStatus())) {
				continue;
			}
			if (pickupComponents.containsKey(pc.getPickupComponId())) {
				pc.setStatus(Status.Pickup.returned);
				pc.setUserId(ApplicationContainer.getCurrentUserId());
				pc.setUserName(ApplicationContainer.getCurrentUser().getFullname());
				pc.setReturnDate(DateUtil.getCurrentLinkDateStr());
				pc.setReturnStoreId(pickupComponents.get(pc.getPickupComponId()).getReturnStoreId());
				componDiaryService.overPickupComponDiary(p, pc);
			} else {
				fullReturnFlag = false;
			}
		}
		if (fullReturnFlag) {
			p.setPickupStatus(Status.Pickup.returned);
		} else {
			p.setPickupStatus(Status.Pickup.returning);
		}
		pickupDao.save(p);*/
	}

}
