package com.knight.emms.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ScrapApplyDao;
import com.knight.emms.dao.ScrapDetailDao;
import com.knight.emms.model.ScrapApply;
import com.knight.emms.service.ScrapApplyService;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:39:56
* 类说明
*/
public class ScrapApplyServiceImpl extends BusinessFlowServiceImpl<ScrapApply> implements ScrapApplyService {

	private ScrapApplyDao scrapApplyDao;
	
	@Resource
	private ScrapDetailDao scrapDetailDao;
	
	
	public ScrapApplyServiceImpl(ScrapApplyDao dao) {
		super(dao);
		this.scrapApplyDao = dao;
	}

	
	
	
	public List<ScrapApply> queryTranslateAllFull(QueryFilter filter) {
		List<ScrapApply> list = scrapApplyDao.getAll(filter);
		return list;
	}
	
	public ScrapApply getTranslateFull(Long scrapId) {
		ScrapApply r = scrapApplyDao.get(scrapId);
		return r;
	}

	@Override
	public void saveOrUpdate(ScrapApply scrapApply) {
		
		scrapApplyDao.save(scrapApply);
		
	}
	
	public void saveCreate(ScrapApply scrapApply) {
		scrapApply.setSubScrapApply();
		if(scrapApply.getScrapId()==null){
			String seq = scrapApplyDao.createNextSerial(scrapApply);
			scrapApply.setScrapSerial(seq);
			scrapApplyDao.save(scrapApply);
		}else{
			scrapApplyDao.merge(scrapApply);
		}
		
	}




	@Override
	public void saveOrMergeForEdit(ScrapApply t) {
		// TODO Auto-generated method stub
		
	}
	
	public List<ScrapApply> findByFilter(QueryFilter filter,String filterName,Map<String,Object> map){
		return scrapApplyDao.findByFilter(filter, filterName,map);
	}
	
	public ScrapApply getByFilter(Long scrapId,String filterName,Map<String,Object> map){
		return scrapApplyDao.getByFilter(scrapId, filterName,map);
	}




	@Override
	public void deleteDetail(Long detailId) {
		scrapDetailDao.remove(detailId);
	}
}
