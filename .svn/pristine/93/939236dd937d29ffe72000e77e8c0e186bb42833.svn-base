/**
 *====================================================
 * 文件名称: AmountPaymentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.service.AmountPaymentService;
import com.knight.system.model.SysConfig;
import com.knight.system.service.SysConfigService;

/**
 * @ClassName: AmountPaymentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:32:19
 */
public class AmountPaymentAction extends ExportBaseAction<AmountPayment> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AmountPayment amountPayment;

	@Getter
	@Setter
	private Long amountPaymentId;

	@Resource
	private SysConfigService sysConfigService;

	@Resource
	private AmountPaymentService amountPaymentService;

	protected String getUnBaseTypeValue(ExportModel model, Object value,
			ExportField exportField, int headerIndex) throws Exception {
		AmountPayment amountPayment = ((AmountPayment) model);
		switch (headerIndex) {
		case 6:
			return amountPayment.getPayableDebit()
					.add(amountPayment.getPaymentAmount()).toString();
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AmountPayment> list = amountPaymentService
				.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		AmountPayment p = amountPaymentService
				.getTranslateFull(amountPaymentId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新付款信息")
	public String save() {
		if (amountPayment.getAmountPaymentId() == null) {
			amountPayment.setPaymentStatus(Status.InvoiceAmount.unfinished);
			amountPayment.setApplyforState(Status.Applyfor.waitSubmit);
			amountPayment.setDelFlag(Constant.ENABLED);
		} else {
			AmountPayment p = amountPaymentService.editLoad(amountPayment);
			amountPayment.setAmountSerial(p.getAmountSerial());
//			logger.info(amountPayment.getAmountSerial());//=========打印
			amountPayment.setPaymentStatus(p.getPaymentStatus());
			amountPayment.setApplyforState(p.getApplyforState());
			amountPayment.setDelFlag(p.getDelFlag());
		}
		
		amountPaymentService.saveOrMergeForEdit(amountPayment);
		this.jsonString = "{success:true,applyforId:"
				+ amountPayment.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除付款计划分摊信息")
	public String multiDelShare() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			amountPaymentService.deleteShare(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除付款信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AmountPayment p = amountPaymentService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			amountPaymentService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交付款信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AmountPayment p = amountPaymentService.get(new Long(id));
			if (Status.Applyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.Applyfor.waitApprove);
				amountPaymentService.save(p);
			}
		}
		return SUCCESS;
	}

	public String print() {
		amountPayment = amountPaymentService.getTranslateFull(amountPaymentId);
		String digPaymentAmount = BigDecimalUtil.parserDigAmount(amountPayment
				.getPaymentAmount());
		getRequest().setAttribute("digPaymentAmount", digPaymentAmount);
		return getRequest().getParameter("formpage");
	}

	public boolean isSameDay(String day1, String day2) {
		if (day1.equals(day2)) {
			return true;
		} else {
			return false;
		}
	}

}
