/**
 *====================================================
 * 文件名称: TruckPlanServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.util.StringUtil;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.ContractArrangeDao;
import com.knight.emms.dao.ContractArrangeEquipmentDao;
import com.knight.emms.dao.TruckPlanDao;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.ContractArrange;
import com.knight.emms.model.ContractArrangeEquipment;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.TruckPlan;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ContractArrangeService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.TruckPlanService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

import lombok.Setter;

/**
 * @ClassName: TruckPlanServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:48:34
 */
public class TruckPlanServiceImpl extends BusinessFlowServiceImpl<TruckPlan> implements TruckPlanService {

	private TruckPlanDao truckPlanDao;
	
	@Setter
	private Map<String, DispatchRelateDomain> relateDomains = new HashMap<String, DispatchRelateDomain>();
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private CorpInfoService corpInfoService;
	
	@Resource
	private BusinessMessageService businessMessageService;
	
//	@Resource
//	private ContractArrangeEquipmentDao contractArrangeEquipmentDao;

	public TruckPlanServiceImpl(TruckPlanDao dao) {
		super(dao);
		this.truckPlanDao = dao;
	}

	public void saveOrMergeForEdit(TruckPlan truckPlan) {
		if (truckPlan.getTruckPlanId() == null) {
			super.saveSerialModel(truckPlan);
		}
//		truckPlan.setSubContractArrange();
		truckPlanDao.merge(truckPlan);
	}

//	public void deleteEquipment(Long arrangeEquipId) {
//		contractArrangeEquipmentDao.remove(arrangeEquipId);
//	}
	private void initialzeAccount() {
		String openurl = (String) ApplicationContainer.getSystemParam("sms.openurl");
		String account = (String) ApplicationContainer.getSystemParam("sms.account");
		String enterprise = (String) ApplicationContainer.getSystemParam("sms.enterprise");
		String authkey = (String) ApplicationContainer.getSystemParam("sms.authkey");
		int cgid = (Integer) ApplicationContainer.getSystemParam("sms.cgid");
		int csid = (Integer) ApplicationContainer.getSystemParam("sms.csid");
		OpenApi.initialzeAccount(openurl, account, enterprise, authkey, cgid, csid);
	}
	// 业务申请提交之后发短信
//   public void sendSms(ContractArrange p){
//	   BusinessMessage[] bms = new BusinessMessage[6];
//		String msg = p.getProjectName()+"现设备需求数为"+p.getQuantity()+"台的业务申请已提交，预计进场日期为"+p.getStartDate()+"请及时办理审批！";
//		AppUser appUser = ApplicationContainer.getCurrentUser();
//		//List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppUser", appUser.getUserId());
//		if(p.getCorpId()!=null){
//		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUserFromContratArrange", p.getCorpId());
//		initialzeAccount();
//		for(int i = 0;i<3;i++){
//			bms[i] = new BusinessMessage();
//			BusinessMessage bm = bms[i];
//			String[] tel = null;
//			switch(i){			
//				case 0:
//					 tel = StringUtil.translateString((String)list.get(0).get("DUTYMAN_TEL1"));
//					break;
//				case 1:
//					tel = StringUtil.translateString((String)list.get(0).get("DUTYMAN_TEL2"));
//					break;
//				case 2:
//					tel = StringUtil.translateString((String)list.get(0).get("DUTYMAN_TEL3"));
//					break;
//				default:break;
//			}
//			if(tel!=null){
//				for (int j = 0; j < tel.length; j++) {
//					bm.setReceiveTel(tel[j]);
//					bm.setMessage(msg);
//					bm.setSenderName("提交完成消息");
//					bm.setSendFlag("0");
//					bm.setCreateTime(new Date());
//					businessMessageDao.save(bm);
//					businessMessageService.sendOnce(bm);
//			}
//		}
//  }
//		}
//   }
   //审批完成后提交短信
//	public void passApproveApplication(FormApprove formApprove) {
//		ContractArrange d = super.passFlowApproveApplication(formApprove);
///*		if (relateDomains.containsKey(d.getRelateModule())) {
//			relateDomains.get(d.getRelateModule()).passDispatchRelate(formApprove, d);
//		}*/
//		contractArrangeDao.save(d);	
//		
//		String msg = "";
//         msg = d.getProjectName()+"现设备需求数为"+d.getQuantity()+"台,";
//		for(ContractArrangeEquipment equipment:d.getContractArrangeEquipmentSet()){
//			String buidingNum = equipment.getBuildingNum();
//			String equipVender = equipment.getEquipVender();
//			String equipSpecificName = equipment.getEquipSpecificName();
//			String startDate = equipment.getStartDate();
//			if(buidingNum!=null){
//				msg+=buidingNum+"号楼,";
//			}
//			if(equipVender!=null){
//				msg+=equipVender+",";
//			}
//			if(equipSpecificName!=null){
//				msg+=equipSpecificName+",";
//			}
//			if(startDate!=null){
//				msg+="的预计进场日期为"+startDate;
//			}
//			msg+="业务申请已审批通过，请做好商务、方案、告知、物资等相关准备工作！";
//		}
//		BusinessMessage[] bms = new BusinessMessage[6];
//		// msg = d.getProjectName()+"现设备需求数为"+d.getQuantity()+"台的业务申请已审批通过，预计进场日期为"+ d.getStartDate()+
//				//"请做好商务、维保、方案、告知、物资等相关准备工作！";
//		AppUser appUser = ApplicationContainer.getCurrentUser();
//		//List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppUser", appUser.getUserId());
//		if(d.getCorpId()!=null){
//		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUserFromContratArrange", d.getCorpId());
//		initialzeAccount();
//		
//		
//		for(int i = 0;i<6;i++){
//			bms[i] = new BusinessMessage();
//			BusinessMessage bm = bms[i];
//			String[] tel = null;
//			String[] receiveName = null;
//			switch(i){			
//				case 0:
//					//bm.setReceiveTel(appUser.getMobile());
//					/*if((String)list.get(0).get("marketTel")==null||(String)list.get(0).get("marketTel")==""){
//						break;
//					}*/
//					 tel = StringUtil.translateString((String)list.get(0).get("MARKET_TEL"));
//					 receiveName = StringUtil.translateString((String)list.get(0).get("MARKET"));
//					break;
//				case 1:
//					 tel = StringUtil.translateString((String)list.get(0).get("TECHNOLOGY_TEL"));
// 					 receiveName = StringUtil.translateString((String)list.get(0).get("TECHNOLOGY"));
//					break;
//				case 2:
//					 tel = StringUtil.translateString((String)list.get(0).get("MAINTENANCE_TEL"));
//					 receiveName = StringUtil.translateString((String)list.get(0).get("MAINTENANCE"));
//					break;
//				case 3:
//					 tel = StringUtil.translateString((String)list.get(0).get("ENGINEERING_TEL"));
//					 receiveName = StringUtil.translateString((String)list.get(0).get("ENGINEERING"));
//					break;
//				case 4:
//					 tel = StringUtil.translateString((String)list.get(0).get("SECURITY_TEL"));
//					 receiveName = StringUtil.translateString((String)list.get(0).get("SECURITY"));
//					break;
//				case 5:
//					 tel = StringUtil.translateString((String)list.get(0).get("CAPITAL_TEL"));
//					 receiveName = StringUtil.translateString((String)list.get(0).get("CAPITAL"));
//					break;
//				default:break;
//			}
//			if(tel!=null){
//				
//					
//						for(int k=0;k<tel.length;k++){
//							BusinessMessage bmm =new BusinessMessage();
//							if(receiveName!=null){
//								bmm.setReceiveName(receiveName[0]);
//							}	
//							bmm.setReceiveTel(tel[k]);
//							bmm.setMessage(msg);
//							bmm.setSenderName("审批完成消息");
//							bmm.setSendFlag("0");
//							bmm.setCreateTime(new Date());
//							//businessMessageDao.save(bm);
//							businessMessageService.sendOnce(bmm);
//					}
///*					bm.setReceiveTel(tel[j]);
//					bm.setMessage(msg);
//					bm.setSenderName("审批完成消息");
//					bm.setSendFlag("0");
//					bm.setCreateTime(new Date());
//					businessMessageDao.save(bm);
//					businessMessageService.sendOnce(bm);*/
//			}
//		}
//		}
//	}
}
