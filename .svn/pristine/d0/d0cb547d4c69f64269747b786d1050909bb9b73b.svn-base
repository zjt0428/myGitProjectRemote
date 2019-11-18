package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.BaseDepot;
import com.knight.emms.model.BaseDepotPermission;
import com.knight.emms.model.BaseLocation;
import com.knight.emms.model.BaseLocationPermission;
import com.knight.emms.model.BeforeMaterialsRepair;
import com.knight.emms.service.BaseLocationService;

import lombok.Getter;
import lombok.Setter;

public class BaseLocationAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long locationId;
	
	@Getter
	@Setter
	private Long depotId;
	
	@Getter
	@Setter
	private Long userId;
	
	@Getter
	@Setter
	private BaseLocation baseLocation;
	
	@Resource
	private BaseLocationService baseLocationService;
	
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BaseLocation> list = baseLocationService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		BaseLocation m = baseLocationService.getTranslate(locationId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新仓库")
	public String save() {
		baseLocation.setDelFlag(Constant.ENABLED);
		if (baseLocation.getLocationId() == null) {
			baseLocationService.save(baseLocation);
		} 
		baseLocation.setSubBaseLocation();
		baseLocationService.merge(baseLocation);
		return SUCCESS;
	}
	
	@ActionLog(description = "删除仓库")
	public String multiDel() {
		 String[] ids = getRequest().getParameterValues("ids");
	        for (String id : ids) {
	        	BaseLocation bl = baseLocationService.get(new Long(id));
	        	bl.setDelFlag(Constant.DISENABLED);
	        	baseLocationService.update(bl);
	        }
		return SUCCESS;
	}
	
	public String findDepot(){
//		String hql = "select v1.locationId as locationId,v1.locationName as locationName from BaseLocation v1,BaseDepot v2 where v2.depotId=?";
//		Object[] params = {depotId};
//		List<BaseLocation> list = baseLocationService.findByHql(hql, params);
		QueryFilter filter = new QueryFilter(getRequest());
		List<BaseLocation> list = baseLocationService.queryTranslateAll(filter);
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(GsonUtil.toJson(list, false));
//		for(int i=0;i<list.size();i++){
//			sb.append("{\"locationId\":\"");
//			sb.append(list.get(i).getLocationId());
//			sb.append("\",\"locationName\":\"");
//			sb.append(list.get(i).getLocationName());
//			sb.append("\"},");
//		}
//		sb.substring(0, sb.length()-1);
		sb.append("}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String arrayList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BaseLocation> list = baseLocationService.getAll(filter);
		StringBuffer buff = new StringBuffer();
		if(list.size()>0){
			buff.append("[");
			for (BaseLocation t : list) {
					buff.append("['"+t.getLocationId()+"','"+t.getLocationName()+"'],");
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]");
		}
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	
	public String listBefore() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BaseLocation> list = baseLocationService.queryBeforeRepairAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
