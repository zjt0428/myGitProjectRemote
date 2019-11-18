/**
 *====================================================
 * 文件名称: AmountReceiveAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
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
import com.knight.emms.constant.Status;
import com.knight.emms.model.AdvanceReceive;
import com.knight.emms.service.AdvanceReceiveService;

/**
 * @ClassName: AmountReceiveAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:32:44
 */
public class AdvanceReceiveAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AdvanceReceive advanceReceive;

	@Getter
	@Setter
	private Long adreceiveId;

	@Resource
	private AdvanceReceiveService advanceReceiveService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AdvanceReceive> list = advanceReceiveService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		AdvanceReceive p = advanceReceiveService.get(adreceiveId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新收款信息")
	public String save() {
		advanceReceiveService.isCloseSettle(advanceReceive);
		if (advanceReceive.getAdreceiveId() == null) {
			advanceReceive.setApplyforState(Status.Applyfor.waitSubmit);
			advanceReceive.setDelFlag(Constant.ENABLED);
			advanceReceiveService.save(advanceReceive);
		} else {
			AdvanceReceive p = advanceReceiveService.get(advanceReceive.getAdreceiveId());
			advanceReceive.setApplyforState(p.getApplyforState());
			advanceReceive.setDelFlag(p.getDelFlag());
			advanceReceiveService.merge(advanceReceive);
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除借用信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AdvanceReceive p = advanceReceiveService.get(new Long(id));
			advanceReceiveService.isCloseSettle(p);
			p.setDelFlag(Constant.DISENABLED);
			advanceReceiveService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交借用信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AdvanceReceive p = advanceReceiveService.get(new Long(id));
			advanceReceiveService.isCloseSettle(p);
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				advanceReceiveService.save(p);
			}
		}
		return SUCCESS;
	}

}
