package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.RiskReport;

public interface RiskReportService extends BaseBusinessModelService<RiskReport> {

	public List<RiskReport> queryTranslateAllFull(QueryFilter filter);

	public RiskReport getTranslateFull(Long riskReportId);

	public void saveOrUpdate(RiskReport riskReport);

	public void delete(Long riskReportId);

}
