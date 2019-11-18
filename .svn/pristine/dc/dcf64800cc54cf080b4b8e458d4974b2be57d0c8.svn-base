/**
 *====================================================
 * 文件名称: ReceivementServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;


import javax.annotation.Resource;

import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.dao.SafeClarificationDao;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.SafeClarification;
import com.knight.emms.service.SafeClarificationService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: ReceivementServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 下午11:15:06
 */
public class SafeClarificationServiceImpl extends BusinessLongPKServiceImpl<SafeClarification> implements SafeClarificationService {
	
	@Resource
	private SafeClarificationDao safeClarificationDao;
	
	@Resource
	private PractitionerDao practitionerDao;
	
	public SafeClarificationServiceImpl(SafeClarificationDao dao) {
		super(dao);
		this.safeClarificationDao = dao;
	}

	@Override
	public SafeClarification getTranslateFull(Long clarificaId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveOrMergeFor(SafeClarification t) {
		if(t.getClarificaId() == null) {
			safeClarificationDao.save(t);
		}
		safeClarificationDao.merge(t);
	}
}
