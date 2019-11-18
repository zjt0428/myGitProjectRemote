package com.knight.emms.service;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.model.CeaseReport;
import com.knight.emms.model.LeaseBlockUp;
import com.knight.system.service.BusinessLongPKService;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:37:40
* 类说明
*/
public interface LeaseBlockUpService extends BusinessLongPKService<LeaseBlockUp>, ExportService {

	public List<LeaseBlockUp> queryTranslateAllFull(QueryFilter filter);
	
	public LeaseBlockUp getTranslateFull(Long blockId) ;

	public void saveOrUpdate(LeaseBlockUp leaseBlockUp);
	
}
