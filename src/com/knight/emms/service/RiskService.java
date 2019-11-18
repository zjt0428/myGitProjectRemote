package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.Risk;

public interface RiskService extends BaseBusinessModelService<Risk> {

	public Risk getTranslateFull(Long riskId);

	public List<Risk> queryTranslateAllFull(QueryFilter filter);

	public void delete(Long riskId);

}
