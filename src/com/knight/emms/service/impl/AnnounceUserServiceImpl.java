/**
 *====================================================
 * 文件名称: AnnounceUserServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.AnnounceUserDao;
import com.knight.emms.model.AnnounceUser;
import com.knight.emms.service.AnnounceUserService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: AnnounceUserServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:45:02
 */
public class AnnounceUserServiceImpl extends BusinessLongPKServiceImpl<AnnounceUser> implements AnnounceUserService {

	public AnnounceUserServiceImpl(AnnounceUserDao dao) {
		super(dao);
	}

}
