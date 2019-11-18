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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.knight.app.dao.TAppRepairComponDao;
import com.knight.app.model.TAppRepairCompon;
import com.knight.app.service.TAppRepairComponService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class TAppRepairComponServiceImpl  extends BusinessLongPKServiceImpl<TAppRepairCompon> implements TAppRepairComponService {

	private TAppRepairComponDao tappRepairComponDao;

	public TAppRepairComponServiceImpl(TAppRepairComponDao dao) {
		super(dao);
		this.tappRepairComponDao = dao;
	}

	public void saveOrUpdate(TAppRepairCompon tappRepairCompon) {
		if (tappRepairCompon.getRcid() == null) {
			tappRepairComponDao.save(tappRepairCompon);
		}else{
			tappRepairComponDao.merge(tappRepairCompon);
		}
	}
	
}
