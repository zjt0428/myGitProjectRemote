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


import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.PurchasePlan;
import com.knight.emms.model.PurchasePlanInquiry;
import com.knight.emms.service.PurchasePlanService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: PurchaseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 下午11:03:22
 */
public class PurchasePlanAction extends BaseAction{

	private static final long serialVersionUID = 1L;
	
	@Getter
	@Setter
	private PurchasePlan purchasePlan;
	
	@Getter
	@Setter
	private Long purchasePlanId;
	
	@Resource
	private PurchasePlanService purchasePlanService;


	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PurchasePlan> list = purchasePlanService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		PurchasePlan p = purchasePlanService.getTranslateFull(purchasePlanId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	public String listInquiry(){
		QueryFilter filter = new QueryFilter(getRequest());
		List<PurchasePlanInquiry> list = purchasePlanService.queryInquiryAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	
	@ActionLog(description = "新增或更新采购信息")
	public String save() {
		if (purchasePlan.getPurchasePlanId() == null) {
			purchasePlan.setApplyforState(Status.PurchasePlanApplyfor.waitSubmit);
			purchasePlan.setApplyforStateName("待提交");
		} else {
			PurchasePlan p = purchasePlanService.get(purchasePlan.getPurchasePlanId());
			purchasePlan.setPurchasePlanId(p.getPurchasePlanId());
			purchasePlan.setPersonName(p.getPersonName());
			purchasePlan.setFillDate(p.getFillDate());
			purchasePlan.setApplyforState(p.getApplyforState());
			purchasePlan.setApplyforStateName(p.getApplyforStateName());
//			if(Status.PurchasePlanApplyfor.waitSubmit.equals(p.getApplyforState())){
//				purchasePlan.setApplyforState(Status.PurchasePlanApplyfor.waitSubmit);
//			}
			if(Status.PurchasePlanApplyfor.fill.equals(p.getApplyforState())){
				purchasePlan.setApplyforState(Status.PurchasePlanApplyfor.waitApprove);
				purchasePlan.setApplyforStateName("待审批");
			}
		}
		purchasePlan.setDelflag(Constant.ENABLED);
		purchasePlanService.saveOrMergeForEdit(purchasePlan);
		return SUCCESS;
	}
	
	@ActionLog(description = "提交采购信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PurchasePlan p = purchasePlanService.get(new Long(id));
			if (Status.PurchasePlanApplyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.PurchasePlanApplyfor.fill);
				p.setApplyforStateName("待填报");
				purchasePlanService.save(p);
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除采购信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PurchasePlan p = purchasePlanService.get(new Long(id));
			p.setDelflag(Constant.DISENABLED);
			purchasePlanService.save(p);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "打印物资采购申请表")
	public String print() {
		PurchasePlan p = purchasePlanService.getTranslateFull(purchasePlanId);
		getRequest().setAttribute("purchasePlan", p);
		return "print";
	}
	
	@ActionLog(description = "一键审批")
	public String onekeyApprove() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			PurchasePlan p = purchasePlanService.getTranslateFull(new Long(id));
				p.setApplyforState(Status.PurchasePlanApplyfor.finished);
				p.setApplyforStateName("通过");
				purchasePlanService.save(p);
				
		}
		return SUCCESS;
	}
	public String multiDelInquiry() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			purchasePlanService.deletedInquiry(new Long(id));
		}
		return SUCCESS;
	}
}
