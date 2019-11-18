/**
 *====================================================
 * 文件名称: IndisSchemaServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.IndisSchemaDao;
import com.knight.emms.dao.IndisSchemaPractiDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.IndisSchemaService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: IndisSchemaServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:33:47
 */
public class IndisSchemaServiceImpl extends BusinessFlowServiceImpl<IndisSchema> implements IndisSchemaService {

	private IndisSchemaDao indisSchemaDao;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private IndisSchemaPractiDao indisSchemaPractiDao;

	public IndisSchemaServiceImpl(IndisSchemaDao dao) {
		super(dao);
		this.indisSchemaDao = dao;
	}

	@Override
	public void saveOrMergeForEdit(IndisSchema indisSchema) {
		if (indisSchema.getSchemaId() == null) {
			super.saveSerialModel(indisSchema);
		}
		indisSchema.setSubIndisSchema();
		indisSchemaDao.merge(indisSchema);
	}

	public List<IndisSchema> queryTranslateAllFull(QueryFilter filter) {
		List<IndisSchema> list = indisSchemaDao.getAll(filter);
		for (IndisSchema s : list) {
			CodeServiceImpl.translate(s);
			CodeServiceImpl.translate(s.getEquipment());
		}
		return list;
	}

	public IndisSchema getTranslateFull(Long schemaId) {
		IndisSchema s = indisSchemaDao.get(schemaId);
		CodeServiceImpl.translate(s);
		CodeServiceImpl.translate(s.getEquipment());
		return s;
	}

	public void delete(IndisSchema indisSchema) {
		indisSchemaDao.remove(indisSchema);
	}

	@Override
	public void deletePracti(Long schemaPractiId) {
		indisSchemaPractiDao.remove(schemaPractiId);
	}

	private void sendMessage(Map<String, String> mobile, String message) {
		for (Entry<String, String> entry : mobile.entrySet()) {
			if (StringUtils.isBlank(entry.getKey())) {
				continue;
			}
			BusinessMessage bm = new BusinessMessage();
			bm.setMessage(message);
			bm.setReceiveName(entry.getValue());
			bm.setReceiveTel(entry.getKey());
			bm.setSenderName("系统消息");
			bm.setSendFlag("0");
			bm.setCreateTime(new Date());
			businessMessageService.sendOnce(bm);
		}
	}

	private void putMessageReceive(Map<String, String> mobile, String tel, String name) {
		if (StringUtils.isBlank(tel)) {
			return;
		}
		String[] split = tel.split(",");
		for (String s : split) {
			mobile.put(s, name);
		}
	}

	private void sendAcceptMessage(IndisSchema indisSchema, String message) {
		// 发送信息 市场联系方式、资产联系方式、技术联系方式、维保联系方式、工程联系方式、安全联系方式
		Map<String, String> mobile = new HashMap<String, String>();
		CorpInfo corpInfo = corpInfoService.get(indisSchema.getInEnt());
		putMessageReceive(mobile, corpInfo.getMarketTel(), corpInfo.getMarket());
		putMessageReceive(mobile, corpInfo.getCapitalTel(), corpInfo.getCapital());
		putMessageReceive(mobile, corpInfo.getTechnologyTel(), corpInfo.getTechnology());
//		putMessageReceive(mobile, corpInfo.getMaintenanceTel(), corpInfo.getMaintenance());
		putMessageReceive(mobile, corpInfo.getEngineeringTel(), corpInfo.getEngineering());
		putMessageReceive(mobile, corpInfo.getSecurityTel(), corpInfo.getSecurity());
//		putMessageReceive(mobile, corpInfo.getDutymanTel1(), corpInfo.getDutyman());
//		putMessageReceive(mobile, corpInfo.getDutymanTel2(), corpInfo.getDutyman());
//		putMessageReceive(mobile, corpInfo.getDutymanTel3(), corpInfo.getDutyman());
		sendMessage(mobile, message);
	}

	private void sendApproveMessage(IndisSchema indisSchema, String message) {
		// 发送信息责任人联系方式1、责任人联系方式2、责任人联系方式3
		Map<String, String> mobile = new HashMap<String, String>();
		CorpInfo corpInfo = corpInfoService.get(indisSchema.getInEnt());
//		putMessageReceive(mobile, corpInfo.getChiefEngineerTel(), corpInfo.getChiefEngineer());
		putMessageReceive(mobile, corpInfo.getDutymanTel1(), corpInfo.getDutyman());
		putMessageReceive(mobile, corpInfo.getDutymanTel2(), corpInfo.getDutyman());
		putMessageReceive(mobile, corpInfo.getDutymanTel3(), corpInfo.getDutyman());
		sendMessage(mobile, message);
	}

