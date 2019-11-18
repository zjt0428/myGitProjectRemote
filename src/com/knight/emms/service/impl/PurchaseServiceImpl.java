/**
 *====================================================
 * 文件名称: PurchaseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.emms.model.*;
import com.knight.emms.service.*;
import org.apache.commons.lang.StringUtils;

import com.google.gson.reflect.TypeToken;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.PurchaseAcceptanceDao;
import com.knight.emms.dao.PurchaseBriefDao;
import com.knight.emms.dao.PurchaseDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.domain.FundReceiveVoucherService;
import com.knight.emms.domain.SchedularDispatchDomain;
import com.knight.emms.support.FundPlanSupport;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: PurchaseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-10 下午11:02:11
 */
public class PurchaseServiceImpl extends BusinessFlowServiceImpl<Purchase> implements PurchaseService, FundReceiveVoucherService, FundPaymentVoucherService {

	private PurchaseDao purchaseDao;

	@Resource
	private PurchaseAcceptanceDao purchaseAcceptanceDao;

	@Resource
	private PurchaseBriefDao purchaseBriefDao;

	@Resource
	private ReceivementService receivementService;

	@Resource
	private InstalmentService instalmentService;

	@Resource
	private ComponentService componentService;

	@Resource
	private SchedularDispatchDomain dispatchSchedularDomain;

    @Resource
    private BusinessMessageService businessMessageService;

	@Resource
	private CodeService codeService;

	public PurchaseServiceImpl(PurchaseDao dao) {
		super(dao);
		this.purchaseDao = dao;
	}

	public Purchase getTranslateFull(Long purchaseId) {
		Purchase p = purchaseDao.get(purchaseId);
		CodeServiceImpl.translate(p, getPersistantStruct());
		for (PurchaseBrief c : p.getPurchaseBriefSet()) {
			CodeServiceImpl.translate(c, purchaseBriefDao.getPersistantStruct());
		}
		for (Instalment c : p.getInstalmentSet()) {
			CodeServiceImpl.translate(c, instalmentService.getPersistantStruct());
		}
		for (PurchaseAcceptance c : p.getPurchaseAcceptanceSet()) {
			CodeServiceImpl.translate(c, purchaseAcceptanceDao.getPersistantStruct());
		}
		for (Receivement c : p.getReceivementSet()) {
			CodeServiceImpl.translate(c, receivementService.getPersistantStruct());
		}
		return p;
	}

	public List<PurchaseBrief> queryBriefAll(QueryFilter filter) {
		filter.getPagingBean().setPageSize(1000);
		List<PurchaseBrief> briefs = purchaseBriefDao.getAll(filter);
		for (PurchaseBrief b : briefs) {
			b.setStatusName(codeService.getValue("PURCHASE_ACCEPTANCE_STATE", b.getStatus()));
		}
		return briefs;
	}

	public void saveOrMergeForEdit(Purchase purchase) {
		if (purchase.getPurchaseId() == null) {
			purchaseDao.saveSerialModel(purchase,purchase.getProvidedDate().replace("-", ""));
		}
		purchase.setSubPurchase();
		purchaseDao.merge(purchase);

		purchase.setInstalmentSet(FundPlanSupport.createInstalment(purchase));
		instalmentService.saveOrMeger(purchase.getInstalmentSet());
	}

	public void deletedBrief(Long purchaseBriefId) {
		purchaseBriefDao.remove(purchaseBriefId);
	}

	protected Purchase passFlowApproveApplication(FormApprove formApprove) {
		Purchase p = super.passFlowApproveApplication(formApprove);
		CodeServiceImpl.translate(p);
		Purchase t = getTranslateFull(p.getPurchaseId());
		for (PurchaseBrief b : t.getPurchaseBriefSet()) {
			if (Status.PurchaseAcc.initial.equals(b.getStatus()) || Status.PurchaseAcc.exchange.equals(b.getStatus())) {

				b.setStatus("1");
				b.setUserId(p.getUserId());
				b.setUserName(p.getUserName());
				b.setAcceptanceDate(DateUtil.getCurrentLinkDateStr());
				purchaseBriefDao.save(b);

				Component component = componentService.getTranslate(b.getComponId());
					if (Constant.ENABLED.equals(component.getConsumeFlag())) {
//						Map<String, Object> unit = componentService.queryByScript("purchase.caculate_component_unit_price", b.getComponId()).get(0);
						if (component.getUnitprice() == null) {
							component.setUnitprice(BigDecimal.ZERO);
						}
						BigDecimal totalCounts = new BigDecimal(component.getTotalCounts());
						BigDecimal quantity = new BigDecimal(b.getQuantity());
						component.setUnitprice((  (component.getUnitprice().multiply(totalCounts)).add(b.getUnitPrice().multiply(quantity)) ).divide(totalCounts.add(quantity), 2) );
//						component.setUnitprice(component.getUnitprice().add(b.getUnitPrice()).add((BigDecimal) unit.get("UNIT_PRICE")).divide(new BigDecimal(2 + (Integer) unit.get("COUNTS")), 2));
						component.setConsumeCounts(component.getConsumeCounts() + b.getQuantity());
						Integer inusecount = (Integer) componentService.queryByScript("store.count_single_compon_inuse", b.getComponId()).get(0).get("COUNTS");
						component.setAssetValue(component.getUnitprice().multiply(new BigDecimal(component.getConsumeCounts() + inusecount)));
						componentService.save(component);
					}
			}
		}
		// 发送通知消息
		if (!p.getInstalmentSet().isEmpty()) {
			Instalment instalment = p.getInstalmentSet().iterator().next();
			List<Map<String,Object>> list = purchaseDao.queryByScript("remaind.purchase_approve", p.getPurchaseId(), p.getPurchaseSerial(), p.getPurchaseThemeName(), instalment.getPayDate());
			for(Map<String,Object> map:list){
				BusinessMessage bm = new BusinessMessage();
				bm.setReceiveTel((String)map.get("REMAIND_TEL"));
				bm.setMessage((String)map.get("MESSAGE"));
				bm.setSenderName("采购消息");
				businessMessageService.sendOnce(bm);
			}
		}
		return p;
	}
	
