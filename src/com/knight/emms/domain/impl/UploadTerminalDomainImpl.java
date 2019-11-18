/**
 *====================================================
 * 文件名称: UploadTerminalDomainImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.DispatchDao;
import com.knight.emms.dao.EquipDismantleDao;
import com.knight.emms.dao.EquipEmployDao;
import com.knight.emms.dao.EquipInspectDao;
import com.knight.emms.dao.EquipInstallDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.domain.IUploadTerminalDomain;
import com.knight.emms.model.Component;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.EquipEmploy;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.Project;
import com.knight.emms.service.CorpInfoService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;

/**
 * @ClassName: UploadTerminalDomainImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-25 上午11:09:29
 */
public class UploadTerminalDomainImpl implements IUploadTerminalDomain {

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private ComponentDao componentDao;

	@Resource
	private EquipInspectDao equipInspectDao;

	@Resource
	private EquipInstallDao equipInstallDao;

	@Resource
	private EquipEmployDao equipEmployDao;

	@Resource
	private EquipDismantleDao equipDismantleDao;

	@Resource
	private ContractLeaseDao contractLeaseDao;

	@Resource
	private ProjectDao projectDao;

	@Resource
	private DispatchDao dispatchDao;

	@Resource
	private AppUserService appUserService;

	@Resource
	private CorpInfoService corpInfoService;

	private void validateAppUser(AppUser appuser) {
		if (appuser.getDepartment() == null) {
			throw new BusinessException("终端数据操作人员[" + appuser.getFullname() + "]非法,不允许使用系统管理员操作!");
		}
	}

	public void uploadsave(Equipment equipment) {
		AppUser appuser = appUserService.get(equipment.getUserId());
		validateAppUser(appuser);
		equipment.setUserName(appuser.getFullname());
		equipment.setDepartment(appuser.getDepartment());
		CorpInfo corpInfo = corpInfoService.get(equipment.getPropertyEnt());
		equipment.setPropertyName(corpInfo.getCorpName());
		equipment.setDutyman(corpInfo.getDutyman());
		equipment.setDutymanTel(corpInfo.getDutymanTel1());
		equipmentDao.save(equipment);
	}

	public void uploadsave(Component component) {
		AppUser appuser = appUserService.get(component.getUserId());
		validateAppUser(appuser);
		component.setUserName(appuser.getFullname());
		component.setDepartment(appuser.getDepartment());
		componentDao.save(component);
	}

	public void uploadsave(EquipInspect inspect) {
		equipInspectDao.merge(inspect);
	}

	public void uploadsave(Dispatch dispatch) {
		AppUser appuser = appUserService.get(dispatch.getUserId());
		validateAppUser(appuser);
		dispatch.setUserName(appuser.getFullname());
		dispatch.setDepartment(appuser.getDepartment());
		if (SystemConstant.MODULE_EQUIP_INSTALL.equals(dispatch.getRelateModule())) {
			dispatch.getDispatchEquipSet().clear();
			EquipInstall install = equipInstallDao.get(dispatch.getRelateId());

			dispatch.setProjectId(install.getEquipFlow().getEquipDiary().getProjectId());
			dispatch.setProjectName(install.getEquipFlow().getEquipDiary().getProjectName());
			dispatch.setRelateSerial(install.getInstallSerial());
			dispatch.setRelateTheme(install.getInstallTheme());
		} else if (SystemConstant.MODULE_EQUIP_EMPLOY.equals(dispatch.getRelateModule())) {
			dispatch.getDispatchEquipSet().clear();
			EquipEmploy employ = equipEmployDao.get(dispatch.getRelateId());

			dispatch.setProjectId(employ.getEquipFlow().getEquipDiary().getProjectId());
			dispatch.setProjectName(employ.getEquipFlow().getEquipDiary().getProjectName());
			dispatch.setRelateSerial(employ.getEmploySerial());
			dispatch.setRelateTheme(employ.getEmployTheme());
		} else if (SystemConstant.MODULE_EQUIP_DISMANTLE.equals(dispatch.getRelateModule())) {
			dispatch.getDispatchEquipSet().clear();
			EquipDismantle dismantle = equipDismantleDao.get(dispatch.getRelateId());

			dispatch.setProjectId(dismantle.getEquipFlow().getEquipDiary().getProjectId());
			dispatch.setProjectName(dismantle.getEquipFlow().getEquipDiary().getProjectName());
			dispatch.setRelateSerial(dismantle.getDismantleSerial());
			dispatch.setRelateTheme(dismantle.getDismantleTheme());
		} else if (SystemConstant.MODULE_CONTRACT_LEASE.equals(dispatch.getRelateModule())) {
			ContractLease cl = contractLeaseDao.get(dispatch.getRelateId());
			dispatch.setProjectId(cl.getProjectId());
			dispatch.setProjectName(cl.getProjectName());
			dispatch.setRelateSerial(String.valueOf(cl.getContractSerial()));
			dispatch.setRelateTheme(cl.getContractTheme());
		} else {
			throw new BusinessException("调度关联业务[" + dispatch.getRelateModule() + "]不在支持范围内!");
		}
		Project project = projectDao.get(dispatch.getProjectId());
		dispatch.setProjectName(project.getProjectName());
		dispatch.setProjectSerial(project.getProjectSerial());
		dispatch.setAddress(project.getAddress());
		Set<DispatchEquip> dispatchEquipSet = dispatch.getDispatchEquipSet();
		dispatch.setDispatchEquipSet(null);
		Set<DispatchCompon> dispatchComponSet = dispatch.getDispatchComponSet();
		dispatch.setDispatchComponSet(null);
		dispatchDao.save(dispatch);
		for (DispatchEquip de : dispatchEquipSet) {
			de.setDispatchEquipId(null);
			de.setDispatchId(dispatch.getDispatchId());
			de.setWorkStatus(Status.EquipComponDispatch.allocate);
		}
		for (DispatchCompon dc : dispatchComponSet) {
			dc.setDispatchComponId(null);
			dc.setDispatchId(dispatch.getDispatchId());
		}
		dispatch.setDispatchEquipSet(dispatchEquipSet);
		dispatch.setDispatchComponSet(dispatchComponSet);
		dispatchDao.save(dispatch);
	}
}
