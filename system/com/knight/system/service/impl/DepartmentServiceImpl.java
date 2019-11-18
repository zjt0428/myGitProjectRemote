/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DepartmentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.jsoup.helper.StringUtil;

import com.knight.core.Constants;
import com.knight.core.exception.BusinessException;
import com.knight.core.model.BaseModel;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.Equipment;
import com.knight.system.dao.DepartmentDao;
import com.knight.system.model.Department;
import com.knight.system.service.DepartmentService;

/**
 * @ClassName:DepartmentServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:00:29
 * @since JDK Version 1.5
 */
public class DepartmentServiceImpl extends BaseLongPKServiceImpl<Department> implements DepartmentService {

	private DepartmentDao departmentDao;

	public DepartmentServiceImpl(DepartmentDao dao) {
		super(dao);
		this.departmentDao = dao;
	}

	public Map<Long, String> queryAllDepartment() {
		List<Department> departmentList = departmentDao.getAll();
		Map<Long, String> departMap = new HashMap<Long, String>(departmentList.size());
		for (Department d : departmentList) {
			departMap.put(d.getDepId(), d.getDepName());
		}
		return departMap;
	}

	public void createDepartment(Department department) {
		List<Department> ds = departmentDao.queryBySerial(department.getDepSerial());
		if (!ds.isEmpty()) {
			throw new BusinessException("该部门已经存在!");
		}
		Long parentId = department.getParentId();
		String depPath = "";
		int level = 0;
//		createDepSerial(department, parentId);
		if (parentId == null || Department.TOP_DEPID.equals(parentId)) {
			parentId = Department.TOP_DEPID;
			depPath = Department.TOP_DEPID + ".";
		} else {
			Department parentDepartment = departmentDao.get(parentId);
			if (!department.getDepSerial().startsWith(parentDepartment.getDepSerial())) {
				throw new BusinessException("部门编号必须以上级编号为开头!");
			}
			depPath = parentDepartment.getPath();
			level = parentDepartment.getDepLevel();
		}
		if (level < 1) {
			level = 1;
		}
		department.setDepLevel(level + 1);
		departmentDao.save(department);
		department.setPath(depPath + department.getDepId() + ".");
		departmentDao.save(department);
	}

	public List<Department> findByParentId(Long parentId) {
		return departmentDao.findByParentId(parentId);
	}

	public List<Department> findByPath(String path) {
		return departmentDao.findByPath(path);
	}

	public void remove(Long depId) {
		Department d = departmentDao.get(depId);
		d.setDepSerial("_" + d.getDepSerial());
		d.setDepName("(x)" + d.getDepName());
		d.setDelFlag(Constants.DISENABLED);
		departmentDao.save(d);
	}
	
	@Override
	public List<Department> queryBySerial(String depSerial) {
		return departmentDao.queryBySerial(depSerial);
	}
	
	public void createDepSerial(Department department, Long parentId) {
		if(parentId ==0) {
			List<Map<String,Object>> list = departmentDao.queryByScript("corp.dep_serial", parentId, "%%");
			String serial = (String)list.get(0).get("depSerial");
			if("_SUPERDE_DEPARTMENT".equals(serial)) {
				department.setDepSerial("01");
			}else {
				int seq = Integer.parseInt(serial) + 1;
				department.setDepSerial(StringUtils.leftPad(seq + "", 2, "0"));
			}
		}else {
			Department parentDepartment = departmentDao.get(parentId);
			List<Map<String,Object>> list = departmentDao.queryByScript("corp.dep_serial", parentId, parentDepartment.getDepSerial()+"%");
			String serial = null;
			if(list.size()>0) {
				serial = (String)list.get(0).get("depSerial");
			}
			int seq = 1;
			if (serial != null) {
				String preSerial = serial.substring(parentDepartment.getDepSerial().length());
				seq = Integer.parseInt((StringUtil.isBlank(preSerial)? "0" : preSerial)) + 1;
				if(seq>99) {
					throw new BusinessException("部门编号超出上限");
				}
			}
			String str = parentDepartment.getDepSerial()+StringUtils.leftPad(seq + "", 2, "0");
			department.setDepSerial(str);
		}
	}
	
	@Override
	public String bindingDepartmentPermission(Long depId) {
		if(depId != null) {
			return concatPermission(depId);
		}
		return "";
	}
	
	public String concatPermission(Long depId) {
		StringBuffer sb = new StringBuffer();
		if(depId!=null) {
			Department dep = departmentDao.get(depId);
			if(dep!=null) {
				sb.append("d").append(dep.getDepSerial()).append("d,");
				if(dep.getParentId()!=null) {
					sb.append(concatPermission(dep.getParentId()));
				}
			}
		}
		return sb.toString();
	}

	@Override
	public void grantPermission(BaseModel c, String permissionFlag) {
		if(c.getPermissionFlag()!=null && c.getPermissionFlag().contains("s")) {
			int begin =c.getPermissionFlag().indexOf("s");
			int end = c.getPermissionFlag().length();
			c.setPermissionFlag(permissionFlag + c.getPermissionFlag().substring(begin, end));
		}else {
			c.setPermissionFlag(permissionFlag);
		}
	}

}
