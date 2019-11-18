/**
 *====================================================
 * 文件名称: InstalmentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.AutocraneFeeDao;
import com.knight.emms.model.AutocraneFee;
import com.knight.emms.service.AutocraneFeeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: InstalmentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 上午7:34:20
 */
public class AutocraneFeeServiceImpl extends BusinessLongPKServiceImpl<AutocraneFee> implements AutocraneFeeService {

	@SuppressWarnings("unused")
	private AutocraneFeeDao autocraneFeeDao;

	public AutocraneFeeServiceImpl(AutocraneFeeDao dao) {
		super(dao);
		this.autocraneFeeDao = dao;
	}

	@Override
	public void saveOrMergeForEdit(AutocraneFee autocrane) {
		
	}

	@Override
	public List<AutocraneFee> queryTranslateAllFull(QueryFilter filter) {

		return null;
	}

	@Override
	public AutocraneFee getTranslateFull(Long autocraneId) {
		return null;
	}

	

}
