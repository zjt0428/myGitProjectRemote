/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.knight.core.Constants;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.support.StringSupport;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.JsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.terminal.support.utils.Globel;
import com.knight.emms.terminal.support.utils.SyncBase;
import com.knight.emms.terminal.support.utils.UcAccountUtil;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.application.OnlineUser;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.model.IndexDisplay;
import com.knight.system.model.PanelItem;
import com.knight.system.service.AppRoleService;
import com.knight.system.service.AppUserService;
import com.knight.system.service.DepartmentService;
import com.knight.system.service.IndexDisplayService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName:AppUserAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-29 下午4:37:45
 * @since JDK Version 1.5
 */
public class AppUserAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	public static String DEFAULT_PASSWORD = "123456";

	private static Long SUPPER_MANAGER_ID = -1L;

	@Resource
	private AppUserService appUserService;

	@Resource
	private DepartmentService departmentService;

	@Resource
	private AppRoleService appRoleService;

	@Resource
	private IndexDisplayService indexDisplayService;
	
	@Resource
	private PractitionerService practitionerService;

	@Getter
	@Setter
	private AppUser appUser;

	@Getter
	@Setter
	private Long userId;

	@Getter
	@Setter
	private Long depId;

	@Getter
	@Setter
	private Long roleId;
	
	@Getter
	@Setter
	private String moblieFlag;

	public String getCurrent() {
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			appUserService.getRoleDataPermission(currentUser);
		}
		Department curDep = currentUser.getDepartment();
		if (curDep == null) {
			curDep = new Department();
			curDep.setDepId(0L);
			curDep.setDepName(ApplicationContainer.getCompanyName());
		}
		Iterator<String> publicIds = ApplicationContainer.getPublicMenuIds().iterator();
		StringBuffer publicIdSb = new StringBuffer();

		while (publicIds.hasNext()) {
			publicIdSb.append(",").append((String) publicIds.next());
		}
		List<IndexDisplay> list = indexDisplayService.findByUser(currentUser.getUserId());
		List<PanelItem> items = new ArrayList<PanelItem>();
		for (IndexDisplay id : list) {
			PanelItem pi = new PanelItem();
			pi.setPanelId(id.getPortalId());
			pi.setColumn(id.getColNum().intValue());
			pi.setRow(id.getRowsNum().intValue());
			items.add(pi);
		}
		currentUser.setPortalConfig(items);
		StringBuffer sb = new StringBuffer("{success:true,user:").append(GsonUtil.toJson(currentUser, GsonUtil.SINCE_VERSION_20, false));
		sb.append(",systemConfig:").append(GsonUtil.toJson(ApplicationContainer.pubConfigureMap));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String list() {
		AppUser curUser = ApplicationContainer.getCurrentUser();
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		if(curUser.getDepartment().getDepType().equals(Constants.DEP_LABOUR)) {
			String depSerial = curUser.getDepartment().getDepSerial().substring(0, 4);
			filter.addConjunctFilter("Q_department.depSerial_S_LK", depSerial);
		}
		List<AppUser> list = appUserService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
//		JSONSerializer serializer = new JSONSerializer();
//		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] { "createTime" });
//		buff.append(serializer.exclude(new String[] { "password" }).serialize(list));
		buff.append(GsonUtil.toJson(list,DateUtil.LINK_DISPLAY_DATE,true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String listLabour() {
		List<AppUser> list = new ArrayList<AppUser>();
		QueryFilter filter = new QueryFilter(getRequest());
		AppUser curUser = ApplicationContainer.getCurrentUser();
		if(curUser.getDepartment().getDepType().equals(Constants.DEP_LABOUR)) {
			String depSerial = curUser.getDepartment().getDepSerial().substring(0, 4);
			filter.addConjunctFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
			filter.addConjunctFilter("Q_department.depSerial_S_LK", depSerial);
			list = appUserService.queryTranslateAll(filter);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,DateUtil.LINK_DISPLAY_DATE,true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String select() {
		PagingBean pb = getInitPagingBean();
		String path = "0.";
		this.appUser = ApplicationContainer.getCurrentUser();
		if (depId != null) {
			Department dep = departmentService.get(depId);
			if (dep != null) {
				path = dep.getPath();
			}
		} else {
			Department dep = this.appUser.getDepartment();
			if (dep != null) {
				path = dep.getPath();
			}
		}
		List<AppUser> list = appUserService.findByDepartment(path, pb);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pb.getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] { "createTime" });
		buff.append(serializer.exclude(new String[] { "password" }).serialize(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String online() {
		Map<String, OnlineUser> onlineUsers = ApplicationContainer.getOnlineUsers();

		Map<String, OnlineUser> onlineUsersByDep = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByRole = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByPc = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByApp = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByMini = new HashMap<String, OnlineUser>();

		if (this.depId != null) {
			for (Map.Entry<String, OnlineUser> entry : onlineUsers.entrySet()) {
				String sessionId = entry.getKey();
				OnlineUser onlineUser = entry.getValue();
				String path = "";
				if (!(onlineUser.getUserId().equals(AppUser.SUPER_USER))) {
					path = onlineUser.getDepPath();
				}
				if (!(this.depId.equals(new Long(0L)))) {
					if (Pattern.compile("." + this.depId + ".").matcher(path).find()) {
						onlineUsersByDep.put(sessionId, onlineUser);
					}
				} else {
					onlineUsersByDep.put(sessionId, onlineUser);
				}
			}
		}
		if (this.roleId != null) {
			for (Map.Entry<String, OnlineUser> entry : onlineUsers.entrySet()) {
				String sessionId = entry.getKey();
				OnlineUser onlineUser = entry.getValue();
				if (Pattern.compile("," + this.roleId + ",").matcher(onlineUser.getRoleIds()).find()) {
					onlineUsersByRole.put(sessionId, onlineUser);
				}
			}
		}

		if (this.moblieFlag!=null) {
			for (Map.Entry<String, OnlineUser> entry : onlineUsers.entrySet()) {
				String sessionId = entry.getKey();
				OnlineUser onlineUser = entry.getValue();
				if(("1").equals(onlineUser.getMoblieFlag())){
					onlineUsersByPc.put(sessionId, onlineUser);
				}
				if(("2").equals(onlineUser.getMoblieFlag())){
					onlineUsersByApp.put(sessionId, onlineUser);
				}
				if(("3").equals(onlineUser.getMoblieFlag())){
					onlineUsersByMini.put(sessionId, onlineUser);
				}
			}
		}
	
		Type type = new TypeToken<Collection<OnlineUser>>() {}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(onlineUsers.size()).append(",result:");

		Gson gson = new Gson();
		if (this.depId != null) {
			buff.append(gson.toJson(onlineUsersByDep.values(), type));
		} else if (this.roleId != null) {
			buff.append(gson.toJson(onlineUsersByRole.values(), type));
		} else if (this.moblieFlag!=null && ("1").equals(this.moblieFlag)) {
			buff.append(gson.toJson(onlineUsersByPc.values(), type));
		} else if (this.moblieFlag!=null && ("2").equals(this.moblieFlag)) {
			buff.append(gson.toJson(onlineUsersByApp.values(), type));
		} else if (this.moblieFlag!=null && ("3").equals(this.moblieFlag)) {
			buff.append(gson.toJson(onlineUsersByMini.values(), type));
		} else {
			buff.append(gson.toJson(onlineUsers.values(), type));
		}
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String find() {
		String strRoleId = getRequest().getParameter("roleId");
		PagingBean pb = getInitPagingBean();
		if (StringUtils.isNotEmpty(strRoleId)) {
			List<AppUser> userList = appUserService.findByRole(Long.valueOf(Long.parseLong(strRoleId)), pb);
			Type type = new TypeToken<List<AppUser>>() {}.getType();
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(pb.getTotalItems()).append(",result:");
			Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
			buff.append(gson.toJson(userList, type));
			buff.append("}");

			this.jsonString = buff.toString();
		} else {
			this.jsonString = JSON_FAIL;
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除用户")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		StringBuffer buff = new StringBuffer("{success:true");
		if (ids != null) {
			buff.append(",msg:'");
			for (String id : ids) {
				AppUser delUser = appUserService.get(new Long(id));
				AppRole superManager = (AppRole) this.appRoleService.get(SUPPER_MANAGER_ID);
				if (delUser.getRoles().contains(superManager)) {
					buff.append("员工:").append(delUser.getUsername()).append("是超级管理员,不能删除!<br><br/>");
				} else if (delUser.getUserId().equals(ApplicationContainer.getCurrentUserId())) {
					buff.append("不能删除自己!<br></br>");
				} else {
					delUser.setStatus(Constants.FLAG_DISABLE);
					delUser.setDelFlag(Constants.FLAG_DELETED);
					delUser.setUsername("__" + delUser.getUsername());
					appUserService.save(delUser);
				}
			}
			buff.append("'");
		}
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String get() {
		AppUser appUser = null;
		JSONSerializer json = JsonUtil.getJSONSerializer(new String[] { "createTime" });
		if (this.userId != null) {
			appUser = (AppUser) appUserService.getTranslate(userId);
		} else {
			json.exclude(new String[] {
					"createTime", "password", "status" });
			appUser = ApplicationContainer.getCurrentUser();
		}
        //保证前端显示
        if(appUser.getCorpInfo()==null){
            appUser.setCorpInfo(new CorpInfo());
        }
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
		sb.append(json.serialize(appUser));
		if (appUser.getAppUserKeySet().size() > 0) {
			sb.deleteCharAt(sb.length() - 1).append(", \"appUserKeys\" : ");
			sb.append(GsonUtil.toJson(appUser.getAppUserKeySet(), DateUtil.LINK_DISPLAY_DATE));
			sb.append("}");
		}
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "添加或保存用户信息")
	public String save() {
		String rolesIds = getRequest().getParameter("AppUserRoles");
		String[] ids = rolesIds.split(",");
		Set<AppRole> roles = new HashSet<AppRole>();
		for (String id : ids) {
			if (StringUtils.isNotBlank(id)) {
				AppRole role = appRoleService.get(new Long(id));
				roles.add(role);
			}
		}
		if (appUser.getUserId() != null && 1L == appUser.getUserId()) {
			AppRole role = appRoleService.get(-1L);
			roles.add(role);
		}
		appUser.setRoles(roles);
		if (appUser.getUserId() != null) {
			AppUser old = (AppUser) appUserService.get(appUser.getUserId());
			appUser.setUsername(old.getUsername());
			appUser.setDelFlag(old.getDelFlag());
			appUser.setPassword(old.getPassword());
			appUser.setAppUserKeySet(old.getAppUserKeySet());
			appUser.setUserType(old.getUserType());
			if(appUser.getCorpInfo().getCorpId()==null){
				appUser.setCorpInfo(null);
			}
			if(appUser.getDepartment().getDepId().compareTo(old.getDepartment().getDepId()) != 0) {
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(appUser.getUserId()));
				List<Practitioner> list = practitionerService.getAll(filter);
				if(list.size() > 0) {
					list.get(0).setDepartment(appUser.getDepartment());
					practitionerService.merge(list.get(0));
				}
			}
			appUserService.merge(appUser);
			setJsonString(JSON_SUCCESS);
		} else if (appUserService.findByUserName(appUser.getUsername()) == null) {
			appUser.setDelFlag(Constants.FLAG_UNDELETED);
			appUser.setPassword(StringSupport.encryptMD5(appUser.getPassword()));
            if(appUser.getCorpInfo().getCorpId()==null){
                appUser.setCorpInfo(null);
            }
            //注册到A9
            appUserService.save(appUser);
            boolean bl = registerToA9(appUser.getUsername(),appUser.getAddress(),appUser.getMobile(),appUser.getPassword(),appUser.getUserId());
            if(!bl) {
            	changeExternalAddress(appUser);
            }
			setJsonString(JSON_SUCCESS);
		} else {
			setJsonString("{success:false,msg:'用户登录账号:" + appUser.getUsername() + "已存在,请重新输入账号.'}");
		}
		
		return SUCCESS;
	}
	
	@ActionLog(description = "批量设置权限")
	public String batchPermssion() {
		String rolesIds = getRequest().getParameter("AppUserRoles");
		String[] ids = rolesIds.split(",");
		Set<AppRole> roles = new HashSet<AppRole>();
		for (String id : ids) {
			if (StringUtils.isNotBlank(id)) {
				AppRole role = appRoleService.get(new Long(id));
				roles.add(role);
			}
		}
		String userIdsString = getRequest().getParameter("userIds");
		String[] userIds = userIdsString.split(",");
		for (String id : userIds) {
			if (StringUtils.isNotBlank(id)) {
				AppUser oldUser = (AppUser) appUserService.get(Long.valueOf(id));
				oldUser.setRoles(roles);
				appUserService.merge(oldUser);
				setJsonString(JSON_SUCCESS);
			}
		}
		return SUCCESS;
	}

	public String selectedRoles() {
		if (userId != null) {
			setAppUser((AppUser) appUserService.get(userId));
			Set<AppRole> roles = appUser.getRoles();
			StringBuffer sb = new StringBuffer("[");
			for (AppRole role : roles) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName() + "'],");
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]");
			setJsonString(sb.toString());
		}
		return SUCCESS;
	}

	public String chooseRoles() {
		List<AppRole> chooseRoles = null;
		AppUser curUser = ApplicationContainer.getCurrentUser();
		if(curUser.getDepartment().getDepType().equals(Constants.DEP_LABOUR)) {
			String depSerial = curUser.getDepartment().getDepSerial().substring(0, 4);
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_depSerial_S_EQ", depSerial);
			List<Department> dlist = departmentService.getAll(filter);
			Long dId = dlist.get(0).getDepId();
			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_roleDepartmentId_L_EQ", dId+"");
			chooseRoles = this.appRoleService.getAll(filter1);
		}else {
			chooseRoles = this.appRoleService.getAll();
		}
		if (userId != null) {
			setAppUser((AppUser) appUserService.get(userId));
			Set<AppRole> selectedRoles = this.appUser.getRoles();
			for (AppRole role : selectedRoles) {
				chooseRoles.remove(role);
			}
		}
		String roleType = getRequest().getParameter("roleType");
		if (StringUtils.isNotBlank(roleType) && !"0".equals(roleType)) {
			List<AppRole> includeRoles = new ArrayList<AppRole>();
			for (AppRole role : chooseRoles) {
				if (roleType.equals(role.getRoleType())) {
					includeRoles.add(role);
				}
				chooseRoles = includeRoles;
			}
		}
		StringBuffer sb = new StringBuffer("[");
		for (AppRole role : chooseRoles) {
			if (role.getStatus().shortValue() != 0) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName() + "'],");
			}
		}
		sb.deleteCharAt(sb.length() - 1);
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String resetPassword() {
		String userId = getRequest().getParameter("appUserUserId");
		String oldPassword = StringSupport.encryptMD5(getRequest().getParameter("oldPassword"));
		String newPassword = getRequest().getParameter("newPassword");
		String againPassword = getRequest().getParameter("againPassword");
		if (StringUtils.isNotEmpty(userId))
			setAppUser((AppUser) appUserService.get(new Long(userId)));
		else {
			AppUser au = appUserService.get(ApplicationContainer.getCurrentUserId());
			setAppUser(au);
		}
		StringBuffer msg = new StringBuffer("{msg:'");
		boolean pass = false;
		if (oldPassword.equals(appUser.getPassword())) {
			if (newPassword.equals(againPassword)) {
				pass = true;
			} else {
				msg.append("两次输入不一致.'");
			}
		} else {
			msg.append("旧密码输入不正确.'");
		}
		try {
			if (pass) {
				appUser.setPassword(StringSupport.encryptMD5(newPassword));
//				if(appUser.getCorpInfo().getCorpId()==null){
//					appUser.setCorpInfo(null);
//				}
				appUserService.save(appUser);
				syncAccount(appUser.getMobile());
				setJsonString(JSON_SUCCESS);
			} else {
				msg.append(",failure:true}");
				setJsonString(msg.toString());
			}
		} catch (Exception e) {
            e.printStackTrace();
			msg.append(e.getMessage() + "'");
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}

		return SUCCESS;
	}

	@ActionLog(description = "修改个人资料")
	public String profile() {
		AppUser old = appUserService.get(ApplicationContainer.getCurrentUserId());
		old.setFullname(appUser.getFullname());
		old.setEmail(appUser.getEmail());
		old.setMobile(appUser.getMobile());
		old.setPhone(appUser.getPhone());
		old.setSex(appUser.getSex());
		old.setAddress(appUser.getAddress());
		old.setZip(appUser.getZip());
		appUserService.update(old);
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	public String multiResetPwd() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				AppUser user = appUserService.get(new Long(id));
				user.setPassword(StringSupport.encryptMD5(DEFAULT_PASSWORD));
				appUserService.update(user);
				syncAccount(user.getMobile());
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}
	
	public  boolean syncAccount(String mobile) {
		SyncBase syncBase = new SyncBase();
		syncBase.connectMysqlDb(); // 连接A9数据库
		
		UcAccountUtil ucAccountImpl = new UcAccountUtil();
		List<Map<String, Object>>  ucAccountList = appUserService.queryByScript("terminal.list_app_user", mobile);
		
		if (ucAccountList != null && ucAccountList.size() > 0) {
				ucAccountImpl.insertToMySql(ucAccountList);//更新 USER数据到A9
		} else {
			syncBase.closeA9Conn(); 
			return false;
		}
		syncBase.closeA9Conn(); 
		return true;
	}
	
	public String findByUserName() {
		String userName = getRequest().getParameter("userName");
		AppUser au = appUserService.findByUserName(userName);
		if(au!=null) {
			this.jsonString = au.toString();
		}
		return SUCCESS;
	}

	public String checkRepeat() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		List<AppUser> list = appUserService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,DateUtil.LINK_DISPLAY_DATE,true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	//修改账号的外部系统地址（仅限原 8911 用户）
	private void changeExternalAddress(AppUser appUser) {
		SyncBase syncBase = new SyncBase();
		syncBase.connectMysqlDb(); // 连接A9数据库
		if (Globel.mysqlDb != null) {
			UcAccountUtil ucAccountImpl = new UcAccountUtil();
			if(ucAccountImpl.existsInOriginSystem(appUser)) {
				ucAccountImpl.updateToMySql(appUser);
			}
		}
		syncBase.closeA9Conn(); 
	}
}
