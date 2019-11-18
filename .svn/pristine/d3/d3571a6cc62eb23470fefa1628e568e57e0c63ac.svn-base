/**
 *====================================================
 * 文件名称: LogisticsTransportServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-22			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.core.util.StringUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.*;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.*;
import com.knight.emms.service.*;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.service.impl.CodeServiceImpl;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;


/**
 * @ClassName: LogisticsTransportServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-22 下午9:43:06
 */
public class LogisticsTransportServiceImpl extends BusinessFlowServiceImpl<LogisticsTransport> implements LogisticsTransportService, FundPaymentVoucherService, ExportService {

	private LogisticsTransportDao logisticsTransportDao;

	@Resource
	private LogisticsTrandetailDao logisticsTrandetailDao;
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private EquipActivateDao equipActivateDao;
	
	@Resource
	private EquipFlowService equipFlowService;

	@Resource
	private CorpInfoService corpInfoService;
	
	
	@Resource
	private LogisticsTrancarfeeDao logisticsTrancarfeeDao;
	
	@Resource
	private LogisticsTranDestributionDao logisticsTranDestributionDao;
	
	@Resource
	private ComponentDao componentDao;

	@Resource
	private DispatchComponDao dispatchComponDao;

	@Resource
	private DispatchDao dispatchDao;

	@Resource
	private ProjectComponDao projectComponDao;
	
	@Resource
	private StoreJoinComponentService storeJoinComponentService;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private DispatchAllocateInitService dispatchAllocateInitService;
	
	@Resource
	private ProjectJoinAnnexService projectJoinAnnexService;

	public LogisticsTransportServiceImpl(LogisticsTransportDao dao) {
		super(dao);
		logisticsTransportDao = dao;
	}

	public List<LogisticsTransport> queryTranslateAll(QueryFilter queryFilter) {
		List<LogisticsTransport> list = super.queryTranslateAll(queryFilter);
		for (LogisticsTransport l : list) {
			CodeServiceImpl.translate(l.getEquipment());
		}
		return list;
	}

	public LogisticsTransport getTranslateFull(Long transportId) {
		LogisticsTransport t = logisticsTransportDao.get(transportId);
		CodeServiceImpl.translate(t, getPersistantStruct());
		CodeServiceImpl.translate(t.getEquipment());
		for (LogisticsTrandetail l : t.getLogisticsTrandetailSet()) {
			CodeServiceImpl.translate(l.getDispatchCompon().getComponent());
		}
		return t;
	}

	public void deletedTrandetail(Long trandetailId) {
		logisticsTrandetailDao.remove(trandetailId);
	}

	public void deletedTrancarfee(Long trancarfeeId) {
		logisticsTrancarfeeDao.remove(trancarfeeId);
	}
	public void deletedDestribution(Long trancarfeeId) {
		logisticsTrancarfeeDao.remove(trancarfeeId);
	}
	public void deletedTranDestribution(Long destributionId) {
		logisticsTranDestributionDao.remove(destributionId);
	}


	public void received(LogisticsTransport logisticsTransport) {
		logisticsTransport.setStatus(Status.Logistics.received);
		for (LogisticsTrandetail l : logisticsTransport.getLogisticsTrandetailSet()) {
			DispatchCompon dc = l.getDispatchCompon();
			if (Status.EquipComponDispatch.allocate.equals(dc.getWorkStatus())) {
				dc.setCounts(dc.getCounts()-l.getSignCounts());
				//dc.setWorkStatus(Status.EquipComponDispatch.execute);
				if(dc.getCounts()==0){
					dc.setWorkStatus(Status.EquipComponDispatch.execute);
				}
				dispatchComponDao.merge(dc);
			}
			//l.setCounts(l.getCounts()-l.getSignCounts());
		}
		logisticsTransportDao.merge(logisticsTransport);
	
	
		
	}
//保存之后发送短信
	public void saveOrMergeForEdit(LogisticsTransport logisticsTransport) {
		if (logisticsTransport.getTransportId() == null) {
			logisticsTransportDao.saveSerialModel(logisticsTransport);
		}
		logisticsTransport.setSubLogisticsTransport();

		if(logisticsTransport.getLogisticsTrandetailSet().size()>0){
			for(LogisticsTrandetail ltd : logisticsTransport.getLogisticsTrandetailSet()){
			 Long disCompId =	ltd.getDispatchCompon().getDispatchComponId();
			 DispatchCompon dc = dispatchComponDao.get(disCompId);
				if((dc.getCounts()+ltd.getCounts()) >dc.getIniCounts()){
					throw new BusinessException("总运输数量"+(dc.getCounts()+ltd.getCounts())+"不能大于调拨数量!");
				}
			}
		}
		logisticsTransportDao.merge(logisticsTransport);
		
		//List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUserFromContratArrange", logisticsTransport.getDeliveryEntId());
		
		Set<LogisticsTrandetail> set =logisticsTransport.getLogisticsTrandetailSet();
		Iterator<LogisticsTrandetail> uu = set.iterator();
		String driver = null;
		String licensePlate = null;
		initialzeAccount();
		BusinessMessage bm = new BusinessMessage();
		String[] tel = null;
		String[] receiveName = null;
		while(uu.hasNext()){
			LogisticsTrandetail logis  =uu.next();
			driver = logis.getDriver();
			licensePlate = logis.getLicensePlate();
			String msg = logisticsTransport.getProjectName()+"项目的配件已发车，司机姓名："+driver+"车牌号："+licensePlate+"，请做好收货准备！";
			if(logisticsTransport.getReceivePhone()!=null){
			bm.setReceiveTel(logisticsTransport.getReceivePhone());
			bm.setReceiveName(logisticsTransport.getReceiveMan());
			bm.setMessage(msg);
			bm.setSenderName("提交完成消息");
			bm.setSendFlag("0");
			bm.setCreateTime(new Date());
			businessMessageDao.save(bm);
			businessMessageService.sendOnce(bm);
			}
		}		
	}
	
