package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.EnterFactoryNotice;
import com.knight.emms.service.EnterFactoryNoticeService;

import lombok.Getter;
import lombok.Setter;

public class EnterFactoryNoticeAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private EnterFactoryNotice enterFactoryNotice;

	@Getter
	@Setter
	private Long factoryNoticeId;

	@Resource
	private EnterFactoryNoticeService enterFactoryNoticeService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EnterFactoryNotice> list = enterFactoryNoticeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EnterFactoryNotice c = enterFactoryNoticeService.getTranslate(factoryNoticeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新事故信息")
	public String save() {
		if (enterFactoryNotice.getFactoryNoticeId() == null) {
			enterFactoryNotice.setDelFlag(Constant.ENABLED);
		} else {
			EnterFactoryNotice a = enterFactoryNoticeService.get(enterFactoryNotice.getFactoryNoticeId());
			enterFactoryNotice.setFactoryNoticeId(a.getFactoryNoticeId());
			enterFactoryNotice.setDelFlag(Constant.ENABLED);
		}
		enterFactoryNoticeService.saveOrMergeForEdit(enterFactoryNotice);
		return SUCCESS;
	}

	@ActionLog(description = "删除事故信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			EnterFactoryNotice p = enterFactoryNoticeService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			enterFactoryNoticeService.save(p);
		}
		return SUCCESS;
	}

}
