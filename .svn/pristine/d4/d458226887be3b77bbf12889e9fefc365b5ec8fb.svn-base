package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.TakeStock;

public interface TakeStockService extends BusinessFlowService<TakeStock>{
	
	public List<TakeStock> queryTranslateAllFull(QueryFilter filter);
	
	public TakeStock getTranslateFull(Long takeStockId);
	
	public void saveOrUpdate(TakeStock takeStock);
	
	public void saveCreate(TakeStock takeStock);
	
	public void creatSerial(TakeStock takeStock);
	
	public void deletedDetail(Long baldetailId);
}
