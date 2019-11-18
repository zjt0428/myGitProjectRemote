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

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;

import com.alibaba.fastjson.JSONObject;
import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.StringUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.dao.BaseBusinessModelDao;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
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
import com.knight.emms.dao.ContractLeaseVersionDao;
import com.knight.emms.dao.ContractOperatorFreeDao;
import com.knight.emms.dao.ContractPractiBriefDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.InstallPriceSetDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.dao.TruckCranePriceSetDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.ContractArrange;
import com.knight.emms.model.ContractEquip;
import com.knight.emms.model.ContractEquipBrief;
import com.knight.emms.model.ContractEquipCost;
import com.knight.emms.model.ContractEquipOutlay;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.ContractLeaseVersion;
import com.knight.emms.model.ContractPractiBrief;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.InstallPriceSet;
import com.knight.emms.model.Project;
import com.knight.emms.model.TruckCranePriceSet;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.ContractLeaseVersionService;
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
 * @ClassName: ContractLeaseVersionServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 */
public class ContractLeaseVersionServiceImpl extends BaseBusinessModelServiceImpl<ContractLeaseVersion> implements ContractLeaseVersionService {

	

	private ContractLeaseVersionDao contractLeaseVersionDao;

	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private ContractLeaseVersionService contractLeaseVersionService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	public ContractLeaseVersionServiceImpl(ContractLeaseVersionDao dao) {
		super(dao);
		this.contractLeaseVersionDao = dao;
	}

	public ContractLeaseVersion getTranslateFull(Long contractId) {
		ContractLeaseVersion clv = contractLeaseVersionDao.get(contractId);
		CodeServiceImpl.translate(clv, getPersistantStruct());
//		for (ContractEquipBrief c : clv.getContractEquipBriefSet()) {
//			CodeServiceImpl.translate(c, contractEquipBriefDao.getPersistantStruct());
//		}
//		for (ContractEquip c : clv.getContractEquipSet()) {
//			CodeServiceImpl.translate(c, contractEquipDao.getPersistantStruct());
//		}
//		for (ContractEquipOutlay c : clv.getContractEquipOutlaySet()) {
//			CodeServiceImpl.translate(c);
//		}
//		for (ContractEquipCost c : clv.getContractEquipCostSet()) {
//			CodeServiceImpl.translate(c);
//		}
//		for (ContractPractiBrief c : clv.getContractPractiBriefSet()) {
//			CodeServiceImpl.translate(c, contractPractiBriefDao.getPersistantStruct());
//		}
//		for (InstallPriceSet c : clv.getInstallPriceSet()) {
//			CodeServiceImpl.translate(c);
//		}
//		for (TruckCranePriceSet c : clv.getTruckCranePriceSet()) {
//			CodeServiceImpl.translate(c);
//		}
		return clv;
	}

	@Override
	public void saveOrMergeForEdit(ContractLeaseVersion clvs, ContractLease c) {
		c.setSubContractLease();
		contractLeaseService.merge(c);
		c = contractLeaseService.get(c.getContractId());
		ContractLease cl = new ContractLease();
		ContractLeaseVersion clv = JSONObject.parseObject(JSONObject.toJSONString(clvs)).toJavaObject(ContractLeaseVersion.class);
		BeanUtils.copyProperties(c, cl);
		cl.setContractEquipBriefSet(new HashSet<ContractEquipBrief>(c.getContractEquipBriefSet()));
		if(clv.getLeaseVersionId() == null){
			BeanUtils.copyProperties(cl, clv);
//			if(cl.getContractEquipBriefSet().size()>0){
				clv.setContractEquipBriefVersions(cl.getContractEquipBriefSet().size()>0?JSONObject.toJSONString(cl.getContractEquipBriefSet()):cl.getContractEquipBriefs());
//			}else{
//				clv.setContractEquipBriefVersions(cl.getContractEquipBriefs());
//			}
			
//			if(cl.getSafetyMonitorSettleListSet().size()>0){
				clv.setSafetyMonitorSettleListVersions(cl.getSafetyMonitorSettleListSet().size()>0?JSONObject.toJSONString(cl.getSafetyMonitorSettleListSet()):cl.getSafetyMonitorSettleLists());
//			}else{
//				clv.setSafetyMonitorSettleListVersions(cl.getSafetyMonitorSettleLists());
//			}
			
//			if(cl.getContractInoutFreeSet().size()>0){
				clv.setContractInoutFreeVersions(cl.getContractInoutFreeSet().size()>0?JSONObject.toJSONString(cl.getContractInoutFreeSet()):cl.getContractInoutFrees());
//			}else{
//				clv.setContractInoutFreeVersions(cl.getContractInoutFrees());
//			}
			
//			if(cl.getContractOperatorFreeSet().size()>0){
				clv.setContractOperatorFreeVersions(cl.getContractOperatorFreeSet().size()>0?JSONObject.toJSONString(cl.getContractOperatorFreeSet()):cl.getContractOperatorFrees());
//			}else{
//				clv.setContractOperatorFreeVersions(cl.getContractOperatorFrees());
//			}
				
				
				
		}
			
//			clv.setSafetyMonitorSettleListVersionSet(new HashSet<SafetyMonitorSettleListVersion>(JSONObject.parseArray(JSONObject.toJSONString(cl.getSafetyMonitorSettleListSet())).toJavaList(SafetyMonitorSettleListVersion.class)));
//			clv.setContractInoutFreeVersionSet(new HashSet<ContractInoutFreeVersion>(JSONObject.parseArray(JSONObject.toJSONString(cl.getContractInoutFreeSet())).toJavaList(ContractInoutFreeVersion.class)));
//			clv.setContractOperatorFreeVersionSet(new HashSet<ContractOperatorFreeVersion>(JSONObject.parseArray(JSONObject.toJSONString(cl.getContractOperatorFreeSet())).toJavaList(ContractOperatorFreeVersion.class)));
			/*BeanUtils.copyProperties(cl.getContractEquipBriefSet(), clv.getContractEquipBriefVersionSet());
			BeanUtils.copyProperties(cl.getSafetyMonitorSettleListSet(), clv.getSafetyMonitorSettleListVersionSet());
			BeanUtils.copyProperties(cl.getContractInoutFreeSet(), clv.getContractInoutFreeVersionSet());
			BeanUtils.copyProperties(cl.getContractOperatorFreeSet(), clv.getContractOperatorFreeVersionSet());*/
			
			clv.setSaveTime(DateUtil.getCurrentLinkTimeStr());
			AppUser user = ApplicationContainer.getCurrentUser();
			clv.setSaveUserId(user.getUserId());
			clv.setSaveUserName(user.getUsername());
			List<Map<String,Object>> list = contractLeaseVersionService.queryByScript("contract.lease_serial_list", cl.getContractId());
			int i = list.size()+1; 
			clv.setLeaseSerial(i+"");
			contractLeaseVersionService.save(clv);
			
			BeanUtils.copyProperties(new HashSet<ContractEquipBrief>(cl.getContractEquipBriefSet()), clv.getContractEquipBriefVersionSet());
			BeanUtils.copyProperties(cl.getSafetyMonitorSettleListSet(), clv.getSafetyMonitorSettleListVersionSet());
			BeanUtils.copyProperties(cl.getContractInoutFreeSet(), clv.getContractInoutFreeVersionSet());
			BeanUtils.copyProperties(cl.getContractOperatorFreeSet(), clv.getContractOperatorFreeVersionSet());
			clv.setSubContractLease();
			contractLeaseVersionService.merge(clv);
		}
		
		
	}

