package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.RecycleManage;

public interface RecycleManageService extends BusinessFlowService<RecycleManage>,ExportService {

	public List<RecycleManage> queryTranslateAllFull(QueryFilter filter);

	public RecycleManage getTranslateFull(Long lostId);

	public void delete(Long lostId);

	public void deleteDetail(Long detailId);

	public void deleteFee(Long feeId);
	
	public void deleteDamage(Long compensationId);
	
	public void delTemporaryStorage(Long compensationId);
}
