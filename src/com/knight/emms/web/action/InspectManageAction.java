/**
 *====================================================
 * 文件名称: InspectManageAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月31日			chenxy(创建:创建文件)
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
import com.knight.emms.model.InspectManage;
import com.knight.emms.service.InspectManageService;

/**
 * @ClassName: InspectManageAction
 * @Description: 安全巡检
 * @author chenxy
 * @date 2014年10月31日 下午9:16:11
 */
public class InspectManageAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private InspectManage inspectManage;

	@Getter
	@Setter
	private Long inspectId;

	@Resource
	private InspectManageService inspectManageService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InspectManage> list = inspectManageService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		inspectManage = inspectManageService.get(inspectId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(inspectManage, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "删除安装信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			inspectManageService.remove(new Long(id));
		}
		return SUCCESS;
	}

}
