package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.BasicPreEmbeddingNotice;
import com.knight.emms.model.EnterFactoryNotice;
import com.knight.emms.service.BasicPreEmbeddingNoticeService;

import lombok.Getter;
import lombok.Setter;

public class BasicPreEmbeddingNoticeAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private BasicPreEmbeddingNotice basicPreEmbeddingNotice;

	@Getter
	@Setter
	private Long preEmbeddingNoticeId;

	@Resource
	private BasicPreEmbeddingNoticeService basicPreEmbeddingNoticeService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BasicPreEmbeddingNotice> list = basicPreEmbeddingNoticeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		BasicPreEmbeddingNotice c = basicPreEmbeddingNoticeService.getTranslate(preEmbeddingNoticeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新事故信息")
	public String save() {
		if (basicPreEmbeddingNotice.getPreEmbeddingNoticeId() == null) {
			basicPreEmbeddingNotice.setDelFlag(Constant.ENABLED);
			
		} else {
			BasicPreEmbeddingNotice a = basicPreEmbeddingNoticeService.get(basicPreEmbeddingNotice.getPreEmbeddingNoticeId());
			basicPreEmbeddingNotice.setPreEmbeddingNoticeId(a.getPreEmbeddingNoticeId());  
			basicPreEmbeddingNotice.setDelFlag(Constant.ENABLED);
			basicPreEmbeddingNoticeService.merge(basicPreEmbeddingNotice);
		}
		basicPreEmbeddingNoticeService.saveOrMergeForEdit(basicPreEmbeddingNotice);
		return SUCCESS;
	}
	
	@ActionLog(description = "删除事故信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			BasicPreEmbeddingNotice p = basicPreEmbeddingNoticeService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			basicPreEmbeddingNoticeService.save(p);
		}
		return SUCCESS;
	}
}
