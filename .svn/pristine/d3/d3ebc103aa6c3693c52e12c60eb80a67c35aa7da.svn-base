/**
 *====================================================
 * 文件名称: IndisBasecheckAction.java
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
import com.knight.emms.model.IndisBasecheck;
import com.knight.emms.service.IndisBasecheckService;

/**
 * @ClassName: IndisBasecheckAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:37:02
 */
public class IndisBasecheckAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private IndisBasecheck indisBasecheck;

	@Getter
	@Setter
	private Long basecheckId;

	@Resource
	private IndisBasecheckService indisBasecheckService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<IndisBasecheck> list = indisBasecheckService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		IndisBasecheck c = indisBasecheckService.getTranslateFull(basecheckId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新基础验收")
	public String save() {
		if (indisBasecheck.getBasecheckId() == null) {
			this.isCreateFileAttach = true;
		}
		indisBasecheckService.saveOrUpdate(indisBasecheck);
		createFileAttach(indisBasecheck.getBasecheckId());
		return SUCCESS;
	}

	@ActionLog(description = "删除基础验收")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			indisBasecheckService.delete(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		indisBasecheck = indisBasecheckService.getTranslateFull(basecheckId);
		return getRequest().getParameter("formpage");
	}

}
