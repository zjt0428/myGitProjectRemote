/**
 *====================================================
 * 文件名称: IndisBasecheckServiceImpl.java
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
import com.knight.emms.dao.IndisBasecheckDao;
import com.knight.emms.dao.VerifyStandardDao;
import com.knight.emms.model.IndisBasecheck;
import com.knight.emms.model.VerifyStandard;
import com.knight.emms.service.IndisBasecheckService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: IndisBasecheckServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:31:40
 */
public class IndisBasecheckServiceImpl extends BaseBusinessModelServiceImpl<IndisBasecheck> implements IndisBasecheckService {

	private IndisBasecheckDao indisBasecheckDao;

	@Resource
	private VerifyStandardDao verifyStandardDao;

	public IndisBasecheckServiceImpl(IndisBasecheckDao dao) {
		super(dao);
		this.indisBasecheckDao = dao;
	}

	public List<IndisBasecheck> queryTranslateAllFull(QueryFilter filter) {
		List<IndisBasecheck> list = indisBasecheckDao.getAll(filter);
		for (IndisBasecheck p : list) {
			CodeServiceImpl.translate(p.getEquipment());
		}
		return list;
	}

	public IndisBasecheck getTranslateFull(Long basecheckId) {
		IndisBasecheck p = indisBasecheckDao.get(basecheckId);
		CodeServiceImpl.translate(p.getEquipment());
		return p;
	}

	public void saveOrUpdate(IndisBasecheck indisBasecheck) {
		if (indisBasecheck.getBasecheckId() == null) {
			indisBasecheckDao.saveSerialModel(indisBasecheck);
		} else {
			indisBasecheckDao.merge(indisBasecheck);
		}
		indisBasecheck.setSubIndisBasecheck();
		for (VerifyStandard s : indisBasecheck.getVerifyStandardSet()) {
			if (s.getStandardId() == null) {
				verifyStandardDao.save(s);
			} else {
				verifyStandardDao.merge(s);
			}
		}
	}

	public void delete(Long basecheckId) {
		IndisBasecheck indisBasecheck = indisBasecheckDao.get(basecheckId);
		for (VerifyStandard vs : indisBasecheck.getVerifyStandardSet()) {
			verifyStandardDao.remove(vs);
		}
		indisBasecheckDao.remove(indisBasecheck);
	}

}
