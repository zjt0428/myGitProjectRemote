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
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.AmountReceive;
import com.knight.emms.service.AmountReceiveService;

/**
 * @ClassName: AmountReceiveAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:32:44
 */
public class AmountReceiveAction extends ExportBaseAction<AmountReceive> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AmountReceive amountReceive;

	@Getter
	@Setter
	private Long amountReceiveId;

	@Resource
	private AmountReceiveService amountReceiveService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AmountReceive> list = amountReceiveService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		AmountReceive p = amountReceiveService.getTranslateFull(amountReceiveId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新收款信息")
	public String save() {
		if (amountReceive.getAmountReceiveId() == null) {
			amountReceive.setReceiveStatus(Status.InvoiceAmount.unfinished);
			amountReceive.setApplyforState(Status.Applyfor.waitSubmit);
			amountReceive.setDelFlag(Constant.ENABLED);
		} else {
			AmountReceive p = amountReceiveService.editLoad(amountReceive);
			amountReceive.setAmountSerial(p.getAmountSerial());
			amountReceive.setReceiveStatus(p.getReceiveStatus());
			amountReceive.setApplyforState(p.getApplyforState());
			amountReceive.setDelFlag(p.getDelFlag());
		}
		amountReceiveService.saveOrMergeForEdit(amountReceive);
		this.jsonString = "{success:true,applyforId:" + amountReceive.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除借用信息")
	public String multiDelShare() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			amountReceiveService.deleteShare(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除借用信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AmountReceive p = amountReceiveService.get(new Long(id));
			amountReceiveService.isCloseSettle(p);
			p.setDelFlag(Constant.DISENABLED);
			amountReceiveService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交借用信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AmountReceive p = amountReceiveService.get(new Long(id));
			amountReceiveService.isCloseSettle(p);
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				amountReceiveService.save(p);
			}
		}
		return SUCCESS;
	}

}
