/**
 *====================================================
 * 文件名称: DispatchContractDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.Status;
import com.knight.emms.core.VetFlowMethod;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.DispatchDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.domain.DispatchRelateDomain;
import com.knight.emms.domain.DispatchRelationValidate;
import com.knight.emms.domain.SchedularDispatchDomain;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: DispatchContractDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午6:57:31
 */
public class DispatchContractDomain extends DispatchRelationValidate implements DispatchRelateDomain {

	@Resource
	private ContractLeaseDao contractLeaseDao;

	@Resource
	private DispatchDao dispatchDao;

	@Resource
	private ProjectDao projectDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private SchedularDispatchDomain dispatchSchedularDomain;

	private void validateContractStatus(Dispatch dispatch, ContractLease contract) {
		String status = contract.getApplyforState();
		if (Status.ContractApplyfor.waitDispatch.equals(status)) {
			return;
		}
		if (Status.ContractApplyfor.waitExecute.equals(status)) {
			return;
		}
		if (Status.ContractApplyfor.executing.equals(status)) {
			return;
		}
		if (Status.ContractApplyfor.executed.equals(status)) {
			return;
		}
		throw new BusinessException(
				"调度方案[" + dispatch.getDispatchSerial() + "]关联合同[" + contract.getContractSerial() + "]状态不合法,无法提交!");
	}

	public void submitDispatchRelate(Dispatch dispatch) {
		ContractLease cl = contractLeaseDao.get(dispatch.getRelateId());
		validateContractStatus(dispatch, cl);
	}

	public void passDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		ContractLease cl = contractLeaseDao.get(dispatch.getRelateId());
		validateContractStatus(dispatch, cl);
		Project project = projectDao.get(cl.getProjectId());
//		if (Status.Project.conclude.equals(project.getStatus())) {
//			project.setStatus(Status.Project.finished);
//			projectDao.save(project);
//		}

		for (DispatchEquip ce : dispatch.getDispatchEquipSet()) {
			Equipment e = equipmentDao.get(ce.getEquipId());
			if (ce.getEquipId().equals(e.getEquipId())) {
				e.setBuildingNum(ce.getBuildingNum());
			}
			e.setProjectId(project.getProjectId());
			e.setProjectName(project.getProjectName());
			e.setProjectAddress(project.getAddress());
			e.setBusinessStatus(Status.EquipBusiness.dipatch);
			e.setStatus(Status.EquipCompon.inused);
			equipmentDao.save(e);
		}
		// 合同为待执行
		cl.setApplyforState(Status.ContractApplyfor.waitExecute); 
		contractLeaseDao.save(cl);
		// 发送通知消息
		List<Map<String, Object>> list = dispatchDao.queryByScript("remaind.dispatch_contract_approve",
				dispatch.getDispatchId(), cl.getContractSerial(), cl.getContractTheme());
		for (Map<String, Object> map : list) {
			BusinessMessage bm = new BusinessMessage();
			bm.setReceiveTel((String) map.get("REMAIND_TEL"));
			bm.setMessage((String) map.get("MESSAGE"));
			bm.setSenderName("合同调度消息");
			businessMessageService.sendOnce(bm);
		}
	}

	public void rejectDispatchRelate(VetFlowMethod vetFlowMethod, Dispatch dispatch) {
		ContractLease cl = contractLeaseDao.get(dispatch.getRelateId());
		// 合同为待调度
		cl.setApplyforState(Status.ContractApplyfor.waitDispatch); 
		contractLeaseDao.save(cl);
	}

}
