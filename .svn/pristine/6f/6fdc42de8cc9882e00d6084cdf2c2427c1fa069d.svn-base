/**
 *====================================================
 * 文件名称: PractiCreditAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-6			chenxy(创建:创建文件)
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
import com.knight.emms.constant.Constant;
import com.knight.emms.model.PractiCredit;
import com.knight.emms.service.PractiCreditService;

/**
 * @ClassName: PractiCreditAction
 * @Description: 奖惩记录Action
 * @author chenxy
 * @date 2013-8-6 下午6:28:38
 */
public class PractiCreditAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private PractiCredit practiCredit;

	@Setter
	@Getter
	private Long creditId;

	@Resource
	private PractiCreditService practiCreditService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PractiCredit> list = practiCreditService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		PractiCredit credit = practiCreditService.getTranslate(creditId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(credit, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新从业信用信息")
	public String save() {
		if (practiCredit.getCreditId() == null) {
			practiCredit.setDelFlag(Constant.ENABLED);
			practiCreditService.save(practiCredit);
		} else {
			PractiCredit p = practiCreditService.get(practiCredit.getCreditId());
			practiCredit.setDelFlag(p.getDelFlag());
			practiCreditService.merge(practiCredit);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除从业信用信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PractiCredit p = practiCreditService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			practiCreditService.save(p);
		}
		return SUCCESS;
	}

}
