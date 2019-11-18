package com.knight.emms.service;

import com.knight.core.service.BaseLongPKService;
import com.knight.emms.model.PractiInsuranceClaimRecord;

public interface PractiInsuranceClaimRecordService extends BaseLongPKService<PractiInsuranceClaimRecord> {

	public void saveOrMergeFor(PractiInsuranceClaimRecord t);
}

