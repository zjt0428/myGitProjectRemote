/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DepartmentDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao.impl;

import java.util.List;

import com.knight.core.Constants;
import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.system.dao.DepartmentDao;
import com.knight.system.model.Department;

/**
 * @ClassName:DepartmentDaoImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:58:46
 * @since JDK Version 1.5
 */
public class DepartmentDaoImpl extends BaseLongPKDaoImpl<Department> implements DepartmentDao {

	public List<Department> findByParentId(Long parentId) {
		String hql = "from Department d where d.parentId=? and d.delFlag = ?";
		Object[] params = { parentId, Constants.ENABLED };
		return findByHql(hql, params);
	}

	public List<Department> queryBySerial(String depName) {
		String hql = "from Department vo where vo.depSerial=?";
		String[] param = { depName };
		return findByHql(hql, param);
	}

	public List<Department> findByPath(String path) {
		String hql = "from Department vo where vo.path like ? and vo.delFlag = ?";
		Object[] param = { path + "%", Constants.ENABLED };
		return findByHql(hql, param);
	}

}
