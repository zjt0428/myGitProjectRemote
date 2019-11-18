/**
 *====================================================
 * 文件名称: IndisNoticeAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年8月26日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.IndisNotice;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.service.IndisNoticeService;
import com.knight.emms.service.IndisSchemaService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: IndisNoticeAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年8月26日 上午11:47:34
 */
public class IndisNoticeAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private IndisNotice indisNotice;

	@Getter
	@Setter
	private Long noticeId;

	@Resource
	private IndisNoticeService indisNoticeService;

	@Resource
	private IndisSchemaService indisSchemaService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<IndisNotice> list = indisNoticeService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		IndisNotice c = indisNoticeService.getTranslateFull(noticeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新安拆告知")
	public String save() {
		IndisSchema indisSchema = indisSchemaService.get(indisNotice.getSchemaId());
		if (indisNotice.getNoticeId() == null) {
			indisNotice.setIndisSchema(indisSchema);
			super.isCreateFileAttach = true;
		} else {
			IndisNotice p = indisNoticeService.get(indisNotice.getNoticeId());
			indisNotice.setIndisSchema(p.getIndisSchema());
			indisNotice.setRelateModule(p.getRelateModule());
		}
		indisNoticeService.saveOrMergeForEdit(indisNotice);
		createFileAttach(indisNotice.getNoticeId());
		return SUCCESS;
	}

	@ActionLog(description = "删除安拆告知")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			indisNoticeService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除安拆告知人员")
	public String multiDelPracti() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			indisNoticeService.deletePracti(new Long(id));
		}
		return SUCCESS;
	}

}
