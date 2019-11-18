package com.knight.emms.domain;

import java.util.Date;

import javax.annotation.Resource;

import com.knight.app.model.TAppRepair;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;

public class ListenApply4 extends  ListenOverTime<TAppRepair>{

	
	@Resource
	private AppUserService appUserService;
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	@Override
	public void deal() {
		TAppRepair repair=getData();
		// TODO Auto-generated method stub
		send("注意，"+repair.getProjName()+"项目"+repair.getBuildingNum()+"号楼"+repair.getExwSerial()+"设备发生故障申报已经超过4小时未处理",repair.getProcMan());
	}

	private boolean send(String msg,String man){
		String[] dismans=man.split(",");
		for(int i=0;i<dismans.length;i++){
			AppUser appUser = appUserService.get(Long.valueOf(dismans[i]));
			BusinessMessage bm = new BusinessMessage();
			bm.setMessage(msg);
			bm.setReceiveTel(appUser.getMobile());
			bm.setSenderName("系统消息");
			bm.setSendFlag("0");
			bm.setCreateTime(new Date());
			businessMessageService.sendOnce(bm);
		}
		return true;
	}
}
