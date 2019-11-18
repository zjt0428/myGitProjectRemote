
package com.knight.emms.service.impl;

import com.knight.emms.dao.PractiEvaluationDao;
import com.knight.emms.model.PractiEvaluation;
import com.knight.emms.service.PractiEvaluationService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;


/**
 * @ClassName: PractiEvaluationServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class PractiEvaluationServiceImpl extends BusinessLongPKServiceImpl<PractiEvaluation> implements PractiEvaluationService {

	@Resource
	private PractiEvaluationDao practiEvaluationDao;

	public PractiEvaluationServiceImpl(PractiEvaluationDao dao) {
		super(dao);
		this.practiEvaluationDao = dao;
	}

	@Override
	public void saveOrMergeFor(PractiEvaluation t) {
		if(t.getEvaluaId() == null) {
			practiEvaluationDao.save(t);
		}
		practiEvaluationDao.merge(t);
	}
}
