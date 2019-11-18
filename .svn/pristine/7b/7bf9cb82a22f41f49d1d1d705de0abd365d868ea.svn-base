/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DepartmentService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service;

import java.util.List;
import java.util.Map;

import org.apache.poi.ss.formula.functions.T;

import com.knight.core.model.BaseModel;
import com.knight.core.service.BaseLongPKService;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.Equipment;
import com.knight.system.model.Department;

/**
 * @ClassName:DepartmentService
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:59:52
 * @since JDK Version 1.5
 */
public interface DepartmentService extends BaseLongPKService<Department> {

	public Map<Long, String> queryAllDepartment();

	public void createDepartment(Department department);

	public List<Department> findByParentId(Long parentId);

	public List<Department> findByPath(String depPath);

	String bindingDepartmentPermission(Long depId);

	public void grantPermission(BaseModel c, String permissionFlag);

	public List<Department> queryBySerial(String depSerial);

}
