/**
 *====================================================
 * 文件名称: DismantleManageAction.java
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
import com.knight.emms.model.DismantleManage;
import com.knight.emms.service.DismantleManageService;

/**
 * @ClassName: DismantleManageAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-10-26 下午4:25:28
 */
public class DismantleManageAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private DismantleManage dismantleManage;

	@Getter
	@Setter
	private Long dismantleId;

	@Resource
	private DismantleManageService dismantleManageService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<DismantleManage> list = dismantleManageService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		dismantleManage = dismantleManageService.get(dismantleId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(dismantleManage, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "删除拆卸信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			dismantleManageService.remove(new Long(id));
		}
		return SUCCESS;
	}

}
