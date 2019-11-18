/**
 *====================================================
 * 文件名称: DispatchServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-9			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.google.gson.reflect.TypeToken;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.StringUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.core.service.BusinessFlowServiceAbstract;
import com.knight.emms.dao.*;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.domain.IUploadTerminalDomain;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.DispatchService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.CodeServiceImpl;
import lombok.Setter;
import org.apache.commons.lang.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

/**
 * @ClassName: DispatchServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-9 上午8:28:27
 */
public class DispatchServiceImpl extends BusinessFlowServiceAbstract<Dispatch> implements DispatchService, FundPaymentVoucherService {


	private DispatchDao dispatchDao;

	@Setter
	private Map<String, DispatchRelateDomain> relateDomains = new HashMap<String, DispatchRelateDomain>();
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private CorpInfoService corpInfoService;
	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private DispatchEquipDao dispatchEquipDao;

	@Resource
	private DispatchComponDao dispatchComponDao;

	@Resource
	private DispatchPractiDao dispatchPractiDao;

	@Resource
	private DispatchAutocraneDao dispatchAutocraneDao;

	@Resource
	private DispatchAllocateDao dispatchAllocateDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private ComponentDao componentDao;

	@Resource
	private PractitionerDao practitionerDao;

	@Resource
	private IUploadTerminalDomain uploadTerminalDomain;

	@Resource
	private ProjectDao projectDao;

	public DispatchServiceImpl(DispatchDao dao) {
		super(dao);
		this.dispatchDao = dao;
		rejectAcceptStateMap.put(Status.DispatchApplyfor.waitAccept, Status.DispatchApplyfor.rejected);
		rejectApproveStateMap.put(Status.DispatchApplyfor.waitApprove, Status.DispatchApplyfor.rejected);
	}

	private void completeCreateDispatch(Dispatch dispatch) {
		dispatch.setDispatchId(null);
		dispatch.setDelFlag(Constant.ENABLED);
		dispatch.setFundStatus(Status.Fund.payment);
		dispatch.setApplyforState(Status.DispatchApplyfor.waitSubmit);
	}

	public List<DispatchPracti> queryPractiTranslateAll(QueryFilter filter) {
		List<DispatchPracti> resultList = dispatchPractiDao.getAll(filter);
		for (DispatchPracti p : resultList) {
			CodeServiceImpl.translate(p.getPractitioner(), practitionerDao.getPersistantStruct());
		}
		return resultList;
	}

	public List<DispatchCompon> queryComponTranslateAll(QueryFilter filter) {
		List<DispatchCompon> resultList = dispatchComponDao.getAll(filter);
		for (DispatchCompon c : resultList) {
			CodeServiceImpl.translate(c.getComponent(), componentDao.getPersistantStruct());
		}
		return resultList;
	}

	public List<DispatchEquip> queryEquipTranslateAll(QueryFilter filter) {
		List<DispatchEquip> resultList = dispatchEquipDao.getAll(filter);
		for (DispatchEquip e : resultList) {
			CodeServiceImpl.translate(e.getEquipment(), equipmentDao.getPersistantStruct());
		}
		return resultList;
	}

	public void saveCreate(Dispatch dispatch) {
		Set<DispatchEquip> dispatchEquipSet = GsonUtil.fromJson(dispatch.getDispatchEquips(), new TypeToken<Set<DispatchEquip>>() {}, DateUtil.LINK_DISPLAY_DATE);
		int i=0;
		for(DispatchEquip de:dispatchEquipSet){
			List<Map<String,Object>> list = dispatchEquipDao.queryByScript("dispatch.equip_is_dispatch",de.getEquipId());
			if(list.size()>0){
				throw new BusinessException("不能重复调度同一台设备,"+list.get(0).get("EQUIP_SERIAL")+",请确认设备是否完成入库");
			}
			i++;
			if(i==dispatchEquipSet.size()) {
				Equipment e = equipmentDao.get(de.getEquipId());
				/*dispatch.setPermissionManager(e.getPermissionManager());*/
			}
		}
		completeCreateDispatch(dispatch);
		dispatchDao.saveSerialModel(dispatch);

		dispatch.setSubDispatch();
		dispatchDao.save(dispatch);
	}

