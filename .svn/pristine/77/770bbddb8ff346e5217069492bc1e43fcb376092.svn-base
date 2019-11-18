/**
 *====================================================
 * 文件名称: MaterialsSpecificationsAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月11日		陈光毅(创建:创建文件)
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
import com.knight.emms.model.MaterialsSpecifications;
import com.knight.emms.service.MaterialsSpecificationsService;

/**
 * @ClassName: MaterialsSpecificationsAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月11日
 */
public class MaterialsSpecificationsAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long specificationsId;
	
	@Getter
	@Setter
	private MaterialsSpecifications materialsSpecifications;
	
	@Resource
	private MaterialsSpecificationsService materialsSpecificationsService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<MaterialsSpecifications> list = materialsSpecificationsService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		MaterialsSpecifications m = materialsSpecificationsService.getTranslate(specificationsId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新周材规格")
	public String save() {
		if (materialsSpecifications.getSpecificationsId() == null) {
			materialsSpecificationsService.save(materialsSpecifications);
		} else {
			materialsSpecificationsService.merge(materialsSpecifications);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除周材规格")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	materialsSpecificationsService.remove(new Long(id));
        }
		return SUCCESS;
	}
}
