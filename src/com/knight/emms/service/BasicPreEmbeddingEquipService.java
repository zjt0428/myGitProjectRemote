package com.knight.emms.service;

import java.util.Set;

import com.knight.emms.model.BasicPreEmbeddingEquip;
import com.knight.emms.model.BasicPreEmbeddingNotice;
import com.knight.system.service.BusinessLongPKService;

public interface BasicPreEmbeddingEquipService extends BusinessLongPKService<BasicPreEmbeddingEquip>{
	public void creatBasicPreEmbeddingEquip(Set<BasicPreEmbeddingEquip> basicPreEmbeddingEquipSet , BasicPreEmbeddingNotice basicPreEmbeddingNotice);

}
