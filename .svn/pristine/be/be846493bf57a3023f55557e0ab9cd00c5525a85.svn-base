/**
 *====================================================
 * 文件名称: ContingencyPlanServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ContingencyPlanDao;
import com.knight.emms.dao.ContingencyWorkerDao;
import com.knight.emms.model.ContingencyPlan;
import com.knight.emms.service.ContingencyPlanService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: ContingencyPlanServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:31:04
 */
public class ContingencyPlanServiceImpl extends BaseBusinessModelServiceImpl<ContingencyPlan> implements ContingencyPlanService {

	private ContingencyPlanDao contingencyPlanDao;

	@Resource
	private ContingencyWorkerDao contingencyWorkerDao;

	public ContingencyPlanServiceImpl(ContingencyPlanDao dao) {
		super(dao);
		this.contingencyPlanDao = dao;
	}

	public List<ContingencyPlan> queryTranslateAllFull(QueryFilter filter) {
		List<ContingencyPlan> list = contingencyPlanDao.getAll(filter);
		for (ContingencyPlan c : list) {
			CodeServiceImpl.translate(c.getEquipment());
		}
		return list;
	}

	public ContingencyPlan getTranslateFull(Long contingencyId) {
		ContingencyPlan c = contingencyPlanDao.get(contingencyId);
		CodeServiceImpl.translate(c.getEquipment());
		return c;
	}

	public void saveOrUpdate(ContingencyPlan contingencyPlan) {
		if (contingencyPlan.getContingencyId() == null) {
			contingencyPlanDao.saveSerialModel(contingencyPlan);
		}
		contingencyPlan.setSubIndisProtocol();
		contingencyPlanDao.merge(contingencyPlan);
	}

	public void deleteWorker(Long workerId) {
		contingencyWorkerDao.remove(workerId);
	}

	public void delete(Long contingencyId) {
		contingencyPlanDao.remove(contingencyId);
	}

}
