package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.service.ProjectMaterialsStoreService;

import lombok.Getter;
import lombok.Setter;

public class ProjectMaterialsStoreAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long storeId;
	
	@Resource
	private ProjectMaterialsStoreService projectMaterialsStoreService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ProjectMaterialsStore> list = projectMaterialsStoreService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		ProjectMaterialsStore m = projectMaterialsStoreService.getTranslate(storeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	//根据选择时间获取项目周材库存
	public String getStoreByCompensationDate() {
		String compensationDate = getRequest().getParameter("compensationDate");
		String contractId = getRequest().getParameter("contractId");
		List<Map<String,Object>> list = projectMaterialsStoreService.queryByScript("materials.get_store_by_compensationDate", contractId,compensationDate);
		StringBuffer buff = new StringBuffer("{success:true,result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
