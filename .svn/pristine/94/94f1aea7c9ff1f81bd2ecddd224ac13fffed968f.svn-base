/**
 *====================================================
 * 文件名称: AccidentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.AccidentDao;
import com.knight.emms.dao.AccidentReportDao;
import com.knight.emms.model.Accident;
import com.knight.emms.service.AccidentService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: AccidentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:49:18
 */
public class AccidentServiceImpl extends BaseBusinessModelServiceImpl<Accident> implements AccidentService {

	private AccidentDao accidentDao;

	@Resource
	private AccidentReportDao accidentReportDao;

	public AccidentServiceImpl(AccidentDao dao) {
		super(dao);
		this.accidentDao = dao;
	}

	public List<Accident> queryTranslateAllFull(QueryFilter filter) {
		List<Accident> list = accidentDao.getAll(filter);
		for (Accident r : list) {
			CodeServiceImpl.translate(r, getPersistantStruct());
			CodeServiceImpl.translate(r.getEquipment());
		}
		return list;
	}

	public Accident getTranslateFull(Long accidentId) {
		Accident r = accidentDao.get(accidentId);
		CodeServiceImpl.translate(r, getPersistantStruct());
		CodeServiceImpl.translate(r.getEquipment());
		return r;
	}

	public void delete(Long accidentId) {
		Accident r = accidentDao.get(accidentId);
		if (r.getAccidentReportId() != null) {
			accidentReportDao.remove(r.getAccidentReportId());
		}
		accidentDao.remove(r);
	}

}
