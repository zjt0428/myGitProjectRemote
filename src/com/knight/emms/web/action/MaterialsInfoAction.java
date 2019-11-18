package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.model.MaterialsCommodity;
import com.knight.emms.model.MaterialsSpecifications;
import com.knight.emms.service.MaterialsCommodityService;
import com.knight.emms.service.MaterialsSpecificationsService;


import lombok.Getter;
import lombok.Setter;

public class MaterialsInfoAction extends BaseAction {

	
	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long specificationsId;
	
	@Getter
	@Setter
	private Long commodityId;
	
	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	@Resource
	private MaterialsCommodityService materialsCommodityService;
	
	/**树形菜单*/
	public String list() { 
		StringBuffer buff = new StringBuffer();
		buff.append("[{id:'0',text:'" + "周材" + "',expanded:true,children:[");
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsCommodity> list = materialsCommodityService.queryTranslateAll(filter);
		for (MaterialsCommodity mc : list) {
			buff.append("{id:'" + mc.getCommodityId() + "',text:'" + mc.getCommodity() + "',leaf:true},");
		}
		if (!(list.isEmpty())) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]}]");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	/**查询*/
	public String find() {
		QueryFilter filter = new QueryFilter(getRequest());
		String hql = "";
		List<MaterialsSpecifications> list =null;
		if(commodityId!=null && commodityId!=0){
			hql ="select vo1 from MaterialsSpecifications vo1, MaterialsCommodity vo2 where vo2=vo1.materialsCommodity and vo2.commodityId = ?";
			Object[] params = {commodityId};
			list = materialsSpecificationsService.findByHql(hql,params);
		}else if(commodityId==null && filter!=null){
			list =  materialsSpecificationsService.queryTranslateAll(filter);
		}else {
			hql = "from MaterialsSpecifications";
			list = materialsSpecificationsService.findByHql(hql);
		}
		List<MaterialsSpecifications> ms = materialsSpecificationsService.getAll();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(ms.size()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
