
package com.knight.emms.service.impl;


import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.emms.dao.SafetyEducationDao;
import com.knight.emms.model.SafetyEducation;
import com.knight.emms.service.SafetyEducationService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;



/**
 * @ClassName: EquipInsuranceServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class SafetyEducationServiceImpl extends BusinessLongPKServiceImpl<SafetyEducation> implements SafetyEducationService {
	
	@Resource
	private SafetyEducationDao safetyEducationDao;
	
	public SafetyEducationServiceImpl(SafetyEducationDao dao) {
		super(dao);
		this.safetyEducationDao = dao;
	}

	@Override
	public SafetyEducation getTranslateFull(Long safetyId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveOrMergeFor(SafetyEducation t) {
		if(t.getSafetyId() == null) {
			safetyEducationDao.save(t);
		}
		safetyEducationDao.merge(t);
	}

}
