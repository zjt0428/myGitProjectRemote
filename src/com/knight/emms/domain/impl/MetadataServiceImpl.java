/**
 *====================================================
 * 文件名称: MetadataServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-16			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.ApplicationContextHelper;
import com.knight.core.dao.BaseHibernateDao;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.domain.MetadataService;
import com.knight.emms.model.Borrow;
import com.knight.emms.model.Component;
import com.knight.emms.model.Equipment;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: MetadataServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-16 下午8:04:31
 */
public class MetadataServiceImpl implements MetadataService {

	@Resource
	private BaseHibernateDao baseHibernateDao;

	public List<Component> queryComponentByBorrow(Borrow borrow) {
		ComponentDao componentDao = (ComponentDao) ApplicationContextHelper.getBean("componentDao");
		String hql = "select c from Component c, BorrowComponent bc where bc.borrowId = ? and bc.componId = c.componId";
		List<Component> comps = baseHibernateDao.find(hql, borrow.getBorrowId());
		CodeServiceImpl.translate(comps, componentDao.getPersistantStruct());
		return comps;
	}

	public List<Equipment> queryEquipByBorrow(Borrow borrow) {
		EquipmentDao equipmentDao = (EquipmentDao) ApplicationContextHelper.getBean("equipmentDao");
		String hql = "select e from Equipment e, BorrowEquip be where be.borrowId = ? and be.equipId = e.equipId";
		List<Equipment> equips = baseHibernateDao.find(hql, borrow.getBorrowId());
		CodeServiceImpl.translate(equips, equipmentDao.getPersistantStruct());
		return equips;
	}

}
