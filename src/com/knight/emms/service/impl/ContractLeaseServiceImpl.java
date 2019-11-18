/**
 *====================================================
 * 文件名称: ContractLeaseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.StringUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.ChangeRecordDao;
import com.knight.emms.dao.ContractArrangeDao;
import com.knight.emms.dao.ContractCostitemDao;
import com.knight.emms.dao.ContractEquipBriefDao;
import com.knight.emms.dao.ContractEquipCostDao;
import com.knight.emms.dao.ContractEquipDao;
import com.knight.emms.dao.ContractEquipOutlayDao;
import com.knight.emms.dao.ContractInoutFreeDao;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.ContractOperatorFreeDao;
import com.knight.emms.dao.ContractPractiBriefDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.InstallPriceSetDao;
import com.knight.emms.dao.OtherExpenseStatementDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.dao.SafetyMonitorSettleListDao;
import com.knight.emms.dao.TruckCranePriceSetDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.ContractArrange;
import com.knight.emms.model.ContractEquip;
import com.knight.emms.model.ContractEquipBrief;
import com.knight.emms.model.ContractEquipCost;
import com.knight.emms.model.ContractEquipOutlay;
import com.knight.emms.model.ContractInoutFree;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.ContractOperatorFree;
import com.knight.emms.model.ContractPractiBrief;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.InstallPriceSet;
import com.knight.emms.model.OtherExpenseStatement;
import com.knight.emms.model.Project;
import com.knight.emms.model.SafetyMonitorSettleList;
import com.knight.emms.model.TruckCranePriceSet;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.dao.DepartmentDao;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: ContractLeaseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午10:31:32
 */
public class ContractLeaseServiceImpl extends BusinessFlowServiceImpl<ContractLease> implements ContractLeaseService {

	private ContractLeaseDao contractLeaseDao;

	@Resource
	private BaseJDBCDao baseJdbcDao;
	
	@Resource
	private ChangeRecordDao changeRecordDao;
	
	@Resource
	private ContractEquipBriefDao contractEquipBriefDao;
	
	@Resource
	private CorpInfoService corpInfoService;
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private BusinessMessageService businessMessageService;
	

	@Resource
	private ContractEquipDao contractEquipDao;

	@Resource
	private ContractEquipOutlayDao contractEquipOutlayDao;

	@Resource
	private ContractEquipCostDao contractEquipCostDao;

	@Resource
	private ContractPractiBriefDao contractPractiBriefDao;

	@Resource
	private ContractCostitemDao contractCostitemDao;

	@Resource
	private ProjectDao projectDao;

	@Resource
	private EquipmentDao equipmentDao;
	
	@Resource
	private InstallPriceSetDao installPriceSetDao;
	
	@Resource
	private TruckCranePriceSetDao truckCranePriceSetDao;
	
	@Resource
	private ContractInoutFreeDao contractInoutFreeDao;
	
	@Resource
	private ContractOperatorFreeDao contractOperatorFreeDao;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	@Resource
	private DepartmentDao departmentDao;
	
	@Resource
	private ContractArrangeDao contractArrangeDao;
	
	@Resource
	private SafetyMonitorSettleListDao safetyMonitorSettleListDao;
	
	@Resource
	private OtherExpenseStatementDao otherExpenseStatementDao;
	
	public ContractLeaseServiceImpl(ContractLeaseDao dao) {
		super(dao);
		this.contractLeaseDao = dao;
		passAcceptStateMap.put(Status.ContractApplyfor.nullifyAccept, Status.ContractApplyfor.nullifyApprove);
		rejectAcceptStateMap.put(Status.ContractApplyfor.nullifyAccept, Status.ContractApplyfor.waitDispatch);

		passApproveStateMap.put(Status.ContractApplyfor.nullifyApprove, Status.ContractApplyfor.nullify);
		rejectApproveStateMap.put(Status.ContractApplyfor.nullifyApprove, Status.ContractApplyfor.waitDispatch);
	}