	public void saveUpload(List<Dispatch> dispatchList) {
		SerialNumberStrategy strategy = Dispatch.class.getAnnotation(SerialNumberStrategy.class);
		String preSerial = DateUtil.getCurrentDateStr();
		int seq = dispatchDao.createNextSerialseq(dispatchList.get(0));
		if (seq + dispatchList.size() > strategy.maxseq()) {
			throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
		}
		for (int i = 0; i < dispatchList.size(); i++) {
			Dispatch dispatch = dispatchList.get(i);
			completeCreateDispatch(dispatch);
			dispatch.setDispatchSerial(preSerial + StringUtils.leftPad(seq + "", (strategy.maxseq() + "").length(), "0"));
		}
		for (Dispatch dispatch : dispatchList) {
			uploadTerminalDomain.uploadsave(dispatch);
		}
	}
	private void initialzeAccount() {
		String openurl = (String) ApplicationContainer.getSystemParam("sms.openurl");
		String account = (String) ApplicationContainer.getSystemParam("sms.account");
		String enterprise = (String) ApplicationContainer.getSystemParam("sms.enterprise");
		String authkey = (String) ApplicationContainer.getSystemParam("sms.authkey");
		int cgid = (Integer) ApplicationContainer.getSystemParam("sms.cgid");
		int csid = (Integer) ApplicationContainer.getSystemParam("sms.csid");
		OpenApi.initialzeAccount(openurl, account, enterprise, authkey, cgid, csid);
	}
	public void rejectAcceptApplication(FormAccept formAccept) {
		Dispatch d = super.rejectFlowAcceptApplication(formAccept);
		if (relateDomains.containsKey(d.getRelateModule())) {
			relateDomains.get(d.getRelateModule()).rejectDispatchRelate(formAccept, d);
		}
		dispatchDao.save(d);
	
	}

