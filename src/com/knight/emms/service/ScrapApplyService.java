package com.knight.emms.service;

import java.util.List;
import java.util.Map;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.ScrapApply;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:37:40
* 类说明
*/
public interface ScrapApplyService extends BusinessFlowService<ScrapApply>, ExportService {

	
	public List<ScrapApply> queryTranslateAllFull(QueryFilter filter);
	
	public ScrapApply getTranslateFull(Long scrapId);

	public void saveOrUpdate(ScrapApply scrapApply);
	
	public void saveCreate(ScrapApply scrapApply);
	
	public List<ScrapApply> findByFilter(QueryFilter filter,String filterName,Map<String,Object> map);

	public ScrapApply getByFilter(Long scrapId,String filterName,Map<String,Object> map);

	public void deleteDetail(Long detailId);
}