	public ContractLease getTranslateFull(Long contractId) {
		ContractLease cl = contractLeaseDao.get(contractId);
//		ContractLease cl = new ContractLease();
//		BeanUtils.copyProperties(contractLease, cl);
		CodeServiceImpl.translate(cl, getPersistantStruct());
//		Set<ContractEquipBrief> contractEquipBriefSet = new HashSet<ContractEquipBrief>(cl.getContractEquipBriefSet());
//		Iterator<ContractEquipBrief> ceb = contractEquipBriefSet.iterator();
//		while(ceb.hasNext()){
//			if("0".equals(ceb.next().getApproveable())){
//				ceb.remove();
//			}
//		}
//		cl.setContractEquipBriefSet(contractEquipBriefSet);
//		Iterator<SafetyMonitorSettleList> sms = cl.getSafetyMonitorSettleListSet().iterator();
//		while(sms.hasNext()){
//			if("0".equals(sms.next().getApproveable())){
//				sms.remove();
//			}
//		}
//		
//		Iterator<ContractInoutFree> cif = cl.getContractInoutFreeSet().iterator();
//		while(cif.hasNext()){
//			if("0".equals(cif.next().getApproveable())){
//				cif.remove();
//			}
//		}
//		
//		Iterator<ContractOperatorFree> cof = cl.getContractOperatorFreeSet().iterator();
//		while(cof.hasNext()){
//			if("0".equals(cof.next().getApproveable())){
//				cof.remove();
//			}
//		}
		
		for (ContractEquipBrief c : cl.getContractEquipBriefSet()) {
			CodeServiceImpl.translate(c, contractEquipBriefDao.getPersistantStruct());
		}
		for (ContractEquip c : cl.getContractEquipSet()) {
			CodeServiceImpl.translate(c, contractEquipDao.getPersistantStruct());
		}
		for (ContractEquipOutlay c : cl.getContractEquipOutlaySet()) {
			CodeServiceImpl.translate(c);
		}
		for (ContractEquipCost c : cl.getContractEquipCostSet()) {
			CodeServiceImpl.translate(c);
		}
		for (ContractPractiBrief c : cl.getContractPractiBriefSet()) {
			CodeServiceImpl.translate(c, contractPractiBriefDao.getPersistantStruct());
		}
		for (InstallPriceSet c : cl.getInstallPriceSet()) {
			CodeServiceImpl.translate(c);
		}
		for (TruckCranePriceSet c : cl.getTruckCranePriceSet()) {
			CodeServiceImpl.translate(c);
		}
		return cl;
	}

	@Override
	public void saveOrMergeForEdit(ContractLease contractLease) {
		
		if(contractLease.getContractId() == null){
			String seq = contractLeaseDao.createNextSerial(contractLease);
			contractLease.setContractSerial(seq);
			contractLeaseDao.save(contractLease);
		}
		contractLease.setSubContractLease();
		contractLeaseDao.merge(contractLease);
		
		
	}

	public void deleteEquip(Long contractEquipId) {
		contractEquipDao.remove(contractEquipId);
	}

	public void deleteEquipBrief(Long ceBriefId) {
		ContractEquipBrief cef =contractEquipBriefDao.get(ceBriefId);
		if(!"0".equals(cef.getDispatchable())){
			throw new BusinessException("已发货设备不能删除！");
		}
		ContractLease cl = contractLeaseDao.get(cef.getContractId());
		ContractArrange ca = contractArrangeDao.get(cl.getArrangeId());
		ca.setInuse(null);
		contractArrangeDao.update(ca);
		contractEquipBriefDao.remove(ceBriefId);
	}

	public void deleteEquipOutlay(Long contractEquipoutlayId) {
		contractEquipOutlayDao.remove(contractEquipoutlayId);
	}

	public void deleteEquipCost(Long contractEquipcostId) {
		contractEquipCostDao.remove(contractEquipcostId);
	}

	public void deletePractiBrief(Long cpBriefId) {
		contractPractiBriefDao.remove(cpBriefId);
	}

	public void deleteCostitem(Long costitemId) {
		contractCostitemDao.remove(costitemId);
	}