	public void passApproveApplication(FormApprove formApprove) {
		Dispatch d = super.passFlowApproveApplication(formApprove);
		if (relateDomains.containsKey(d.getRelateModule())) {
			relateDomains.get(d.getRelateModule()).passDispatchRelate(formApprove, d);
		}
		dispatchDao.save(d);
		if (d.getProjectId() != null) {
			Project p = projectDao.get(d.getProjectId());
			if(Status.Project.conclude.equals(p.getStatus())) {
				p.setStatus(Status.Project.finished);
				projectDao.update(p);
			}
		}

		BusinessMessage[] bms = new BusinessMessage[6];
		String msg = d.getProjectName()+"的调度指令已审批通过，请立即做好发车准备以及相关准备工作！";
		if(d.getDispatchId()!=null){
			List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUser", d.getDispatchId());
		initialzeAccount();
		for(int i = 0;i<6;i++){
			bms[i] = new BusinessMessage();
			BusinessMessage bm = bms[i];
			String[] tel = null;
			String[] receiveName = null;
			switch(i){			
			case 0:
				//bm.setReceiveTel(appUser.getMobile());
				 tel = StringUtil.translateString((String)list.get(0).get("MARKET_TEL"));
				 receiveName = StringUtil.translateString((String)list.get(0).get("MARKET"));
				break;
			case 1:
				 tel = StringUtil.translateString((String)list.get(0).get("TECHNOLOGY_TEL"));
				 receiveName = StringUtil.translateString((String)list.get(0).get("TECHNOLOGY"));
				break;
			case 2:
				 tel = StringUtil.translateString((String)list.get(0).get("MAINTENANCE_TEL"));
				 receiveName = StringUtil.translateString((String)list.get(0).get("MAINTENANCE"));
				break;
			case 3:
				 tel = StringUtil.translateString((String)list.get(0).get("ENGINEERING_TEL"));
				 receiveName = StringUtil.translateString((String)list.get(0).get("ENGINEERING"));
				break;
			case 4:
				 tel = StringUtil.translateString((String)list.get(0).get("SAFE_TEL"));
				 receiveName = StringUtil.translateString((String)list.get(0).get("SAFE"));
				break;
			case 5:
				 tel = StringUtil.translateString((String)list.get(0).get("CAPITAL_TEL"));
				 receiveName = StringUtil.translateString((String)list.get(0).get("CAPITAL"));
				break;
			default:break;
		}
		if(tel!=null){
			for (int j = 0; j < tel.length; j++) {
				if(receiveName!=null){
					bm.setReceiveName(receiveName[0]);
				}					
				bm.setReceiveTel(tel[j]);
				bm.setMessage(msg);
				bm.setSenderName("审批完成消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
				businessMessageService.sendOnce(bm);
			}
		}
		}
		}
/*		BusinessMessage bm = new BusinessMessage();
		bm.setReceiveTel("17805938957");
		bm.setMessage(msg);
		//bm.setReceiveTel(appUser.getMobile());
		bm.setSenderName("审批完成消息");
		bm.setSendFlag("0");
		bm.setCreateTime(new Date());
		businessMessageDao.save(bm);
		businessMessageService.sendOnce(bm);*/
	}

	public void rejectApproveApplication(FormApprove formApprove) {
		Dispatch d = super.rejectFlowApproveApplication(formApprove);
		if (relateDomains.containsKey(d.getRelateModule())) {
			relateDomains.get(d.getRelateModule()).rejectDispatchRelate(formApprove, d);
		}
		dispatchDao.save(d);
	}

	public Dispatch getTranslateFull(Long dispatchId) {
		Dispatch d = dispatchDao.get(dispatchId);
		CodeServiceImpl.translate(d, getPersistantStruct());
		for (DispatchEquip de : d.getDispatchEquipSet()) {
			CodeServiceImpl.translate(de.getEquipment(), equipmentDao.getPersistantStruct());
		}
		for (DispatchCompon dc : d.getDispatchComponSet()) {
			CodeServiceImpl.translate(dc.getComponent(), componentDao.getPersistantStruct());
		}
		for (DispatchPracti dp : d.getDispatchPractiSet()) {
			CodeServiceImpl.translate(dp.getPractitioner(), practitionerDao.getPersistantStruct());
		}
		return d;
	}

	public void deletedEquip(Long dispatchEquipId) {
		dispatchEquipDao.remove(dispatchEquipId);
	}

	public void deletedCompon(Long dispatchComponId) {
		dispatchComponDao.remove(dispatchComponId);
	}

	public void deletedPracti(Long dispatchPractiId) {
		dispatchPractiDao.remove(dispatchPractiId);
	}

	public void deletedAutocrane(Long dispatchAutocraneId) {
		dispatchAutocraneDao.remove(dispatchAutocraneId);
	}

	public void deletedAllocate(Long allocateId) {
		dispatchAllocateDao.remove(allocateId);
	}

	public void submitDispatch(Long dispatchId) {
		Dispatch p = dispatchDao.get(dispatchId);
		if (!Status.DispatchApplyfor.waitSubmit.equals(p.getApplyforState())) { // 0:新增
			throw new BusinessException("调度方案[" + p.getDispatchSerial() + "]状态不合法,无法提交!");
		}
		if (relateDomains.containsKey(p.getRelateModule())) {
			relateDomains.get(p.getRelateModule()).submitDispatchRelate(p);
		}
		p.setApplyforState(Status.DispatchApplyfor.waitApprove);
		dispatchDao.save(p);
		String msg = p.getProjectName()+"的调度申请已提交，请及时审批！";
		if(p.getDispatchId()!=null){
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUser", p.getDispatchId());
		if(list.size()>0){
		initialzeAccount();
		BusinessMessage bm = new BusinessMessage();
		String[] tel = null;
		String[] receiveName = null;
		 tel = StringUtil.translateString((String)list.get(0).get("CAPITAL_TEL"));
		 receiveName = StringUtil.translateString((String)list.get(0).get("CAPITAL"));
			if(tel!=null){
				for (int j = 0; j < tel.length; j++) {
					bm.setReceiveTel(tel[j]);
					bm.setMessage(msg);
					bm.setSenderName("提交完成消息");
					bm.setSendFlag("0");
					bm.setCreateTime(new Date());
					businessMessageDao.save(bm);
					businessMessageService.sendOnce(bm);
				}
			}
		}
		}
		}


	public BigDecimal getRelatePaymentAmount(Long dispatchId) {
		Dispatch p = dispatchDao.get(dispatchId);
		return p.getAutocraneAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long dispatchId, String status) {
		Dispatch p = dispatchDao.get(dispatchId);
		p.setFundStatus(status);
		dispatchDao.save(p);
	}

	@Override
	public DispatchEquip getDispatchEquipment(Long dispatchEquipId) {
		return dispatchEquipDao.get(dispatchEquipId);
	}
	
	public void loseEffective(Dispatch dispatch) {
		for (DispatchEquip ce : dispatch.getDispatchEquipSet()) {
			Equipment e = equipmentDao.get(ce.getEquipId());
			if (ce.getEquipId().equals(e.getEquipId())) {
				e.setBuildingNum(null);
			}
			e.setProjectId(null);
			e.setProjectName(null);
			e.setProjectAddress(null);
			e.setBusinessStatus(Status.EquipBusiness.disenable);
			e.setStatus(Status.EquipCompon.unused);
			equipmentDao.save(e);
		}
		dispatch.setEffective(Constant.DISENABLED);
		dispatchDao.save(dispatch);
	}

	@Override
	public void deleteChange(Dispatch dispatch) {
		// TODO Auto-generated method stub
		for (DispatchEquip ce : dispatch.getDispatchEquipSet()) {
			Equipment e = equipmentDao.get(ce.getEquipId());
			e.setBusinessStatus(Status.EquipBusiness.disenable);
			e.setStatus(Status.EquipCompon.unused);
			equipmentDao.save(e);
		}
	}

}
