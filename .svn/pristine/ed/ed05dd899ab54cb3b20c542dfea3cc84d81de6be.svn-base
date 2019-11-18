
package com.knight.emms.service.impl;


import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.emms.dao.InspectProjectRecordDao;
import com.knight.emms.model.InspectProjectRecord;
import com.knight.emms.service.InspectProjectRecordService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;



/**
 * @ClassName: InspectProjectRecordServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class InspectProjectRecordServiceImpl extends BusinessLongPKServiceImpl<InspectProjectRecord> implements InspectProjectRecordService {
	
	@Resource
	private InspectProjectRecordDao inspectProjectRecordDao;
	
	public InspectProjectRecordServiceImpl(InspectProjectRecordDao dao) {
		super(dao);
		this.inspectProjectRecordDao = dao;
	}

	@Override
	public InspectProjectRecord getTranslateFull(Long safetyId) {
		// TODO Auto-generated method stub
		return null;
	}


}
