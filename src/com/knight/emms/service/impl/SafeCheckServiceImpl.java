/**
 *====================================================
 * 文件名称: SafeCheckServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-1-23			chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.SafeCheckContentDao;
import com.knight.emms.dao.SafeCheckDao;
import com.knight.emms.model.SafeCheck;
import com.knight.emms.service.SafeCheckService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: SafeCheckServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017-1-23 上午9:46:00
 */
public class SafeCheckServiceImpl extends BusinessLongPKServiceImpl<SafeCheck> implements SafeCheckService{

	private SafeCheckDao safeCheckDao;
	
	@Resource
	private SafeCheckContentDao safeCheckContentDao;
	
	public SafeCheckServiceImpl(SafeCheckDao dao) {
		super(dao);
		this.safeCheckDao = dao;
	}

	@Override
	public void saveOrUpdate(SafeCheck safeCheck) {
		safeCheck.setSubSafeCheck();
		safeCheckDao.merge(safeCheck);		
	}
	
	@Override
	public List<SafeCheck> queryTranslateAllFull(QueryFilter filter) {
		List<SafeCheck> list = safeCheckDao.getAll(filter);
		for(SafeCheck sc : list){
			CodeServiceImpl.translate(sc,getPersistantStruct());
		}
		return list;
	}
	
	@Override
	public SafeCheck getTranslateFull(Long safeCheckId) {
		SafeCheck sc = safeCheckDao.get(safeCheckId);
		CodeServiceImpl.translate(sc,getPersistantStruct());
		return sc;
	}

	@Override
	public void deleteAll(Long safeCheckId) {
		safeCheckDao.remove(safeCheckId);	
	}

	@Override
	public void deleteContent(Long safeCheckContentId) {
		safeCheckContentDao.remove(safeCheckContentId);
	}

}
