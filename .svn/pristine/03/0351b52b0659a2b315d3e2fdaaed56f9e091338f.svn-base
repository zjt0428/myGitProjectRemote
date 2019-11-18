/**
 *====================================================
 * 文件名称: InstalmentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-7			chenxy(创建:创建文件)
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
import com.knight.emms.constant.Status;
import com.knight.emms.model.Instalment;
import com.knight.emms.service.InstalmentService;

/**
 * @ClassName: InstalmentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-7 上午7:34:29
 */
public class InstalmentAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Instalment instalment;

	@Setter
	@Getter
	private Long instalmentId;

	@Resource
	private InstalmentService instalmentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Instalment> list = instalmentService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "删除还款计划信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Instalment c = instalmentService.get(new Long(id));
			if (Status.Fund.payment.equals(c.getStatus())) {
				instalmentService.remove(c);
			}
		}
		return SUCCESS;
	}

}