	@Override
	public void submit(IndisSchema indisSchema) {
		if (!Status.DispatchApplyfor.waitSubmit.equals(indisSchema.getApplyforState())) { // 0:新增
			throw new BusinessException("方案信息[" + indisSchema.getSchemaSerial() + "]状态不合法,无法提交!");
		}
		indisSchema.setApplyforState(Status.Applyfor.waitAccept);
		indisSchemaDao.update(indisSchema);
		String message = null;
		if (SystemConstant.MODULE_EQUIP_INSTALL.equals(indisSchema.getRelateModule())) { // 安装方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的安装方案已提交申请，请您及时审核！";
		} else if (SystemConstant.MODULE_EQUIP_EMPLOY.equals(indisSchema.getRelateModule())) { // 附墙方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的附墙方案已提交申请，请您及时审核！";
		} else { // 拆卸方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的拆卸方案已提交申请，请您及时审核！";
		}
		sendAcceptMessage(indisSchema, message);
	}

	@Override
	protected void passFlowAcceptApplication(IndisSchema indisSchema) {
		List<String> userIds = new ArrayList<String>();
		if (StringUtils.isNotBlank(indisSchema.getApplyforUserId())) {
			userIds.addAll(Arrays.asList(indisSchema.getApplyforUserId().split(",")));
		}
		if (userIds.contains(ApplicationContainer.getCurrentUserId() + "")) {
			throw new BusinessException("方案信息[" + indisSchema.getSchemaSerial() + "]已审核!");
		}
		userIds.add(ApplicationContainer.getCurrentUserId() + "");
		indisSchema.setApplyforUserId(StringUtils.join(userIds, ","));
		if (userIds.size() >= 5) {
			indisSchema.setApplyforState(Status.DispatchApplyfor.waitApprove);
		} else {
			indisSchema.setApplyforState(Status.DispatchApplyfor.waitAccept);
		}
		indisSchemaDao.update(indisSchema);
		String message = null;
		if (Status.DispatchApplyfor.waitApprove.equals(indisSchema.getApplyforState())) {
			if (SystemConstant.MODULE_EQUIP_INSTALL.equals(indisSchema.getRelateModule())) { // 安装方案
				message = "【" + indisSchema.getProject().getProjectName() + "】的安装方案已审核完成，请您及时审批！";
			} else if (SystemConstant.MODULE_EQUIP_EMPLOY.equals(indisSchema.getRelateModule())) { // 附墙方案
				message = "【" + indisSchema.getProject().getProjectName() + "】的附墙方案已审核完成，请您及时审批！";
			} else { // 拆卸方案
				message = "【" + indisSchema.getProject().getProjectName() + "】的拆卸方案已审核完成，请您及时审批！";
			}
			sendApproveMessage(indisSchema, message);
		}
	}

	@Override
	protected void rejectFlowAcceptApplication(IndisSchema indisSchema) {
		indisSchema.setApplyforUserId(null);
		indisSchema.setApplyforState(Status.DispatchApplyfor.waitSubmit);
		indisSchemaDao.update(indisSchema);
		String message = null;
		if (SystemConstant.MODULE_EQUIP_INSTALL.equals(indisSchema.getRelateModule())) { // 安装方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的安装方案审批已驳回，请相关人员重新审查方案！";
		} else if (SystemConstant.MODULE_EQUIP_EMPLOY.equals(indisSchema.getRelateModule())) { // 附墙方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的附墙方案审批已驳回，请相关人员重新审查方案！";
		} else { // 拆卸方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的拆卸方案审批已驳回，请相关人员重新审查方案！";
		}
		sendAcceptMessage(indisSchema, message);
	}

	@Override
	protected void passFlowApproveApplication(IndisSchema indisSchema) {
		indisSchema.setApplyforState(Status.DispatchApplyfor.passed);
		indisSchemaDao.update(indisSchema);
		String message = null;
		if (SystemConstant.MODULE_EQUIP_INSTALL.equals(indisSchema.getRelateModule())) { // 安装方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的安装方案已审批通过，请相关人员安排好准备工作！";
		} else if (SystemConstant.MODULE_EQUIP_EMPLOY.equals(indisSchema.getRelateModule())) { // 附墙方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的附墙方案已审批通过，请相关人员安排好准备工作！";
		} else { // 拆卸方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的拆卸方案已审批通过，请相关人员安排好准备工作！";
		}
		sendApproveMessage(indisSchema, message);
	}

	@Override
	protected void rejectFlowApproveApplication(IndisSchema indisSchema) {
		indisSchema.setApplyforUserId(null);
		indisSchema.setApplyforState(Status.DispatchApplyfor.waitSubmit);
		indisSchemaDao.update(indisSchema);
		String message = null;
		if (SystemConstant.MODULE_EQUIP_INSTALL.equals(indisSchema.getRelateModule())) { // 安装方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的安装方案审批已驳回，请相关人员重新审查方案！";
		} else if (SystemConstant.MODULE_EQUIP_EMPLOY.equals(indisSchema.getRelateModule())) { // 附墙方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的附墙方案审批已驳回，请相关人员重新审查方案！";
		} else { // 拆卸方案
			message = "【" + indisSchema.getProject().getProjectName() + "】的拆卸方案审批已驳回，请相关人员重新审查方案！";
		}
		sendAcceptMessage(indisSchema, message);
	}

}
