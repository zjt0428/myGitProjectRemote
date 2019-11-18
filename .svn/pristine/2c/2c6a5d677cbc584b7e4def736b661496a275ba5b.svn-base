package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.ExitFactoryNotice;
import com.knight.emms.service.ExitFactoryNoticeService;

import lombok.Getter;
import lombok.Setter;

public class ExitFactoryNoticeAction extends BaseAction{

private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private ExitFactoryNotice exitFactoryNotice;

	@Getter
	@Setter
	private Long exitFactoryNoticeId;

	@Resource
	private ExitFactoryNoticeService exitFactoryNoticeService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ExitFactoryNotice> list = exitFactoryNoticeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		ExitFactoryNotice c = exitFactoryNoticeService.getTranslate(exitFactoryNoticeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新事故信息")
	public String save() {
		if (exitFactoryNotice.getExitFactoryNoticeId() == null) {
			exitFactoryNotice.setDelFlag(Constant.ENABLED);
		} else {
			ExitFactoryNotice a = exitFactoryNoticeService.get(exitFactoryNotice.getExitFactoryNoticeId());
			exitFactoryNotice.setExitFactoryNoticeId(a.getExitFactoryNoticeId());
			exitFactoryNotice.setDelFlag(Constant.ENABLED);
		}
		exitFactoryNoticeService.saveOrMergeForEdit(exitFactoryNotice);
		return SUCCESS;
	}

	@ActionLog(description = "删除事故信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ExitFactoryNotice p = exitFactoryNoticeService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			exitFactoryNoticeService.save(p);
		}
		return SUCCESS;
	}

}
