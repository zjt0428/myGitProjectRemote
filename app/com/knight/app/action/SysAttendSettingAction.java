/**
 *====================================================
 * 文件名称: attendamceAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.app.model.AttendamceSet;
import com.knight.app.model.TAppRepair;
import com.knight.app.service.AttendamceSetService;
import com.knight.app.service.TAppRepairComponService;
import com.knight.app.service.TAppRepairService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.JsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.service.FileAttachService;

import flexjson.JSONSerializer;


/**
 * @ClassName: MemoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:41:24
 */
public class SysAttendSettingAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TAppRepair repair;

	@Getter
	@Setter
	private Long repid;

	@Resource
	private TAppRepairService repairService;
	
	@Resource
	private TAppRepairComponService repairComponServic;
	
	@Resource
	private FileAttachService fileAttachService;
	
	@Getter
	@Setter
	private AttendamceSet attendamceSet;

	@Getter
	@Setter
	private Long sid;
	@Resource
	private AttendamceSetService attendamceSetService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());		
		
		List<TAppRepair> list = repairService.queryTranslateAll(filter);		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {		
		AttendamceSet c = attendamceSetService.getTranslate(sid);
		JSONSerializer json = JsonUtil.getJSONSerializer(new String[] { "createTime" });		
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1，data:[");
		sb.append(json.serialize(c));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS; 
	}

/*	@Action(description = "保存或更新工作备忘")
	public String save() {
		String type = this.getRequest().getParameter("TYPE");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		String curDate = format.format(new Date());
		Long userId = ApplicationContainer.getCurrentUserId();
		
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_sgDate_S_EQ", curDate.substring(0, 10));
		filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(userId));
		List<TFlowInstance> list = flowInsService.queryTranslateAll(filter);
		
		if(list!=null && list.size()>0){
			TFlowInstance att = (TFlowInstance)list.get(0);
			if(type!=null&&"1".equals(type)){				
				att.setSginTime(curDate.substring(11));
			}else if(type!=null &&"2".equals(type)){
				att.setSgouTime(curDate.substring(11));
			}
			flowInsService.saveOrUpdate(att);
			
		}else{			
			TFlowInstance att = new TFlowInstance();
			att.setSgDate(curDate.substring(0, 10));
			if(type!=null&&"1".equals(type)){				
				att.setSginTime(curDate.substring(11));
			}else if(type!=null &&"2".equals(type)){
				att.setSgouTime(curDate.substring(11));
			}
			att.setUserId(userId);
			att.setCreateDt(curDate);
			flowInsService.save(att);
		}
		return SUCCESS;
	}*/
}
