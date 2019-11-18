package com.knight.emms.service;

import com.knight.emms.model.ExitFactoryNotice;
import com.knight.system.service.BusinessLongPKService;

public interface ExitFactoryNoticeService extends BusinessLongPKService<ExitFactoryNotice>{
	public void saveOrMergeForEdit(ExitFactoryNotice exitFactoryNotice);
}
