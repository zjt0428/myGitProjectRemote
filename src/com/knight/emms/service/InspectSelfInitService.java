package com.knight.emms.service;


import com.knight.emms.model.InspectSelfInit;
import com.knight.system.service.BusinessLongPKService;

public interface InspectSelfInitService extends BusinessLongPKService<InspectSelfInit> {
	public void saveOrMerge(InspectSelfInit inspectSelfInit);
}
