/**
 *====================================================
 * 文件名称: EquipInstallServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.google.gson.reflect.TypeToken;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.dao.*;
import com.knight.emms.domain.BusinessEquipFlowValidate;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.EquipInstallReviewService;
import com.knight.emms.service.EquipInstallService;
import com.knight.emms.support.ComponDiarySupport;
import com.knight.emms.support.PractiDiarySupport;
import com.knight.emms.terminal.Query;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;
import com.knight.system.service.impl.CodeServiceImpl;

import javax.annotation.Resource;
import java.util.*;

/**
 * @ClassName: EquipInstallServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:33:27
 */
public class EquipInstallServiceImpl extends BusinessEquipFlowValidate<EquipInstall> implements EquipInstallService {

	private EquipInstallDao equipInstallDao;

	@Resource
	private StoreEquipStockDao storeEquipStockDao;

	@Resource
	private PractitionerDao practitionerDao;

	@Resource
	private ComponentService componentService;

	@Resource
	private ProjectComponDao projectComponDao;

	@Resource
	private ComponDiaryDao componDiaryDao;

	@Resource
	private EquipDiaryDao equipDiaryDao;
	
	@Resource
	private EquipInstallReviewDao equipInstallReviewDao;
	
	

	@Resource
	private BusinessMessageService businessMessageService;
	@Resource
	private EquipInstallReviewService equipInstallReviewService;
	
	@Resource
	private AppUserService appUserService;
	@Resource
	private RectificationRecordDao rectificationRecordDao;
	

	public EquipInstallServiceImpl(EquipInstallDao dao) {
		super(dao);
		this.equipInstallDao = dao;
	}

