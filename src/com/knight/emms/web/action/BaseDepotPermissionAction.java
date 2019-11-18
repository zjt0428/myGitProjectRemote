package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.dao.BaseDepotPermissionDao;
import com.knight.emms.model.BaseDepot;
import com.knight.emms.model.BaseDepotPermission;
import com.knight.emms.model.StoreHouse;
import com.knight.emms.service.BaseDepotPermissionService;
import com.knight.emms.service.BaseDepotService;

import lombok.Getter;
import lombok.Setter;

public class BaseDepotPermissionAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long userId;
	
	@Resource
	private BaseDepotService baseDepotService;
	
	@Resource
	private BaseDepotPermissionService baseDepotPermissionService;
	
	@Resource
	private BaseDepotPermissionDao baseDepotPermissionDao;
	
	
	public String list() {
		String hql = "select v1 from BaseDepotPermission v1 where v1.depotId is not null and v1.userId=?";
		String hql2 = "select b from BaseDepot b where b.depotId not in (select depotId from BaseDepotPermission where depotId is not null)";
		Object[] params = {userId};
		List<BaseDepotPermission> list = baseDepotPermissionService.findByHql(hql, params);
		List<BaseDepot> list2 = baseDepotService.findByHql(hql2, null);
		StringBuffer buff = new StringBuffer("[");
		for (BaseDepotPermission t : list) {
			buff.append("['"+t.getDepotId()+"','"+t.getDepotName()+"'],");
		}
		for (BaseDepot t : list2) {
			buff.append("['"+t.getDepotId()+"','"+t.getDepotName()+"'],");
		}
		if (list.size() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
//	public String arrayList() {
//		QueryFilter filter = new QueryFilter(getRequest());
//		List<BaseDepot> list = baseDepotService.getAll(filter);
//		StringBuffer buff = new StringBuffer("[");
//		for (BaseDepot t : list) {
//			for(BaseDepotPermission str : t.getBaseDepotPermissionSet()){
//				if(str.getUserId()==userId){
//				buff.append("['"+str.getUserId()+"','"+str.getDepotName()+"'],");
////				buff.append("['" + t.getBaseDepotPermissionSet() + "','" + t.getStoreName() + "'],");
//				}
//			}	
//		}
//		if (list.size() > 0) {
//			buff.deleteCharAt(buff.length() - 1);
//		}
//		buff.append("]");
//		this.jsonString = buff.toString();
//		return SUCCESS;
//	}
//

}
