/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserDao.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.dao;

import java.util.List;

import com.knight.core.dao.BaseLongPKDao;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;

/**
 * @ClassName:AppUserDao
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:57:55
 * @since JDK Version 1.5
 */
public interface AppUserDao extends BaseLongPKDao<AppUser> {

	public AppUser findByUserName(String paramString);

	public List<AppUser> findByDepartment(String paramString, PagingBean paramPagingBean);

	public List<AppUser> findByDepartment(String paramString);

	public List<AppUser> findByDepartment(Department paramDepartment);

	public List<AppUser> findByRole(Long paramLong);

	public List<AppUser> findByRole(Long paramLong, PagingBean paramPagingBean);

	public List<AppUser> findByRoleId(Long paramLong);

	public List<AppUser> findByDepId(Long paramLong);

	public AppUser findByMobile(String tel);

	public AppUser findByFullName(String fullname);

}