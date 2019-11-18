/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppRoleAction.java
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
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.XmlUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppFunction;
import com.knight.system.model.AppRole;
import com.knight.system.model.Department;
import com.knight.system.service.AppFunctionService;
import com.knight.system.service.AppRoleService;
import com.knight.system.service.DepartmentService;

import lombok.Getter;
import lombok.Setter;

/**
 * 
 * @ClassName:AppRoleAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 下午2:25:48
 * @since JDK Version 1.5
 */
public class AppRoleAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private static String IS_COPY = "1";

	@Resource
	private AppRoleService appRoleService;
	
	@Resource
	private AppFunctionService appFunctionService;

	@Getter
	@Setter
	private AppRole appRole;

	@Getter
	@Setter
	private Long roleId;
	
	@Resource
	private DepartmentService departmentService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AppRole> list = appRoleService.getAll(filter);
		Type type = new TypeToken<List<AppRole>>() {}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String comboList() {
		StringBuffer buff = new StringBuffer("[");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setLimitSize(false); //查询全部
		List<AppRole> listRole = appRoleService.getAll(filter);
		for (AppRole role : listRole) {
			buff.append("['"+role.getRoleId()+"','"+role.getRoleName()+"'],");
		}
		if (listRole.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String tree() {
		StringBuffer buff = new StringBuffer("[");
		List<AppRole> listRole = appRoleService.getAll();
		for (AppRole role : listRole) {
			buff.append("{id:'" + role.getRoleId() + "',text:'" + role.getRoleName() + "',leaf:true},");
		}
		if (!(listRole.isEmpty())) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	@ActionLog(description = "角色删除")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				AppRole appRole = appRoleService.get(new Long(id));
				appRole.getAppUsers().remove(appRole);
				appRole.getFunctions().remove(appRole);
				appRoleService.remove(appRole);
			}
		}
		this.jsonString = JSON_SUCCESS;
		return SUCCESS;
	}

	@ActionLog(description = "角色授权")
	public String grant() {
		AppRole appRole = appRoleService.get(this.roleId);
		String rights = getRequest().getParameter("rights");
		if (rights == null) {
			rights = "";
		}
		if (!(rights.equals(appRole.getRights()))) {
			appRole.setRights(rights);
			appRole.getFunctions().clear();
			String[] funs = rights.split("[,]");
			for (int i = 0; i < funs.length; ++i) {
				if (funs[i].startsWith("_")) {
					AppFunction af = appFunctionService.getByKey(funs[i]);
					if (af != null) {
						appRole.getFunctions().add(af);
					}
				}
			}
			appRoleService.save(appRole);
			ApplicationContainer.reloadSecurityDataSource();
		}
		return SUCCESS;
	}

	public String grantXml() {
		Document grantMenuDoc = ApplicationContainer.getGrantMenuDocument();
		setJsonString(XmlUtil.docToString(grantMenuDoc));
		return SUCCESS;
	}

	public String get() {
		AppRole appRole = appRoleService.get(this.roleId);
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(gson.toJson(appRole));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存角色信息")
	public String save() {
		String isCopy = getRequest().getParameter("isCopy");
		if ((StringUtils.isNotEmpty(isCopy)) && (IS_COPY.equals(isCopy))) {
			if(this.appRole.getRoleId()==null){
				AppRole role = new AppRole();
				role.setIsDefaultIn((short) (0));
				role.setRoleDesc(this.appRole.getRoleDesc());
				role.setStatus(this.appRole.getStatus());
				role.setRoleName(this.appRole.getRoleName());
				role.setRoleDepartment(this.appRole.getRoleDepartment());
				role.setRoleDepartmentId(this.appRole.getRoleDepartmentId());
				appRoleService.save(role);
			}else{
				AppRole p= appRoleService.get(this.appRole.getRoleId());
				p.setIsDefaultIn((short) (0));
				p.setRoleDesc(appRole.getRoleDesc());
				p.setStatus(appRole.getStatus());
				p.setRoleName(appRole.getRoleName());
				p.setRoleType(appRole.getRoleType());
				p.setRoleDepartment(appRole.getRoleDepartment());
				p.setRoleDepartmentId(appRole.getRoleDepartmentId());
				appRoleService.merge(p);
			}
		} else {
			this.appRole.setIsDefaultIn((short) (0));
			appRoleService.save(this.appRole);
		}
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

	public String check() {
		String roleName = getRequest().getParameter("roleName");
		AppRole appRole = appRoleService.getByRoleName(roleName);
		if (appRole == null)
			setJsonString(JSON_SUCCESS);
		else {
			setJsonString(JSON_FAIL);
		}
		return SUCCESS;
	}

	@ActionLog(description = "数据权限授权")
	public String grantPermission() {
		AppRole appRole = appRoleService.get(this.roleId);
		String type = getRequest().getParameter("type");
		String permission = getRequest().getParameter("permission");
		if (permission == null) {
			permission = "";
		}
		if ("data".equals(type) && !(permission.equals(appRole.getDataPermission()))) {
			appRole.setDataPermission(permission);
			appRoleService.save(appRole);
			ApplicationContainer.reloadSecurityDataSource();
		}else if("equip".equals(type) && !(permission.equals(appRole.getEquipPermission()))) {
			appRole.setEquipPermission(permission);
			appRoleService.save(appRole);
			ApplicationContainer.reloadSecurityDataSource();
		}else if("labour".equals(type) && !(permission.equals(appRole.getLabourPermission()))) {
			appRole.setLabourPermission(permission);
			appRoleService.save(appRole);
			ApplicationContainer.reloadSecurityDataSource();
		}
		return SUCCESS;
	}

	public List<String> filterPermission(List<String> list, String dataPermission) {
		for (Iterator<String> iterator = list.iterator(); iterator.hasNext();) {
			String depSerial = (String) iterator.next();
			List<Department> depList = departmentService.queryBySerial(depSerial);
			Department dep = depList.get(0);
			if(dep.getParentId()==0) {
				continue;
			}
			Department dep3 = departmentService.get(dep.getParentId());
			if(!dataPermission.contains(dep3.getDepSerial())) {
				continue;
			}
			List<Department> depList2 = departmentService.findByParentId(dep.getParentId());
			boolean bl = true;
			for(Department dep2 : depList2) {
				if(!dataPermission.contains(dep2.getDepSerial())) {
					list.remove(dep3.getDepSerial());
					bl = false;
				}
			}
			if(bl) {
				for(Department dep2 : depList2) {
					list.remove(dep2.getDepSerial());
				}
			}
//			this.filterPermission(list, dataPermission);
		}
		return list;
	}
	
}
