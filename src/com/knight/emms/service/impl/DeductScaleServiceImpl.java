/**
 *====================================================
 * 文件名称: DeductScaleServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-21			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.DeductScaleDao;
import com.knight.emms.model.DeductScale;
import com.knight.emms.service.DeductScaleService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: DeductScaleServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-21 下午9:06:54
 */
public class DeductScaleServiceImpl extends BusinessLongPKServiceImpl<DeductScale> implements DeductScaleService {

	public DeductScaleServiceImpl(DeductScaleDao dao) {
		super(dao);
	}

}
