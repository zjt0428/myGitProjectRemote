package com.knight.emms.service;

import com.knight.emms.model.BasicPreEmbeddingNotice;
import com.knight.system.service.BusinessLongPKService;

public interface BasicPreEmbeddingNoticeService extends BusinessLongPKService<BasicPreEmbeddingNotice>{
	public void saveOrMergeForEdit(BasicPreEmbeddingNotice basicPreEmbeddingNotice);
}
