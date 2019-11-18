package com.knight.emms.service.impl;

import com.knight.emms.dao.PumpTruckDao;
import com.knight.emms.model.PumpTruck;
import com.knight.emms.service.PumpTruckService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

public class PumpTruckServiceImpl extends BusinessLongPKServiceImpl<PumpTruck> implements PumpTruckService {

	private PumpTruckDao pumpTruckDao;

	public PumpTruckServiceImpl(PumpTruckDao dao) {
		super(dao);
		this.pumpTruckDao = dao;
	}

	public PumpTruck getTranslateFull(Long carId) {
		PumpTruck c = pumpTruckDao.get(carId);
		CodeServiceImpl.translate(c, getPersistantStruct());
		return c;
	}

}
