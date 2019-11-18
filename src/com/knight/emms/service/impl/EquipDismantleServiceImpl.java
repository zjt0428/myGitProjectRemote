/**
 *====================================================
 * 文件名称: EquipDismantleServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.plugin.dialect.SQLServerDialect;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.dao.EquipDismantleDao;
import com.knight.emms.dao.ProjectComponDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.dao.EquipInspectSchemaDao;
import com.knight.emms.domain.BusinessEquipFlowValidate;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.EquipDismantleService;
import com.knight.emms.service.EquipInspectSchemaService;
import com.knight.emms.support.PractiDiarySupport;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;
import com.knight.system.service.impl.CodeServiceImpl;
import javax.annotation.Resource;


import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: EquipDismantleServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:31:46
 */
public class EquipDismantleServiceImpl extends BusinessEquipFlowValidate<EquipDismantle> implements EquipDismantleService {

	private EquipDismantleDao equipDismantleDao;
	
	@Resource
	private EquipInspectSchemaService equipInspectSchemaService;
	
	@Resource
	private ProjectComponDao projectComponDao;
	
	@Resource
	private EquipInspectSchemaDao equipInspectSchemaDao;

	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private ContractLeaseService contractLeaseService;

	@Resource
	private AppUserService appUserService;

	@Resource
	private ProjectDao projectDao;
	

	public EquipDismantleServiceImpl(EquipDismantleDao dao) {
		super(dao);
		this.equipDismantleDao = dao;
	}

