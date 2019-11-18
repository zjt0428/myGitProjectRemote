/**
 *====================================================
 * 文件名称: AmountReceiveServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.BindingParamFilters;
import com.knight.core.service.ExportService;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.AmountEquipShareDao;
import com.knight.emms.dao.AmountReceiveDao;
import com.knight.emms.dao.AmountReceiveShareDao;
import com.knight.emms.dao.ClosedSettleInfoDao;
import com.knight.emms.dao.CorpAccountDao;
import com.knight.emms.domain.FundReceiveVoucherService;
import com.knight.emms.service.AmountReceiveService;
import com.knight.emms.service.ReceivementService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: AmountReceiveServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:26:33
 */
public class AmountReceiveServiceImpl extends BusinessFlowServiceImpl<AmountReceive> implements AmountReceiveService,ExportService {

	private AmountReceiveDao amountReceiveDao;

	@Resource
	private AmountReceiveShareDao amountReceiveShareDao;

	@Resource
	private AmountEquipShareDao amountEquipShareDao;

	@Resource
	private ReceivementService receivementService;

	@Resource
	private CorpAccountDao corpAccountDao;
	
	@Resource
	private ClosedSettleInfoDao closedSettleInfoDao;

	@Setter
	private Map<String, FundReceiveVoucherService> fundReceiveVoucherServices = new HashMap<String, FundReceiveVoucherService>();

    @Resource
    private BusinessMessageService businessMessageService;

	public AmountReceiveServiceImpl(AmountReceiveDao dao) {
		super(dao);
		this.amountReceiveDao = dao;
	}

	private void computeAmountReceive(AmountReceive amountReceive, boolean passReview) {
		BigDecimal relateAmount = BigDecimal.ZERO;
		if (amountReceive.getRelateId() != null) {
			//获取相对于该结算单的已收金额
			BigDecimal hasReceiveAmount = amountReceiveShareDao.queryForDefaultObjectByScript("amount.relate_receive", BigDecimal.class, BigDecimal.ZERO, amountReceive.getRelateId(), amountReceive.getRelateModule());
			if (passReview) {
				hasReceiveAmount = hasReceiveAmount.add(amountReceive.getReceiveAmount());
			}
			amountReceive.setHasReceiveAmount(hasReceiveAmount);
			//获取该结算单的本期结算金额
			if (fundReceiveVoucherServices.containsKey(amountReceive.getRelateModule())) {
				FundReceiveVoucherService fundService = fundReceiveVoucherServices.get(amountReceive.getRelateModule());
				relateAmount = fundService.getRelateReceiveAmount(amountReceive.getRelateId());
			}
		} else {
			amountReceive.setHasReceiveAmount(BigDecimal.ZERO);
		}
		amountReceive.setRelateAmount(relateAmount);
		//应收款余额=结算单的本期结算金额 - 已收金额（含本次）
		amountReceive.setReceivableDebit(relateAmount.subtract(amountReceive.getHasReceiveAmount()));
	}

