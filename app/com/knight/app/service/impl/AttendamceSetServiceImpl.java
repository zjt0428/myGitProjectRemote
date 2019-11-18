/**
 *====================================================
 * 文件名称: MemoServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.service.impl;


import com.knight.app.dao.AttendamceSetDao;
import com.knight.app.model.AttendamceSet;
import com.knight.app.service.AttendamceSetService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class AttendamceSetServiceImpl  extends BusinessLongPKServiceImpl<AttendamceSet> implements AttendamceSetService{

	private AttendamceSetDao attendamceSetDao;

	public AttendamceSetServiceImpl(AttendamceSetDao dao) {
		super(dao);
		this.attendamceSetDao = dao;
	}

	public void saveOrUpdate(AttendamceSet attendamceSet) {
		if (attendamceSet.getSid() == null) {
			attendamceSetDao.save(attendamceSet);
		}else{
			attendamceSetDao.merge(attendamceSet);
		}
	}
	
}