	public List<EquipDismantle> queryTranslateAllFull(QueryFilter filter) {
		List<EquipDismantle> list = equipDismantleDao.getAll(filter);
		for (EquipDismantle ed : list) {
			CodeServiceImpl.translate(ed, getPersistantStruct());
			CodeServiceImpl.translate(ed.getEquipFlow(), equipFlowDao.getPersistantStruct());
			CodeServiceImpl.translate(ed.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
			CodeServiceImpl.translate(ed.getEquipFlow().getContractLease(), contractLeaseService.getPersistantStruct());
		}
		return list;
	}

	public EquipDismantle getTranslateFull(Long dismantleId) {
		EquipDismantle ed = equipDismantleDao.get(dismantleId);
		CodeServiceImpl.translate(ed, getPersistantStruct());
		CodeServiceImpl.translate(ed.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
		for (PractiDiary d : ed.getPractiDiarySet()) {
			CodeServiceImpl.translate(d, practiDiaryService.getPersistantStruct());
		}
		for (ComponDiary p : ed.getComponDiarySet()) {
			CodeServiceImpl.translate(p, componDiaryService.getPersistantStruct());
		}
		return ed;
	}

	@Override
	public void saveOrMergeForEdit(EquipDismantle equipDismantle) {
		EquipFlow ef = equipDismantle.getEquipFlow();
		if (equipDismantle.getDismantleId() == null) {
			ef = equipFlowDao.get(ef.getFlowId());
/*			if (!Status.EquipFlow.installed.equals(ef.getFlowState()) && !Status.EquipFlow.employed.equals(ef.getFlowState())) {
				throw new BusinessException("该设备[" + ef.getEquipDiary().getRecordId() + "]状态不予保存拆卸信息!");
			}*/
			equipDismantleDao.saveSerialModel(equipDismantle);
		} else {
			equipDismantleDao.merge(equipDismantle);
		}
			
		
		// 导入流程信息
		ef.setFlowState(Status.EquipFlow.dismantling);
		equipFlowDao.save(ef);

		// 保存申请配件/人员
		equipDismantle.setSubEquipDismantle();
//		equipDismantleDao.merge(equipDismantle);
		componDiaryService.createComponDiary(equipDismantle.getComponDiarySet(), equipDismantle);
		practiDiaryService.createPractiDiary(equipDismantle.getPractiDiarySet(), equipDismantle);
	}

	public void submitDismantle(Long dismantleId) {
		EquipDismantle t = equipDismantleDao.get(dismantleId);
		if (!Status.EquipFlowApplyfor.waitSubmit.equals(t.getApplyforState())) {
			throw new BusinessException("[" + t.getDismantleSerial() + "]拆卸申请状态不合法!");
		}

		t.setApplyforState(Status.EquipFlowApplyfor.waitApprove);
		equipDismantleDao.save(t);
	}

	protected EquipDismantle passFlowApproveApplication(FormApprove formApprove) {
		EquipDismantle t = super.passFlowApproveApplication(formApprove);
		Date currentTime = new Date();
		//审核后将设备拆卸的小程序拆卸状态改为拆卸完成
		t.setAppDismantleState(Status.wechatDismantle.confirmed);
		// 零配件合法状态(借用/领用)验证
		super.validateInPickupBorrow(t.getDismantleId(), SystemConstant.MODULE_EQUIP_DISMANTLE, currentTime, SQLServerDialect.MAX_DATE);
		if (formApprove.isVetWarning()) { // 零配件流转状态验证
			super.warningInInstallEmployDismantle(t.getDismantleId(), SystemConstant.MODULE_EQUIP_DISMANTLE, currentTime, SQLServerDialect.MAX_DATE);
		}

		// 流程转至拆卸完成
		EquipFlow ef = t.getEquipFlow();
		ef.setDismantleId(t.getDismantleId());
		ef.setFlowState(Status.EquipFlow.dismantled);
		equipFlowDao.save(ef);

		// 设备转至拆卸业务
		EquipDiary ed = ef.getEquipDiary();
		ed.setEndDate(t.getEnddisDate());
		ed.setRelateId(t.getDismantleId());
		ed.setRelateSerial(t.getDismantleSerial());
		ed.setRelateTheme(t.getDismantleTheme());
		ed.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
		equipDiaryService.save(ed);
		
        for (ComponDiary cd : ef.getComponDiarySet()) {
			
			QueryFilter query = new QueryFilter();
			query.addConjunctFilter("Q_projectId_L_EQ", cd.getProjectId() + "");
			query.addConjunctFilter("Q_componId_L_EQ", cd.getComponId() + "");
			query.addConjunctFilter("Q_status_S_EQ", "1");
			List<ProjectCompon> list = projectComponDao.getAll(query);
			for (ProjectCompon pc : list) {
				pc.setCounts(pc.getCounts() - cd.getCounts());
				projectComponDao.merge(pc);
			}
			
			QueryFilter query1 = new QueryFilter();
			query1.addConjunctFilter("Q_projectId_L_EQ", cd.getProjectId() + "");
			query1.addConjunctFilter("Q_componId_L_EQ", cd.getComponId() + "");
			query1.addConjunctFilter("Q_status_S_EQ", "0");
			List<ProjectCompon> list1 = projectComponDao.getAll(query1);
			for (ProjectCompon pc1 : list1) {
				pc1.setCounts(pc1.getCounts() + cd.getCounts());//cd.getDismantleCounts());
				projectComponDao.merge(pc1);
			}			
			if (list1.isEmpty()) {
				ProjectCompon pc = new ProjectCompon();
				pc.setProjectId(cd.getProjectId());
				pc.setComponId(cd.getComponId());
				pc.setCounts(cd.getCounts());
				pc.setStatus("0");
				projectComponDao.save(pc);
			}			
		}

		// 设备业务状态
		Equipment e = t.getEquipFlow().getEquipment();
		e.setBusinessStatus(Status.EquipBusiness.dismantle);
		e.setStatus(Status.EquipCompon.unused);
		equipmentDao.save(e);

		// 调度设备标识拆卸
		DispatchEquip de = dispatchEquipDao.get(ed.getBusinessEquipId());
		de.setWorkStatus(Status.EquipComponDispatch.finished);
		dispatchEquipDao.save(de);

		// 合同及合同调度状态变更
		if (dispatchEquipDao.findDispatchUnDismantleEquip(t.getEquipFlow().getDispatchId()) == null) {
			ContractLease cl = ef.getContractLease();
			if (!Status.ContractApplyfor.executed.equals(cl.getApplyforState())) {
				cl.setApplyforState(Status.ContractApplyfor.executed);
				cl.setEquipAllDismantleMonth(DateUtil.getCurrentMonthStr());
				contractLeaseDao.save(cl);
			}
			Dispatch d = ef.getDispatch();
			d.setApplyforState(Status.DispatchApplyfor.finished);
			dispatchDao.save(d);
		}

		// 安拆设备日历-结束时间设置
		equipDiaryService.overFlowEquipDiary(t);
		if (ef.getEmployId() != null) { // 使用告知资源(人员)-结束时间设置
			EquipEmploy ee = equipEmployDao.get(ef.getEmployId());
			for (PractiDiary pd : ee.getPractiDiarySet()) {
				pd.setEndDate(t.getEnddisDate());
				practiDiaryService.save(pd);
			}
		}

		// 零配件日历启用/零配件占用
		for (ComponDiary cd : t.getComponDiarySet()) {
			Component compon = componentDao.get(cd.getComponId());
			if (Constant.ENABLED.equals(compon.getConsumeFlag())) {
				if (compon.getConsumeCounts() <= cd.getCounts()) {
					compon.setStatus(Status.EquipCompon.inused);
				}
				EquipFlow efl = equipFlowDao.get(cd.getFlowId());
				if(!efl.getFlowState().equals("6")){
					compon.setConsumeCounts(compon.getConsumeCounts() - cd.getCounts());
				}
			} else {
				compon.setStatus(Status.EquipCompon.inused);
				compon.setStatusDate(currentTime);
			}
			componentDao.save(compon);

			cd.setStartDate(currentTime);
			cd.setEndDate(t.getEnddisDate());
			cd.setStatus(Status.EquipComponStore.delivering);
			cd.setActive(Constant.ENABLED);
			componDiaryService.save(cd);
		}
		// 零配件业务流转设置(零配件前业务日历结束时间更新)
		componDiaryService.overPreInstallEmployDismantle(t.getDismantleId(), SystemConstant.MODULE_EQUIP_DISMANTLE, currentTime);
		// 流程资源结束时间设置(当前设备流程中安装/使用零配件结束时间大于拆卸时间的,更新结束时间至拆卸时间)
		componDiaryService.updateScirpt("dispatch.equipFlow_set_diary_component_endDate_bydismantle", t.getDismantleId(), t.getEnddisDate());

		// 人员日期启用
		for (PractiDiary pd : t.getPractiDiarySet()) {
			pd.setActive(Constant.ENABLED);
			if (pd.getStartDate() == null) {
				pd.setStartDate(t.getStartdisDate());
			}
			if (pd.getEndDate() == null) {
				pd.setEndDate(t.getEnddisDate());
			}
			practiDiaryService.save(pd);
			// 生成人员从业记录
			practiResumeService.save(PractiDiarySupport.createResume(pd, t.getEquipFlow()));
		}

		//项目结案（在所有设备都拆卸后）
		List<Map<String,Object>> equipFlowList = equipDismantleDao.queryByScript("dispatch.equip_is_all_dismantle",ef.getContractId());
		if(equipFlowList==null && equipFlowList.size()==0) {
			Project p = projectDao.get(ed.getProjectId());
			if(Status.Project.finished.equals(p.getStatus())) {
				p.setStatus(Status.Project.close);
				projectDao.update(p);
			}
		}
		/*// 拆卸提醒
		List<Map<String,Object>> list = equipDismantleDao.queryByScript("remaind.equipdismantle_approve", t.getDismantleId(), e.getEquipId(), t.getEnddisDate(), e.getRecordId());
		for(Map<String,Object> map:list){
			BusinessMessage bm = new BusinessMessage();
			bm.setReceiveTel((String)map.get("REMAIND_TEL"));
			bm.setMessage((String)map.get("MESSAGE"));
			bm.setSenderName("设备拆卸消息");
			businessMessageService.sendOnce(bm);
		}*/
		//拆卸审批巡检计划状态改为中止
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_flowId_L_EQ", t.getEquipFlow().getFlowId() + "");
		List<EquipInspectSchema> eslist = equipInspectSchemaService.queryTranslateAll(filter);
		for (int i = 0; i < eslist.size(); i++) {
			EquipInspectSchema es = eslist.get(i);
			es.setActive("2");
			equipInspectSchemaService.save(es);
		}
		return t;
	}

	public void delete(Long dismantleId) {
		EquipDismantle t = equipDismantleDao.get(dismantleId);
		EquipFlow ef = t.getEquipFlow();
		for (ComponDiary p : t.getComponDiarySet()) {
			componDiaryService.remove(p);
		}
		for (PractiDiary p : t.getPractiDiarySet()) {
			practiDiaryService.remove(p);
		}
		equipDismantleDao.remove(t);

		if (ef.getEmployId() == null) {
			ef.setFlowState(Status.EquipFlow.installed);
		} else {
			ef.setFlowState(Status.EquipFlow.dismantled);
		}
		equipFlowDao.save(ef);
	}

	public void sceneDismantle(EquipDismantle dismantle) {
		dismantle.setDismantleTheme(dismantle.getEquipFlow().getEquipDiary().getProjectName() + "的拆卸【" + DateUtil.getCurrentMonthStr() + "】");
		dismantle.setSpendTime((dismantle.getEnddisDate().getTime() - dismantle.getStartdisDate().getTime()) / (1000 * 60 * 60));
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		dismantle.setUserId(currentUser.getUserId());
		dismantle.setUserName(currentUser.getFullname());
		dismantle.setDepartment(currentUser.getDepartment());
		dismantle.setProvidedDate(DateUtil.getCurrentLinkDateStr());
		saveOrMergeForEdit(dismantle);
		submitDismantle(dismantle.getDismantleId());

		FormApprove formApprove = new FormApprove();
		formApprove.setRelateId(dismantle.getDismantleId());
		formApprove.setRelateModule(SystemConstant.MODULE_EQUIP_DISMANTLE);
		formApprove.setApproveUserid(currentUser.getUserId());
		formApprove.setApproveUsername(currentUser.getFullname());
		formApprove.setApproveDep(currentUser.getDepartment().getDepName());
		formApprove.setApproveTime(new Date());
		formApprove.setApproveOpinion(Type.Applyfor.pass);
		formApprove.setApproveRemark("终端设备现场拆卸，自动审批通过。");
		formApproveDao.save(formApprove);
		passApproveApplication(formApprove);
	}

	//申请驳回时通知提醒
	public void rejectApproveApplication(FormApprove formApprove) {
		EquipDismantle ed = rejectFlowApproveApplication(formApprove);
		equipDismantleDao.save(ed);
		AppUser au = appUserService.get(ed.getUserId());
		String tel = au.getMobile();
		String receiveName = ed.getUserName();
		String msg = "备案编号为："+ed.getEquipFlow().getEquipDiary().getRecordId()+" 的设备的拆卸申请，于 "+DateUtil.getCurrentLinkTimeStr()+" 被驳回，请知悉";
		BusinessMessage bm = new BusinessMessage();
		bm.setMessage(msg);
		bm.setSenderName("设备拆卸驳回消息");
		bm.setModule("EUQIP_DISMANTLE");
		bm.setReceiveTel(tel);
		bm.setReceiveName(receiveName);
		businessMessageService.sendOnce(bm);
	}
}
