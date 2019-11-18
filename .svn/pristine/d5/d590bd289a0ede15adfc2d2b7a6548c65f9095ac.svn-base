package com.knight.emms.service.impl;

import java.util.Set;

import javax.annotation.Resource;

import com.knight.emms.dao.EnterFactoryEquipDao;
import com.knight.emms.model.EnterFactoryEquip;
import com.knight.emms.model.EnterFactoryNotice;
import com.knight.emms.service.EnterFactoryEquipService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class EnterFactoryEquipServiceImpl extends BusinessLongPKServiceImpl<EnterFactoryEquip> implements EnterFactoryEquipService{
	@Resource
	private EnterFactoryEquipDao enterFactoryEquipDao;

	public EnterFactoryEquipServiceImpl(EnterFactoryEquipDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	public void creatEnterFactoryEquip(Set<EnterFactoryEquip> enterFactoryEquipSet , EnterFactoryNotice enterFactoryNotice){
		if(enterFactoryEquipSet == null){
			return;
		}
		for(EnterFactoryEquip enterFactoryEquip : enterFactoryEquipSet){
			enterFactoryEquip.setFactoryNoticeId(enterFactoryNotice.getFactoryNoticeId());
			enterFactoryEquipDao.save(enterFactoryEquip);
		}
	}
}
