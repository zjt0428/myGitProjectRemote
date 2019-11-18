/**
 *====================================================
 * 文件名称: InstallFeeServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Set;

import com.knight.core.dao.GenericDao;
import com.knight.emms.model.InstallFee;
import com.knight.emms.service.InstallFeeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: InstalmentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 上午7:34:20
 */
public class InstallFeeServiceImpl extends BusinessLongPKServiceImpl<InstallFee> implements InstallFeeService {


	private GenericDao<InstallFee, Long> installFeeDao;

	public InstallFeeServiceImpl(GenericDao<InstallFee, Long> dao) {
		super(dao);
		this.installFeeDao = dao;
	}

	public void saveOrMeger(Set<InstallFee> InstallFeeSet) {
		if (InstallFeeSet == null) {
			return;
		}
		
	}

}
