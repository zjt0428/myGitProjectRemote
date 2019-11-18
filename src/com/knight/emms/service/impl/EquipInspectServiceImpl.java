/**
 *====================================================
 * 文件名称: EquipInspectServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.CostInspectDao;
import com.knight.emms.dao.EquipInspectDao;
import com.knight.emms.dao.EquipInspectDetailDao;
import com.knight.emms.dao.EquipInspectSchemaDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.domain.IUploadTerminalDomain;
import com.knight.emms.model.Component;
import com.knight.emms.model.CostInspect;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.EquipInspectDetail;
import com.knight.emms.model.EquipInspectSchema;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.EquipHitchService;
import com.knight.emms.service.EquipInspectService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipInspectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:32:57
 */
public class EquipInspectServiceImpl extends BusinessFlowServiceImpl<EquipInspect> implements EquipInspectService {

	private EquipInspectDao equipInspectDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private EquipInspectDetailDao equipInspectDetailDao;
	
	@Resource
	private CostInspectDao costInspectDao;

	@Resource
	private EquipInspectSchemaDao equipInspectSchemaDao;

	@Resource
	private EquipHitchService equipHitchService;

	@Resource
	private IUploadTerminalDomain uploadTerminalDomain;
	
	@Resource
	private FileAttachService fileAttachService;

	public EquipInspectServiceImpl(EquipInspectDao dao) {
		super(dao);
		this.equipInspectDao = dao;
	}

	@Override
	public List<EquipInspect> queryTranslateAllFull(QueryFilter filter) {				
		List<EquipInspect> list = equipInspectDao.getAll(filter);
		for (EquipInspect e : list) {
			CodeServiceImpl.translate(e, getPersistantStruct());
			CodeServiceImpl.translate(e.getEquipInspectSchema());
//			CodeServiceImpl.translate(e.getInspectRectify());
			CodeServiceImpl.translate(e.getEquipInspectSchema().getEquipDiary());
		}
		return list;
	}
	
	public EquipInspect getTranslateFull(Long inspectId) {
		EquipInspect e = equipInspectDao.get(inspectId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipInspectSchema());
//		CodeServiceImpl.translate(e.getInspectRectify());
		CodeServiceImpl.translate(e.getEquipInspectSchema().getEquipDiary());
		for (EquipInspectDetail d : e.getEquipInspectDetailSet()) {
			CodeServiceImpl.translate(d);
			CodeServiceImpl.translate(d.getComponent());
		}
		for (CostInspect d : e.getCostInspectSet()) {
			CodeServiceImpl.translate(d);
		}
		return e;
	}

	public EquipInspect merge(EquipInspect inspect) {
		for (EquipInspectDetail eid : inspect.getEquipInspectDetailSet()) {
			eid.setInspectId(inspect.getInspectId());
			if (eid.getInspectDetailId() == null) {
				equipInspectDetailDao.save(eid);
			} else {
				equipInspectDetailDao.merge(eid);
			}
		}
		for (CostInspect eid : inspect.getCostInspectSet()) {
			eid.setInspectId(inspect.getInspectId());
			if (eid.getCostInspectId() == null) {
				costInspectDao.save(eid);
			} else {
				costInspectDao.merge(eid);
			}
		}
		return super.merge(inspect);
	}

	public void submit(Long inspectId) {
		EquipInspect e = equipInspectDao.get(inspectId);
		if (e.getInspectDate().getTime() > e.getThisEndCycleDate().getTime()) {
			e.setStatus(Status.HandleResult.overtime);
		} else {
			e.setStatus(Status.HandleResult.processed);
		}
		EquipDiary ed = e.getEquipInspectSchema().getEquipDiary();
		for (EquipInspectDetail d : e.getEquipInspectDetailSet()) {
			if (Status.InspectResult.failed.equals(d.getDetailResult()) || Status.InspectResult.repair.equals(d.getDetailResult())) { // 生成故障单
				Long relateId = e.getInspectId();
				String relateSerial = e.getInspectSerial();
				String relateModule = SystemConstant.MODULE_EQUIP_INSPECT;
				String detailResult = CodeServiceImpl.fastValue("INSPECT_RESULT", d.getDetailResult());
				String inspectDate = DateUtil.changeDateToStr(e.getInspectDate(), DateUtil.LINK_DISPLAY_DATE);
				String location = d.getPosition();
				String content = d.getSubstance();
				equipHitchService.createRelateHitch(relateId, relateSerial, relateModule, ed.getProjectId(), ed.getEquipId(), inspectDate, detailResult, d.getDescription(), location, content);
			}
		}
		EquipInspectSchema s = e.getEquipInspectSchema();
		s.setInspectTimes(s.getInspectTimes() + 1);
		equipInspectSchemaDao.save(s);

		Equipment equipment = equipmentDao.get(e.getEquipInspectSchema().getEquipDiary().getEquipId());
		equipment.setLatestRepairDate(e.getInspectDate());
		equipmentDao.save(equipment);
	}

