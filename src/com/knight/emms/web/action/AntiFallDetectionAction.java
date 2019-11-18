/**
 *====================================================
 * 文件名称: AccidentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月1日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.model.AntiFallDetection;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.AntiFallDetectionService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.system.application.ApplicationContainer;


/**
 * @ClassName: AccidentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月1日 下午5:50:21
 */
public class AntiFallDetectionAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AntiFallDetection antiFallDetection;

	@Getter
	@Setter
	private Long antiFallId;
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private AntiFallDetectionService antiFallDetectionService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AntiFallDetection> list = antiFallDetectionService.queryTranslateAllFull(filter);
		for(int i=0;i<list.size();i++){
			AntiFallDetection anti = list.get(i);
			if((anti.getEndDate()).before(DateUtil.getCurrentDate())){
				anti.setStatus("0");
				antiFallDetectionService.merge(anti);
			}			
		}
		List<AntiFallDetection> listtd = antiFallDetectionService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(listtd));
		buff.append("}");
		this.jsonString = buff.toString();
		
/*		List<Map<String, Object>> inspectList = antiFallDetectionService.queryByScript("remaind.antiFallDate");
		for(Map<String, Object> inspect:inspectList){
				List<Map<String,Object>> listr = corpInfoService.queryByScript("terminal.get_currentAntiFallAppUser", (Long)inspect.get("userId"));
				BusinessMessage bm = new BusinessMessage();
				String msg = "您的"+inspect.get("antiFallNum")+"编号的防坠器将于"+inspect.get("endDate")+"到达检测有效日期，请提前做好相关准备工作！";
				bm.setMessage(msg);
				if(listr.get(0).get("SECURITY_TEL")!=null){
				bm.setReceiveTel((String)listr.get(0).get("SECURITY_TEL"));
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				//businessMessageDao.save(bm);
				businessMessageService.sendOnce(bm);
				}
		}*/
	
		
		return SUCCESS;
	}

	public String load() {
		AntiFallDetection c =antiFallDetectionService.getTranslateFull(antiFallId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新事故信息")
	public String save() {
		if (antiFallDetection.getAntiFallId() == null) {
			//antiFallDetection.setStatus(Status.Archives.enabled);
			antiFallDetection.setDelFlag(Constant.ENABLED);
			antiFallDetectionService.saveOrUpdate(antiFallDetection);
		} else {
			AntiFallDetection a = antiFallDetectionService.get(antiFallDetection.getAntiFallId());
			antiFallDetection.setDelFlag(a.getDelFlag());
			//antiFallDetection.setStatus(a.getStatus());
			antiFallDetectionService.merge(antiFallDetection);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除事故信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			//antiFallDetectionService.delete(new Long(id));
			AntiFallDetection c =antiFallDetectionService.getTranslateFull((long)(Integer.parseInt(id)));
			c.setDelFlag(Constant.DISENABLED);
			antiFallDetectionService.merge(c);
		}
		return SUCCESS;
	}
}
