package com.knight.emms.service.impl;

import java.util.Set;

import javax.annotation.Resource;

import com.knight.emms.dao.BasicPreEmbeddingEquipDao;
import com.knight.emms.model.BasicPreEmbeddingEquip;
import com.knight.emms.model.BasicPreEmbeddingNotice;
import com.knight.emms.service.BasicPreEmbeddingEquipService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class BasicPreEmbeddingEquipServiceImpl extends BusinessLongPKServiceImpl<BasicPreEmbeddingEquip> implements BasicPreEmbeddingEquipService{
	@Resource
	private BasicPreEmbeddingEquipDao basicPreEmbeddingEquipDao;

	public BasicPreEmbeddingEquipServiceImpl(BasicPreEmbeddingEquipDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	public void creatBasicPreEmbeddingEquip(Set<BasicPreEmbeddingEquip> basicPreEmbeddingEquipSet , BasicPreEmbeddingNotice basicPreEmbeddingNotice){
		if(basicPreEmbeddingEquipSet == null){
			return;
		}
		for(BasicPreEmbeddingEquip basicPreEmbeddingEquip : basicPreEmbeddingEquipSet){
			basicPreEmbeddingEquip.setPreEmbeddingNoticeId(basicPreEmbeddingNotice.getPreEmbeddingNoticeId()); 
			basicPreEmbeddingEquipDao.save(basicPreEmbeddingEquip);
		}
	}
}
