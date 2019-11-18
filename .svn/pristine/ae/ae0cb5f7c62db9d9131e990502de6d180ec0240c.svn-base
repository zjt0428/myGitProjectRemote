/**
 *====================================================
 * 文件名称: ContractArrangeServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ExeuntPlanDao;
import com.knight.emms.model.ExeuntPlan;
import com.knight.emms.service.ExeuntPlanService;

/**
 * 
 * @author lbf
 *
 */
public class ExeuntPlanServiceImpl extends BusinessFlowServiceImpl<ExeuntPlan> implements ExeuntPlanService {

	private ExeuntPlanDao exeuntPlanDao;
	
	public ExeuntPlanServiceImpl(ExeuntPlanDao dao) {
		super(dao);
		this.exeuntPlanDao = dao;
	}
	@Override
	public void saveOrMergeForEdit(ExeuntPlan exeuntPlan) {
		if (exeuntPlan.getExeuntPlanId() == null) {
			super.saveSerialModel(exeuntPlan);
		}
		exeuntPlan.setDemandDetail();
		exeuntPlanDao.merge(exeuntPlan);
	}
}
