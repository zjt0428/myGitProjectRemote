package com.knight.emms.service.impl;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.dao.EquipInsuranceClaimDao;
import com.knight.emms.model.EquipInsuranceClaimRecord;
import com.knight.emms.service.EquipInsuranceClaimService;
public class EquipInsuranceClaimServiceImpl extends BaseLongPKServiceImpl<EquipInsuranceClaimRecord> implements EquipInsuranceClaimService {
	
	private EquipInsuranceClaimDao equipInsuranceClaimDao;
	
	public EquipInsuranceClaimServiceImpl(EquipInsuranceClaimDao dao) {
		super(dao);
		this.equipInsuranceClaimDao = dao;
	}
}
