/**
 *====================================================
 * 文件名称: EquipWarehouseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipWarehouseAbnormalDao;
import com.knight.emms.dao.EquipWarehouseComponDao;
import com.knight.emms.dao.EquipWarehouseDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.ProjectComponDao;
import com.knight.emms.dao.StoreComponStockDao;
import com.knight.emms.dao.StoreEquipStockDao;
import com.knight.emms.domain.BusinessEquipFlowValidate;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.EquipHitchService;
import com.knight.emms.service.EquipWarehouseService;
import com.knight.emms.service.StoreHouseService;
import com.knight.emms.service.StoreJoinComponentService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipWarehouseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午10:49:25
 */
public class EquipWarehouseServiceImpl extends BusinessEquipFlowValidate<EquipWarehouse> implements EquipWarehouseService {

	private EquipWarehouseDao equipWarehouseDao;

	@Resource
	private EquipWarehouseComponDao equipWarehouseComponDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private EquipFlowDao equipFlowDao;

	@Resource
	private ComponentDao componentDao;

	@Resource
	private EquipDiaryDao equipDiaryDao;

	@Resource
	private ComponDiaryDao componDiaryDao;

	@Resource
	private StoreEquipStockDao storeEquipStockDao;

	@Resource
	private StoreComponStockDao storeComponStockDao;

	@Resource
	private EquipWarehouseAbnormalDao equipWarehouseAbnormalDao;
	
	@Resource
	private ProjectComponDao projectComponDao;

	@Resource
	private EquipHitchService equipHitchService;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private StoreJoinComponentService storeJoinComponentService;

	@Resource
	private AppUserService appUserService;
	
	@Resource
	private StoreHouseService storeHouseService;
	
	@Resource
	private ComponentService componentService;

	public EquipWarehouseServiceImpl(EquipWarehouseDao dao) {
		super(dao);
		this.equipWarehouseDao = dao;
	}

