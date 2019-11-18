/**
 *====================================================
 * 文件名称: ContractLeaseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;

import com.alibaba.fastjson.JSONObject;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.ContractLeaseVersion;
import com.knight.emms.service.ContractLeaseService;
import com.knight.emms.service.ContractLeaseVersionService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ContractLeaseVersionAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 */
public class ContractLeaseVersionAction extends ExportBaseAction<ContractLease> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ContractLeaseVersion contractLeaseVersion;
	
	@Setter
	@Getter
	private Long leaseVersionId;
	
	@Getter
	@Setter
	private ContractLease contractLease;

	@Resource
	private ContractLeaseVersionService contractLeaseVersionService;
	
	@Resource
	private ContractLeaseService contractLeaseService;
	
	public String load() {
		ContractLeaseVersion c = contractLeaseVersionService.getTranslateFull(leaseVersionId);
		if (c.getBargain() != null) {
			c.setFillContent(true);
		}
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String listSerial(){
		String contractId = getRequest().getParameter("contractId");
		List<Map<String,Object>> list = contractLeaseVersionService.queryByScript("contract.lease_serial_list", contractId);
		StringBuffer buff = new StringBuffer("[");
		for(Map<String,Object> map : list){
			buff.append("['" + map.get("code") + "','" + map.get("value") + "'],");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	public String save(){
		String contractId = getRequest().getParameter("contractId");
		ContractLease cl = contractLeaseService.get(Long.valueOf(contractId));
		ContractLeaseVersion clv = new ContractLeaseVersion();
//		BeanUtils.copyProperties(cl, clv);
//		clv.setContractEquipBriefVersions(JSONObject.toJSONString(cl.getContractEquipBriefSet()));
//		clv.setSafetyMonitorSettleListVersions(JSONObject.toJSONString(cl.getSafetyMonitorSettleListSet()));
//		clv.setContractInoutFreeVersions(JSONObject.toJSONString(cl.getContractInoutFreeSet()));
//		clv.setContractOperatorFreeVersions(JSONObject.toJSONString(cl.getContractOperatorFreeSet()));
////		clv.setSafetyMonitorSettleListVersionSet(new HashSet<SafetyMonitorSettleListVersion>(JSONObject.parseArray(JSONObject.toJSONString(cl.getSafetyMonitorSettleListSet())).toJavaList(SafetyMonitorSettleListVersion.class)));
////		clv.setContractInoutFreeVersionSet(new HashSet<ContractInoutFreeVersion>(JSONObject.parseArray(JSONObject.toJSONString(cl.getContractInoutFreeSet())).toJavaList(ContractInoutFreeVersion.class)));
////		clv.setContractOperatorFreeVersionSet(new HashSet<ContractOperatorFreeVersion>(JSONObject.parseArray(JSONObject.toJSONString(cl.getContractOperatorFreeSet())).toJavaList(ContractOperatorFreeVersion.class)));
//		/*BeanUtils.copyProperties(cl.getContractEquipBriefSet(), clv.getContractEquipBriefVersionSet());
//		BeanUtils.copyProperties(cl.getSafetyMonitorSettleListSet(), clv.getSafetyMonitorSettleListVersionSet());
//		BeanUtils.copyProperties(cl.getContractInoutFreeSet(), clv.getContractInoutFreeVersionSet());
//		BeanUtils.copyProperties(cl.getContractOperatorFreeSet(), clv.getContractOperatorFreeVersionSet());*/
//		
//		
//		clv.setSaveTime(DateUtil.getCurrentLinkTimeStr());
//		AppUser user = ApplicationContainer.getCurrentUser();
//		clv.setSaveUserId(user.getUserId());
//		clv.setSaveUserName(user.getUsername());
//		List<Map<String,Object>> list = contractLeaseVersionService.queryByScript("contract.lease_serial_list", contractId);
//		int i = list.size()+1; 
//		clv.setLeaseSerial(i+"");
//		contractLeaseVersionService.save(clv);
////		clv.setContractEquipBriefVersionSet(new HashSet<ContractEquipBriefVersion>(JSONObject.parseArray(clv.getContractEquipBriefVersions()).toJavaList(ContractEquipBriefVersion.class)));
//		BeanUtils.copyProperties(cl.getContractEquipBriefSet(), clv.getContractEquipBriefVersionSet());
//		BeanUtils.copyProperties(cl.getSafetyMonitorSettleListSet(), clv.getSafetyMonitorSettleListVersionSet());
//		BeanUtils.copyProperties(cl.getContractInoutFreeSet(), clv.getContractInoutFreeVersionSet());
//		BeanUtils.copyProperties(cl.getContractOperatorFreeSet(), clv.getContractOperatorFreeVersionSet());
//		clv.setSubContractLease();
//		contractLeaseVersionService.merge(clv);
		return SUCCESS;
	}
}
