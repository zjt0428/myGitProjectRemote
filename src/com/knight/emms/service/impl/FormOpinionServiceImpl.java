package com.knight.emms.service.impl;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.dao.FormOpinionDao;
import com.knight.emms.model.FormOpinion;
import com.knight.emms.service.FormOpinionService;

public class FormOpinionServiceImpl extends BaseLongPKServiceImpl<FormOpinion> implements FormOpinionService{

	public FormOpinionServiceImpl(FormOpinionDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

}
