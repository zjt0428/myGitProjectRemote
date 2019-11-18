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
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.Constants;
import com.knight.core.support.StringSupport;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.CompensationScrapDao;
import com.knight.emms.dao.ContractMaterialsDao;
import com.knight.emms.dao.CostHandleDao;
import com.knight.emms.dao.MatDamageDao;
import com.knight.emms.dao.MaterialsDetailDao;
import com.knight.emms.dao.PriceSettingDao;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.CostHandle;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.Project;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.ContractMaterialsService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.ProjectService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.dao.AppRoleDao;
import com.knight.system.dao.AppUserDao;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.model.CodeInfo;
import com.knight.system.model.Department;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;
import com.knight.system.web.action.AppUserAction;

/**
 * @ClassName: ContractLeaseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public class ContractMaterialsServiceImpl extends BusinessFlowServiceImpl<ContractMaterials> implements ContractMaterialsService {

	private ContractMaterialsDao contractMaterialsDao;
	
	@Resource
	private CorpInfoService corpInfoService;
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private MaterialsDetailDao materialsDetailDao;
	
	@Resource
	private PriceSettingDao priceSettingDao;
	
	@Resource
	private MatDamageDao matDamageDao;
	
	@Resource
	private CostHandleDao costHandleDao;
	
	@Resource
	private CompensationScrapDao compensationScrapDao;
	
	@Resource
	private ProjectService projectService;
	
	@Resource
	private CodeService codeService;
	
	@Resource
	private AppUserDao appUserDao;
	
	@Resource
	private AppRoleDao appRoleDao;
	

	public ContractMaterialsServiceImpl(ContractMaterialsDao dao) {
		super(dao);
		this.contractMaterialsDao = dao;
	}

	public ContractMaterials getTranslateFull(Long contractmaId) {
		ContractMaterials cl = contractMaterialsDao.get(contractmaId);
		CodeServiceImpl.translate(cl, getPersistantStruct());
		for (CostHandle c : cl.getCostHandleSet()) {
			CodeServiceImpl.translate(c, costHandleDao.getPersistantStruct());
		}
		return cl;
	}

	@Override
	public void saveOrMergeForEdit(ContractMaterials contractMaterials) {
		if (contractMaterials.getContractmaId() == null) {
			contractMaterialsDao.saveSerialModel(contractMaterials);
		}
		contractMaterials.setSubContractMaterials();
		contractMaterialsDao.merge(contractMaterials);
	}

	public void deleteMaterialsDetail(Long madetailId) {
		materialsDetailDao.remove(madetailId);
	}

	public void deletePriceSetting(Long priceId) {
		priceSettingDao.remove(priceId);
	}
	
	public void deleteMatDamage(Long matDamageId) {
		matDamageDao.remove(matDamageId);
	}
	
	public void deleteCostHandle(Long costHandleId) {
		costHandleDao.remove(costHandleId);
	}
	
	public void deleteScrap(Long compensationId) {
		compensationScrapDao.remove(compensationId);
	}
	
	public void initialzeAccount() {
		String openurl = (String) ApplicationContainer.getSystemParam("sms.openurl");
		String account = (String) ApplicationContainer.getSystemParam("sms.account");
		String enterprise = (String) ApplicationContainer.getSystemParam("sms.enterprise");
		String authkey = (String) ApplicationContainer.getSystemParam("sms.authkey");
		int cgid = (Integer) ApplicationContainer.getSystemParam("sms.cgid");
		int csid = (Integer) ApplicationContainer.getSystemParam("sms.csid");
		OpenApi.initialzeAccount(openurl, account, enterprise, authkey, cgid, csid);
	}
	
	public void passApproveApplication(FormApprove formApprove) {
		Project	project = projectService.get(contractMaterialsDao.get(formApprove.getRelateId()).getProjectId());
		project.setMaterialsed(Constant.ENABLED);
		ContractMaterials cm = super.passFlowApproveApplication(formApprove);
		contractMaterialsDao.save(cm);
		if(cm.getGrantedUserId() != null) {
			AppUser au = appUserDao.get(cm.getGrantedUserId());
			au.setUserType("2");
			appUserDao.save(au);
		}
	}
	
	public String concatAddress(String province,String city,String county) {
		CodeInfo provinceCode = codeService.getCodeInfoMap("province").get(province);
		CodeInfo cityCode = codeService.getCodeInfoMap("city").get(city);
		CodeInfo countyCode = codeService.getCodeInfoMap("county").get(county);
		String address = "";
		if(provinceCode!=null) {
			address += provinceCode.getValue();
		}
		if(cityCode!=null) {
			address += cityCode.getValue();
		}
		if(countyCode!=null) {
			address += countyCode.getValue();
		}
		return address;
	}
	
	public AppUser createAppUser(AppUser appUser,AppRole appRole) {
		AppUser au = appUserDao.findByUserName(appUser.getUsername());
		if(au==null) {
			Date date = new Date();
			appUser.setCreateTime(date);
			appUser.setDelFlag(Constants.FLAG_UNDELETED);
			appUser.setPassword(StringSupport.encryptMD5(AppUserAction.DEFAULT_PASSWORD));
			appUser.setUserType(Constant.DISENABLED);
			//默认部门 102-周材项目公司（暂定）
			Department department = new Department(102L);
			appUser.setDepartment(department);
			//设置角色
			Set<AppRole> roles = new HashSet<AppRole>();
			AppRole ar = appRoleDao.get(appRole.getRoleId());
			roles.add(ar);
			appUser.setRoles(roles);
			//用户类别   2:项目用户
			appUser.setUserType("1");
			appUserDao.save(appUser);
			return appUser;
		}else{
			return au;
		}
	}
}