	public void saveUpload(List<EquipInspect> list) {
		for (EquipInspect ei : list) {
			EquipInspect e = equipInspectDao.get(ei.getInspectId());
			for (EquipInspectDetail eid : e.getEquipInspectDetailSet()) {
				equipInspectDetailDao.remove(eid);
			}
			e.setInspectDate(ei.getInspectDate());
			e.setInspectPepoles(ei.getInspectPepoles());
			e.setInspectResult(ei.getInspectResult());
			for (EquipInspectDetail eid : ei.getEquipInspectDetailSet()) {
				eid.setInspectId(e.getInspectId());
				eid.setComponent(new Component(eid.getComponId()));
				equipInspectDetailDao.save(eid);
			}
			uploadTerminalDomain.uploadsave(e);
		}
	}

	public void clean(Long inspectId) {
		EquipInspect inspect = equipInspectDao.get(inspectId);
		for (EquipInspectDetail eid : inspect.getEquipInspectDetailSet()) {
			equipInspectDetailDao.remove(eid);
		}
		String str = inspect.getFileAttaches();
		if(StringUtils.isNotBlank(str)) {
			String[] strArr = str.split(",");
			for(String s : strArr) {
				fileAttachService.remove(new Long(s));
			}
		}
		inspect.setEquipInspectDetailSet(null);
		inspect.setInspectDate(null);
		inspect.setInspectPepoles(null);
		inspect.setInspectResult(null);
		inspect.setStatus(Constant.DISENABLED);
		inspect.setRemark(null);
		inspect.setAddress(null);
		inspect.setFileAttaches(null);
		inspect.setExwSerial(null);
		inspect.setBuildingNum(null);
		inspect.setRectification(null);
		inspect.setInspectRectify(null);
		EquipInspectSchema eis = equipInspectSchemaDao.get(inspect.getEquipInspectSchema().getInspectSchemaId());
		if(eis.getInspectTimes()>0) {
			eis.setInspectTimes(eis.getInspectTimes()-1);
		}
		equipInspectSchemaDao.update(eis);
		equipInspectDao.update(inspect);
	}

	public void deleteDetail(Long detailId) {
		equipInspectDetailDao.remove(detailId);
	}
	
	public void deleteCost(Long costInspectId) {
		costInspectDao.remove(costInspectId);
	}

	public boolean immediate(EquipInspect inspect) {
		if(!saveOrMergeFor(inspect)){
            return false;
        }
		submit(inspect.getInspectId());
        return true;
	}

	@Override
	public List<EquipInspect> queryWaitInspect(QueryFilter filter, String keyword) {
		List<EquipInspect> results = equipInspectDao.queryWaitInspect(filter, keyword);
		for (EquipInspect e : results) {
			CodeServiceImpl.translate(e.getEquipInspectSchema().getEquipDiary());
		}
		CodeServiceImpl.translate(results);
		return results;
	}
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	public boolean saveOrMergeFor(EquipInspect equipInspect){
		super.save(equipInspect); 
		CodeServiceImpl.translate(equipInspect);
//		if("1".equals(equipInspect.getRectification())){
//			BusinessMessage[] bms = new BusinessMessage[3];
//			String msg = equipInspect.getEquipInspectSchema().getEquipDiary().getProjectName()+",楼号:"+equipInspect.getBuildingNum()+"的设备, 巡检结果为"+equipInspect.getInspectResultName()+",现需要整改，请监督落实。";
//			AppUser appUser = ApplicationContainer.getCurrentUser();
//			List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppPracti", appUser.getUserId());
//			if(list.size()!=0) {
//				for (int i = 0; i < 3; i++) {
//					bms[i] = new BusinessMessage();
//					BusinessMessage bm = bms[i];
//					switch (i) {
//						case 0:
//							bm.setReceiveTel(appUser.getMobile());
//							break;
//						case 1:
//							bm.setReceiveTel((String) list.get(0).get("DUTYMAN_TEL1"));
//							break;
//						case 2:
//							bm.setReceiveTel((String) list.get(0).get("MARKET_TEL"));
//							break;
//					}
//					bm.setMessage(msg);
//					bm.setSenderName("安全巡检消息");
//					bm.setSendFlag("0");
//					bm.setModule("INSPECTIONDEETAIL");
//					bm.setCreateTime(new Date());
//					businessMessageService.sendOnce(bm);
//				}
//			}else{
//                return false;
//            }
//		}
        return true;
	}

	@Override
	public void saveOrMergeForEdit(EquipInspect t) {
		// TODO Auto-generated method stub
		
	}
	
	/*对已完成的巡检管理单进行审批功能*/
	@Override
	protected void passFlowApproveApplication(EquipInspect equipInspect){
		if(equipInspect.getStatus().equals(Status.HandleResult.processed)){
			equipInspect.setStatus(Status.HandleResult.passed);
		}else{
			equipInspect.setStatus(Status.HandleResult.processed);
		}
		equipInspectDao.update(equipInspect);
	}
	

}
