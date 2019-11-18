/**
 *====================================================
 * 文件名称: PractitionerAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.Constants;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.support.StringSupport;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.PractiCert;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.PractiCertService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.support.StatusAnalyze;
import com.knight.emms.terminal.Tequest;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.model.AppUserExtend;
import com.knight.system.model.Department;
import com.knight.system.model.FileAttach;
import com.knight.system.service.AppRoleService;
import com.knight.system.service.AppUserExtendService;
import com.knight.system.service.AppUserService;
import com.knight.system.service.DepartmentService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * @ClassName: PractitionerAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:07:21
 */
public class PractitionerAction extends ExportBaseAction<Practitioner> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Practitioner practitioner;

	@Getter
	@Setter
	private Long practiId;

	@Resource
	private PractitionerService practitionerService;
	
	@Resource
	private PractiCertService practiCertService;

	@Resource
	private AppUserExtendService appUserExtendService;
	
	@Resource
	private DepartmentService departmentService;
	
	@Resource
	private AppRoleService appRoleService;
	
	@Resource
	private AppUserService appUserService;
	
	private SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
	
	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		if (value instanceof Department) {
			return ((Department) value).getDepName();
		} else if (value instanceof CorpInfo) {
			return ((CorpInfo) value).getCorpName();
		} else if (value instanceof AppUser) {
			return ((AppUser) value).getUsername();
		}
		return null;
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Practitioner> list = practitionerService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, GsonUtil.SINCE_VERSION_20, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Practitioner p = practitionerService.getTranslate(practiId);
		StringBuffer sb = new StringBuffer("{\"success\":true,\"data\":[");
		if (p.getAppUser() == null) {
			p.setAppUser(new AppUser());
		}
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新从业人员档案信息")
	public String save() {
		AppUserExtend appUserExtend = new AppUserExtend();
		appUserExtend.setForeignModule(SystemConstant.MODULE_PRACTITIONER);
		if (practitioner.getAppUser() != null) {
			String rolesIds = getRequest().getParameter("AppUserRoles");
			String[] ids = rolesIds.split(",");
			Set<AppRole> roles = new HashSet<AppRole>();
			for (String id : ids) {
				if (StringUtils.isNotBlank(id)) {
					AppRole role = appRoleService.get(new Long(id));
					roles.add(role);
				}
			}
			if (practitioner.getAppUser().getUserId() != null && 1L == practitioner.getAppUser().getUserId()) {
				AppRole role = appRoleService.get(-1L);
				roles.add(role);
			}
			practitioner.getAppUser().setRoles(roles);
			if(practitioner.getAppUser().getUserId() != null) {
				AppUser old = (AppUser) appUserService.get(practitioner.getAppUser().getUserId());
				practitioner.getAppUser().setEmail(old.getEmail());
				practitioner.getAppUser().setUsername(old.getUsername());
				practitioner.getAppUser().setDelFlag(old.getDelFlag());
				practitioner.getAppUser().setPassword(old.getPassword());
				practitioner.getAppUser().setAppUserKeySet(old.getAppUserKeySet());
				practitioner.getAppUser().setUserType(old.getUserType());
				practitioner.getAppUser().setDepartment(practitioner.getDepartment());
				practitioner.getAppUser().setCorpInfo(old.getCorpInfo());
				practitioner.getAppUser().setFullname(practitioner.getPractiName());
				practitioner.getAppUser().setSex(Short.valueOf(practitioner.getSex()));
				practitioner.getAppUser().setCreateTime(old.getCreateTime());
				appUserService.merge(practitioner.getAppUser());
				appUserExtend.setUserId(practitioner.getAppUser().getUserId());
				appUserExtend.setForeignId(practitioner.getPractiId());
				appUserExtend.setForeignName(practitioner.getPractiName());
				if (appUserExtendService.isExistByModule(appUserExtend)) {
					throw new BusinessException("系统帐户已经被他人关联,请重新选择或者重新创建!");
				}
			} else if(practitioner.getAppUser().getUserId() == null 
					&& practitioner.getAppUser().getUsername() != null){
				if(practitioner.getAppUser().getPassword() == null) {
					throw new BusinessException("请填写密码!");
				}
				if(practitioner.getAppUser().getMobile() == null) {
					throw new BusinessException("请填写移动电话!");
				}
				QueryFilter f_user = new QueryFilter();
				f_user.addConjunctFilter("Q_username_S_EQ", practitioner.getAppUser().getUsername());
				f_user.addConjunctFilter("Q_mobile_S_EQ", practitioner.getAppUser().getMobile());
				List<AppUser> aus = appUserService.getAll(f_user);
				if(aus.size() > 0) {
					aus.get(0).setPassword(StringSupport.encryptMD5(practitioner.getAppUser().getPassword()));
					AppUser au = appUserService.merge(aus.get(0));
					appUserExtend.setUserId(au.getUserId());
					appUserExtend.setForeignId(practitioner.getPractiId());
					appUserExtend.setForeignName(practitioner.getPractiName());
					practitioner.setAppUser(au);
				}else {
					practitioner.getAppUser().setCreateTime(new Date());
					practitioner.getAppUser().setDelFlag(Constants.FLAG_UNDELETED);
					practitioner.getAppUser().setFullname(practitioner.getPractiName());
					practitioner.getAppUser().setUserType("0");
					practitioner.getAppUser().setDepartment(practitioner.getDepartment());
					practitioner.getAppUser().setCorpInfo(practitioner.getCorpInfo());
					practitioner.getAppUser().setSex(Short.valueOf(practitioner.getSex()));
					practitioner.getAppUser().setPassword(StringSupport.encryptMD5(practitioner.getAppUser().getPassword()));
					AppUser au = appUserService.save(practitioner.getAppUser());
					appUserExtend.setUserId(au.getUserId());
					appUserExtend.setForeignId(practitioner.getPractiId());
					appUserExtend.setForeignName(practitioner.getPractiName());
					practitioner.setAppUser(au);
				}
			}else {
				practitioner.setAppUser(null);
			}
		} else {
			practitioner.setAppUser(null);
		}
		if (practitioner.getPractiId() == null) {
			practitioner.setPractiStatus(Status.Archives.enabled);
			practitioner.setCertFlag("0");
			practitioner.setIncumbent("2");
			practitioner.setInsureStatus("0");
			practitioner.setBlacklist("0");
			practitioner.setStarsLevel("5");
			practitioner.setWorkState("1");
			practitioner.setDelFlag(Constant.ENABLED);
			String permissionFlag = departmentService.bindingDepartmentPermission(practitioner.getDepartment().getDepId());
			departmentService.grantPermission(practitioner, permissionFlag);
			practitionerService.save(practitioner);
			setFileAttach(practitioner.getPractiId());
		} else {
			Practitioner p = practitionerService.get(practitioner.getPractiId());
			practitioner.setCorpInfo(p.getCorpInfo());
			practitioner.setCertFlag(p.getCertFlag());
			practitioner.setIncumbent(p.getIncumbent());
			practitioner.setInsureStatus(p.getInsureStatus());
			practitioner.setBlacklist(p.getBlacklist());
			practitioner.setStarsLevel(p.getStarsLevel());
			practitioner.setPractiStatus(p.getPractiStatus());
			practitioner.setWorkState(p.getWorkState());
			practitioner.setDelFlag(p.getDelFlag());
			practitioner.setEdcationTime(p.getEdcationTime());
			practitioner.setClarificaTime(p.getClarificaTime());
			practitioner.setClarificaStatus(p.getClarificaStatus());
			practitioner.setPermissionFlag(p.getPermissionFlag());
			String permissionFlag = departmentService.bindingDepartmentPermission(practitioner.getDepartment().getDepId());
			departmentService.grantPermission(practitioner, permissionFlag);
			practitionerService.merge(practitioner);
		}
		
		appUserExtend.setForeignId(practitioner.getPractiId());
		if (appUserExtend.getUserId() == null) {
			appUserExtendService.removeByModule(appUserExtend);
		} else {
			appUserExtendService.saveByModule(appUserExtend);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除从业人员档案信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Practitioner p = practitionerService.get(new Long(id));
			if(p.getAppUser() != null) {
				AppUser old = (AppUser) appUserService.get(p.getAppUser().getUserId());
				old.setStatus(Short.valueOf("0"));
				appUserService.merge(old);
			}
			p.setIncumbent("0");
			p.setInsureStatus("0");
			p.setClarificaStatus("0");
			p.setWorkState("1");
			p.setDelFlag(Constant.DISENABLED);
			practitionerService.save(p);
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_foreignId_L_EQ", p.getPractiId()+"");
			filter.addConjunctFilter("Q_foreignModule_L_EQ", SystemConstant.MODULE_PRACTITIONER);
			List<AppUserExtend> appUserExtend = appUserExtendService.getAll(filter);
			appUserExtendService.remove(appUserExtend.get(0));
		}
		return SUCCESS;
	}

	@ActionLog(description = "注销从业人员")
	public String multiCancel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Practitioner p = practitionerService.get(new Long(id));
			if(p.getAppUser() != null) {
				AppUser old = (AppUser) appUserService.get(p.getAppUser().getUserId());
				old.setStatus(Short.valueOf("0"));
				appUserService.merge(old);
			}
			p.setIncumbent("0");
			p.setInsureStatus("0");
			p.setClarificaStatus("0");
			p.setWorkState("1");
			p.setPractiStatus(Status.Archives.cancel);
			practitionerService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "恢复从业人员")
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Practitioner p = practitionerService.get(new Long(id));
			if(p.getAppUser() != null) {
				AppUser old = (AppUser) appUserService.get(p.getAppUser().getUserId());
				old.setStatus(Short.valueOf("1"));
				appUserService.merge(old);
			}
			p.setIncumbent("2");
			p.setPractiStatus(Status.Archives.enabled);
			practitionerService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "离职人员复职")
	public String back() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Practitioner p = practitionerService.get(new Long(id));
			if(p.getIncumbent().equals("0")) {
				if(p.getAppUser() != null) {
					AppUser old = (AppUser) appUserService.get(p.getAppUser().getUserId());
					old.setStatus(Short.valueOf("1"));
					appUserService.merge(old);
				}
				p.setIncumbent("2");//待岗
				p.setSeparationDate(null);//清空离职时间
				practitionerService.save(p);
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_practiId_L_EQ", p.getPractiId().toString());
				List<PractiCert> clist = practiCertService.queryTranslateAll(filter);
				for(PractiCert c : clist) {
					if (Status.Archives.cancel.equals(c.getQstate())) {
						c.setQstate(StatusAnalyze.parserArchivesValid(c.getEffectDate()));
						practiCertService.save(c);
					}
				}
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "黑白名单操作")
	public String moveList() {
		String[] ids = getRequest().getParameterValues("ids");
		String target = getRequest().getParameter("target");
		for (String id : ids) {
			Practitioner p = practitionerService.get(Long.parseLong(id));
			p.setBlacklist(target);
			if(p.getAppUser() != null) {
				AppUser old = (AppUser) appUserService.get(p.getAppUser().getUserId());
				old.setStatus(Short.valueOf(target.equals("0")?"1":"0"));
				appUserService.merge(old);
			}
			practitionerService.merge(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "身份证重复性验证")
	public String checkRepetition() {
		String practiId = getRequest().getParameter("practiId");
		String idCard = getRequest().getParameter("idCard");
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_idCard_S_EQ", idCard);
		List<Practitioner> plist = practitionerService.getAll(filter);
		if( plist.size() == 0 || plist.get(0).getPractiId().toString().equals(practiId)) {
			return SUCCESS;
		}else {
			throw new BusinessException("该身份证号已存在!");
		}
	}
	
	@ActionLog(description = "联系号码重复性验证")
	public String checkMobile() {
		String practiId = getRequest().getParameter("practiId");
		String mobile = getRequest().getParameter("mobile");
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_mobile_S_EQ", mobile);
		List<Practitioner> plist = practitionerService.getAll(filter);
		if( plist.size() == 0 || plist.get(0).getPractiId().toString().equals(practiId)) {
			return SUCCESS;
		}else {
			throw new BusinessException("该联系号码已存在!");
		}
	}
	
}