	public List<EquipWarehouse> queryTranslateAllFull(QueryFilter filter) {
		List<EquipWarehouse> list = equipWarehouseDao.getAll(filter);
		for (EquipWarehouse ew : list) {
			CodeServiceImpl.translate(ew, getPersistantStruct());
			CodeServiceImpl.translate(ew.getEquipFlow(), equipFlowDao.getPersistantStruct());
			CodeServiceImpl.translate(ew.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
		}
		return list;
	}

	public EquipWarehouse getTranslateFull(Long warehouseId) {
		EquipWarehouse ew = equipWarehouseDao.get(warehouseId);
		CodeServiceImpl.translate(ew, getPersistantStruct());
		CodeServiceImpl.translate(ew.getEquipFlow().getEquipDiary(), equipDiaryService.getPersistantStruct());
		for (EquipWarehouseCompon p : ew.getEquipWarehouseComponSet()) {
			CodeServiceImpl.translate(p, equipWarehouseComponDao.getPersistantStruct());
			CodeServiceImpl.translate(p.getComponDiary(), componDiaryDao.getPersistantStruct());
		}
		return ew;
	}

	public void saveOrMergeForEdit(EquipWarehouse equipWarehouse) {
		if (equipWarehouse.getWarehouseId() == null) {
			equipWarehouseDao.saveSerialModel(equipWarehouse);
			EquipFlow ef = equipWarehouse.getEquipFlow();
			equipFlowDao.load(ef, ef.getFlowId());
			ef.setFlowState(Status.EquipFlow.warehousing);			
			equipFlowDao.save(ef);
		}		
		equipWarehouse.setSubEquipWarehouse();		
		equipWarehouseDao.merge(equipWarehouse);
		Equipment e =equipWarehouse.getEquipFlow().getEquipment();
		e.setWarehouseDate(equipWarehouse.getWarehouseDate());
		equipmentDao.merge(e);
	}

	public void delete(Long warehouseId) {
		EquipWarehouse equipWarehouse = equipWarehouseDao.get(warehouseId);
		EquipFlow ef = equipWarehouse.getEquipFlow();
		ef.setFlowState(Status.EquipFlow.dismantled);
		equipWarehouseDao.remove(equipWarehouse);
	}

	protected EquipWarehouse passFlowApproveApplication(FormApprove formApprove) {
        EquipWarehouse t = super.passFlowApproveApplication(formApprove);

        if (t.getCorpId() != null) {
            String projectName = t.getEquipFlow().getEquipDiary().getProjectName();
            String recordId = t.getEquipFlow().getEquipDiary().getRecordId();
            String msg = projectName + "项目的备案号为" + recordId + "设备已提交入库申请，请知悉；";
            CorpInfo c = corpInfoService.getTranslateFull(t.getCorpId());
            AppUser appUser = appUserService.getTranslate(t.getUserId());

            for (int i = 0; i < 5; i++) {
                BusinessMessage bm = new BusinessMessage();
                switch (i) {
                    case 0:
                        bm.setReceiveTel(c.getDutymanTel1());
                        bm.setReceiveName(c.getDutyman());
                        break;
                    case 1:
                        bm.setReceiveTel(c.getDutymanTel2());
                        bm.setReceiveName(c.getDutyman());
                        break;
                    case 2:
                        bm.setReceiveTel(c.getDutymanTel3());
                        bm.setReceiveName(c.getDutyman());
                        break;
                    case 3:
                        bm.setReceiveTel(c.getCapitalTel());
                        bm.setReceiveName(c.getCapital());
                        break;
                    case 4:
                        bm.setReceiveTel(appUser.getPhone());
                        bm.setReceiveName(appUser.getUsername());
                        break;
                }

                bm.setMessage(msg);
                bm.setSenderName("资产入库消息");
                bm.setSendFlag("0");
                bm.setCreateTime(new Date());
                if (bm.getReceiveTel() != null) {
                    businessMessageService.sendOnce(bm);
                }
            }
        }


		Set<EquipWarehouseAbnormalCompon> acs = new HashSet<EquipWarehouseAbnormalCompon>();
		EquipFlow ef = t.getEquipFlow();
		EquipDiary ed = ef.getEquipDiary();
		for (EquipWarehouseCompon ewc : t.getEquipWarehouseComponSet()) {
			if (ewc.getWarehouseCounts() + ewc.getWarehouseWaitCounts() > ewc.getComponDiary().getCounts()) {
				CodeServiceImpl.translate(ewc.getComponDiary());
				CodeServiceImpl.translate(ewc);
				EquipWarehouseAbnormalCompon ac = new EquipWarehouseAbnormalCompon();
				ac.setCalculate(ewc.getComponDiary().getCalculate());
				ac.setComponGenericName(ewc.getComponDiary().getComponGenericName());
				ac.setComponSpecificName(ewc.getComponDiary().getComponSpecificName());
				ac.setDimensions(ewc.getComponDiary().getDimensions());
				ac.setDispatchCounts(ewc.getComponDiary().getCounts());
				ac.setStatusName(ewc.getStatusName());
				ac.setWarehouseCounts(ewc.getWarehouseCounts());
				ac.setWarehouseResultName(ewc.getWarehouseResultName());
				ac.setWarehouseWaitCounts(ewc.getWarehouseWaitCounts());
				acs.add(ac);
			}

		/*	if (ewc.getWarehouseCounts() + ewc.getWarehouseWaitCounts() >Integer.parseInt(ewc.getCounts())) {
				CodeServiceImpl.translate(ewc.getComponDiary());
				CodeServiceImpl.translate(ewc);
				EquipWarehouseAbnormalCompon ac = new EquipWarehouseAbnormalCompon();
				ac.setCalculate(ewc.getComponDiary().getCalculate());
				ac.setComponGenericName(ewc.getComponGenericName());
				ac.setComponSpecificName(ewc.getComponSpecificName());
				ac.setDimensions(ewc.getDimensions());
				ac.setDispatchCounts(Integer.parseInt(ewc.getCounts()));
				ac.setStatusName(ewc.getStatusName());
				ac.setWarehouseCounts(ewc.getWarehouseCounts());
				ac.setWarehouseResultName(ewc.getWarehouseResultName());
				ac.setWarehouseWaitCounts(ewc.getWarehouseWaitCounts());
				acs.add(ac);
			}*/

            if (!Status.EquipComponStore.warehouse.equals(ewc.getStatus())) { // 非待入库状态,进行库存状态变更
				ComponDiary cd = ewc.getComponDiary();
				cd.setWarehouseCounts(cd.getWarehouseCounts() + ewc.getWarehouseCounts());
				
				//入仓库配件
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_storeHouse.storeId_L_EQ",  String.valueOf(t.getStoreId()));
				filter.addConjunctFilter("Q_component.componId_L_EQ", String.valueOf(cd.getComponId()));
				List<StoreJoinComponent> slist = storeJoinComponentService.queryTranslateAll(filter); 
				if(slist.size()>0){
					StoreJoinComponent sjc = slist.get(0);
					sjc.setCounts(sjc.getCounts()+ewc.getWarehouseCounts());
					storeJoinComponentService.merge(sjc);
				}else{
					StoreJoinComponent sjc =new StoreJoinComponent();
					StoreHouse sh = storeHouseService.get(t.getStoreId());
					Component c = componentService.get(cd.getComponId());
					sjc.setComponent(c);
					sjc.setStoreHouse(sh);
					sjc.setCounts(ewc.getWarehouseCounts());
					storeJoinComponentService.save(sjc);
				}
				
				Component c = componentDao.get(cd.getComponId());
				if (Status.EquipComponStore.warehoused.equals(ewc.getStatus())) { // 已入库,设备库存增加
					c.setConsumeCounts(c.getConsumeCounts() + ewc.getWarehouseCounts());
					// 配件入库
					StoreComponStock stock = new StoreComponStock();
					stock.setStoreId(t.getStoreId());
					stock.setComponId(cd.getComponId());
					stock.setProjectId(cd.getProjectId());
					stock.setCounts(ewc.getWarehouseCounts());
					stock.setBoundDate(DateUtil.getCurrentLinkDateStr());
					stock.setStockType(Type.OutInStock.in);
					storeComponStockDao.save(stock);
					
					QueryFilter query = new QueryFilter();
					query.addConjunctFilter("Q_projectId_L_EQ",cd.getProjectId() + "");
					query.addConjunctFilter("Q_componId_L_EQ", cd.getComponId() + "");
					query.addConjunctFilter("Q_status_S_EQ", "0");
					List<ProjectCompon> list = projectComponDao.getAll(query);
					for (ProjectCompon pc : list) {
						pc.setCounts(pc.getCounts() - ewc.getWarehouseCounts());
						projectComponDao.save(pc);
					}		
				}
				if (cd.getCounts().intValue() == cd.getWarehouseCounts().intValue()) { // 调度零配件全部入库
					cd.setStatus(ewc.getStatus());
					if (Status.EquipComponStore.warehoused.equals(ewc.getStatus())) {
						c.setStoreId(t.getStoreId());
					}
					if (c.getConsumeCounts() > 0) {
						c.setStatus(Status.EquipCompon.unused);
					} else {
						c.setStatus(ewc.getStatus());
					}
					c.setStatusDate(new Date());
				}
				componentDao.save(c);
				componDiaryDao.save(cd);
			}
			if (Status.InspectResult.failed.equals(ewc.getWarehouseResult()) || Status.InspectResult.repair.equals(ewc.getWarehouseResult())) { // 生成故障单
				Long relateId = t.getWarehouseId();
				String relateSerial = t.getWarehouseSerial();
				String relateModule = SystemConstant.MODULE_EQUIP_WAREHOUSE;
				String warehouseResult = CodeServiceImpl.fastValue("INSPECT_RESULT", ewc.getWarehouseResult());
				equipHitchService.createRelateHitch(relateId, relateSerial, relateModule, ed.getProjectId(), ef.getEquipId(), t.getWarehouseDate(), warehouseResult, ewc.getRemark(), null, null);
			}
		}
		// 设备业务状态
		Equipment e = t.getEquipFlow().getEquipment();
		e.setBusinessStatus(Status.EquipBusiness.disenable);
		e.setProjectName(null);
		e.setBuildingNum(null);
		BindingParamFilters params = new BindingParamFilters();
		params.addFilter("flowId", "EQ", ef.getFlowId());
		params.addFilter("status", "GE", "delivering", Status.EquipComponStore.delivering);
		params.addFilter("status", "LE", "deliveryed", Status.EquipComponStore.deliveryed);
//		List<ComponDiary> list = componDiaryDao.getAll(params);
		// 零配件均确认完成
//		if (list.isEmpty()) { 
			// 设备日历
			ed.setStatus(Status.EquipComponStore.warehoused);
			equipDiaryDao.save(ed);

			// 设备入库
//			e.setBusinessStatus(Status.EquipBusiness.warehouse);
			e.setStoreId(t.getStoreId());
			e.setStatus(Status.EquipCompon.unused);
			e.setFlowId(null);
			e.setProjectName(null);
			e.setProjectId(null);
			e.setEquipDiary(null);
			

			StoreEquipStock ss = new StoreEquipStock();
			ss.setStoreId(t.getStoreId());
			ss.setEquipId(ed.getEquipId());
			ss.setProjectId(ed.getProjectId());
			ss.setBoundDate(DateUtil.getCurrentLinkDateStr());
			ss.setStockType(Status.EquipComponStore.warehousing);
			storeEquipStockDao.save(ss);

			// 设备流程结束
			ef.setFlowState(Status.EquipFlow.warehoused);
//		} else {
			// 设备流程返回拆卸状态
//			ef.setFlowState(Status.EquipFlow.dismantled);
//		}
		equipmentDao.save(e);
		equipFlowDao.save(ef);
		if (!acs.isEmpty()) {
			CodeServiceImpl.translate(ed);
			EquipWarehouseAbnormal a = new EquipWarehouseAbnormal();
			a.setAddress(ed.getAddress());
			a.setEquipGenericName(ed.getEquipGenericName());
			a.setEquipSpecificName(ed.getEquipSpecificName());
			a.setExwSerial(ed.getExwSerial());
			a.setPrincipal(t.getPrincipal());
			a.setProjectName(ed.getProjectName());
			a.setRecordId(ed.getRecordId());
			a.setWarehouseId(t.getWarehouseId());
			a.setEquipWarehouseAbnormalComponSet(acs);
			equipWarehouseAbnormalDao.save(a);
		}
		return t;
	}

    // 入库申请提交之后发短信
    public void sendSms(EquipWarehouse p,String msg){
		if (p.getCorpId() != null) {
			CorpInfo c = corpInfoService.getTranslateFull(p.getCorpId());
			BusinessMessage bm = new BusinessMessage();
			for (int i = 0; i < 4; i++) {
				switch (i) {
					case 0:
						bm.setReceiveTel(c.getDutymanTel1());
						bm.setReceiveName(c.getDutyman());
						break;
					case 1:
						bm.setReceiveTel(c.getDutymanTel2());
						bm.setReceiveName(c.getDutyman());
						break;
					case 2:
						bm.setReceiveTel(c.getDutymanTel3());
						bm.setReceiveName(c.getDutyman());
						break;
					case 3:
						bm.setReceiveTel(c.getCapitalTel());
						bm.setReceiveName(c.getCapital());
						break;
				}

				bm.setMessage(msg);
				bm.setSenderName("资产入库消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				if (bm.getReceiveTel() != null) {
					businessMessageService.sendOnce(bm);
				}
			}
		}
    }

}
