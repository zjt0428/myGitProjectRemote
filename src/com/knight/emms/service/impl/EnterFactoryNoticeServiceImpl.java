package com.knight.emms.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.emms.dao.EnterFactoryNoticeDao;
import com.knight.emms.model.EnterFactoryNotice;
import com.knight.emms.service.EnterFactoryEquipService;
import com.knight.emms.service.EnterFactoryNoticeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class EnterFactoryNoticeServiceImpl extends BusinessLongPKServiceImpl<EnterFactoryNotice> implements EnterFactoryNoticeService{
	
	@Resource
	private EnterFactoryNoticeDao enterFactoryNoticeDao;
	
	@Resource
	private EnterFactoryEquipService enterFactoryEquipService;
	
	
	public EnterFactoryNoticeServiceImpl(EnterFactoryNoticeDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}
	
	public void saveOrMergeForEdit(EnterFactoryNotice enterFactoryNotice) {
		if(enterFactoryNotice.getFactoryNoticeId() == null){
			enterFactoryNoticeDao.save(enterFactoryNotice);
		}
		enterFactoryNotice.setSubEnterFactoryNotice();
		enterFactoryEquipService.creatEnterFactoryEquip(enterFactoryNotice.getEnterFactoryEquipSet(), enterFactoryNotice);
		enterFactoryNoticeDao.merge(enterFactoryNotice);
	}
}