	public AmountReceive getTranslateFull(Long amountReceiveId) {
		AmountReceive e = amountReceiveDao.get(amountReceiveId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		for (AmountReceiveShare s : e.getAmountReceiveShareSet()) {
			CodeServiceImpl.translate(s, amountReceiveShareDao.getPersistantStruct());
		}
		for (AmountEquipShare s : e.getAmountEquipShareSet()) {
			CodeServiceImpl.translate(s, amountEquipShareDao.getPersistantStruct());
		}
		return e;
	}

	@Override
	public void saveOrMergeForEdit(AmountReceive amountReceive) {
		isCloseSettle(amountReceive);
		if (StringUtils.isNotBlank(amountReceive.getAmountSerial())) {
			BindingParamFilters params = new BindingParamFilters();
			params.addFilter("amountSerial", "EQ", amountReceive.getAmountSerial());
			params.addFilter("delFlag", "EQ", Constant.ENABLED);
			if (amountReceive.getAmountReceiveId() != null) {
				params.addFilter("amountReceiveId", "NEQ", amountReceive.getAmountReceiveId());
			}
			List<AmountReceive> list = amountReceiveDao.getAll(params);
			if (list != null && !list.isEmpty()) {
				throw new BusinessException("票据单号[" + amountReceive.getAmountSerial() + "]已经存在!");
			}
		}
		if (amountReceive.getAmountReceiveId() == null) {
			amountReceiveDao.saveSerialModel(amountReceive);
		}
		computeAmountReceive(amountReceive, false);
		amountReceive.setSubAmountReceive();
		amountReceiveDao.merge(amountReceive);
	}

	public void deleteShare(Long receiveShareId) {
		AmountReceiveShare ars = amountReceiveShareDao.get(receiveShareId);
		AmountReceive p = amountReceiveDao.get(ars.getAmountReceiveId());
		isCloseSettle(p);
		amountReceiveShareDao.remove(receiveShareId);
	}

	public void passApproveApplication(FormApprove formApprove) {
		AmountReceive t = super.passFlowApproveApplication(formApprove);
		isCloseSettle(t);
		computeAmountReceive(t, true);
		for (AmountReceiveShare s : t.getAmountReceiveShareSet()) {
			// 回款计划
			Receivement r = receivementService.get(s.getReceivementId());
			r.setAlreadyReceivement(r.getAlreadyReceivement().add(s.getPresentReceivement())); // 已回款额+当前回款额
			if (r.getReceivement().compareTo(r.getAlreadyReceivement()) == 1) {
				r.setStatus(Status.Fund.receiving);
			} else {
				r.setStatus(Status.Fund.received);
			}
			receivementService.save(r);
		}
		// 关联业务的回款状态
		/*if (fundReceiveVoucherServices.containsKey(t.getRelateModule())) {
			FundReceiveVoucherService fundService = fundReceiveVoucherServices.get(t.getRelateModule());
			if (t.getRelateAmount().compareTo(t.getHasReceiveAmount()) == 1) { // 关联业务金额 > 已回金额 + 本次回款金额
				fundService.saveRelateAmountReceiveStatus(t, t.getRelateId(), Status.Fund.receiving);
			} else {
				fundService.saveRelateAmountReceiveStatus(t, t.getRelateId(), Status.Fund.received);
			}
		}*/
		if (t.getReceiveAmount().compareTo(t.getRelateAmount().subtract(t.getHasReceiveAmount())) == -1) { // 本次回款金额 < (关联业务金额 - 已回金额)
			t.setReceiveStatus(Status.InvoiceAmount.unfinished);
		} else { // 0:是等于,1:是大于
			t.setReceiveStatus(Status.InvoiceAmount.finished);
		}
		// 企业帐户余额-收款
		if (t.getReceiveEntAccountId() != null && SystemConstant.MODULE_CORP.equals(t.getReceiveModule())) {
			CorpAccount account = corpAccountDao.get(t.getReceiveEntAccountId());
			if (account != null) {
				account.setBalance(account.getBalance().add(t.getReceiveAmount()));
				corpAccountDao.save(account);
			}
		}
		// 收款审批通过,发送消息
		List<Map<String,Object>> list = amountReceiveDao.queryByScript("remaind.amount_receive_approve", t.getAmountReceiveId());
		for(Map<String,Object> map:list){
			BusinessMessage bm = new BusinessMessage();
			bm.setReceiveTel((String)map.get("REMAIND_TEL"));
			bm.setMessage((String)map.get("MESSAGE"));
			bm.setSenderName("收款消息");
			businessMessageService.sendOnce(bm);
		}
		amountReceiveDao.save(t);
	}
	
	public void isCloseSettle(AmountReceive amountReceive){
		String providedDate = amountReceive.getProvidedDate().substring(0,7);
		String receiveDate = amountReceive.getReceiveDate().substring(0,7);
		List<Map<String, Object>> list = closedSettleInfoDao.queryByScript("settle.close_settle_by_months",providedDate,receiveDate);
		if(list!=null && list.size()>0){
			throw new BusinessException("填报日期和收款日期处于关账期间，无法操作！");
		}
	}
	
	@Override
	public void rejectApproveApplication(FormApprove formApprove) {
		AmountReceive t = super.rejectFlowApproveApplication(formApprove);
		isCloseSettle(t);
	}
}
