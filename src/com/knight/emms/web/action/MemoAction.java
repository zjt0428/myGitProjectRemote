/**
 *====================================================
 * 文件名称: MemoAction.java
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
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Memo;
import com.knight.emms.service.MemoService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;

/**
 * @ClassName: MemoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:41:24
 */
public class MemoAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Memo memo;

	@Getter
	@Setter
	private Long memoId;

	@Resource
	private MemoService memoService;

	public String display() {
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		Long practiId = -1L;
		if (!currentUser.getAppUserExtends().isEmpty() && currentUser.getAppUserExtends().get(SystemConstant.MODULE_PRACTITIONER) != null) {
			practiId = currentUser.getAppUserExtends().get(SystemConstant.MODULE_PRACTITIONER).getForeignId();
		}
		Long userId = ApplicationContainer.getCurrentUserId();
		List<Map<String, Object>> memoList = memoService.queryByScript("announce.display_unfinished", 0, 8, practiId, userId);
		getRequest().setAttribute("displayList", memoList);
		return "display";
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Memo> list = memoService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Memo c = memoService.getTranslate(memoId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新工作备忘")
	public String save() {
		if (memo.getMemoId() == null) {
			memo.setProcessStatus(Status.HandleResult.untreated);
			memo.setStatus(Constant.DISENABLED);
			this.isCreateFileAttach = true;
		} else {
			Memo m = memoService.get(memo.getMemoId());
			memo.setStatus(m.getStatus());
		}
		memoService.saveOrUpdate(memo);
		createFileAttach(memo.getMemoId());
		return SUCCESS;
	}

	@ActionLog(description = "删除工作备忘")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			memoService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "归档工作备忘")
	public String filing() {
		String[] ids = getRequest().getParameterValues("ids");
		Long userId = ApplicationContainer.getCurrentUserId();
		for (String id : ids) {
			Memo m = memoService.get(new Long(id));
			if (userId.equals(m.getUserId())) {
				m.setStatus(Constant.ENABLED);
				memoService.save(m);
			}
		}
		return SUCCESS;
	}

}