	public void passApproveApplication(FormApprove formApprove) {
		LogisticsTransport t = super.passFlowApproveApplication(formApprove);
		Long targetProjectId = t.getProjectId();

		//操作项目附件修改库存
		for(LogisticsTranDestribution ltd : t.getLogisticsTranDistributionbutionSet()){
			if(ltd.getDisAllInitId()!=null){
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_dispatchAllocateInit.disAllInitId_L_EQ", String.valueOf(ltd.getDisAllInitId()));
				filter.addConjunctFilter("Q_project.projectId_L_EQ", String.valueOf(t.getProjectId()));
				List<ProjectJoinAnnex> list = projectJoinAnnexService.queryTranslateAll(filter);
				if(list.size()>0){
					ProjectJoinAnnex pjae = list.get(0);
					pjae.setCounts(ltd.getFillCounts().intValue()+pjae.getCounts());
					projectJoinAnnexService.merge(pjae);
				}else{
					Project pj = projectService.get(t.getProjectId());
					DispatchAllocateInit dai = 	  dispatchAllocateInitService.get(ltd.getDisAllInitId());
					ProjectJoinAnnex pja = new ProjectJoinAnnex();
					pja.setCounts(ltd.getFillCounts().intValue());
					pja.setProject(pj);
					pja.setDispatchAllocateInit(dai);
					projectJoinAnnexService.save(pja);  
				}
			
			}
		
		}
		
		
		for (LogisticsTrandetail lt : t.getLogisticsTrandetailSet()) {
			DispatchCompon dispatchCompon = lt.getDispatchCompon();
			//操作调度配件修改运输数量counts
			Long componId = null ;
			Long dispatchId = null;
			
			componId = dispatchCompon.getComponId();
			dispatchId = dispatchCompon.getDispatchId();
			if((dispatchCompon.getCounts()+lt.getCounts()) <=dispatchCompon.getIniCounts()){
				dispatchCompon.setCounts(dispatchCompon.getCounts()+lt.getCounts());
				dispatchComponDao.merge(dispatchCompon);
			}else{
				throw new BusinessException("总运输数量"+(dispatchCompon.getCounts()+lt.getCounts())+"不能大于调拨数量!");
			}
			//操作仓库配件表修改库存数
			Object[] params2 = {dispatchId,componId};
			String	hql2 ="select vo1 from StoreJoinComponent vo1 where vo1.storeHouse.storeId in (select deliveryEntId from Dispatch where dispatchId = ?)  and vo1.component.componId = ?";
			List<StoreJoinComponent> lts = storeJoinComponentService.findByHql(hql2,params2);
			if(lts.size()>0){
				lts.get(0).setCounts(lts.get(0).getCounts()-lt.getCounts());
			}
				
			Long projectComponId = dispatchCompon.getProjectComponId(); // 源项目配件ID
			QueryFilter query = new QueryFilter();
			query.addConjunctFilter("Q_projectId_L_EQ", targetProjectId + "");
			query.addConjunctFilter("Q_componId_L_EQ", dispatchCompon.getComponId() + "");
			query.addConjunctFilter("Q_status_S_EQ", "0");
			List<ProjectCompon> list = projectComponDao.getAll(query);
			for (ProjectCompon pc : list) {
				pc.setCounts(pc.getCounts()+lt.getCounts());
				projectComponDao.save(pc);
			}
			if (list.isEmpty()) {
				ProjectCompon pc = new ProjectCompon();
				pc.setProjectId(targetProjectId);
				pc.setComponId(dispatchCompon.getComponId());
				pc.setCounts((pc.getCounts()==null?0:pc.getCounts())+lt.getCounts());
				pc.setStatus("0");
				projectComponDao.save(pc);
			}
			if (projectComponId != null) {
				ProjectCompon pc = projectComponDao.get(projectComponId);
				if (pc == null) {
					throw new java.lang.IllegalArgumentException("源项目配件ID关联记录不存在");
				}
				pc.setCounts(pc.getCounts()-lt.getCounts());
				projectComponDao.save(pc);
			} else {
				Component component = lt.getDispatchCompon().getComponent();
				component.setConsumeCounts(component.getConsumeCounts() - lt.getSignCounts());
				componentDao.save(component);
			}
		}
		String msg = t.getProjectName()+"项目的配件已签收，请做好安装准备工作！";
		AppUser appUser = ApplicationContainer.getCurrentUser();
		//List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppUser", appUser.getUserId());
		if(t.getDeliveryEntId()!=null){
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUserFromContratArrange", t.getDeliveryEntId());
		if(list.size()>0){
		initialzeAccount();
		BusinessMessage bm = new BusinessMessage();
		String[] tel = null;
		String[] receiveName = null;
		 tel = StringUtil.translateString((String)list.get(0).get("ENGINEERING_TEL"));
		 receiveName = StringUtil.translateString((String)list.get(0).get("ENGINEERING"));
			if(tel!=null){
				for (int j = 0; j < tel.length; j++) {
					bm.setReceiveTel(tel[j]);
					if(receiveName!=null){
						bm.setReceiveName(receiveName[0]);
					}
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

	public void rejectApproveApplication(FormApprove formApprove) {
		LogisticsTransport t = super.rejectFlowApproveApplication(formApprove);
		t.setStatus(Status.Logistics.transport);
		t.setApplyforState(Status.Applyfor.waitSubmit);
		logisticsTransportDao.save(t);
	}

	// ====================================================================================//
	public BigDecimal getRelatePaymentAmount(Long transportId) {
		LogisticsTransport logisticsTransport = logisticsTransportDao.get(transportId);
		return logisticsTransport.getTransportAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long transportId, String status) {
		LogisticsTransport logisticsTransport = logisticsTransportDao.get(transportId);
		logisticsTransport.setFinishedAmount(amountPayment.getHasPaymentAmount());
		logisticsTransport.setRemainderAmount(logisticsTransport.getTransportAmount().subtract(logisticsTransport.getFinishedAmount()));
		logisticsTransport.setFundStatus(status);
		logisticsTransportDao.save(logisticsTransport);
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
	
	/*自动生成启用单*/
	/*public void createEquipActivate(LogisticsTransport logistics){
		EquipActivate activate = new EquipActivate();
		activate.setDelFlag(Constant.ENABLED);
		activate.setEffective(Constant.DISENABLED);
		activate.setActivateDate(logistics.getDeliveryDate());
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		activate.setUserId(currentUser.getUserId());
		activate.setUserName(currentUser.getFullname());
		activate.setProvidedDate(DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE));
		activate.setDepartment(currentUser.getDepartment());
		String hql1 = "select * from Dispatch d where (select top 1 lt.dispatchId from LogisticsTrandetail lt where lt.transportId=?)=d.dispatchId";
		Object[] params = {logistics.getTransportId()};
		List<LogisticsTrandetail> list = logisticsTrandetailService.findByHql(hql1, params);
		equipActivateDao.saveSerialModel(activate);
//		EquipFlow equipFlow = equipFlowService.get(logistics.getEquipment().getFlowId());
//		equipFlow.setActivateId(activate.getActivateId());
//		equipFlowService.save(equipFlow);
		equipActivateDao.save(activate);
	}*/
	
	
	
	
/*	获取审核时间
	protected LogisticsTransport passFlowAcceptApplication(FormAccept formAccept) {
		LogisticsTransport lt = super.passFlowAcceptApplication(formAccept);
		lt.setAcceptTime(formAccept.getAcceptTime());
		logisticsTransportDao.merge(lt);
		return   lt;
	}
	
	获取审批时间
	protected LogisticsTransport passFlowApproveApplication(FormApprove formApprove) {
		LogisticsTransport lt = super.passFlowApproveApplication(formApprove);
		lt.setApproveTime(formApprove.getApproveTime());
		logisticsTransportDao.merge(lt);
		return   lt;
	}*/
	
}