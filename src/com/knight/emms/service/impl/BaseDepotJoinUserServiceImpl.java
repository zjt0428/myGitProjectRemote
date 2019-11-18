/**
 *====================================================
 * 文件名称: StoreJoinUserServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月14日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.BaseDepotJoinUserDao;
import com.knight.emms.model.BasedepotJoinUser;
import com.knight.emms.service.BaseDepotJoinUserService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: StoreJoinUserServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月14日
 */
public class BaseDepotJoinUserServiceImpl extends BusinessLongPKServiceImpl<BasedepotJoinUser> implements BaseDepotJoinUserService {

	@Resource
	private BaseDepotJoinUserDao baseDepotJoinUserDao;
	
	public BaseDepotJoinUserServiceImpl(BaseDepotJoinUserDao dao) {
		super(dao);
		this.baseDepotJoinUserDao = dao;
	}

}
