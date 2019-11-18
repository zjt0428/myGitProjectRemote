package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.OtherBets;

public interface OtherBetsService extends BusinessFlowService<OtherBets> {

	public List<OtherBets> queryTranslateAllFull(QueryFilter filter);

	public OtherBets getTranslateFull(Long otherBetsId);

	public void delete(Long otherBetsId);
	
	public void deleteDetail(Long detailId);
}