	public List<EquipInstall> queryTranslateAllFull(QueryFilter filter) {
		List<EquipInstall> list = equipInstallDao.getAll(filter);
		for (EquipInstall ei : list) {
			CodeServiceImpl.translate(ei, getPersistantStruct());
			CodeServiceImpl.translate(ei.getEquipFlow(), equipFlowDao.getPersistantStruct());
			CodeServiceImpl.translate(ei.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
		}
		return list;
	}

	public EquipInstall getTranslateFull(Long installId) {
		EquipInstall ei = equipInstallDao.get(installId);
		CodeServiceImpl.translate(ei, getPersistantStruct());
		CodeServiceImpl.translate(ei.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
		for (ComponDiary p : ei.getComponDiarySet()) {
			CodeServiceImpl.translate(p, componDiaryService.getPersistantStruct());
		}
		for (PractiDiary p : ei.getPractiDiarySet()) {
			CodeServiceImpl.translate(p, practiDiaryService.getPersistantStruct());
		}
		for (InstallJjCompon jj : ei.getJjComponSet()) {
			CodeServiceImpl.translate(jj.getComponent(), componentService.getPersistantStruct());
		}
		return ei;
	}

	public void saveOrMergeForEdit(EquipInstall equipInstall) {

		if (equipInstall.getInstallId() == null) {
			String installSerial = equipInstallDao.createNextSerial(equipInstall);
			equipInstall.setInstallSerial(installSerial);

			// 创建流程
			EquipFlow ef = equipInstall.getEquipFlow();
			DispatchEquip de = dispatchEquipDao.get(ef.getDispatchEquipId());
			Dispatch d = dispatchDao.get(de.getDispatchId());
			Equipment e = equipmentDao.get(de.getEquipId());
			EquipDiary ed = equipDiaryService.startFlowEquipDiary(e, d, de);
			ef.setFlowSerial(equipInstall.getInstallSerial());
			ef.setEquipDiaryId(ed.getEquipDiaryId());
			ef.setEquipDiary(ed);
			ef.setDispatchEquipId(de.getDispatchEquipId());
			ef.setEquipId(de.getEquipId());
			ef.setEquipment(e);
			ef.setContractId(d.getRelateId());
			ef.setDispatchId(d.getDispatchId());
			ef.setDispatch(d);
			ef.setFlowState(Status.EquipFlow.waitInstall);
			equipFlowDao.save(ef);

			ed.setFlowId(ef.getFlowId());
			equipDiaryService.save(ed);

			de.setWorkStatus(Status.EquipComponDispatch.execute);
			dispatchEquipDao.save(de);

			equipInstall.setEquipFlow(ef);
			equipInstall.setSubComponInstall();
			equipInstallDao.save(equipInstall);
			equipInstall.setSubEquipInstall();
		} else {
			equipInstall.setSubEquipInstall();
			equipInstall.setSubComponInstall();
			equipInstallDao.merge(equipInstall);
			EquipFlow ef = equipInstall.getEquipFlow();
			EquipDiary ed = ef.getEquipDiary();
			ed.setStartDate(equipInstall.getStartinDate());
			ed.setActive(Constant.DISENABLED);
			equipDiaryService.save(ed);
		}
		componDiaryService.createComponDiary(equipInstall.getComponDiarySet(), equipInstall);
		practiDiaryService.createPractiDiary(equipInstall.getPractiDiarySet(), equipInstall);
	}

	public void setJjCompon(EquipInstall equipInstall, String jackOrdrop) {
		Set<InstallJjCompon> jjComponSet = GsonUtil.fromJson(equipInstall.getJjCompons(),
				new TypeToken<Set<InstallJjCompon>>() {
				});
		if (jjComponSet != null) {
			for (InstallJjCompon jj : jjComponSet) {
				if (jj.getJjComponId() == null) {
					QueryFilter filter = new QueryFilter();
					filter.addConjunctFilter("Q_componId_L_EQ", String.valueOf(jj.getComponId()));
					filter.addConjunctFilter("Q_projectId_L_EQ",
							String.valueOf(equipInstall.getEquipFlow().getEquipDiary().getProjectId()));
					filter.addConjunctFilter("Q_status_S_EQ", "0");
					List<ProjectCompon> unUseCompon = projectComponDao.getAll(filter);
					if (!unUseCompon.isEmpty()) {
						for (ProjectCompon pc : unUseCompon) {
							pc.setCounts(pc.getCounts() - jj.getCounts());
							projectComponDao.update(pc);
						}
					}

					QueryFilter filter1 = new QueryFilter();
					filter1.addConjunctFilter("Q_componId_L_EQ", String.valueOf(jj.getComponId()));
					filter1.addConjunctFilter("Q_projectId_L_EQ",
							String.valueOf(equipInstall.getEquipFlow().getEquipDiary().getProjectId()));
					filter1.addConjunctFilter("Q_status_S_EQ", "1");
					List<ProjectCompon> useCompon = projectComponDao.getAll(filter1);
					if (!useCompon.isEmpty()) {
						for (ProjectCompon pc : useCompon) {
							pc.setCounts(pc.getCounts() + jj.getCounts());
							projectComponDao.update(pc);
						}
					} else {
						ProjectCompon pc = new ProjectCompon();
						pc.setComponId(jj.getComponId());
						pc.setCounts(jj.getCounts());
						pc.setProjectId(equipInstall.getEquipFlow().getEquipDiary().getProjectId());
						pc.setStatus("1");
						projectComponDao.save(pc);
					}

					DispatchCompon dispatchCompon = new DispatchCompon();
					dispatchCompon.setComponent(componentDao.get(jj.getComponId()));
					ComponDiary cd = new ComponDiary();
					cd.setCounts(jj.getCounts());
					cd.setJackingCounts(jj.getCounts());
					cd.setComponId(jj.getComponId());
					cd.setStartDate(equipInstall.getStartinDate());
					cd.setEndDate(equipInstall.getEndinDate());
					ComponDiarySupport.setFlowComponDiary(cd, equipInstall, dispatchCompon);
					cd.setActive(Constant.ENABLED);
					if (jackOrdrop.equals("jack")) {
						cd.setJjStauts(Status.JackingStauts.jacking);
					}
					if (jackOrdrop.equals("drop")) {
						cd.setJjStauts(Status.JackingStauts.drop);
					}
					cd.setJjUserName(jj.getJjUserName());
					cd.setStartDate(jj.getJjTime());
					cd.setStatus(Status.EquipComponStore.deliveryed);
					componDiaryDao.save(cd);

				}

				jj.setInstallId(equipInstall.getInstallId());
			}
			equipInstall.setJjComponSet(jjComponSet);
			equipInstall.setSubEquipInstall();
		}
		equipInstallDao.merge(equipInstall);
	}

	public void submitInstall(Long installId) {
		EquipInstall t = equipInstallDao.get(installId);
		if (!Status.EquipFlowApplyfor.waitSubmit.equals(t.getApplyforState())) {
			throw new BusinessException("[" + t.getInstallSerial() + "]安装申请状态不合法!");
		}
		// 设备合法状态验证
		Equipment e = t.getEquipFlow().getEquipment();
		if (Status.EquipCompon.inused.equals(e.getStatus())
				&& !Status.EquipBusiness.dipatch.equals(e.getBusinessStatus())) {
			throw new BusinessException("设备[" + e.getRecordSerial() + "]已经被占用!");
		}

		// 流程转至安装中
		EquipFlow ef = t.getEquipFlow();
		ef.setFlowState(Status.EquipFlow.installing);
		equipFlowDao.save(ef);

		t.setApplyforState(Status.EquipFlowApplyfor.waitApprove);
		equipInstallDao.save(t);
	}

	protected EquipInstall passFlowApproveApplication(FormApprove formApprove) {
		EquipInstall t = super.passFlowApproveApplication(formApprove);
		Date currentTime = new Date();
		// // 设备合法状态验证
		Equipment e = t.getEquipFlow().getEquipment();
		// if (Status.EquipCompon.inused.equals(e.getStatus()) &&
		// !Status.EquipBusiness.dipatch.equals(e.getBusinessStatus())) {
		// throw new BusinessException("设备[" + e.getRecordSerial() + "]已经被占用!");
		// }
		// 零配件合法状态(借用/领用)验证
		super.validateInPickupBorrow(t.getInstallId(), SystemConstant.MODULE_EQUIP_INSTALL, currentTime,
				SQLServerDialect.MAX_DATE);
		if (formApprove.isVetWarning()) { // 零配件流转状态验证
			super.warningInInstallEmployDismantle(t.getInstallId(), SystemConstant.MODULE_EQUIP_INSTALL, currentTime,
					SQLServerDialect.MAX_DATE);
		}
		//设置设备安装小程序的安装状态为安装完成
	    t.setAppInstallState("2");
		 // 流程转至安装完成
		EquipFlow ef = t.getEquipFlow();
		ef.setInstallId(t.getInstallId());
		ef.setFlowState(Status.EquipFlow.installed);
		equipFlowDao.save(ef);

		// 合同状态变更
		ContractLease cl = t.getEquipFlow().getContractLease();
		if (!Status.ContractApplyfor.executing.equals(cl.getApplyforState())) {
			cl.setApplyforState(Status.ContractApplyfor.executing);
			contractLeaseDao.save(cl);
		}

		// 设备日历启用,转入安装
		EquipDiary ed = ef.getEquipDiary();
		ed.setPaEntName(cl.getPaEntName());
		ed.setRelateId(t.getInstallId());
		ed.setRelateSerial(t.getInstallSerial());
		ed.setRelateTheme(t.getInstallTheme());
		ed.setRelateModule(SystemConstant.MODULE_EQUIP_INSTALL);
		ed.setStartDate(currentTime);
		ed.setEndDate(SQLServerDialect.MAX_DATE);
		ed.setStatus(Status.EquipComponStore.delivering);
		ed.setActive(Constant.ENABLED);
		equipDiaryService.save(ed);

		// 零配件日历启用/零配件占用
		for (ComponDiary cd : t.getComponDiarySet()) {
			// Component compon = componentDao.get(cd.getComponId());
			// if (Constant.ENABLED.equals(compon.getConsumeFlag())) {
			// if (compon.getConsumeCounts() <= cd.getCounts()) {
			// compon.setStatus(Status.EquipCompon.inused);
			// }
			// compon.setConsumeCounts(compon.getConsumeCounts() -
			// cd.getCounts());
			// } else {
			// compon.setStatus(Status.EquipCompon.inused);
			// compon.setStatusDate(currentTime);
			// }
			// componentDao.save(compon);

			cd.setStartDate(ed.getStartDate());
			cd.setEndDate(SQLServerDialect.MAX_DATE);
			cd.setStatus(Status.EquipComponStore.delivering);
			cd.setActive(Constant.ENABLED);
			cd.setJackingStauts(Status.JackingStauts.install);
			cd.setJjStauts(Status.JackingStauts.install);
			cd.setJackingDate(cd.getStartDate());
			if (t.getPrincipalId() != null) {
				Practitioner practitioner = practitionerDao.get(t.getPrincipalId());
				if (practitioner != null) {
					cd.setJackingPractiId(practitioner.getPractiId());
					cd.setJackingPractiName(practitioner.getPractiName());
					cd.setJackingTeams(practitioner.getTeams());
				}
			}
			componDiaryService.save(cd);

			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_componId_L_EQ", String.valueOf(cd.getComponId()));
			filter.addConjunctFilter("Q_projectId_L_EQ", String.valueOf(ed.getProjectId()));
			filter.addConjunctFilter("Q_status_S_EQ", "0");
			List<ProjectCompon> unUseCompon = projectComponDao.getAll(filter);
			if (!unUseCompon.isEmpty()) {
				for (ProjectCompon pc : unUseCompon) {
					pc.setCounts(pc.getCounts() - cd.getCounts());
					projectComponDao.update(pc);
				}
			}

			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_componId_L_EQ", String.valueOf(cd.getComponId()));
			filter1.addConjunctFilter("Q_projectId_L_EQ", String.valueOf(ed.getProjectId()));
			filter1.addConjunctFilter("Q_status_S_EQ", "1");
			List<ProjectCompon> useCompon = projectComponDao.getAll(filter1);
			if (!useCompon.isEmpty()) {
				for (ProjectCompon pc : useCompon) {
					pc.setCounts(pc.getCounts() + cd.getCounts());
					projectComponDao.update(pc);
				}
			} else {
				ProjectCompon pc = new ProjectCompon();
				pc.setComponId(cd.getComponId());
				pc.setCounts(cd.getCounts());
				pc.setProjectId(ed.getProjectId());
				pc.setStatus("1");
				projectComponDao.save(pc);
			}

		}
		// 零配件业务流转设置(零配件前业务日历结束时间更新)
		componDiaryService.overPreInstallEmployDismantle(t.getInstallId(), SystemConstant.MODULE_EQUIP_INSTALL,
				currentTime);

		// 人员日期启用
		for (PractiDiary pd : t.getPractiDiarySet()) {
			pd.setActive(Constant.ENABLED);
			if (pd.getStartDate() == null) {
				pd.setStartDate(ed.getStartDate());
			}
			if (pd.getEndDate() == null) {
				pd.setEndDate(ed.getEndDate());
			}
			practiDiaryService.save(pd);

			// 生成人员从业记录
			practiResumeService.save(PractiDiarySupport.createResume(pd, t.getEquipFlow()));
		}

		// // 库存设备出库
		// if (e.getStoreId() != null) {
		// e.setStoreStatus(Status.EquipComponStore.deliveryed);
		//
		// StoreEquipStock storeEquipStock = new StoreEquipStock();
		// storeEquipStock.setStoreId(e.getStoreId());
		// storeEquipStock.setEquipId(e.getEquipId());
		// storeEquipStock.setProjectId(ed.getProjectId());
		// storeEquipStock.setBoundDate(DateUtil.getCurrentLinkDateStr());
		// storeEquipStock.setStockType(Type.OutInStock.out);
		// storeEquipStockDao.save(storeEquipStock);
		// }

		// 设备为占用状态
		e.setStatus(Status.EquipCompon.inused);
		e.setBusinessStatus(Status.EquipBusiness.install);
		e.setStatusDate(currentTime);
		e.setFlowId(ef.getFlowId());
		e.setEquipDiary(ed);
		e.setProjectId(ed.getProjectId());
		e.setProjectName(ed.getProjectName());
		e.setBuildingNum(ed.getBuildingNum());
		e.setProjectAddress(ed.getAddress());
		equipmentDao.save(e);

		// 安装提醒
		List<Map<String, Object>> list = equipInstallDao.queryByScript("remaind.equipinstall_approve", e.getEquipId(),
				t.getEndinDate());
		for (Map<String, Object> map : list) {
			BusinessMessage bm = new BusinessMessage();
			bm.setReceiveTel((String) map.get("REMAIND_TEL"));
			bm.setMessage((String) map.get("MESSAGE"));
			bm.setSenderName("设备安装消息");
			businessMessageService.sendOnce(bm);
		}
		return t;
	}

	public void delete(Long installId) {
		EquipInstall t = equipInstallDao.get(installId);
		EquipFlow ef = t.getEquipFlow();
		for (ComponDiary p : t.getComponDiarySet()) {
			componDiaryService.remove(p);
		}
		for (PractiDiary p : t.getPractiDiarySet()) {
			practiDiaryService.remove(p);
		}
		equipInstallDao.remove(t);

		DispatchEquip de = dispatchEquipDao.get(ef.getDispatchEquipId());
		de.setWorkStatus(Status.EquipComponDispatch.allocate);
		dispatchEquipDao.save(de);

		equipDiaryService.remove(ef.getEquipDiary());
		equipFlowDao.remove(ef);
	}

	public void sceneInstall(EquipInstall install, String buildingNum) {
		DispatchEquip de = dispatchEquipDao.get(install.getEquipFlow().getDispatchEquipId());
		Dispatch d = dispatchDao.get(de.getDispatchId());
		install.setInstallTheme(d.getProjectName() + "的安装【" + DateUtil.getCurrentMonthStr() + "】");
		install.setSpendTime(
				(install.getEndinDate().getTime() - install.getStartinDate().getTime()) / (1000 * 60 * 60));
		install.setPractiCount((short) install.getPractiDiarySet().size());
		// int knotCounts = 0;
		// for (ComponDiary diary : install.getComponDiarySet()) {
		// Component c = componentService.get(diary.getComponId());
		// if (c.getKnotMetric() != null) {
		// knotCounts++;
		// }
		// }
		// install.setKnotCounts(knotCounts);
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		install.setUserId(currentUser.getUserId());
		install.setUserName(currentUser.getFullname());
		install.setDepartment(currentUser.getDepartment());
		install.setProvidedDate(DateUtil.getCurrentLinkDateStr());
		saveOrMergeForEdit(install);

		// install.getEquipFlow().getEquipDiary().setBuildingNum(buildingNum);
		EquipDiary equipDiary = install.getEquipFlow().getEquipDiary();
		equipDiary.setBuildingNum(buildingNum);
		equipDiaryDao.merge(equipDiary);

		equipInstallDao.merge(install);
		submitInstall(install.getInstallId());
		install.getEquipFlow().setContractLease(contractLeaseDao.get(install.getEquipFlow().getContractId()));
		FormApprove formApprove = new FormApprove();
		formApprove.setRelateId(install.getInstallId());
		formApprove.setRelateModule(SystemConstant.MODULE_EQUIP_INSTALL);
		formApprove.setApproveUserid(currentUser.getUserId());
		formApprove.setApproveUsername(currentUser.getFullname());
		formApprove.setApproveDep(currentUser.getDepartment().getDepName());
		formApprove.setApproveTime(new Date());
		formApprove.setApproveOpinion(Type.Applyfor.pass);
		formApprove.setApproveRemark("终端设备现场安装，自动审批通过。");
		formApproveDao.save(formApprove);
		passApproveApplication(formApprove);
	}

	@Override
	public List<?> loadCompondiarySet(EquipInstall equipInstall) {
		List<ProjectCompon> list = new ArrayList<ProjectCompon>();
		for (ComponDiary obj : equipInstall.getComponDiarySet()) {
			Component component = new Component();
			component.setComponGeneric(obj.getComponGeneric());
			component.setComponGenericName(obj.getComponGenericName());
			component.setComponId(obj.getComponId());
			component.setComponSpecific(obj.getComponSpecific());
			component.setComponSpecificName(obj.getComponSpecificName());
			component.setKnotMetric(obj.getKnotMetric());
			component.setComponCategory(obj.getComponCategory());
			component.setComponCategoryName(obj.getComponCategoryName());
			component.setKnotFlag(obj.getKnotFlag());
			component.setWallAttacheFlag(obj.getWallAttacheFlag());
			component.setDimensions(obj.getDimensions());
			component.setExwSerial(obj.getExwSerial());
			component.setComponSerial(obj.getComponSerial());
			ProjectCompon c = new ProjectCompon();
			switch (Integer.parseInt(obj.getStatus())) {
			case 0:
				c.setStatusName("在用");
			case 2:
				c.setStatusName("在用");
				defaults : break;
			}
			c.setProjectComponId(obj.getProjectComponId());
			c.setProjectId(obj.getProjectId());
			c.setComponId(obj.getComponId());
			c.setComponDiaryId(obj.getComponDiaryId());
			c.setCounts(obj.getCounts());
			c.setComponent(component);
			list.add(c);
		}
		return integration(list);
	}

	@Override
	public List<?> loadCompondiarySet(EquipInstall equipInstall, Query query) {
		List<ProjectCompon> list = new ArrayList<ProjectCompon>();
		for (ComponDiary obj : equipInstall.getComponDiarySet()) {
			Component component = new Component();
			component.setComponGeneric(obj.getComponGeneric());
			component.setComponGenericName(obj.getComponGenericName());
			component.setComponId(obj.getComponId());
			component.setComponSpecific(obj.getComponSpecific());
			component.setComponSpecificName(obj.getComponSpecificName());
			component.setComponCategory(obj.getComponCategory());
			component.setComponCategoryName(obj.getComponCategoryName());
			component.setKnotFlag(obj.getKnotFlag());
			component.setDimensions(obj.getDimensions());
			component.setExwSerial(obj.getExwSerial());
			component.setComponSerial(obj.getComponSerial());
			ProjectCompon c = new ProjectCompon();
			switch (Integer.parseInt(obj.getStatus())) {
			case 0:
				c.setStatusName("在用");
			case 2:
				c.setStatusName("在用");
				defaults: break;
			}
			c.setProjectComponId(obj.getProjectComponId());
			c.setProjectId(obj.getProjectId());
			c.setComponId(obj.getComponId());
			c.setComponDiaryId(obj.getComponDiaryId());
			c.setCounts(obj.getCounts());
			c.setComponent(component);
			String exwSerial = query.getExwSerial();
			String componGenericName = query.getComponGenericName();
			String componSpecificName = query.getComponSpecificName();
			if ((exwSerial == null && componGenericName == null && componSpecificName == null)
					|| (component.getExwSerial() != null && exwSerial != null
							&& component.getExwSerial().indexOf(exwSerial) != -1)
					|| (component.getComponSpecificName() != null && componSpecificName != null
							&& component.getComponSpecificName().indexOf(componSpecificName) != -1)
					|| (component.getComponGenericName() != null && componGenericName != null
							&& component.getComponGenericName().indexOf(componGenericName) != -1)) {
				list.add(c);
			}
		}
		return integration(list);
	}

	public List<ProjectCompon> integration(List<ProjectCompon> list) {
		List<ProjectCompon> array = new ArrayList<ProjectCompon>();
		List<String> serialArray = new ArrayList<String>();
		if (list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				ProjectCompon pi = (ProjectCompon) list.get(i);
				Boolean isSame = false;
				// 拿出一个跟后面的比较，如果遇到已经比较过的就终止
				if (serialArray.size() > 0) {
					for (int k = 0; k < serialArray.size(); k++) {
						if (pi.getComponent().getComponSerial().equals(serialArray.get(k))) {
							isSame = true;
						}
					}
				}
				if (isSame == true) {
					continue;
				}
				for (int j = list.size() - 1; j > i; j--) {
					ProjectCompon pj = (ProjectCompon) list.get(j);
					if ((pi.getComponId().equals(pj.getComponId()))
							&& (pi.getComponent().getComponSerial().equals(pj.getComponent().getComponSerial()))) {
						pi.setCounts(pi.getCounts() + pj.getCounts());
						if (!serialArray.contains(pi.getComponent().getComponSerial())) {
							serialArray.add(pi.getComponent().getComponSerial());
						}
						if (!array.contains(j)) {
							array.add((ProjectCompon) list.get(j));
						}
					}
				}
			}
			if (array.size() > 0) {
				list.removeAll(array);
			}
		}
		return list;
	}

	//申请驳回时通知提醒
	public void rejectApproveApplication(FormApprove formApprove) {
		EquipInstall ei = rejectFlowApproveApplication(formApprove);
		equipInstallDao.save(ei);
		
		AppUser au = appUserService.get(ei.getUserId());
		String tel = au.getMobile();
		String receiveName = ei.getUserName();
		String msg = "备案编号为："+ei.getEquipFlow().getEquipDiary().getRecordId()+" 的设备的安装申请，于 "+DateUtil.getCurrentLinkTimeStr()+" 被驳回，请知悉";
		BusinessMessage bm = new BusinessMessage();
		bm.setMessage(msg);
		bm.setSenderName("设备安装驳回消息");
		bm.setModule("EUQIP_INSTALL");
		bm.setReceiveTel(tel);
		bm.setReceiveName(receiveName);
		businessMessageService.sendOnce(bm);
	}
	public void saveEquipInstallWork(EquipInstallReview eir) {
		equipInstallReviewDao.save(eir);
	}

	@Override
	public void saveEquipInstallRectification(RectificationRecord rec) {
		rectificationRecordDao.save(rec);
	}
}
