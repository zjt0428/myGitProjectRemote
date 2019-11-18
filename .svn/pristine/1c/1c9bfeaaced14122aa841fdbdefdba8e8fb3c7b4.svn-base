/**
 *====================================================
 * 文件名称: ContingencyPlanAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
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
import com.knight.emms.model.ContingencyPlan;
import com.knight.emms.service.ContingencyPlanService;

/**
 * @ClassName: ContingencyPlanAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:35:51
 */
public class ContingencyPlanAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ContingencyPlan contingencyPlan;

	@Getter
	@Setter
	private Long contingencyId;

	@Resource
	private ContingencyPlanService contingencyPlanService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ContingencyPlan> list = contingencyPlanService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ContingencyPlan c = contingencyPlanService.getTranslateFull(contingencyId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新应急预案")
	public String save() {
		if (contingencyPlan.getContingencyId() == null) {
			this.isCreateFileAttach = true;
		}
		contingencyPlanService.saveOrUpdate(contingencyPlan);
		createFileAttach(contingencyPlan.getContingencyId());
		return SUCCESS;
	}

	@ActionLog(description = "删除应急预案人员")
	public String multiDelWorker() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contingencyPlanService.deleteWorker(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除应急预案")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			contingencyPlanService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		contingencyPlan = contingencyPlanService.getTranslateFull(contingencyId);
		return getRequest().getParameter("formpage");
	}

}
