/**
 *====================================================
 * 文件名称: EquipDiaryServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
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
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.model.Borrow;
import com.knight.emms.model.BorrowEquip;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Project;
import com.knight.emms.service.EquipDiaryService;
import com.knight.emms.support.EquipDiarySupport;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: EquipDiaryServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:34:27
 */
public class EquipDiaryServiceImpl extends BusinessLongPKServiceImpl<EquipDiary> implements EquipDiaryService, ExportService {

	private EquipDiaryDao equipDiaryDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private ProjectDao projectDao;
	
	@Resource
	private ContractLeaseDao contractLeaseDao;

	public EquipDiaryServiceImpl(EquipDiaryDao dao) {
		super(dao);
		this.equipDiaryDao = dao;
	}

	public EquipDiary getEquipmentDiary(EquipDiary diary, boolean cleanFlag) {
		EquipDiary result = null;
		if (diary.getEquipDiaryId() != null) {
			result = equipDiaryDao.get(diary.getEquipDiaryId());
		} else {
			List<EquipDiary> ds = equipDiaryDao.queryRelationEquipmentDiary(diary);
			if (!ds.isEmpty()) {
				result = ds.get(0);
				if (cleanFlag && ds.size() > 1) {
					for (int i = 1; i < ds.size(); i++) {
						EquipDiary d = ds.get(i);
						equipDiaryDao.remove(d);
					}
				}
			}
		}
		return result;
	}

	public void startBorrowEquipDiary(Borrow borrow, Set<BorrowEquip> borrowEquipSet) {
		Date currentDate = new Date();
		for (BorrowEquip be : borrowEquipSet) {
			Equipment e = equipmentDao.get(be.getEquipId());
			// 设备占用
			e.setStatus(borrow.getBorrowType().equals("1")?Status.EquipCompon.inused:Status.EquipCompon.unused);
			e.setStatusDate(currentDate);
			equipmentDao.save(e);
			// 设备日历-start
			EquipDiary ed = new EquipDiary();
			EquipDiarySupport.setDiaryBase(ed, e);

			ed.setBusinessId(borrow.getBorrowId());
			ed.setBusinessSerial(borrow.getBorrowSerial());
			ed.setBusinessTheme(borrow.getBorrowTheme());
			ed.setBusinessModule(SystemConstant.MODULE_BORROW);
			ed.setBusinessEquipId(be.getBorrowEquipId());
			ed.setStartDate(currentDate);
			ed.setStatus(Status.EquipComponStore.delivering);
			ed.setActive(Constant.ENABLED);
			equipDiaryDao.save(ed);
		}
	}

	public EquipDiary overFlowEquipDiary(EquipDismantle equipDismantle) {
		EquipDiary ed = equipDismantle.getEquipFlow().getEquipDiary();
		ed.setEndDate(equipDismantle.getEnddisDate());
		equipDiaryDao.save(ed);
		return ed;
	}

	public void overBorrowEquipDiary(Borrow borrow, BorrowEquip borrowEquip) {
		// 设备释放
		Equipment e = equipmentDao.get(borrowEquip.getEquipId());
		e.setStoreId(borrowEquip.getReturnStoreId() == null ? borrowEquip.getReturnStoreId() : e.getStoreId());
		e.setStatus(Status.EquipCompon.unused);
		e.setBusinessStatus(Status.EquipBusiness.disenable);
		e.setStatusDate(new Date());
		equipmentDao.save(e);
		// 设备日历-end
		EquipDiary cd = equipDiaryDao.getByrelateItem(borrowEquip.getBorrowEquipId(), borrow.getBorrowId(), SystemConstant.MODULE_BORROW);
		cd.setEndDate(new Date());
		equipDiaryDao.save(cd);
	}

	public void loseBorrowEquipDiary(Borrow borrow, BorrowEquip borrowEquip) {
		// 设备遗失
		Equipment e = equipmentDao.get(borrowEquip.getEquipId());
		e.setStatus(Status.EquipCompon.losed);
		e.setStatusDate(new Date());
		equipmentDao.save(e);
	}

	public EquipDiary startFlowEquipDiary(Equipment equipment, Dispatch dispatch, DispatchEquip dispatchEquip) {
		// 创建设备工作日历
		EquipDiary ed = new EquipDiary();
		EquipDiarySupport.setDiaryBase(ed, equipment);
		ContractLease contractLease=contractLeaseDao.get(dispatch.getRelateId());
		Project project = projectDao.get(dispatch.getProjectId());
		ed.setProjectId(dispatch.getProjectId());
		ed.setProjectSerial(dispatch.getProjectSerial());
		ed.setProjectName(dispatch.getProjectName());
		ed.setProvince(project.getProvince());
		ed.setCity(project.getCity());
		ed.setCounty(project.getCounty());
		ed.setStreet(project.getStreet());
		ed.setAddress(contractLease.getAddress());
		ed.setBuildingNum(dispatchEquip.getBuildingNum());
		ed.setContractId(dispatch.getRelateId());
		ed.setBusinessId(dispatch.getDispatchId());
		ed.setBusinessSerial(dispatch.getDispatchSerial());
		ed.setBusinessTheme(dispatch.getDispatchTheme());
		ed.setBusinessModule(SystemConstant.MODULE_DISPATCH);
		ed.setBusinessEquipId(dispatchEquip.getDispatchEquipId());

		ed.setVerifyType(EquipFlow.VERIFY_TYPE.get(ed.getEquipGeneric()));
		ed.setStatus(Status.EquipComponStore.deliver);
		ed.setActive(Constant.DISENABLED);
		equipDiaryDao.save(ed);
		return ed;
	}

}
