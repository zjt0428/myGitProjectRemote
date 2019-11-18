/**
 *====================================================
 * 文件名称: PractiCertServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.ComponIntoStoreDetailDao;
import com.knight.emms.model.ComponIntoStoreDetail;
import com.knight.emms.service.ComponIntoStoreDetailService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: PractiCertServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:06:22
 */
public class ComponIntoStoreDetailServiceImpl extends BusinessLongPKServiceImpl<ComponIntoStoreDetail> implements ComponIntoStoreDetailService {

	public ComponIntoStoreDetailServiceImpl(ComponIntoStoreDetailDao dao) {
		super(dao);
	}

}
