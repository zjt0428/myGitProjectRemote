/**
 *====================================================
 * 文件名称: InspectManageServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月31日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.app.core.service.impl.RemindModuleServiceImpl;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.dao.InspectManageDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.InspectManage;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.InspectManageService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: InspectManageServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月31日 下午9:15:36
 */
public class InspectManageServiceImpl extends RemindModuleServiceImpl<InspectManage> implements InspectManageService {
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	public InspectManageServiceImpl(InspectManageDao dao) {
		super(dao);
	}
	
	public void saveOrMergeForEdit(InspectManage inspectManage){
		save(inspectManage); 
		CodeServiceImpl.translate(inspectManage);
		if("1".equals(inspectManage.getRectification())){
			BusinessMessage[] bms = new BusinessMessage[3];
			String msg = inspectManage.getProjectName()+",楼号:"+inspectManage.getBuildingNum()+"的设备, 巡检结果为"+inspectManage.getInspectResultName()+",现需要整改，请监督落实。";
			AppUser appUser = ApplicationContainer.getCurrentUser();
			List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppPracti", appUser.getUserId());
			for(int i = 0;i<3;i++){
				bms[i] = new BusinessMessage();
				BusinessMessage bm = bms[i];
				switch(i){
					case 0:
						bm.setReceiveTel(appUser.getMobile());
						break;
					case 1:
						bm.setReceiveTel((String)list.get(0).get("DUTYMAN_TEL1"));
						break;
					case 2:
						bm.setReceiveTel((String)list.get(0).get("MARKET_TEL"));
						break;
				}
				bm.setMessage(msg);
				bm.setSenderName("安全巡检消息");
				businessMessageService.sendOnce(bm);
			}
		}
	}

}
