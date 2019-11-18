package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.MaterialsStore;
import com.knight.emms.service.MaterialsStoreService;

import lombok.Getter;
import lombok.Setter;

public class MaterialsStoreAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long storeId;
	
	@Resource
	private MaterialsStoreService materialsStoreService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsStore> list = materialsStoreService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.materialsStoreStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		MaterialsStore m = materialsStoreService.get(storeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	//根据选择时间获取基地库存
		public String getStoreBySelectedDate() {
			String selectedDate = getRequest().getParameter("selectedDate");
			String depotId = getRequest().getParameter("depotId");
			String locationId = getRequest().getParameter("locationId");
			selectedDate = DateUtil.changeObj2DateStr(selectedDate, DateUtil.LINK_DISPLAY_DATE);
			String start = getRequest().getParameter("start");
			String limit = getRequest().getParameter("limit");
			String commodity = getRequest().getParameter("commodity");
			String specifications = getRequest().getParameter("specifications");
			
			List<Map<String,Object>> list = materialsStoreService.queryByScript("materials.query_materials_store_by_selectedDate", 
					selectedDate,depotId,locationId,start,limit,commodity,specifications);
			Integer totalItems = 0 ; 
			if(list.size()>0) {
				totalItems = (Integer)list.get(0).get("totalItems");
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(totalItems).append(",result:");
			buff.append(GsonUtil.toJson(list));
			buff.append("}");
			this.jsonString = buff.toString();
			return SUCCESS;
		}
}
