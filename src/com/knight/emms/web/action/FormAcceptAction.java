/**
 *====================================================
 * 文件名称: FormAcceptAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-7			chenxy(创建:创建文件)
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
import com.knight.core.web.action.MenuAuthority;
import com.knight.emms.model.FormAccept;
import com.knight.emms.service.FormAcceptService;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: FormAcceptAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-7 上午8:16:45
 */
public class FormAcceptAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private FormAccept formAccept;

	@Setter
	@Getter
	private Long acceptId;

	@Setter
	@Getter
	private String applyforId;

	@Resource
	private FormAcceptService formAcceptService;

	@MenuAuthority(id = "ListQuery", text = "查询受理信息", iconCls = "btn-accept-info")
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<FormAccept> list = formAcceptService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@MenuAuthority(text = "提交受理", iconCls = "btn-accept")
	@ActionLog(description = "保存受理信息")
	public String save() {
		formAccept.setAcceptId(null);
		formAccept.setAcceptUserid(ApplicationContainer.getCurrentUserId());
		formAcceptService.parserAccept(formAccept);
		return SUCCESS;
	}

}