	public Purchase onekeyApprove(Purchase p) {
		Purchase t = getTranslateFull(p.getPurchaseId());

		for (PurchaseBrief b : t.getPurchaseBriefSet()) {
			if (Status.PurchaseAcc.initial.equals(b.getStatus()) || Status.PurchaseAcc.exchange.equals(b.getStatus())) {

				b.setStatus("1");
				b.setUserId(p.getUserId());
				b.setUserName(p.getUserName());
				b.setAcceptanceDate(DateUtil.getCurrentLinkDateStr());
				purchaseBriefDao.save(b);

				Component component = componentService.getTranslate(b.getComponId());
					if (Constant.ENABLED.equals(component.getConsumeFlag())) {
//						Map<String, Object> unit = componentService.queryByScript("purchase.caculate_component_unit_price", b.getComponId()).get(0);
						if (component.getUnitprice() == null) {
							component.setUnitprice(BigDecimal.ZERO);
						}
						BigDecimal totalCounts = new BigDecimal(component.getTotalCounts());
						BigDecimal quantity = new BigDecimal(b.getQuantity());
						component.setUnitprice((  (component.getUnitprice().multiply(totalCounts)).add(b.getUnitPrice().multiply(quantity)) ).divide(totalCounts.add(quantity), 2) );
//						component.setUnitprice(component.getUnitprice().add(b.getUnitPrice()).add((BigDecimal) unit.get("UNIT_PRICE")).divide(new BigDecimal(2 + (Integer) unit.get("COUNTS")), 2));
						component.setConsumeCounts(component.getConsumeCounts() + b.getQuantity());
						Integer inusecount = (Integer) componentService.queryByScript("store.count_single_compon_inuse", b.getComponId()).get(0).get("COUNTS");
						component.setAssetValue(component.getUnitprice().multiply(new BigDecimal(component.getConsumeCounts() + inusecount)));
						componentService.save(component);
					}
			}
		}
		
		CodeServiceImpl.translate(p);
		// 发送通知消息
		if (!p.getInstalmentSet().isEmpty()) {
			Instalment instalment = p.getInstalmentSet().iterator().next();
			List<Map<String,Object>> list = purchaseDao.queryByScript("remaind.purchase_approve", p.getPurchaseId(), p.getPurchaseSerial(), p.getPurchaseThemeName(), instalment.getPayDate());
			for(Map<String,Object> map:list){
				BusinessMessage bm = new BusinessMessage();
				bm.setReceiveTel((String)map.get("REMAIND_TEL"));
				bm.setMessage((String)map.get("MESSAGE"));
				bm.setSenderName("采购消息");
				businessMessageService.sendOnce(bm);
			}
		}
		return p;
	}
	public void acceptance(PurchaseAcceptance acc, String accMethod) {
		Purchase t = getTranslateFull(acc.getPurchaseId());
		List<Long> briefIds = GsonUtil.fromJson(acc.getPurchaseBriefIds(), new TypeToken<List<Long>>() {});
		boolean finishedFlag = true;
		for (PurchaseBrief b : t.getPurchaseBriefSet()) {
			if (Status.PurchaseAcc.initial.equals(b.getStatus()) || Status.PurchaseAcc.exchange.equals(b.getStatus())) {
				if (!briefIds.contains(b.getPurchaseBriefId())) {
					finishedFlag = false;
					continue;
				}
				b.setStatus(accMethod);
				b.setUserId(acc.getUserId());
				b.setUserName(acc.getUserName());
				b.setAcceptanceDate(DateUtil.getCurrentLinkDateStr());
				purchaseBriefDao.save(b);
				if (Status.PurchaseAcc.qualified.equals(b.getStatus()) && b.getComponId() != null) {
					Component component = componentService.get(b.getComponId());
					if (Constant.ENABLED.equals(component.getConsumeFlag())) {
						Map<String, Object> unit = componentService.queryByScript("purchase.caculate_component_unit_price", b.getComponId()).get(0);
						if (component.getUnitprice() == null) {
							component.setUnitprice(BigDecimal.ZERO);
						}
						component.setUnitprice(component.getUnitprice().add(b.getUnitPrice()).add((BigDecimal) unit.get("UNIT_PRICE")).divide(new BigDecimal(2 + (Integer) unit.get("COUNTS")), 2));
						component.setConsumeCounts(component.getConsumeCounts() + b.getQuantity());
						Integer inusecount = (Integer) componentService.queryByScript("store.count_single_compon_inuse", b.getComponId()).get(0).get("COUNTS");
						component.setAssetValue(component.getUnitprice().multiply(new BigDecimal(component.getConsumeCounts() + inusecount)));
						componentService.save(component);
					}
				}
			}
		}
		purchaseAcceptanceDao.save(acc);

		String message = null;
		if (Status.PurchaseAcc.returned.equals(accMethod)) {
			// 预计赔付到账时间保存至借用主表(取最大时间-统计使用)
			long a = Long.parseLong(acc.getRefundPlanDate().replaceAll("[^0-9]", ""));
			long b = StringUtils.isBlank(t.getSquareAccDate()) ? 0 : Long.parseLong(t.getSquareAccDate().replaceAll("[^0-9]", ""));
			if (a > b) {
				t.setSquareAccDate(acc.getRefundPlanDate());
			}
			t.setReceivements(acc.getReceivements());
			t.setReceivementSet(FundPlanSupport.createReceivement(t));
			receivementService.saveOrMeger(t.getReceivementSet());
			if (t.getReceivementSet() != null && !t.getReceivementSet().isEmpty()) {
				t.setFundAccStatus(Status.Fund.receive);
			}
			// 采购验收不合格(退货退款)通知
			message = "采购单号:" + t.getPurchaseSerial() + ",主题:" + t.getPurchaseThemeName() + " 于" + acc.getProvidedDate() + "到货验收不合格，现已办理退货退款处理，计划于" + acc.getRefundPlanDate() + "退款到账，请跟进办理进度";
		} else if (Status.PurchaseAcc.exchange.equals(accMethod)) {
			finishedFlag = false;
			// 采购验收不合格(换货)通知
			message = "采购单号:" + t.getPurchaseSerial() + ",主题:" + t.getPurchaseThemeName() + " 于" + acc.getProvidedDate() + "到货验收不合格，现已办理换货处理，计划于" + acc.getArrivalPlanDate() + "到货，请跟进办理进度";
		} else if (Status.PurchaseAcc.qualified.equals(accMethod)) {
			// 采购验收合格通知
			message = "采购单号:" + t.getPurchaseSerial() + ",主题:" + t.getPurchaseThemeName() + " 已于" + acc.getProvidedDate() + "到货，现已验收合格并完成入库";
		}
		// 消息通知
		if (message != null) {
            List<Map<String,Object>> list = purchaseDao.queryByScript("remaind.purchase_acc", t.getPurchaseId(), message);
            for(Map<String,Object> map:list){
                BusinessMessage bm = new BusinessMessage();
                bm.setReceiveTel((String)map.get("REMAIND_TEL"));
                bm.setMessage((String)map.get("MESSAGE"));
                bm.setSenderName("采购消息");
                businessMessageService.sendOnce(bm);
            }
        }

		if (finishedFlag) {
			t.setAccDate(DateUtil.getCurrentLinkDateStr());
			t.setApplyforState(Status.PurchaseApplyfor.finished);
		} else {
			if (Status.PurchaseAcc.exchange.equals(accMethod) || Status.PurchaseAcc.returned.equals(accMethod)) {
				t.setApplyforState(accMethod);
			} else {
				t.setApplyforState(Status.PurchaseAcc.waitacc);
			}
		}
		purchaseDao.save(t);
	}

	// ====================================================================================//
	public BigDecimal getRelatePaymentAmount(Long purchaseId) {
		Purchase p = purchaseDao.get(purchaseId);
		return p.getPurchaseAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long purchaseId, String status) {
		Purchase p = purchaseDao.get(purchaseId);
		p.setPaymentAmount(amountPayment.getHasPaymentAmount());
		p.setFundStatus(status);
		purchaseDao.save(p);
	}

	public BigDecimal getRelateReceiveAmount(Long purchaseId) {
		BigDecimal damagesin = receivementService.queryForDefaultObjectByScript("amount.relate_receivement_amount", BigDecimal.class, BigDecimal.ZERO, purchaseId, SystemConstant.MODULE_PURCHASE);
		return damagesin;
	}

	/** 赔付回款状态 */
	public void saveRelateAmountReceiveStatus(AmountReceive amountReceive, Long purchaseId, String status) {
		Purchase p = purchaseDao.get(purchaseId);
		p.setFundAccStatus(status);
		purchaseDao.save(p);
	}

}
