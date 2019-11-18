/**
 *====================================================
 * 文件名称: SideStationAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017-7-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.SideStation;
import com.knight.emms.service.SideStationService;

/**
 * @ClassName: SideStationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author KI·C
 * @date 2017-7-2 上午10:43:40
 */
public class SideStationAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long stationId;

	@Getter
	@Setter
	private SideStation sideStation;
	
	@Resource
	private SideStationService sideStationService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SideStation> list = sideStationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;	
	}
	
	public String load() {
		SideStation s = sideStationService.get(stationId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(s, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新旁站信息")
	public String save() {
		if(sideStation.getStationId() == null) {
			sideStationService.saveSerialModel(sideStation);
		}
		else {
			SideStation s = sideStationService.get(sideStation.getStationId());
			sideStation.setStationSerial(s.getStationSerial());
		}
		sideStationService.merge(sideStation);
		return SUCCESS;	
	}
	
	@ActionLog(description = "删除旁站信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			sideStationService.remove(new Long(id));
		}
		return SUCCESS;	
	}
}
