package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.OtherBusiness;

public interface OtherBusinessService extends BusinessFlowService<OtherBusiness> {

	public List<OtherBusiness> queryTranslateAllFull(QueryFilter filter);

	public OtherBusiness getTranslateFull(Long otherBusinessId);

	public void delete(Long otherBusinessId);

	public void deleteDetail(Long detailId);
}
