/**
 *====================================================
 * 文件名称: EquipWarehouseAbnormalAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月30日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.EquipWarehouseAbnormal;
import com.knight.emms.service.EquipWarehouseAbnormalService;

/**
 * @ClassName: EquipWarehouseAbnormalAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月30日 上午8:47:13
 */
public class EquipWarehouseAbnormalAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipWarehouseAbnormal equipWarehouseAbnormal;

	@Getter
	@Setter
	private Long abnormalId;

	@Resource
	private EquipWarehouseAbnormalService equipWarehouseAbnormalService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipWarehouseAbnormal> list = equipWarehouseAbnormalService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipWarehouseAbnormal p = equipWarehouseAbnormalService.get(abnormalId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

}
