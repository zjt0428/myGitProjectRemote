/**
 *====================================================
 * 文件名称: AnnounceServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;


import java.util.List;

import javax.annotation.Resource;

import com.knight.core.dao.GenericDao;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.ExportModel;
import com.knight.emms.dao.EquipInsuranceDetailDao;
import com.knight.emms.model.EquipInsurance;
import com.knight.emms.model.EquipInsuranceDetail;
import com.knight.emms.service.EquipInsuranceDetailService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: AnnounceServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:44:30
 */
public class EquipInsuranceDetailServiceImpl extends BusinessLongPKServiceImpl<EquipInsuranceDetail> implements EquipInsuranceDetailService {
	
	@Resource
	private EquipInsuranceDetailDao  equipInsuranceDetailDao;

	public EquipInsuranceDetailServiceImpl(GenericDao<EquipInsuranceDetail, Long> dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<EquipInsuranceDetail> getTranslateFull(QueryFilter queryFilter) {
		// TODO Auto-generated method stub
		List<EquipInsuranceDetail> list = equipInsuranceDetailDao.getAll(queryFilter);
		for (EquipInsuranceDetail d : list) {
			CodeServiceImpl.translate(d.getEquipment());
		}
		return list;
	}


}
