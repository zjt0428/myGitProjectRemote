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

import java.lang.reflect.ParameterizedType;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.model.ExportStruct;
import com.knight.core.service.ExportService;
import com.knight.core.support.ExcelSupport;
import com.knight.core.util.DateUtil;
import lombok.Getter;
import lombok.Setter;

import com.knight.app.model.Attendamce;
import com.knight.app.service.AttendamceLocationService;
import com.knight.app.service.AttendamceService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.model.Customer;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.EquipmentService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.CodeService;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;


/**
 * @ClassName: MemoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:41:24
 */
public class AttendamceAction extends ExportBaseAction<Attendamce> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Attendamce attendamce;

	@Getter
	@Setter
	private Long aid;

	@Resource
	private AttendamceService attendamceService;
	@Resource
	private AttendamceLocationService attLocationService;

	@Resource
	private EquipmentService equipmentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Attendamce> list = attendamceService.queryTranslateAll(filter);
		for(Attendamce a : list){
			Equipment c = equipmentService.getTranslateFull(a.getEquipId());
			a.setEquipment(c);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Attendamce c = attendamceService.getTranslate(aid);
		
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String print() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Attendamce> list = attendamceService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return "print";
	}

	@ActionLog(description = "保存或更新工作备忘")
	public String save() {
		String type = this.getRequest().getParameter("TYPE");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curDate = format.format(new Date());
		Long userId = ApplicationContainer.getCurrentUserId();
		
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_sgDate_D_EQ", curDate.substring(0, 10));
		filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(userId));
		List<Attendamce> list = attendamceService.queryTranslateAll(filter);
		
		if(list!=null && list.size()>0){
			Attendamce att = (Attendamce)list.get(0);
			if(type!=null&&"1".equals(type)){
				if(att.getSginTime()==null || "".equals(att.getSginTime())){
					att.setSgSum(att.getSgSum()+1);
				}				
				att.setSginTime(curDate.substring(11));
			}else if(type!=null &&"2".equals(type)){
				if(att.getSgouTime() == null || "".equals(att.getSgouTime())){
					att.setSgSum(att.getSgSum()+1);
				}
				att.setSgouTime(curDate.substring(11));
			}
			attendamceService.saveOrUpdate(att);
			
		}else{			
			Attendamce att = new Attendamce();
			att.setSgDate(new Date());
			if(type!=null&&"1".equals(type)){				
				att.setSginTime(curDate.substring(11));
			}else if(type!=null &&"2".equals(type)){
				att.setSgouTime(curDate.substring(11));
			}
			att.setSgSum(new Long(1));
			att.setSgWeekday(this.getWeekOfDate(new Date()));
			att.setUserId(userId);
			att.setCreateDt(curDate);
			attendamceService.save(att);
		}
		return SUCCESS;
	}
	
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"sun","mon","tue","web","thu","fri","sat"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);

        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0){
            w = 0;
        }

        return weekDays[w];
    }

    /**强制签退*/
    public String addSignOut(){
    	String[] ids = getRequest().getParameterValues("ids");
    	String time = DateUtil.getCurrentLinkTimeStr().substring(11, 19);
    	for(String id : ids){
    		Attendamce a = attendamceService.get(new Long(id));
    		a.setSgouTime(time);
    		a.setSgouLocation(a.getSginLocation());
    		attendamceService.update(a);
    	}
    	return SUCCESS;
    }
}
