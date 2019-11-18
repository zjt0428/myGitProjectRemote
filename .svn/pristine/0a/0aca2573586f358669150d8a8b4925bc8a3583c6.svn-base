/**
 *====================================================
 * 文件名称: ComponDiaryServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.service.ExportService;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.DispatchComponDao;
import com.knight.emms.model.Borrow;
import com.knight.emms.model.BorrowComponent;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.Pickup;
import com.knight.emms.model.PickupComponent;
import com.knight.emms.model.extend.DiaryRelationMethod;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.support.ComponDiarySupport;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: ComponDiaryServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-20 上午8:10:42
 */
public class ComponDiaryServiceImpl extends BusinessLongPKServiceImpl<ComponDiary> implements ComponDiaryService, ExportService {

	private ComponDiaryDao componDiaryDao;

	@Resource
	private ComponentDao componentDao;

	@Resource
	private DispatchComponDao dispatchComponDao;

	public ComponDiaryServiceImpl(ComponDiaryDao dao) {
		super(dao);
		this.componDiaryDao = dao;
	}

	public void createComponDiary(Set<ComponDiary> componDiarySet, DiaryRelationMethod relation) {
		if (componDiarySet == null) {
			return;
		}
		for (ComponDiary diary : componDiarySet) {
			DispatchCompon dispatchCompon = new DispatchCompon();
			if (diary.getComponDiaryId() == null) {
				if (diary.getBusinessComponId() == null) {
					dispatchCompon.setComponent(componentDao.get(diary.getComponId()));
				} else {
					dispatchCompon = dispatchComponDao.get(diary.getBusinessComponId());
				}
				ComponDiarySupport.setFlowComponDiary(diary, relation, dispatchCompon);
				componDiaryDao.save(diary);
			}
		}
	}

	public void startPickupComponDiary(Pickup pickup, Set<PickupComponent> pickupComponentSet) {
		Date currentDate = new Date();
		for (PickupComponent pc : pickupComponentSet) {
			// 零配件占用
			Component c = componentDao.get(pc.getComponId());
			c.setConsumeCounts(c.getConsumeCounts() - pc.getQuantity());
			c.setStatus(Status.EquipCompon.inused);
			c.setStatusDate(currentDate);
			c.setPickupDate(pc.getPickupDate());
			componentDao.save(c);
			// 零配件日历-start
			ComponDiary cd = new ComponDiary();
			ComponDiarySupport.setDiaryBase(cd, c);

			cd.setBusinessId(pickup.getPickupId());
			cd.setBusinessSerial(pickup.getPickupSerial());
			cd.setBusinessTheme(pickup.getPickupTheme());
			cd.setBusinessModule(SystemConstant.MODULE_PICKUP);
			cd.setBusinessComponId(pc.getPickupComponId());
			cd.setStartDate(currentDate);
			cd.setCounts(pc.getQuantity());
			cd.setWarehouseCounts(0);
			cd.setBacksportCounts(0);
			cd.setJackingCounts(0);
			cd.setDismantleCounts(0);
			cd.setBacksportStatus(Status.Backsport.wait);
			cd.setStatus(Status.EquipComponStore.deliveryed);
			cd.setActive(Constant.ENABLED);
			componDiaryDao.save(cd);
		}
	}

	public void overPickupComponDiary(Pickup pickup, PickupComponent pickupComponent) {
		// 零配件释放
		Component c = componentDao.get(pickupComponent.getComponId());
		c.setStoreId(pickupComponent.getReturnStoreId() == null ? pickupComponent.getReturnStoreId() : c.getStoreId());
		c.setStatus(Status.EquipCompon.unused);
		c.setStatusDate(new Date());
		c.setConsumeCounts(c.getConsumeCounts()+pickupComponent.getQuantity());
		componentDao.save(c);
		// 零配件日历-end
		ComponDiary cd = componDiaryDao.getByrelateItem(pickupComponent.getPickupComponId(), pickup.getPickupId(), SystemConstant.MODULE_PICKUP);
		cd.setStatus(Status.EquipComponStore.deliveryed);
		cd.setWarehouseCounts(cd.getCounts());
		cd.setEndDate(new Date());
		componDiaryDao.save(cd);
	}

