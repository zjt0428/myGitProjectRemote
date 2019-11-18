package com.knight.emms.service;

import java.util.List;
import java.util.Map;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.ScrapHandle;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:37:40
* 类说明
*/
public interface ScrapHandleService extends BusinessFlowService<ScrapHandle>,ExportService {

	
	public List<ScrapHandle> queryTranslateAllFull(QueryFilter filter);
	
	public ScrapHandle getTranslateFull(Long scrapId) ;

	public void saveOrUpdate(ScrapHandle ScrapContract);
	
	public void saveCreate(ScrapHandle ScrapContract);
	
	public ScrapHandle getByFilter(Long scrapId,String filterName,Map<String,Object> map);
	
	public List<ScrapHandle> findByFilter(QueryFilter filter,String filterName,Map<String,Object> map);
}
