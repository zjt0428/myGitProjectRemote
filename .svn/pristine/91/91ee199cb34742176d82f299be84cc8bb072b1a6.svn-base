/**
 *====================================================
 * 文件名称: EquipEmployServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipEmployDao;
import com.knight.emms.dao.EquipInstallDao;
import com.knight.emms.domain.BusinessEquipFlowValidate;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipEmploy;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.PractiDiary;
import com.knight.emms.service.EquipEmployService;
import com.knight.emms.support.PractiDiarySupport;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipEmployServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:32:17
 */
public class EquipEmployServiceImpl extends BusinessEquipFlowValidate<EquipEmploy> implements EquipEmployService {

	private EquipEmployDao equipEmployDao;

	@Resource
	private EquipInstallDao equipInstallDao;

	public EquipEmployServiceImpl(EquipEmployDao dao) {
		super(dao);
		this.equipEmployDao = dao;
	}

	public List<EquipEmploy> queryTranslateAllFull(QueryFilter filter) {
		List<EquipEmploy> list = equipEmployDao.getAll(filter);
		for (EquipEmploy ee : list) {
			CodeServiceImpl.translate(ee, getPersistantStruct());
			CodeServiceImpl.translate(ee.getEquipFlow(), equipFlowDao.getPersistantStruct());
			CodeServiceImpl.translate(ee.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
		}
		return list;
	}

	public EquipEmploy getTranslateFull(Long employId) {
		EquipEmploy ee = equipEmployDao.get(employId);
		CodeServiceImpl.translate(ee, getPersistantStruct());
		CodeServiceImpl.translate(ee.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
		for (PractiDiary d : ee.getPractiDiarySet()) {
			CodeServiceImpl.translate(d, practiDiaryService.getPersistantStruct());
		}
		for (ComponDiary p : ee.getComponDiarySet()) {
			CodeServiceImpl.translate(p, componDiaryService.getPersistantStruct());
		}
		return ee;
	}

	@Override
	public void saveOrMergeForEdit(EquipEmploy equipEmploy) {
		EquipFlow ef = equipEmploy.getEquipFlow();
		if (equipEmploy.getEmployId() == null) {
			equipFlowDao.load(ef, ef.getFlowId());
			if (!Status.EquipFlow.installed.equals(ef.getFlowState())) {
				throw new BusinessException("该设备[" + ef.getEquipDiary().getRecordId() + "]状态不予保存使用信息!");
			}
			equipEmploy.setEmployDate(DateUtil.changeStrToDate(ef.getEquipActivate().getActivateDate()));
			equipEmployDao.saveSerialModel(equipEmploy);
		} else {
			equipEmployDao.merge(equipEmploy);
		}
		// 导入流程信息
		ef.setFlowState(Status.EquipFlow.employing);
		equipFlowDao.save(ef);

		equipEmploy.setSubEquipEmploy();
		componDiaryService.createComponDiary(equipEmploy.getComponDiarySet(), equipEmploy);
		practiDiaryService.createPractiDiary(equipEmploy.getPractiDiarySet(), equipEmploy);
	}

	public void submitEmploy(Long employId) {
		EquipEmploy t = equipEmployDao.get(employId);
		if (!Status.EquipFlowApplyfor.waitSubmit.equals(t.getApplyforState())) {
			throw new BusinessException("[" + t.getEmploySerial() + "]使用申请状态不合法!");
		}
		t.setApplyforState(Status.EquipFlowApplyfor.waitApprove);
		equipEmployDao.save(t);
	}

	protected EquipEmploy passFlowApproveApplication(FormApprove formApprove) {
		EquipEmploy t = super.passFlowApproveApplication(formApprove);
		Date currentTime = new Date();
		// 零配件合法状态(借用/领用)验证
		super.validateInPickupBorrow(t.getEmployId(), SystemConstant.MODULE_EQUIP_EMPLOY, currentTime, SQLServerDialect.MAX_DATE);
		if (formApprove.isVetWarning()) { // 零配件流转状态验证
			super.warningInInstallEmployDismantle(t.getEmployId(), SystemConstant.MODULE_EQUIP_EMPLOY, currentTime, SQLServerDialect.MAX_DATE);
		}

		// 流程转至使用完成
		EquipFlow ef = t.getEquipFlow();
		ef.setEmployId(t.getEmployId());
		ef.setFlowState(Status.EquipFlow.employed);
		equipFlowDao.save(ef);

		// 设备转至使用业务
		EquipDiary ed = ef.getEquipDiary();
		ed.setRelateId(t.getEmployId());
		ed.setRelateSerial(t.getEmploySerial());
		ed.setRelateTheme(t.getEmployTheme());
		ed.setRelateModule(SystemConstant.MODULE_EQUIP_EMPLOY);
		equipDiaryService.save(ed);

		// 设备业务状态
		Equipment e = t.getEquipFlow().getEquipment();
		e.setBusinessStatus(Status.EquipBusiness.employ);
		equipmentDao.save(e);

		EquipInstall install = ef.getEquipInstall();
		// 零配件日历启用/零配件占用
		for (ComponDiary cd : t.getComponDiarySet()) {
			Component compon = componentDao.get(cd.getComponId());
			if (Constant.ENABLED.equals(compon.getConsumeFlag())) {
				if (compon.getConsumeCounts() <= cd.getCounts()) {
					compon.setStatus(Status.EquipCompon.inused);
				}
				compon.setConsumeCounts(compon.getConsumeCounts() - cd.getCounts());
			} else {
				compon.setStatus(Status.EquipCompon.inused);
				compon.setStatusDate(currentTime);
			}
			componentDao.save(compon);

			cd.setStartDate(currentTime);
			cd.setEndDate(SQLServerDialect.MAX_DATE);
			cd.setStatus(Status.EquipComponStore.delivering);
			cd.setActive(Constant.ENABLED);
			componDiaryService.save(cd);

			if (Constant.ENABLED.equals(cd.getKnotFlag())) {
				install.setKnotCounts(install.getKnotCounts() + cd.getCounts());
				if (cd.getKnotMetric() != null) {
					install.setInstallHeight(install.getInstallHeight().add(new BigDecimal(cd.getCounts()).multiply(cd.getKnotMetric())));
				}
			}
			if (Constant.ENABLED.equals(cd.getWallAttacheFlag())) {
				install.setWallAttacheQty(install.getWallAttacheQty() + cd.getCounts());
			}
		}
		equipInstallDao.save(install);
		// 零配件业务流转设置(零配件前业务日历结束时间更新)
		componDiaryService.overPreInstallEmployDismantle(t.getEmployId(), SystemConstant.MODULE_EQUIP_EMPLOY, currentTime);

		// 人员日期启用
		for (PractiDiary pd : t.getPractiDiarySet()) {
			pd.setActive(Constant.ENABLED);
			practiDiaryService.save(pd);
			// 生成人员从业记录
			practiResumeService.save(PractiDiarySupport.createResume(pd, t.getEquipFlow()));
		}
		return t;
	}

	public void delete(Long employId) {
		EquipEmploy t = equipEmployDao.get(employId);
		EquipFlow ef = t.getEquipFlow();
		for (ComponDiary p : t.getComponDiarySet()) {
			componDiaryService.remove(p);
		}
		for (PractiDiary p : t.getPractiDiarySet()) {
			practiDiaryService.remove(p);
		}
		equipEmployDao.remove(t);

		ef.setFlowState(Status.EquipFlow.installed);
		equipFlowDao.save(ef);
	}

}
