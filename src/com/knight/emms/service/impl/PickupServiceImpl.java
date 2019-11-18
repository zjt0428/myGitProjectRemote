/**
 *====================================================
 * 文件名称: PickupServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.PickupComponentDao;
import com.knight.emms.dao.PickupDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.Pickup;
import com.knight.emms.model.PickupComponent;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.service.PickupService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: PickupServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 上午8:35:24
 */
public class PickupServiceImpl extends BusinessFlowServiceImpl<Pickup> implements PickupService {

	private PickupDao pickupDao;

	@Resource
	private PickupComponentDao pickupComponentDao;

	@Resource
	private ComponDiaryService componDiaryService;

	public PickupServiceImpl(PickupDao dao) {
		super(dao);
		this.pickupDao = dao;
	}

	public Pickup getTranslateFull(Long pickupId) {
		Pickup p = pickupDao.get(pickupId);
		CodeServiceImpl.translate(p, getPersistantStruct());
		CodeServiceImpl.translate(p.getEquipment());
		for (PickupComponent c : p.getPickupComponentSet()) {
			CodeServiceImpl.translate(c, pickupComponentDao.getPersistantStruct());
		}
		return p;
	}

	public void saveOrMergeForEdit(Pickup pickup) {
		if (pickup.getPickupId() == null) {
			pickupDao.saveSerialModel(pickup,pickup.getProvidedDate().replace("-", ""));
		}
		pickup.setSubPickup();
		pickupDao.merge(pickup);
	}

	public void deletedComponent(Long pickupComponId) {
		pickupComponentDao.remove(pickupComponId);
	}

	public void passApproveApplication(FormApprove formApprove) {
		Pickup t = super.passFlowApproveApplication(formApprove);
		t.setPickupStatus(Status.Pickup.execute);
		for (PickupComponent pc : t.getPickupComponentSet()) {
			pc.setStatus(Status.Pickup.execute);
		}
		componDiaryService.startPickupComponDiary(t, t.getPickupComponentSet());
		pickupDao.save(t);
	}

	public void returnPickup(Long pickupId, Map<Long, PickupComponent> pickupComponents) {
		Pickup p = pickupDao.get(pickupId);
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
		pickupDao.save(p);
	}

}
