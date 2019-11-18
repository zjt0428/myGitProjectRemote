/**
 *====================================================
 * 文件名称: AnnounceUserAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
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
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.AnnounceUser;
import com.knight.emms.service.AnnounceUserService;

/**
 * @ClassName: AnnounceUserAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:45:57
 */
public class AnnounceUserAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AnnounceUser announceUser;

	@Getter
	@Setter
	private Long announceUserId;

	@Resource
	private AnnounceUserService announceUserService;

	public String display() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(PagingBean.PORTLET_PAGE_SIZE);
		List<AnnounceUser> announceList = announceUserService.getAll(filter);
		getRequest().setAttribute("displayList", announceList);
		return "display";
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AnnounceUser> list = announceUserService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除公告个人")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AnnounceUser au = announceUserService.get(new Long(id));
			au.setDelFlag(Constant.DISENABLED);
			announceUserService.save(au);
		}
		return SUCCESS;
	}

	@ActionLog(description = "标识已阅读公告")
	public String multiSetRead() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AnnounceUser au = announceUserService.get(new Long(id));
			au.setReadFlag(Constant.ENABLED);
			announceUserService.save(au);
		}
		return SUCCESS;
	}

}
