/**
 *====================================================
 * 文件名称: TechnicalDisclosureServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.DispatchEquipDao;
import com.knight.emms.dao.TechnicalDisclosureDao;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.TechnicalDisclosure;
import com.knight.emms.service.TechnicalDisclosureService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: TechnicalDisclosureServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:35:21
 */
public class TechnicalDisclosureServiceImpl extends BaseBusinessModelServiceImpl<TechnicalDisclosure> implements TechnicalDisclosureService {

	private TechnicalDisclosureDao technicalDisclosureDao;
	
	@Resource
	private DispatchEquipDao dispatchEquipDao;

	public TechnicalDisclosureServiceImpl(TechnicalDisclosureDao dao) {
		super(dao);
		this.technicalDisclosureDao = dao;
	}

	public List<TechnicalDisclosure> queryTranslateAllFull(QueryFilter filter) {
		List<TechnicalDisclosure> list = technicalDisclosureDao.getAll(filter);
		for (TechnicalDisclosure t : list) {
			CodeServiceImpl.translate(t.getEquipment());
		}
		return list;
	}

	public TechnicalDisclosure getTranslateFull(Long disclosureId) {
		TechnicalDisclosure t = technicalDisclosureDao.get(disclosureId);
		CodeServiceImpl.translate(t.getEquipment());
		return t;
	}

	@Override
	public void saveInstall(TechnicalDisclosure t, DispatchEquip d) {
		// TODO Auto-generated method stub
		DispatchEquip de = dispatchEquipDao.get(d.getDispatchEquipId());
		de.setBuildingNum(d.getBuildingNum());
		dispatchEquipDao.update(de);
		technicalDisclosureDao.save(t);
	}

}
