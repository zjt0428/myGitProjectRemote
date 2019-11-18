package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.OtherLeaseBusiness;

public interface OtherLeaseBusinessService extends BusinessFlowService<OtherLeaseBusiness> {

	List<OtherLeaseBusiness> queryTranslateAllFull(QueryFilter filter);

	OtherLeaseBusiness getTranslateFull(Long otherId);

	void delete(Long otherId);

	void deleteDetail(Long detailId);
}
