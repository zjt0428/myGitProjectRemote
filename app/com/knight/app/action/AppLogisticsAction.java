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

import com.knight.app.model.TAppDispatch;
import com.knight.app.model.TAppLogistics;
import com.knight.app.service.TAppDispatchService;
import com.knight.app.service.TAppLogisticsService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.Resource;
import java.util.List;


/**
 * @ClassName: 
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:41:24
 */
public class AppLogisticsAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TAppLogistics tappLogistics;

	@Getter
	@Setter
	private Long logiId;

	@Resource
	private TAppLogisticsService tappLogisticsService;
	
	@Resource
    private FileAttachService fileAttachService;

    @Resource
    private TAppDispatchService tAppDispatchService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());		
		
		List<TAppLogistics> list = tappLogisticsService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		TAppLogistics c = tappLogisticsService.getTranslate(logiId);
		
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "删除盘点信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			tappLogisticsService.remove(new Long(id));
		}
		return SUCCESS;
	}

	public String print(){
		tappLogistics = tappLogisticsService.get(logiId);
		CodeServiceImpl.translate(tappLogistics.getTAppLogisticsCompSet());
		CodeServiceImpl.translate(tappLogistics.getLogisticsTranDistributionSet());
        TAppDispatch dispatch = tAppDispatchService.getTranslate(tappLogistics.getDisid());
        getRequest().setAttribute("dispatch", dispatch);
		return getRequest().getParameter("formpage");
	}
	
}
