/**
 *====================================================
 * 文件名称: TechnicalDisclosureAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.EquipAddReduceDetail;
import com.knight.emms.model.TechnicalDisclosure;
import com.knight.emms.service.EquipAddReduceDetailService;
import com.knight.emms.service.TechnicalDisclosureService;

/**
 * @ClassName: TechnicalDisclosureAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:42:54
 */
public class EquipAddReduceDetailAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipAddReduceDetail equipAddReduceDetail;

	@Getter
	@Setter
	private Long addReduceId;

	@Resource
	private EquipAddReduceDetailService equipAddReduceDetailService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipAddReduceDetail> list = equipAddReduceDetailService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String loadEquipAdd() {
		Long addReduceId = Long.valueOf(getRequest().getParameter("addReduceId"));
		List<Map<String, Object>> celist = equipAddReduceDetailService.queryByScript("equipdoc.pc_add_detail", addReduceId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(celist.size()).append(",result:");
		buff.append(GsonUtil.toJson(celist, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	public String loadEquipReduce() {
		Long addReduceId = Long.valueOf(getRequest().getParameter("addReduceId"));
		List<Map<String, Object>> celist = equipAddReduceDetailService.queryByScript("equipdoc.pc_reduce_detail", addReduceId);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(celist.size()).append(",result:");
		buff.append(GsonUtil.toJson(celist, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新技术交底")
	public String save() {
		if (equipAddReduceDetail.getAddReduceId() == null) {
			equipAddReduceDetailService.saveSerialModel(equipAddReduceDetail);
			setFileAttach(equipAddReduceDetail.getAddReduceId());
		} else {
			equipAddReduceDetailService.save(equipAddReduceDetail);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除技术交底")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipAddReduceDetailService.remove(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		equipAddReduceDetail = equipAddReduceDetailService.getTranslateFull(addReduceId);
		return getRequest().getParameter("formpage");
	}
	public String equipAddList() {
		List<Map<String, Object>> celist = equipAddReduceDetailService.queryByScript("equipdoc.pc_equip_add_detail");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(celist.size()).append(",result:");
		buff.append(GsonUtil.toJson(celist, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	public String equipReduceList() {
		List<Map<String, Object>> celist = equipAddReduceDetailService.queryByScript("equipdoc.pc_equip_reduce_detail");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(celist.size()).append(",result:");
		buff.append(GsonUtil.toJson(celist, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
}
