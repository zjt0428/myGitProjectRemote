package com.knight.emms.service.impl;

import java.util.Set;

import javax.annotation.Resource;

import com.knight.emms.dao.ExitFactoryEquipDao;
import com.knight.emms.model.ExitFactoryEquip;
import com.knight.emms.model.ExitFactoryNotice;
import com.knight.emms.service.ExitFactoryEquipService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class ExitFactoryEquipServiceImpl extends BusinessLongPKServiceImpl<ExitFactoryEquip> implements ExitFactoryEquipService{

	@Resource
	private ExitFactoryEquipDao exitFactoryEquipDao;
	
	public ExitFactoryEquipServiceImpl(ExitFactoryEquipDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	public void creatExitFactoryEquip(Set<ExitFactoryEquip> exitFactoryEquipset, ExitFactoryNotice exitFactoryNotice) {
		if(exitFactoryEquipset == null){
			return;
		}
		for(ExitFactoryEquip exitFactoryEquip : exitFactoryEquipset){
			exitFactoryEquip.setExitFactoryNoticeId(exitFactoryNotice.getExitFactoryNoticeId());
			exitFactoryEquipDao.save(exitFactoryEquip);
		}
	}

}
