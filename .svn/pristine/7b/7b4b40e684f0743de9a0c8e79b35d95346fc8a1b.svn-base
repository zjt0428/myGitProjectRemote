package com.knight.emms.service.impl;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.dao.PractiInsuranceClaimRecordDao;
import com.knight.emms.model.PractiInsuranceClaimRecord;
import com.knight.emms.service.PractiInsuranceClaimRecordService;
public class PractiInsuranceClaimRecordServiceImpl extends BaseLongPKServiceImpl<PractiInsuranceClaimRecord> implements PractiInsuranceClaimRecordService {
	
	private PractiInsuranceClaimRecordDao practiInsuranceClaimDao;
	
	public PractiInsuranceClaimRecordServiceImpl(PractiInsuranceClaimRecordDao dao) {
		super(dao);
		this.practiInsuranceClaimDao = dao;
	}

	@Override
	public void saveOrMergeFor(PractiInsuranceClaimRecord t) {
		if(t.getInsureId() == null) {
			practiInsuranceClaimDao.save(t);
		}
		practiInsuranceClaimDao.merge(t);
		
	}
}
