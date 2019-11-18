/**
 *====================================================
 * 文件名称: EquipRepairServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.EquipRepairDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.model.Component;
import com.knight.emms.model.EquipRepair;
import com.knight.emms.model.EquipRepairCompon;
import com.knight.emms.model.EquipRepairLocation;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.FormApprove;
import com.knight.emms.service.EquipRepairService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipRepairServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-6 下午11:02:52
 */
public class EquipRepairServiceImpl extends BusinessFlowServiceImpl<EquipRepair> implements EquipRepairService {

	private EquipRepairDao equipRepairDao;

	@Resource
	private ComponentDao componentDao;

	@Resource
	private EquipmentDao equipmentDao;

	public EquipRepairServiceImpl(EquipRepairDao dao) {
		super(dao);
		this.equipRepairDao = dao;
	}

	public void saveOrMergeForEdit(EquipRepair equipRepair) {
		if (equipRepair.getRepairId() == null) {
			equipRepairDao.saveSerialModel(equipRepair);
		}
		equipRepair.setSubEquipRepair();
		equipRepairDao.merge(equipRepair);
	}

	public List<EquipRepair> queryTranslateAllFull(QueryFilter filter) {
		List<EquipRepair> list = equipRepairDao.getAll(filter);
		for (EquipRepair e : list) {
			CodeServiceImpl.translate(e, getPersistantStruct());
			CodeServiceImpl.translate(e.getEquipment());
		}
		return list;
	}

	public EquipRepair getTranslateFull(Long repairId) {
		EquipRepair e = equipRepairDao.get(repairId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipment());
		for (EquipRepairCompon c : e.getEquipRepairOldComponSet()) {
			CodeServiceImpl.translate(c.getComponent());
		}
		for (EquipRepairCompon c : e.getEquipRepairNewComponSet()) {
			CodeServiceImpl.translate(c.getComponent());
		}
		for (EquipRepairLocation c : e.getEquipRepairLocationSet()) {
			CodeServiceImpl.translate(c);
		}
		return e;
	}

	protected EquipRepair passFlowApproveApplication(FormApprove formApprove) {
		EquipRepair t = super.passFlowApproveApplication(formApprove);
		Equipment equipment = t.getEquipment();
		equipment.setLatestRepairDate(t.getProvidedDate());
//		equipment.setBusinessStatus(Status.EquipBusiness.disenable);
		equipmentDao.save(equipment);
//		for (EquipRepairCompon nc : t.getEquipRepairNewComponSet()) {
//			Component component = nc.getComponent();
//			component.setConsumeCounts(component.getConsumeCounts() - nc.getCounts());
//			componentDao.save(component);
//		}
		return t;
	}

}
