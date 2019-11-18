/**
 *====================================================
 * 文件名称: DismantleManageServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-10-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.DismantleManageDao;
import com.knight.emms.model.DismantleManage;
import com.knight.emms.service.DismantleManageService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: DismantleManageServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-10-26 下午4:21:11
 */
public class DismantleManageServiceImpl extends BusinessLongPKServiceImpl<DismantleManage> implements DismantleManageService {

	public DismantleManageServiceImpl(DismantleManageDao dao) {
		super(dao);
	}

}
