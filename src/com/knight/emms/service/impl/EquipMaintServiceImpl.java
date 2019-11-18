/**
 *====================================================
 * 文件名称: EquipMaintServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.EquipMaintDao;
import com.knight.emms.dao.EquipMaintSchemaDao;
import com.knight.emms.model.*;
import com.knight.emms.service.EquipHitchService;
import com.knight.emms.service.EquipMaintService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipMaintServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:33:59
 */
public class EquipMaintServiceImpl extends BaseBusinessModelServiceImpl<EquipMaint> implements EquipMaintService {

	private EquipMaintDao equipMaintDao;

	@Resource
	private EquipMaintSchemaDao equipMaintSchemaDao;

	@Resource
	private EquipHitchService equipHitchService;

	public EquipMaintServiceImpl(EquipMaintDao dao) {
		super(dao);
		this.equipMaintDao = dao;
	}

	public List<EquipMaint> queryTranslateFull(QueryFilter filter) {
		List<EquipMaint> list = equipMaintDao.getAll(filter);
		for (EquipMaint e : list) {
			CodeServiceImpl.translate(e, getPersistantStruct());
			CodeServiceImpl.translate(e.getEquipMaintSchema(), equipMaintSchemaDao.getPersistantStruct());
			//CodeServiceImpl.translate(e.getEquipMaintSchema().getEquipDiary());
		}
		return list;
	}

	public EquipMaint getTranslateFull(Long maintId) {
		EquipMaint e = equipMaintDao.get(maintId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipMaintSchema(), equipMaintSchemaDao.getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipMaintSchema().getEquipment());
		CodeServiceImpl.translate(e.getEquipment());
		for (EquipMaintDetail d : e.getEquipMaintDetailSet()) {
			CodeServiceImpl.translate(d.getComponent());
		}
		for (EquipMaintCompon d : e.getEquipMaintComponSet()) {
			CodeServiceImpl.translate(d.getComponent());
		}
		return e;
	}

	public void submit(Long maintId) {
		EquipMaint e = equipMaintDao.get(maintId);
		if (e.getMaintDate().getTime() > e.getThisEndCycleDate().getTime()) {
			e.setStatus(Status.HandleResult.overtime);
		} else {
			e.setStatus(Status.HandleResult.processed);
		}
		//EquipDiary ed = e.getEquipMaintSchema().getEquipDiary();
		for (EquipMaintDetail d : e.getEquipMaintDetailSet()) {
			if (Status.InspectResult.failed.equals(d.getDetailResult()) || Status.InspectResult.repair.equals(d.getDetailResult())) { // 生成故障单
				CodeServiceImpl.translate(d);
				Long relateId = e.getMaintId();
				String relateSerial = e.getMaintSerial();
				String relateModule = SystemConstant.MODULE_EQUIP_INSPECT;
				String detailResult = CodeServiceImpl.fastValue("INSPECT_RESULT", d.getDetailResult());
				String maintDate = DateUtil.changeDateToStr(e.getMaintDate(), DateUtil.LINK_DISPLAY_DATE);
//				String location = d.getComponent().getComponGenericName();
				String content = d.getSubstance();
			//	equipHitchService.createRelateHitch(relateId, relateSerial, relateModule, ed.getProjectId(), ed.getEquipId(), maintDate, detailResult, d.getDescription(), "", content);
			}
		}
		EquipMaintSchema s = e.getEquipMaintSchema();
		s.setMaintTimes(s.getMaintTimes() + 1);
		equipMaintSchemaDao.save(s);
	}

}
