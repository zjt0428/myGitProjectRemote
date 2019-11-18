package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.LeasedLostCompensation;

public interface LeasedLostCompensationService extends BusinessFlowService<LeasedLostCompensation> {

	List<LeasedLostCompensation> queryTranslateAllFull(QueryFilter filter);

	LeasedLostCompensation getTranslateFull(Long lostId);

	void delete(Long lostId);

	void deleteDetail(Long detailId);
}