	public void deleteInstallPriceSet(Long installPriceId) {
		installPriceSetDao.remove(installPriceId);
	}
	
	public void deleteTruckCranePriceSet(Long tcPriceId) {
		truckCranePriceSetDao.remove(tcPriceId);
	}
	protected ContractLease passFlowAcceptApplication(FormAccept formAccept) {
		ContractLease cl = super.passFlowAcceptApplication(formAccept);
		Project project = projectDao.get(cl.getProjectId());
		if (Status.Project.fllowing.equals(project.getStatus())) {
			project.setStatus(Status.Project.conclude);
			projectDao.save(project);
		}
		for (ContractEquip ce : cl.getContractEquipSet()) {
			Equipment e = equipmentDao.get(ce.getEquipId());
			e.setBusinessStatus(Status.EquipBusiness.contract);
			equipmentDao.save(e);
		}
		// 审批通过,合同设备数量如果不足,则发送通知
		List<Map<String, Object>> result = contractLeaseDao.queryByScript("remaind.contract_equip_adequate_check", cl.getContractId());
		if (!result.isEmpty()) {
			StringBuffer sb = new StringBuffer(cl.getContractTheme());
			for (Map<String, Object> m : result) {
				sb.append(" 设备").append(m.get("EQUIP_CATEGORY_NAME")==null?"":m.get("EQUIP_CATEGORY_NAME")).append("共需").append(m.get("ASK_QUANTITY")).append("台,现仅剩余").append(m.get("EXISTS_QUANTITY")).append("台,");
			}
			sb.append("请做好资源调配工作.");
			// 合同设备数量不足提醒
			// contractLeaseDao.updateScirpt("remaind.contract_equip_lack", cl.getPbEnt(), cl.getContractId(), sb.toString());
		}
		return cl;
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
	// 合同申请提交之后发短信
   public void sendSms(ContractLease p){
	   BusinessMessage[] bms = new BusinessMessage[6];
		String msg = p.getProjectName()+"的合同信息登记已提交，请及时审批！";
		AppUser appUser = ApplicationContainer.getCurrentUser();
		//List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppUser", appUser.getUserId());
		if(p.getPbEnt()!=null){
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUserFromContratArrange", p.getPbEnt());
		initialzeAccount();
		for(int i = 0;i<3;i++){
			bms[i] = new BusinessMessage();
			BusinessMessage bm = bms[i];
			String[] tel = null;
			switch(i){			
				case 0:
					 tel = StringUtil.translateString((String)list.get(0).get("DUTYMAN_TEL1"));
					break;
				case 1:
					tel = StringUtil.translateString((String)list.get(0).get("DUTYMAN_TEL2"));
					break;
				case 2:
					tel = StringUtil.translateString((String)list.get(0).get("DUTYMAN_TEL3"));
					break;
				default:break;
			}
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
   //审批完成后提交短信
	public void passApproveApplication(FormApprove formApprove) {
		Project	project = projectService.get(contractLeaseService.get(formApprove.getRelateId()).getProjectId());
		project.setContracted(Constant.ENABLED);
		projectService.merge(project);
		ContractLease d = super.passFlowApproveApplication(formApprove);
/*		if (relateDomains.containsKey(d.getRelateModule())) {
			relateDomains.get(d.getRelateModule()).passDispatchRelate(formApprove, d);
		}*/
		
		contractLeaseDao.save(d);		
		BusinessMessage[] bms = new BusinessMessage[6];
        StringBuffer msg = new StringBuffer();
        msg.append(d.getProjectName()).append("的合同信息登记已审批通过，共需")
                .append(d.getQuantity()==null?"0":d.getQuantity()).append("台，预计进场日期为");
        //String msg = d.getProjectName()+"的合同信息登记已审批通过，共需"+d.getQuantity()==null?"0":d.getQuantity()+"台，预计进场日期为";
        if(d.getContractEquipSet().size()>0){
            Iterator<ContractEquip> it = d.getContractEquipSet().iterator();
            while(it.hasNext()){
                ContractEquip cc = it.next();
                msg.append(cc.getStartDate()+",");
            }
        }
        msg.append("请立即做好维保、方案、告知、物资等相关准备工作！");
		//String msg = d.getProjectName()+"的合同信息登记已审批通过，共需"+"请立即做好维保、方案、告知、物资等相关准备工作！";
		AppUser appUser = ApplicationContainer.getCurrentUser();
		//List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppUser", appUser.getUserId());
		if(d.getPbEnt()!=null){
		List<Map<String,Object>> list = corpInfoService.queryByScript("terminal.get_toSendUserFromContratArrange", d.getPbEnt());
		//initialzeAccount();
		
		
		for(int i = 0;i<6;i++){
			bms[i] = new BusinessMessage();
		
			String[] tel = null;
			String[] receiveName = null;
			switch(i){			
				case 0:
					//bm.setReceiveTel(appUser.getMobile());
					/*if((String)list.get(0).get("marketTel")==null||(String)list.get(0).get("marketTel")==""){
						break;
					}*/
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
					 tel = StringUtil.translateString((String)list.get(0).get("SECURITY_TEL"));
					 receiveName = StringUtil.translateString((String)list.get(0).get("SECURITY"));
					break;
				case 5:
					 tel = StringUtil.translateString((String)list.get(0).get("CAPITAL_TEL"));
					 receiveName = StringUtil.translateString((String)list.get(0).get("CAPITAL"));
					break;
				default:break;
			}
			if(tel!=null){
				for (int j = 0; j < tel.length; j++) {
					BusinessMessage bm = new BusinessMessage();
					if(receiveName!=null){
						bm.setReceiveName(receiveName[0]);
					}					
					bm.setReceiveTel(tel[j]);
					bm.setMessage(msg.toString());
					bm.setSenderName("审批完成消息");
					bm.setSendFlag("0");
					bm.setCreateTime(new Date());
					//businessMessageDao.save(bm);
					businessMessageService.sendOnce(bm);
				}
			}
		}
		}
	}
	
	@Override
	public void bindingDepartmentPermission(ContractLease contractLease) {
		Long depId = contractLease.getCompetentDepartmentId();
		if(depId != null) {
			String str = concatPermission(depId);
			contractLease.setPermissionFlag(str);
		}
	}

	public String concatPermission(Long depId) {
		StringBuffer sb = new StringBuffer();
		if(depId!=null && depId!=0) {
			Department dep = departmentDao.get(depId);
			sb.append("d").append(dep.getDepSerial()).append("d,");
			if(dep.getParentId()!=null) {
				concatPermission(dep.getParentId());
			}
		}
		return sb.toString();
	}

	@Override
	public void changeContractNo(Long contractId, String contractNo) {
//		contractNoExist(contractId,contractNo);
		ContractLease c = contractLeaseDao.get(contractId);
		StringBuffer sa = new StringBuffer();
		StringBuffer sb = new StringBuffer();
		StringBuffer sc = new StringBuffer();
		StringBuffer sd = new StringBuffer();
		StringBuffer se = new StringBuffer();
		StringBuffer sf = new StringBuffer();
		// TODO Auto-generated method stub
		String sqa = "UPDATE T_CONTRACT_LEASE SET CONSTRACT_NO = '"+contractNo+"' WHERE CONTRACT_ID = "+contractId+"";
		sa.append("UPDATE T_CONTRACT_LEASE SET CONSTRACT_NO = '"+c.getContractNo()+"' WHERE CONTRACT_ID = "+contractId+"");
		//修改发车调度合同编号
		String sqb = "UPDATE T_DISPATCH SET RELATE_SERIAL = '"+contractNo+"' WHERE RELATE_ID = "+contractId+" AND RELATE_MODULE = '"+SystemConstant.MODULE_CONTRACT_LEASE+"'";
		sb.append("UPDATE T_DISPATCH SET RELATE_SERIAL = '"+c.getContractNo()+"' WHERE RELATE_ID = "+contractId+" AND RELATE_MODULE = '"+SystemConstant.MODULE_CONTRACT_LEASE+"'");
		//修改现场装车合同编号
		String sqc = "UPDATE T_LOGISTICS_TRANSPORT SET RELATE_SERIAL = '"+contractNo+"' WHERE DISPATCH_ID IN (SELECT DISPATCH_ID FROM T_DISPATCH WHERE RELATE_ID = "+contractId+" AND RELATE_MODULE = '"+SystemConstant.MODULE_CONTRACT_LEASE+"')";
		sc.append("UPDATE T_LOGISTICS_TRANSPORT SET RELATE_SERIAL = '"+c.getContractNo()+"' WHERE DISPATCH_ID IN (SELECT DISPATCH_ID FROM T_DISPATCH WHERE RELATE_ID = "+contractId+" AND RELATE_MODULE = '"+SystemConstant.MODULE_CONTRACT_LEASE+"')");
		//修改现场安装
		String sqd = "UPDATE T_EQUIPMENT_INSTALL SET CONTRACT_SERIAL = '"+contractNo+"' WHERE INSTALL_ID IN (SELECT INSTALL_ID FROM T_EQUIPMENT_FLOW WHERE CONTRACT_ID ="+contractId+")";
		sd.append("UPDATE T_EQUIPMENT_INSTALL SET CONTRACT_SERIAL = '"+c.getContractNo()+"' WHERE INSTALL_ID IN (SELECT INSTALL_ID FROM T_EQUIPMENT_FLOW WHERE CONTRACT_ID ="+contractId+")");
		//修改结算管理
		String sqe = "UPDATE T_SETTLE_CONTRACT SET CONTRACT_NO = '"+contractNo+"' WHERE CONTRACT_ID = "+contractId+"";
		se.append("UPDATE T_SETTLE_CONTRACT SET CONTRACT_NO = '"+c.getContractNo()+"' WHERE CONTRACT_ID = "+contractId+"");
		//修改配件入库
		String sqf = "UPDATE T_COMPON_INTOSTORE SET CONTRACT_NO = '"+contractNo+"' WHERE CONTRACT_ID = "+contractId+"";
		sf.append("UPDATE T_COMPON_INTOSTORE SET CONTRACT_NO = '"+c.getContractNo()+"' WHERE CONTRACT_ID = "+contractId+"");
		changeRecordDao.recordChange(sqa.toString(), sa.toString());
		changeRecordDao.recordChange(sqb.toString(), sb.toString());
		changeRecordDao.recordChange(sqc.toString(), sc.toString());
		changeRecordDao.recordChange(sqd.toString(), sd.toString());
		changeRecordDao.recordChange(sqe.toString(), se.toString());
		changeRecordDao.recordChange(sqf.toString(), sf.toString());
		baseJdbcDao.jdbcTemplate().execute(sqb);
		baseJdbcDao.jdbcTemplate().execute(sqc);
		baseJdbcDao.jdbcTemplate().execute(sqd);
		baseJdbcDao.jdbcTemplate().execute(sqe);
		baseJdbcDao.jdbcTemplate().execute(sqa);
		baseJdbcDao.jdbcTemplate().execute(sqf);
	}

	@Override
	public void deleteContractOperatirFree(Long operatorId) {
		contractOperatorFreeDao.remove(operatorId);
	}

	@Override
	public void deleteContractInoutFree(Long inoutId) {
		contractInoutFreeDao.remove(inoutId);
	}

	@Override
	public void contractNoExist(Long contractId, String contractNo) {
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		filter.addConjunctFilter("Q_contractNo_S_EQ", contractNo);
		if(contractId!=null){
			filter.addConjunctFilter("Q_contractId_L_NEQ", contractId+"");
		}
		List<ContractLease> list = contractLeaseDao.getAll(filter);
		if(list.size()>0){
			throw new BusinessException("合同编号不能重复！");
		}
	}
	
	public void deleteSafetyMonitor(Long safetyId) {
		SafetyMonitorSettleList sms =safetyMonitorSettleListDao.get(safetyId);
		if(!"0".equals(sms.getDispatchable())){
			throw new BusinessException("已发货设备不能删除！");
		}
		safetyMonitorSettleListDao.remove(sms);
	}
}
