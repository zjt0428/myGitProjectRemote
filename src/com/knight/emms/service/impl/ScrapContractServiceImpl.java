package com.knight.emms.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.app.model.TFlowNode;
import com.knight.app.service.TFlowNodeService;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ScrapContractDao;
import com.knight.emms.dao.TFlowDefineReviewDao;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.ScrapContract;
import com.knight.emms.model.TFlowDefineReview;
import com.knight.emms.service.ScrapContractService;
import com.knight.emms.service.TFlowDefineReviewService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:39:56
* 类说明
*/
public class ScrapContractServiceImpl extends BusinessFlowServiceImpl<ScrapContract> implements ScrapContractService {


	public ScrapContractServiceImpl(ScrapContractDao dao) {
		super(dao);
		this.scrapContractDao = dao;
	}

	private ScrapContractDao scrapContractDao;
	
	@Resource
	private TFlowDefineReviewDao tFlowDefineDao;
	
	@Resource
	private TFlowDefineReviewService tFlowDefineReviewService;
	
	@Resource
	private TFlowNodeService tFlowNodeService;
	
	
	public List<ScrapContract> queryTranslateAllFull(QueryFilter filter) {
		List<ScrapContract> list = scrapContractDao.getAll(filter);
		return list;
	}
	
	public ScrapContract getTranslateFull(Long scrapId) {
		ScrapContract r = scrapContractDao.get(scrapId);
		return r;
	}

	@Override
	public void saveOrUpdate(ScrapContract scrapContract) {
		if(scrapContract.getContractId()==null){
			String seq = scrapContractDao.createNextSerial(scrapContract);
			scrapContract.setContractSerial(seq);
			scrapContractDao.save(scrapContract);
		}else{
			scrapContractDao.merge(scrapContract);
		}
		scrapContractDao.save(scrapContract);
		
	}
	

	@Override
	public void saveCreate(ScrapContract scrapContract) {
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_flowId_L_EQ", "7");
		
		scrapContract.setSubScrapContract();
		if(scrapContract.getContractId()==null){
			String seq = scrapContractDao.createNextSerial(scrapContract);
			scrapContract.setContractSerial(seq);
			scrapContractDao.save(scrapContract);
			List<TFlowNode> fn = tFlowNodeService.getAll(filter);
			if(fn.size()>0){
				for(TFlowNode tfn : fn){
					TFlowDefineReview flowDef = new TFlowDefineReview();
					flowDef.setFlowId(tfn.getFlowId());
					flowDef.setRelateId(scrapContract.getContractId());
					flowDef.setRelateModule(Constant.SCRAP_CONTRACT);
					flowDef.setNid(tfn.getNid());
					flowDef.setSeq(tfn.getSeq());
					flowDef.setState(Constant.DISENABLED);
					tFlowDefineReviewService.save(flowDef);
				}
			}
		}else{
			scrapContractDao.merge(scrapContract);
		}
		
	}

	@Override
	public void saveOrMergeForEdit(ScrapContract t) {
		// TODO Auto-generated method stub
		
	}

	 //审批完成后
	public void passApproveApplication(FormApprove formApprove) {
		ScrapContract cl = super.passFlowApproveApplication(formApprove);
		scrapContractDao.merge(cl);
		}
	
	protected ScrapContract passFlowAcceptApplication(FormAccept formAccept) {
		ScrapContract cl = super.passFlowAcceptApplication(formAccept);
		return cl;
	}
	
	public ScrapContract getByFilter(Long contractId,String filterName,Map<String,Object> map){
		ScrapContract sc = scrapContractDao.getByFilter(contractId, filterName,map);
		CodeServiceImpl.translate(sc);
		return sc;
	}

	public List<ScrapContract> findByFilter(QueryFilter filter,String filterName,Map<String,Object> map){
		return scrapContractDao.findByFilter(filter, filterName,map);
	}
}
