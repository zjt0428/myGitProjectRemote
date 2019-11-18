package com.knight.app.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.app.dao.InspectRectifyDao;
import com.knight.app.model.InspectRectify;
import com.knight.app.service.InspectRectifyService;
import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

public class InspectRectifyServiceImpl extends BaseLongPKServiceImpl<InspectRectify> implements InspectRectifyService {

	@Resource
	private BusinessMessageService businessMessageService;

	public InspectRectifyServiceImpl(InspectRectifyDao dao) {
		super(dao);
		// TODO Auto-generated constructor stub
	}

	public void sendSms(String projectName,String BuildingNum,String inspectResultName ) {
		BusinessMessage[] bms = new BusinessMessage[3];
		String msg = projectName + ",楼号:"
				+ BuildingNum + "的设备, 巡检结果为" + inspectResultName + ",现已完成整改，请检查核实。";
		AppUser appUser = ApplicationContainer.getCurrentUser();
		List<Map<String, Object>> list = businessMessageService.queryByScript("terminal.get_currentAppPracti",
				appUser.getUserId());
		for (int i = 0; i < 3; i++) {
			bms[i] = new BusinessMessage();
			BusinessMessage bm = bms[i];
			switch (i) {
			case 0:
				bm.setReceiveTel(appUser.getMobile());
				break;
			case 1:
				bm.setReceiveTel((String) list.get(0).get("DUTYMAN_TEL1"));
				break;
			case 2:
				bm.setReceiveTel((String) list.get(0).get("MARKET_TEL"));
				break;
			}
			bm.setMessage(msg);
			bm.setSenderName("安全巡检消息");
			bm.setSendFlag("0");
			bm.setCreateTime(new Date());
			businessMessageService.sendOnce(bm);
		}
	}

}
