/**
 *====================================================
 * 文件名称: AccidentReportServiceImpl.java
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
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.AccidentDao;
import com.knight.emms.dao.AccidentReportDao;
import com.knight.emms.model.Accident;
import com.knight.emms.model.AccidentReport;
import com.knight.emms.service.AccidentReportService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: AccidentReportServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:51:14
 */
public class AccidentReportServiceImpl extends BaseBusinessModelServiceImpl<AccidentReport> implements AccidentReportService {

	private AccidentReportDao accidentReportDao;

	@Resource
	private AccidentDao accidentDao;

	public AccidentReportServiceImpl(AccidentReportDao dao) {
		super(dao);
		this.accidentReportDao = dao;
	}

	public List<AccidentReport> queryTranslateAllFull(QueryFilter filter) {
		List<AccidentReport> list = accidentReportDao.getAll(filter);
		for (AccidentReport ar : list) {
			CodeServiceImpl.translate(ar.getAccident(), accidentDao.getPersistantStruct());
			CodeServiceImpl.translate(ar.getAccident().getEquipment());
		}
		return list;
	}

	public AccidentReport getTranslateFull(Long accidentReportId) {
		AccidentReport ar = accidentReportDao.get(accidentReportId);
		CodeServiceImpl.translate(ar.getAccident(), accidentDao.getPersistantStruct());
		CodeServiceImpl.translate(ar.getAccident().getEquipment());
		return ar;
	}

	public void saveOrUpdate(AccidentReport accidentReport) {
		if (accidentReport.getAccidentReportId() == null) {
			accidentReportDao.saveSerialModel(accidentReport);
			Accident a = accidentReport.getAccident();
			accidentDao.load(a, a.getAccidentId());
			a.setAccidentReportId(accidentReport.getAccidentReportId());
			a.setStatus(Status.HandleResult.processed);
			accidentDao.save(a);
		} else {
			accidentReportDao.merge(accidentReport);
		}
	}

	public void delete(Long accidentReportId) {
		AccidentReport ar = accidentReportDao.get(accidentReportId);
		Accident a = ar.getAccident();
		a.setAccidentReportId(null);
		a.setStatus(Status.HandleResult.untreated);
		accidentDao.save(a);

		accidentReportDao.remove(ar);

	}

}
