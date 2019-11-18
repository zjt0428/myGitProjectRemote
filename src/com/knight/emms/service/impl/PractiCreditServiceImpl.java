/**
 *====================================================
 * 文件名称: PractiCreditServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.PractiCreditDao;
import com.knight.emms.model.PractiCredit;
import com.knight.emms.service.PractiCreditService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: PractiCreditServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-6 下午6:27:29
 */
public class PractiCreditServiceImpl extends BusinessLongPKServiceImpl<PractiCredit> implements PractiCreditService {

	public PractiCreditServiceImpl(PractiCreditDao dao) {
		super(dao);
	}

}
