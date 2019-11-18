/**
 *====================================================
 * 文件名称: IndisPrecheckServiceImpl.java
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
import com.knight.emms.dao.IndisPrecheckDao;
import com.knight.emms.dao.VerifyStandardDao;
import com.knight.emms.model.IndisPrecheck;
import com.knight.emms.model.VerifyStandard;
import com.knight.emms.service.IndisPrecheckService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: IndisPrecheckServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:32:11
 */
public class IndisPrecheckServiceImpl extends BaseBusinessModelServiceImpl<IndisPrecheck> implements IndisPrecheckService {

	private IndisPrecheckDao indisPrecheckDao;

	@Resource
	private VerifyStandardDao verifyStandardDao;

	public IndisPrecheckServiceImpl(IndisPrecheckDao dao) {
		super(dao);
		this.indisPrecheckDao = dao;
	}

	public List<IndisPrecheck> queryTranslateAllFull(QueryFilter filter) {
		List<IndisPrecheck> list = indisPrecheckDao.getAll(filter);
		for (IndisPrecheck p : list) {
			CodeServiceImpl.translate(p.getEquipment());
		}
		return list;
	}

	public IndisPrecheck getTranslateFull(Long precheckId) {
		IndisPrecheck p = indisPrecheckDao.get(precheckId);
		CodeServiceImpl.translate(p.getEquipment());
		return p;
	}

	public void saveOrUpdate(IndisPrecheck indisPrecheck) {
		if (indisPrecheck.getPrecheckId() == null) {
			indisPrecheckDao.saveSerialModel(indisPrecheck);
		} else {
			indisPrecheckDao.merge(indisPrecheck);
		}
		indisPrecheck.setSubIndisPrecheck();
		for (VerifyStandard s : indisPrecheck.getVerifyStandardSet()) {
			if (s.getStandardId() == null) {
				verifyStandardDao.save(s);
			} else {
				verifyStandardDao.merge(s);
			}
		}
	}

	public void delete(Long precheckId) {
		IndisPrecheck indisPrecheck = indisPrecheckDao.get(precheckId);
		for (VerifyStandard vs : indisPrecheck.getVerifyStandardSet()) {
			verifyStandardDao.remove(vs);
		}
		indisPrecheckDao.remove(precheckId);
	}

}
