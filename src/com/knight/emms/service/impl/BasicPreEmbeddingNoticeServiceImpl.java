package com.knight.emms.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.emms.dao.BasicPreEmbeddingNoticeDao;
import com.knight.emms.model.BasicPreEmbeddingNotice;
import com.knight.emms.service.BasicPreEmbeddingEquipService;
import com.knight.emms.service.BasicPreEmbeddingNoticeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class BasicPreEmbeddingNoticeServiceImpl extends BusinessLongPKServiceImpl<BasicPreEmbeddingNotice> implements BasicPreEmbeddingNoticeService{

	@Resource
	private BasicPreEmbeddingNoticeDao basicPreEmbeddingNoticeDao;
	
	@Resource
	private BasicPreEmbeddingEquipService basicPreEmbeddingEquipService;
	
	public BasicPreEmbeddingNoticeServiceImpl(BasicPreEmbeddingNoticeDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	public void saveOrMergeForEdit(BasicPreEmbeddingNotice basicPreEmbeddingNotice) {
		if(basicPreEmbeddingNotice.getPreEmbeddingNoticeId() == null){
			basicPreEmbeddingNoticeDao.save(basicPreEmbeddingNotice);
		}
		basicPreEmbeddingNotice.setSubBasicPreEmbeddingNotice(); 
		basicPreEmbeddingEquipService.creatBasicPreEmbeddingEquip(basicPreEmbeddingNotice.getBasicPreEmbeddingEquipSet(), basicPreEmbeddingNotice);
	}
}
