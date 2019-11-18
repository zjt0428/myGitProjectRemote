package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.LostCompensation;

public interface LostCompensationService extends BusinessFlowService<LostCompensation> {

	public List<LostCompensation> queryTranslateAllFull(QueryFilter filter);

	public LostCompensation getTranslateFull(Long lostId);

	public void delete(Long lostId);

	public void deleteDetail(Long detailId);
}
