package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.TruckCranePriceSet;
import com.knight.emms.service.TruckCranePriceSetService;

import lombok.Getter;
import lombok.Setter;

public class TruckCranePriceSetAction extends BaseAction{

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long tcPriceId;
	
	@Getter
	@Setter
	private TruckCranePriceSet truckCranePriceSet;
	
	@Resource
	private TruckCranePriceSetService truckCranePriceSetService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TruckCranePriceSet> list = truckCranePriceSetService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		TruckCranePriceSet tcp = truckCranePriceSetService.getTranslate(tcPriceId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(tcp, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
}
