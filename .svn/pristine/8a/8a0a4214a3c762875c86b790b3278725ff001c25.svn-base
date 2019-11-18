/**
 *====================================================
 * 文件名称: PurchaseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Pickup;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.Purchase;
import com.knight.emms.model.PurchaseAcceptance;
import com.knight.emms.model.PurchaseBrief;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.PurchaseService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: PurchaseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 下午11:03:22
 */
public class PurchaseAction extends ExportBaseAction<Purchase> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Purchase purchase;

	@Getter
	@Setter
	private PurchaseAcceptance purchaseAcceptance;
	
	@Resource
	private PractitionerService practitionerService;

	@Getter
	@Setter
	private Long purchaseId;

	@Resource
	private PurchaseService purchaseService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		Purchase purchase = ((Purchase) model);
		switch (headerIndex) {
		case 9:
			return purchase.getPurchaseAmount().subtract(purchase.getPaymentAmount()).toString();
		}
		return super.getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Purchase> list = purchaseService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listBrief() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PurchaseBrief> list = purchaseService.queryBriefAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Purchase p = purchaseService.getTranslateFull(purchaseId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新采购信息")
	public String save() {
		if (purchase.getPurchaseId() == null) {
			purchase.setFundStatus(Status.Fund.payment);
			purchase.setApplyforState(Status.PurchaseApplyfor.waitSubmit);
			purchase.setPaymentAmount(BigDecimal.ZERO);
			purchase.setDelFlag(Constant.ENABLED);
		} else {
			Purchase p = purchaseService.editLoad(purchase);
			purchase.setPaymentAmount(p.getPaymentAmount());
			purchase.setPurchaseSerial(p.getPurchaseSerial());
			purchase.setFundStatus(p.getFundStatus());
			purchase.setApplyforState(p.getApplyforState());
			purchase.setDelFlag(p.getDelFlag());
		}
		purchaseService.saveOrMergeForEdit(purchase);
		this.jsonString = "{success:true,applyforId:" + purchase.getApplyforId() + "}";
		return SUCCESS;
	}

	public String multiDelBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			purchaseService.deletedBrief(new Long(id));
		}
		return SUCCESS;
	}
	
	
	@ActionLog(description = "一键审批采购信息")
	public String onekeyApprove() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Purchase p = purchaseService.getTranslateFull(new Long(id));
				p.setApplyforState(Status.PurchaseApplyfor.finished);
				p.setAccDate(DateUtil.getCurrentLinkDateStr());
				purchaseService.onekeyApprove(p);
				purchaseService.save(p);
				
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除采购信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Purchase p = purchaseService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			purchaseService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交采购信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Purchase p = purchaseService.get(new Long(id));
			if (Status.PurchaseApplyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.PurchaseApplyfor.waitAccept);
				purchaseService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交采购验收退货信息")
	public String multiReturned() {
		purchaseService.acceptance(purchaseAcceptance, Status.PurchaseAcc.returned);
		return SUCCESS;
	}

	@ActionLog(description = "提交采购验收换货信息")
	public String multiExchange() {
		purchaseService.acceptance(purchaseAcceptance, Status.PurchaseAcc.exchange);
		return SUCCESS;
	}

	@ActionLog(description = "提交采购验收合格信息")
	public String multiQualified() {
		purchaseService.acceptance(purchaseAcceptance, Status.PurchaseAcc.qualified);
		return SUCCESS;
	}

	@ActionLog(description = "提交采购验收其他信息")
	public String multiUnqualified() {
		purchaseService.acceptance(purchaseAcceptance, Status.PurchaseAcc.unqualified);
		return SUCCESS;
	}

	@ActionLog(description = "打印采购单")
	public String printForm() {
		Purchase p = purchaseService.getTranslateFull(purchaseId);
		p.setRemark(p.getRemark().replaceAll("\\r\\n", "</br>"));
		getRequest().setAttribute("purchase", p);
		return "printForm";
	}
	@ActionLog(description = "打印物资采购申请计划单")
	public String printApplyForm() {
		Purchase p = purchaseService.getTranslateFull(purchaseId);
		p.setRemark(p.getRemark().replaceAll("\\r\\n", "</br>"));
		getRequest().setAttribute("purchase", p);
		return "printApplyForm";
	}
	
	@ActionLog(description = "打印验收单")
	public String printReceiveForm() {
		Purchase p = purchaseService.getTranslateFull(purchaseId);
		p.setRemark(p.getRemark().replaceAll("\\r\\n", "</br>"));
		p.setPurchaseSerial(p.getPurchaseSerial().substring(0, 8)+p.getPurchaseSerial().substring(8,p.getPurchaseSerial().length()));
		BigDecimal summary = BigDecimal.ZERO;
		for(PurchaseBrief pb : p.getPurchaseBriefSet()){
			summary = summary.add(pb.getSummary());
		}
		getRequest().setAttribute("purchase", p);
		getRequest().setAttribute("summary", summary);
		if(!summary.equals(new BigDecimal("0.00"))&&!summary.equals(BigDecimal.ZERO)){
			getRequest().setAttribute("SUMMARY", BigDecimalUtil.parserDigAmount(summary));
		}else{
			getRequest().setAttribute("SUMMARY", "零圆整");
		}
//		AppUser user = ApplicationContainer.getCurrentUser();
		QueryFilter qf = new QueryFilter();
		qf.addConjunctFilter("Q_userId_L_EQ", p.getUserId()+"");
		List<Practitioner> list = practitionerService.getAll(qf);
		if(list.size()>0){
		getRequest().setAttribute("CorpName", list.get(0).getDepartment().getDepName());
		}
		return "printReceiveForm";
	}
}
