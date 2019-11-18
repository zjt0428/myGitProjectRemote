package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.core.web.action.MenuAuthority;
import com.knight.emms.model.FormOpinion;
import com.knight.emms.service.FormOpinionService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

public class FormOpinionAction extends BaseAction{
	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private FormOpinion formOpinion;

	@Setter
	@Getter
	private Long opinionId;

	@Setter
	@Getter
	private String applyforId;

	@Resource
	private FormOpinionService formOpinionService;

	@MenuAuthority(id = "ListQuery", text = "查询意见信息", iconCls = "btn-accept-info")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<FormOpinion> list = formOpinionService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@MenuAuthority(text = "提交受理", iconCls = "btn-accept")
	@ActionLog(description = "保存受理信息")
	public String save() {
		formOpinion.setOpinionId(null);
		formOpinion.setOpinionUserid(ApplicationContainer.getCurrentUserId());
		formOpinionService.save(formOpinion);
		return SUCCESS;
	}
}
