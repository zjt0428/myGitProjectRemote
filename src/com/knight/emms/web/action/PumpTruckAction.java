package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.PumpTruck;
import com.knight.emms.service.PumpTruckService;

import lombok.Getter;
import lombok.Setter;

public class PumpTruckAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private PumpTruck pumpTruck;

	@Getter
	@Setter
	private Long pumpId;

	@Resource
	private PumpTruckService pumpTruckService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PumpTruck> list = pumpTruckService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "保存泵车档案")
	public String save() {
		if (pumpTruck.getPumpId()== null) {
			pumpTruck.setDelFlag(Constant.ENABLED);
			pumpTruckService.save(pumpTruck);
			setFileAttach(pumpTruck.getPumpId());
		} else {
			PumpTruck pt = pumpTruckService.get(pumpTruck.getPumpId());
			pumpTruck.setDelFlag(pt.getDelFlag());
		}
		pumpTruckService.merge(pumpTruck);
		return SUCCESS;
	}

	@ActionLog(description = "加载泵车档案")
	public String load() {
		PumpTruck pt = pumpTruckService.getTranslateFull(pumpId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(pt, GsonUtil.SINCE_VERSION_20, DateUtil.LINK_DISPLAY_DATE, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "删除泵车档案")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PumpTruck pt = pumpTruckService.get(new Long(id));
			pt.setDelFlag(Constant.DISENABLED);
			pumpTruckService.save(pt);
		}
		return SUCCESS;
	}

}
