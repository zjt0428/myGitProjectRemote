package com.knight.emms.service.impl;

import com.knight.core.dao.GenericDao;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.model.DemandDetailForExeuntPlan;
import com.knight.emms.service.DemandDetailForExeuntPlanService;

public class DemandDetailForExeuntPlanServiceImpl extends BaseLongPKServiceImpl<DemandDetailForExeuntPlan> implements DemandDetailForExeuntPlanService {

	public DemandDetailForExeuntPlanServiceImpl(GenericDao<DemandDetailForExeuntPlan, Long> dao) {
		super(dao);
	}

}
