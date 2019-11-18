/**
 * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DepartmentAction.java
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.knight.core.Constants;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.TreeNode;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.service.AppUserService;
import com.knight.system.service.CodeService;
import com.knight.system.service.DepartmentService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName:DepartmentAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-31 下午2:29:42
 * @since JDK Version 1.5
 */
public class DepartmentAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private DepartmentService departmentService;

	@Resource
	private AppUserService appUserService;

	@Resource
	private CodeService codeService;

	@Setter
	@Getter
	private Department department;

	@Setter
	@Getter
	private Long depId;

	public String select() {
		QueryFilter filter = new QueryFilter(getRequest());
		if (depId != null && !(Department.TOP_DEPID.equals(depId))) {
			this.department = ((Department) departmentService.get(depId));
			filter.addConjunctFilter("Q_path_S_LFK", this.department.getPath());
		}
		filter.addConjunctFilter("Q_delFlag_SN_EQ", Constants.ENABLED.toString());
		filter.addSorted("path", "asc");
		List<Department> list = departmentService.getAll(filter);
		Type type = new TypeToken<List<Department>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		this.jsonString = buff.toString();

		return SUCCESS;
	}

	public String list() {
		Department currentdep = ApplicationContainer.getCurrentUser().getDepartment();
		if(currentdep == null || !Constants.DEP_CORPORATION.equals(currentdep.getDepType())) {
			return SUCCESS;
		}
		String opt = getRequest().getParameter("opt"); // 是否返回根节点
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'0',text:'" + ApplicationContainer.getCompanyName() + "',expanded:true,children:[");
		}

		List<Department> listParent = departmentService.findByParentId(Department.TOP_DEPID);
		for (Department dep : listParent) {
			buff.append("{id:'" + dep.getDepId() + "',text:'" + dep.getDepName()+ "',sortField:" + dep.getSortField() + ",expanded:true,");
			buff.append(findChild(dep.getDepId()));
		}
		if (!(listParent.isEmpty())) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/*
	 * 劳务组织架构列表
	 */
	public String listLabour() {
		Department currentdep = ApplicationContainer.getCurrentUser().getDepartment();
//		if(currentdep == null || !Constants.DEP_CORPORATION.equals(currentdep.getDepType())) {
//			return SUCCESS;
//		}
		QueryFilter filter = new QueryFilter();
		if(!ApplicationContainer.isCurrentSuperAdmin()) {
			filter.addConjunctFilter("Q_depType_S_EQ",Constants.DEP_LABOUR);
			filter.addConjunctFilter("Q_depSerial_S_EQ",currentdep.getDepSerial().substring(0, 4));
		}else {
			filter.addConjunctFilter("Q_depSerial_S_EQ",Department.LABOUR_DEP_SERIAL);
		}
		List<Department> listParent = departmentService.getAll(filter);
		StringBuffer buff = new StringBuffer();
		buff.append("[");
		for (Department dep : listParent) {
			buff.append("{id:'" + dep.getDepId() + "',text:'" + dep.getDepName()+ "',sortField:" + dep.getSortField() + ",expanded:true,");
			buff.append(findChild(dep.getDepId()));
		}
		if (!(listParent.isEmpty())) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String findChild(Long depId) {
		StringBuffer buff1 = new StringBuffer("");
		List<Department> list = departmentService.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		}
		buff1.append("children:[");
		for (Department dep2 : list) {
			buff1.append("{id:'" + dep2.getDepId() + "',text:'" + dep2.getDepName()+ "',sortField:" + dep2.getSortField() + ",expanded:true,");
			buff1.append(findChild(dep2.getDepId()));
		}
		buff1.deleteCharAt(buff1.length() - 1);
		buff1.append("]},");
		return buff1.toString();
	}

	@ActionLog(description = "新增部门单位")
	public String add() {
//		if (StringUtils.isBlank(department.getDepSerial())) {
//			setJsonString("{success:false,info:'部门编号不允许为空!'}");
//			return SUCCESS;
//		}
		departmentService.createDepartment(department);
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

	@ActionLog(description = "更新部门单位")
	public String update() {
		Department depart = departmentService.get(department.getDepId());
		if (depart == null) {
			setJsonString("{success:false,info:'未找到该部门信息,无法更新!'}");
			return SUCCESS;
		}
		depart.setDepType(department.getDepType());
		depart.setDepDesc(department.getDepDesc());
		depart.setDepName(department.getDepName());
		depart.setSortField(department.getSortField());
		departmentService.save(depart);
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

	@ActionLog(description = "删除部门单位")
	public String remove() {
		PagingBean pb = getInitPagingBean();
		Department department = departmentService.get(depId);
		List<AppUser> userList = this.appUserService.findByDepartment(department.getPath(), pb);
		if (userList.size() > 0) {
			setJsonString("{success:false,msg:'该部门下属还有人员，请将人员转移后再删除部门!'}");
			return SUCCESS;
		}
		departmentService.remove(depId);
		List<Department> list = departmentService.findByParentId(depId);
		for (Department dep : list) {
			List<AppUser> users = this.appUserService.findByDepartment(dep.getPath(), pb);
			if (users.size() > 0) {
				setJsonString("{success:false,msg:'该部门还有人员，请将人员转移后再删除部门!'}");
				return SUCCESS;
			}
			departmentService.remove(dep.getDepId());
		}
		setJsonString(JSON_SUCCESS);
		return SUCCESS;
	}

	public String detail() {
		this.department = departmentService.get(depId);
		this.department.setDepTypeName(CodeServiceImpl.fastValue("DEP_TYPE", this.department.getDepType()));
		Gson gson = new Gson();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(gson.toJson(this.department));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String findChildren() {
		Department topDep = null;
		if (Department.TOP_DEPID.equals(depId)) {
			topDep = new Department(Department.TOP_DEPID);
			topDep.setPath(Department.TOP_DEPID + ".");
			topDep.setDepName(ApplicationContainer.getCompanyName());
		} else {
			topDep = departmentService.get(depId);
			if (topDep == null) {
				return SUCCESS;
			}
		}
		String depName = topDep.getDepName();
		List<Department> deplist = departmentService.findByPath(topDep.getPath());
		List<Map<String, Object>> depMapList = new ArrayList<Map<String, Object>>();
		for (Department p : deplist) {
			Map<String, Object> m = new HashMap<String, Object>();
			m.put("id", p.getDepId());
			m.put("text", p.getDepName());
			m.put("parentId", p.getParentId());
			depMapList.add(m);
		}
		TreeNode topNode = new TreeNode("id", "text");
		topNode.setId(depId);
		topNode.setText(depName);
		topNode.createMapTreeNode(depMapList);
		setJsonString(GsonUtil.toJson(topNode.getChildren()));
		return SUCCESS;
	}
	
	public String findChildSerial(Long depId, String flag) {
		StringBuffer buff1 = new StringBuffer("");
		List<Department> list = departmentService.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		}
		buff1.append("children:[");
		for (Department dep2 : list) {
			buff1.append("{id:'" + dep2.getDepSerial() + "',text:'" + dep2.getDepName() + "',");
			if("equipPermission".equals(flag) && dep2.getDepLevel() == 3) {
				buff1.append("leaf:true},");
				continue;
			} else {
				buff1.append(findChildSerial(dep2.getDepId(), flag));
			}
		}
		buff1.deleteCharAt(buff1.length() - 1);
		buff1.append("]},");
		return buff1.toString();
	}

	/**数据权限下拉列表*/
	public String grantList() {
		String opt = getRequest().getParameter("opt"); // 是否返回根节点
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'0',text:'" + ApplicationContainer.getCompanyName() + "',expanded:true,children:[");
		}

		List<Department> listParent = departmentService.findByParentId(Department.TOP_DEPID);
		for (Department dep : listParent) {
			buff.append("{id:'" + dep.getDepSerial() + "',text:'" + dep.getDepName() + "',");
			buff.append(findChildSerial(dep.getDepId(), "dataPermission"));
		}
		if (!(listParent.isEmpty())) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	public String deplist() {
		String opt = getRequest().getParameter("opt"); // 是否返回根节点
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		}
		List<Department> listParent = departmentService.findByParentId(Department.TOP_DEPID);
		for (Department dep : listParent) {
			buff.append("{\"id\":" + dep.getDepId() + ",\"text\":\"" + dep.getDepName()+ "\",");
			buff.append(findChild1(dep.getDepId()));
		}
		if (!(listParent.isEmpty())) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + buff.toString() + "}}");
		return SUCCESS;
	}
	
	public String findChild1(Long depId) {
		StringBuffer buff1 = new StringBuffer();
		List<Department> list = departmentService.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("\"leaf\":true},");
			return buff1.toString();
		}
		buff1.append("\"children\":[");
		for (Department dep2 : list) {
			buff1.append("{\"id\":" + dep2.getDepId() + ",\"text\":\"" + dep2.getDepName() + "\",");
			buff1.append(findChild1(dep2.getDepId()));
		}
		buff1.deleteCharAt(buff1.length() - 1);
		buff1.append("]},");
		return buff1.toString();
	}
	
	/**设备权限下拉列表*/
	public String grantEquipDepList() {
		String opt = getRequest().getParameter("opt"); // 是否返回根节点
		StringBuffer buff = new StringBuffer();
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'0',text:'" + ApplicationContainer.getCompanyName() + "',expanded:true,children:[");
		}
		List<Department> listParent = departmentService.findByParentId(Department.TOP_DEPID);
		for (Department dep : listParent) {
			buff.append("{id:'" + dep.getDepSerial() + "',text:'" + dep.getDepName() + "',");
			buff.append(findChildSerial(dep.getDepId(), "equipPermission"));
		}
		if (!(listParent.isEmpty())) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	public String getChildDepId() {
		Long depId = ApplicationContainer.getCurrentUser().getDepartment().getDepId();
		List<Map<String, Object>> list = departmentService.queryByScript("corp.child_depId", depId);
		StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
