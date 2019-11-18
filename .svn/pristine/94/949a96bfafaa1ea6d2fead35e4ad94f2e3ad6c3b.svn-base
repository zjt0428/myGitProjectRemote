package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.ExitFactoryNoticeDao;
import com.knight.emms.model.ExitFactoryNotice;
import com.knight.emms.service.ExitFactoryEquipService;
import com.knight.emms.service.ExitFactoryNoticeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class ExitFactoryNoticeServiceImpl extends BusinessLongPKServiceImpl<ExitFactoryNotice> implements ExitFactoryNoticeService{

	@Resource
	private ExitFactoryNoticeDao exitFactoryNoticeDao;
	
	@Resource
	private ExitFactoryEquipService exitFactoryEquipService;
	 
	public ExitFactoryNoticeServiceImpl(ExitFactoryNoticeDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	public void saveOrMergeForEdit(ExitFactoryNotice exitFactoryNotice) {
		if(exitFactoryNotice.getExitFactoryNoticeId() == null){
			exitFactoryNoticeDao.save(exitFactoryNotice);
		}
		exitFactoryNotice.setSubExitFactoryNotice();
		exitFactoryEquipService.creatExitFactoryEquip(exitFactoryNotice.getExitFactoryEquipSet(), exitFactoryNotice);
		exitFactoryNoticeDao.merge(exitFactoryNotice);
	}

}
