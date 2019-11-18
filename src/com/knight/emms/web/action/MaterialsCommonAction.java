package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.service.MaterialsDispatchService;

/**
* @author 作者 :jlh
* @version 创建时间：2017年7月12日 上午9:57:55
* 类说明
*/
public class MaterialsCommonAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	
	@Resource
	private MaterialsDispatchService materialsDispatchService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		String storeName = getRequest().getParameter("storeName");
		List<Map<String,Object>> list = materialsDispatchService.queryByScript("", storeName);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	
}