	public void startBorrowComponDiary(Borrow borrow, Set<BorrowComponent> borrowComponentSet) {
		Date currentDate = new Date();
		for (BorrowComponent bc : borrowComponentSet) {
			Component c = componentDao.get(bc.getComponId());
			// 零配件占用
			if (!Constant.ENABLED.equals(c.getConsumeFlag())) {
				c.setStatus(Status.EquipCompon.borrow);
				c.setStatusDate(currentDate);
			}
			if ("0".equalsIgnoreCase(borrow.getBorrowType())) { // 借进
				c.setConsumeCounts(c.getConsumeCounts() + bc.getBorrowCounts());
			} else {
				c.setConsumeCounts(c.getConsumeCounts() - bc.getBorrowCounts());
			}
			bc.setConsumeCounts(c.getConsumeCounts());
			componentDao.save(c);
			// 零配件日历-start
			ComponDiary cd = new ComponDiary();
			ComponDiarySupport.setDiaryBase(cd, c);

			cd.setBusinessId(borrow.getBorrowId());
			cd.setBusinessSerial(borrow.getBorrowSerial());
			cd.setBusinessTheme(borrow.getBorrowTheme());
			cd.setBusinessModule(SystemConstant.MODULE_BORROW);
			cd.setBusinessComponId(bc.getBorrowComponId());
			cd.setStartDate(currentDate);
			cd.setCounts(bc.getBorrowCounts());
			cd.setWarehouseCounts(0);
			cd.setBacksportCounts(0);
			cd.setJackingCounts(0);
			cd.setDismantleCounts(0);
			cd.setBacksportStatus(Status.Backsport.wait);
			cd.setStatus(Status.EquipComponStore.deliveryed);
			cd.setActive(Constant.ENABLED);
			componDiaryDao.save(cd);
		}
	}

	public void overBorrowComponDiary(Borrow borrow, BorrowComponent borrowComponent, BorrowComponent bor) {
		// 零配件释放
		Component c = componentDao.get(borrowComponent.getComponId());
		c.setStoreId(borrowComponent.getReturnStoreId() == null ? borrowComponent.getReturnStoreId() : c.getStoreId());
		c.setStatus(Status.EquipCompon.unused);
		c.setStatusDate(new Date());
		if ("0".equalsIgnoreCase(borrow.getBorrowType())) { // 借进
			c.setConsumeCounts(c.getConsumeCounts() - bor.getReturnCounts());
		} else {
			c.setConsumeCounts(c.getConsumeCounts() + bor.getReturnCounts());
		}
		borrowComponent.setConsumeCounts(c.getConsumeCounts());
		componentDao.save(c);
		// 零配件日历-end
		ComponDiary cd = componDiaryDao.getByrelateItem(borrowComponent.getBorrowComponId(), borrow.getBorrowId(), SystemConstant.MODULE_BORROW);
		cd.setStatus(Status.EquipComponStore.warehoused);
		cd.setWarehouseCounts(cd.getCounts());
		cd.setEndDate(new Date());
		componDiaryDao.save(cd);
	}

	public void loseBorrowComponDiary(Borrow borrow, BorrowComponent borrowComponent) {
		// 零配件遗失
		Component c = componentDao.get(borrowComponent.getComponId());
		c.setStatus(Status.EquipCompon.losed);
		c.setStatusDate(new Date());
		componentDao.save(c);
	}

	public void overPreInstallEmployDismantle(Long relateId, String relateModule, Date startDate) {
		componentDao.updateScirpt("dispatch.equipFlow_diary_component_preover", relateId, relateModule, startDate);
	}
	public List findBysql(String sql){
		List list = componentDao.findByHql(sql);
		return list;
		
	}

	public void fulfil(Long componDiaryId) {
		ComponDiary cd = componDiaryDao.get(componDiaryId);
		Component c = componentDao.get(cd.getComponId());
		if (Status.EquipCompon.inused.equals(c.getStatus())) {
			c.setStatus(Status.EquipCompon.unused);
			c.setStatusDate(new Date());
		}
		if (Constant.ENABLED.equals(c.getConsumeFlag())) {
			c.setConsumeCounts(c.getConsumeCounts() + cd.getCounts());
		}
		componentDao.save(c);
		componDiaryDao.remove(cd);
	}

}
