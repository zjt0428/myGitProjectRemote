/**
 *====================================================
 * 文件名称: PurchasePlanServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016-12-6			liupj(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.dao.GenericDao;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.PurchasePlanDao;
import com.knight.emms.dao.PurchasePlanInquiryDao;
import com.knight.emms.model.*;
import com.knight.emms.service.*;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;
/**
 * @ClassName: PurchasePlanServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author liupj
 * @date 2016-12-6 
 */
public class PurchasePlanServiceImpl extends BusinessLongPKServiceImpl<PurchasePlan> implements PurchasePlanService{

	public PurchasePlanServiceImpl(GenericDao<PurchasePlan, Long> dao) {
		super(dao);
	}


	@Resource
	private PurchasePlanDao purchasePlanDao;
	
	@Resource
	private PurchasePlanInquiryDao purchasePlanInquiryDao;
	
	public void deletedInquiry(Long PlanId) {
		purchasePlanInquiryDao.remove(PlanId);
	}
	
	public void saveOrMergeForEdit(PurchasePlan purchasePlan) {
		purchasePlan.setSubPurchasePlan();
		if (purchasePlan.getPurchasePlanId() == null) {
			purchasePlanDao.save(purchasePlan);
		} else {
			purchasePlanDao.merge(purchasePlan);
		}

	}
	@Override
	public PurchasePlan getTranslateFull(Long purchasePlanId) {
		PurchasePlan p= purchasePlanDao.get(purchasePlanId);
		CodeServiceImpl.translate(p, getPersistantStruct());
		if(p.getPurchasePlanInquirySet()!=null){
			for (PurchasePlanInquiry pu : p.getPurchasePlanInquirySet()) {
				CodeServiceImpl.translate(pu, purchasePlanInquiryDao.getPersistantStruct());
			}
		}
		return p;
	}
	@Override
	public List<PurchasePlanInquiry> queryInquiryAll(QueryFilter filter) {
		filter.getPagingBean().setPageSize(1000);
		List<PurchasePlanInquiry> Inquiry = purchasePlanInquiryDao.getAll(filter);
		return Inquiry;
	}
	

	public List<PurchasePlan> queryTranslateAll(QueryFilter queryFilter) {
		List<PurchasePlan> list = purchasePlanDao.getAll(queryFilter);
		for(PurchasePlan p :list){
			if(p.getApplyforState()=="0"){
				
			}else if(p.getApplyforState()=="1"){
				
			}else if(p.getApplyforState()=="2"){
				
			}else if(p.getApplyforState()=="3"){
				
			}else if(p.getApplyforState()=="4"){
				
			}
		}
		return list;
	}
}
