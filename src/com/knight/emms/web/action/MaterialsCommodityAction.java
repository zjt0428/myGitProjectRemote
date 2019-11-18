/**
 *====================================================
 * 文件名称: MaterialsCommodityAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月10日		陈光毅(创建:创建文件)
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
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.MaterialsCommodity;
import com.knight.emms.service.MaterialsCommodityService;

/**
 * @ClassName: MaterialsCommodityAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月10日
 */
public class MaterialsCommodityAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long commodityId;
	
	@Getter
	@Setter
	private MaterialsCommodity materialsCommodity;
	
	@Resource
	private MaterialsCommodityService materialsCommodityService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsCommodity> list = materialsCommodityService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		MaterialsCommodity m = materialsCommodityService.getTranslate(commodityId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新周材品名")
	public String save() {
		if (materialsCommodity.getCommodityId() == null) {
			materialsCommodityService.save(materialsCommodity);
		} else {
			materialsCommodityService.merge(materialsCommodity);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除周材品名")
	public String multiDel() {
		 String[] ids = getRequest().getParameterValues("ids");
	        for (String id : ids) {
	        	materialsCommodityService.remove(new Long(id));
	        }
		return SUCCESS;
	}
	
	@ActionLog(description = "品名下拉框")
	public String arrayList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsCommodity> list = materialsCommodityService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer();
		if(list.size()>0){
			buff.append("[");
			for (MaterialsCommodity t : list) {
					buff.append("['"+t.getCommodityId()+"','"+t.getCommodity()+"'],");
			}
			buff.deleteCharAt(buff.length() - 1);
			buff.append("]");
		}
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
