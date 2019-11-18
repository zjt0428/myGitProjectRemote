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
import com.knight.emms.dao.EquipAddReduceDetailDao;
import com.knight.emms.dao.TechnicalDisclosureDao;
import com.knight.emms.domain.BusinessEquipFlowValidate;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.EquipAddReduceDetail;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.FormReview;
import com.knight.emms.model.TechnicalDisclosure;
import com.knight.emms.service.EquipAddReduceDetailService;
import com.knight.emms.service.TechnicalDisclosureService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: TechnicalDisclosureServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:35:21
 */
public class EquipAddReduceDetailServiceImpl extends BusinessEquipFlowValidate<EquipAddReduceDetail> implements EquipAddReduceDetailService {

	private EquipAddReduceDetailDao equipAddReduceDetailDao;
	
	@Resource
	private DispatchEquipDao dispatchEquipDao;

	public EquipAddReduceDetailServiceImpl(EquipAddReduceDetailDao dao) {
		super(dao);
		this.equipAddReduceDetailDao = dao;
	}

	public List<EquipAddReduceDetail> queryTranslateAllFull(QueryFilter filter) {
		List<EquipAddReduceDetail> list = equipAddReduceDetailDao.getAll(filter);
		for (EquipAddReduceDetail t : list) {
			CodeServiceImpl.translate(t.getEquipment());
		}
		return list;
	}

	public EquipAddReduceDetail getTranslateFull(Long addReduceId) {
		EquipAddReduceDetail t = equipAddReduceDetailDao.get(addReduceId);
		CodeServiceImpl.translate(t.getEquipment());
		return t;
	}

	@Override
	public EquipAddReduceDetail editLoad(EquipAddReduceDetail t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveOrMergeForEdit(EquipAddReduceDetail t) {
		// TODO Auto-generated method stub
		
	}


	
}
