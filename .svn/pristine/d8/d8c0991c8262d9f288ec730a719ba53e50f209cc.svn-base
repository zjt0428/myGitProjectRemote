/**
 *====================================================
 * 文件名称: InventoryAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.Inventory;
import com.knight.emms.service.InventoryService;

/**
 * @ClassName: InventoryAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-26 下午10:03:45
 */
public class InventoryAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Inventory inventory;

	@Setter
	@Getter
	private Long inventoryId;

	@Resource
	private InventoryService inventoryService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Inventory> list = inventoryService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Inventory c = inventoryService.getTranslateFull(inventoryId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新盘点信息")
	public String save() {
		if (inventory.getInventoryId() == null) {
			inventory.setDelFlag(Constant.ENABLED);
		} else {
			Inventory p = inventoryService.get(inventory.getInventoryId());
			inventory.setInventorySerial(p.getInventorySerial());
			inventory.setDelFlag(p.getDelFlag());
		}
		inventoryService.saveOrMerge(inventory);
		return SUCCESS;
	}

	@ActionLog(description = "删除盘点明细项信息")
	public String multiDelCategory() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			inventoryService.deleteCategory(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除盘点信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Inventory p = inventoryService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			inventoryService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "计算盘点明细")
	public String calculateCategory() {
		Date startTime = DateUtil.changeObj2Date(getRequest().getParameter("startTime"));
		Date endTime = DateUtil.changeObj2Date(getRequest().getParameter("endTime"));
		String category = getRequest().getParameter("category") + "%";
		Collection<Map<String, Object>> inventoryDetail = inventoryService.calculateCategory(category, startTime, endTime);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(inventoryDetail));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
}
