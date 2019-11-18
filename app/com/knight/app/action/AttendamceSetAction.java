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
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.app.model.AttendamceSet;
import com.knight.app.service.AttendamceSetService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.JsonUtil;
import com.knight.core.web.action.BaseAction;

import flexjson.JSONSerializer;
/**
 * @ClassName: MemoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:41:24
 */
public class AttendamceSetAction extends BaseAction {

	private static final long serialVersionUID = 1L;

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
		
		List<AttendamceSet> list = attendamceSetService.queryTranslateAll(filter);		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "读取考勤设置")
	public String load(){
		JSONSerializer json = JsonUtil.getJSONSerializer(new String[] { "createTime" });
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_state_S_EQ", "1");
		List<AttendamceSet> list = attendamceSetService.queryTranslateAll(filter);
//		AttendamceSet c = new AttendamceSet();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		for(AttendamceSet s : list){
//			c = s;
			sb.append(json.serialize(s)+",");
		}		
		sb = sb.delete(sb.length()-1, sb.length());
		sb.append("]}");
		setJsonString(sb.toString());
//		logger.info(sb.toString());
		return SUCCESS;		
	}
	
	@ActionLog(description = "保存企业档案信息")
	public String save() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		String curDate = format.format(new Date());
		if (attendamceSet!= null) {	
			if(attendamceSet.getSid()!=null){
				AttendamceSet as = attendamceSetService.get(attendamceSet.getSid());
				as.setState("0");
				attendamceSetService.saveOrUpdate(as);				
			}
			attendamceSet.setSid(null);
			attendamceSet.setState("1");
			attendamceSet.setCreateDt(curDate);
			attendamceSetService.saveOrUpdate(attendamceSet);
		}			
		return SUCCESS;
	}

}
