package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.RiskDao;
import com.knight.emms.dao.RiskReportDao;
import com.knight.emms.model.Risk;
import com.knight.emms.service.RiskService;
import com.knight.system.service.impl.CodeServiceImpl;

public class RiskServiceImpl extends BaseBusinessModelServiceImpl<Risk> implements RiskService {

	private RiskDao riskDao;

	@Resource
	private RiskReportDao riskReportDao;

	public RiskServiceImpl(RiskDao dao) {
		super(dao);
		this.riskDao = dao;
	}

	public List<Risk> queryTranslateAllFull(QueryFilter filter) {
		List<Risk> list = riskDao.getAll(filter);
		for (Risk r : list) {
			CodeServiceImpl.translate(r.getEquipment());
		}
		return list;
	}

	public Risk getTranslateFull(Long riskId) {
		Risk r = riskDao.get(riskId);
		CodeServiceImpl.translate(r.getEquipment());
		return r;
	}

	public void delete(Long riskId) {
		Risk r = riskDao.get(riskId);
		if (r.getRiskReportId() != null) {
			riskReportDao.remove(r.getRiskReportId());
		}
		riskDao.remove(r);
	}

}
