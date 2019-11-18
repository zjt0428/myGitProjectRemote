package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.BasedepotJoinMaterials;
import com.knight.emms.service.BasedepotJoinMaterialsService;

import lombok.Getter;
import lombok.Setter;

public class BasedepotJoinMaterialsAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private Long storeMaterialsId;
	
	@Resource
	private BasedepotJoinMaterialsService basedepotJoinMaterialsService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BasedepotJoinMaterials> list = basedepotJoinMaterialsService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		BasedepotJoinMaterials m = basedepotJoinMaterialsService.getTranslate(storeMaterialsId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
}
