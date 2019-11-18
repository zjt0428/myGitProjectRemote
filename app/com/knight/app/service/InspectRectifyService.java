package com.knight.app.service;

import com.knight.app.model.InspectRectify;
import com.knight.core.service.BaseLongPKService;

public interface InspectRectifyService extends BaseLongPKService<InspectRectify> {
	public void sendSms(String projectName,String BuildingNum,String inspectResult );
}
