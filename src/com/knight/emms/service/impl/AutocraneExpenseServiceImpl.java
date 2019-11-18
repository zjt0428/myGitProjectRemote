/**
 *====================================================
 * 文件名称: AutocraneExpenseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年1月20日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.AutocraneExpenseDao;
import com.knight.emms.model.AutocraneExpense;
import com.knight.emms.service.AutocraneExpenseService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: AutocraneExpenseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年1月20日 下午7:11:28
 */
public class AutocraneExpenseServiceImpl extends BusinessLongPKServiceImpl<AutocraneExpense> implements AutocraneExpenseService {

	public AutocraneExpenseServiceImpl(AutocraneExpenseDao dao) {
		super(dao);
	}

}
