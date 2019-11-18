/**
 *====================================================
 * 文件名称: FormApproveAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-7			chenxy(创建:创建文件)
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
import com.knight.core.web.action.MenuAuthority;
import com.knight.emms.model.FormApprove;
import com.knight.emms.service.FormApproveService;
import com.knight.system.application.ApplicationContainer;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: FormApproveAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-7 上午8:16:17
 */
public class FormApproveAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private FormApprove formApprove;

	@Setter
	@Getter
	private Long ApproveId;

	@Setter
	@Getter
	private String applyforId;

	@Resource
	private FormApproveService formApproveService;
	

	@MenuAuthority(id = "ListQuery", text = "查询审批信息", iconCls = "btn-approve-info")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<FormApprove> list = formApproveService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@MenuAuthority(text = "提交审批", iconCls = "btn-accept")
	@ActionLog(description = "保存审批信息")
	public String save() {
		formApprove.setApproveId(null);
		formApprove.setApproveUserid(ApplicationContainer.getCurrentUserId());
		formApproveService.parserApprove(formApprove);
		return SUCCESS;
	}
}
