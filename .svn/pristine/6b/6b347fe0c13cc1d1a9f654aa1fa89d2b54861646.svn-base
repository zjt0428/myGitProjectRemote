package com.knight.emms.service.impl;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.CeaseReportDao;
import com.knight.emms.model.CeaseReport;
import com.knight.emms.service.CeaseReportService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:39:56
* 类说明
*/
public class CeaseReportServiceImpl extends BusinessLongPKServiceImpl<CeaseReport> implements CeaseReportService {

	private CeaseReportDao ceaseReportDao;
	
	
	public CeaseReportServiceImpl(CeaseReportDao dao) {
		super(dao);
		this.ceaseReportDao = dao;
	}
	
	public List<CeaseReport> queryTranslateAllFull(QueryFilter filter) {
		List<CeaseReport> list = ceaseReportDao.getAll(filter);
	
		return list;
	}
	
	public CeaseReport getTranslateFull(Long scrapId) {
		CeaseReport r = ceaseReportDao.get(scrapId);
		CodeServiceImpl.translate(r);
		CodeServiceImpl.translate(r.getContractMaterials());
		return r;
	}

	@Override
	public void saveOrUpdate(CeaseReport ceaseReport) {
		if (ceaseReport.getCeaseId() == null) {
			ceaseReportDao.saveSerialModel(ceaseReport);
		}
		ceaseReport.setSubCeaseReport();
		ceaseReportDao.merge(ceaseReport);
	}
	
}
