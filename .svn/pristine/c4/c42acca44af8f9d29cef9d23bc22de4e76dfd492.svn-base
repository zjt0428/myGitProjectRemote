/**
 *====================================================
 * 文件名称: InstallManageAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-10-26			chenxy(创建:创建文件)
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
import com.knight.emms.model.InstallManage;
import com.knight.emms.service.InstallManageService;

/**
 * @ClassName: InstallManageAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-10-26 下午4:25:58
 */
public class InstallManageAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private InstallManage installManage;

	@Getter
	@Setter
	private Long installId;

	@Resource
	private InstallManageService installManageService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InstallManage> list = installManageService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		installManage = installManageService.get(installId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(installManage, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "删除安装信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			installManageService.remove(new Long(id));
		}
		return SUCCESS;
	}

}
