package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.RiskDao;
import com.knight.emms.dao.RiskReportDao;
import com.knight.emms.model.Risk;
import com.knight.emms.model.RiskReport;
import com.knight.emms.service.RiskReportService;
import com.knight.system.service.impl.CodeServiceImpl;

public class RiskReportServiceImpl extends BaseBusinessModelServiceImpl<RiskReport> implements RiskReportService {

	private RiskReportDao riskReportDao;

	@Resource
	private RiskDao riskDao;

	public RiskReportServiceImpl(RiskReportDao dao) {
		super(dao);
		this.riskReportDao = dao;
	}

	public List<RiskReport> queryTranslateAllFull(QueryFilter filter) {
		List<RiskReport> list = riskReportDao.getAll(filter);
		for (RiskReport r : list) {
			CodeServiceImpl.translate(r.getRisk().getEquipment());
		}
		return list;
	}

	public RiskReport getTranslateFull(Long riskReportId) {
		RiskReport r = riskReportDao.get(riskReportId);
		CodeServiceImpl.translate(r.getRisk().getEquipment());
		return r;
	}

	public void saveOrUpdate(RiskReport riskReport) {
		if (riskReport.getRiskReportId() == null) {
			riskReportDao.saveSerialModel(riskReport);
			Risk risk = riskReport.getRisk();
			riskDao.load(risk, risk.getRiskId());
			risk.setRiskReportId(riskReport.getRiskReportId());
			risk.setStatus(Status.HandleResult.processed);
			riskDao.save(risk);
		} else {
			riskReportDao.merge(riskReport);
		}
	}

	public void delete(Long riskReportId) {
		RiskReport r = riskReportDao.get(riskReportId);

		Risk risk = r.getRisk();
		risk.setRiskReportId(null);
		risk.setStatus(Status.HandleResult.untreated);
		riskDao.save(risk);

		riskReportDao.remove(r);
	}

}
