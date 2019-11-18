/**
 *====================================================
 * 文件名称: AmountPaymentServiceImpl.java
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

import org.apache.commons.lang.StringUtils;

import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.BindingParamFilters;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.AmountEquipShareDao;
import com.knight.emms.dao.AmountPaymentDao;
import com.knight.emms.dao.AmountPaymentShareDao;
import com.knight.emms.dao.CorpAccountDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.AmountEquipShare;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.AmountPaymentShare;
import com.knight.emms.model.CorpAccount;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.Instalment;
import com.knight.emms.service.AmountPaymentService;
import com.knight.emms.service.InstalmentService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: AmountPaymentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:25:38
 */
public class AmountPaymentServiceImpl extends BusinessFlowServiceImpl<AmountPayment> implements AmountPaymentService {

	private AmountPaymentDao amountPaymentDao;

	@Resource
	private AmountPaymentShareDao amountPaymentShareDao;

	@Resource
	private AmountEquipShareDao amountEquipShareDao;

	@Resource
	private InstalmentService instalmentService;

	@Resource
	private CorpAccountDao corpAccountDao;

	@Setter
	private Map<String, FundPaymentVoucherService> fundPaymentVoucherServices = new HashMap<String, FundPaymentVoucherService>();

	public AmountPaymentServiceImpl(AmountPaymentDao dao) {
		super(dao);
		this.amountPaymentDao = dao;
	}

	private void computeAmountPayment(AmountPayment amountPayment, boolean passReview) {
		BigDecimal relateAmount = BigDecimal.ZERO;
		if (amountPayment.getRelateId() != null) {
			BigDecimal hasPaymentAmount = amountPaymentDao.queryForDefaultObjectByScript("amount.relate_pay", BigDecimal.class, BigDecimal.ZERO, amountPayment.getRelateId(), amountPayment.getRelateModule());
			if (passReview) {
				hasPaymentAmount = hasPaymentAmount.add(amountPayment.getPaymentAmount());
			}
			amountPayment.setHasPaymentAmount(hasPaymentAmount);
			if (fundPaymentVoucherServices.containsKey(amountPayment.getRelateModule())) {
				FundPaymentVoucherService fundService = fundPaymentVoucherServices.get(amountPayment.getRelateModule());
				relateAmount = fundService.getRelatePaymentAmount(amountPayment.getRelateId());
			}
		} else {
			amountPayment.setHasPaymentAmount(BigDecimal.ZERO);
		}
		if(!BigDecimal.ZERO.equals(amountPayment.getRelateAmount()) && amountPayment.getRelateAmount()!=null){
			relateAmount = amountPayment.getRelateAmount();
		}
		amountPayment.setRelateAmount(relateAmount);
		amountPayment.setPayableDebit(relateAmount.subtract(amountPayment.getHasPaymentAmount()));
	}

	public AmountPayment getTranslateFull(Long amountPaymentId) {
		AmountPayment e = amountPaymentDao.get(amountPaymentId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		for (AmountPaymentShare s : e.getAmountPaymentShareSet()) {
			CodeServiceImpl.translate(s, amountPaymentShareDao.getPersistantStruct());
		}
		for (AmountEquipShare s : e.getAmountEquipShareSet()) {
			CodeServiceImpl.translate(s, amountEquipShareDao.getPersistantStruct());
		}
		return e;
	}

	@Override
	public void saveOrMergeForEdit(AmountPayment amountPayment) {
		BindingParamFilters params = new BindingParamFilters();
		if (StringUtils.isNotBlank(amountPayment.getAmountSerial())) {
			params.addFilter("amountSerial", "EQ", amountPayment.getAmountSerial());
			params.addFilter("delFlag", "EQ", Constant.ENABLED);
			if (amountPayment.getAmountPaymentId() != null) {
				params.addFilter("amountPaymentId", "NEQ", amountPayment.getAmountPaymentId());
			}
			List<AmountPayment> list = amountPaymentDao.getAll(params);
			if (list != null && !list.isEmpty()) {
				throw new BusinessException("票据单号[" + amountPayment.getAmountSerial() + "]已经存在!");
			}
		}

		if (amountPayment.getAmountPaymentId() == null) {
			amountPaymentDao.saveSerialModel(amountPayment);
		}
		computeAmountPayment(amountPayment, true);
//		if (amountPayment.getPayableDebit().compareTo(BigDecimal.ZERO) == -1) {
//			throw new BusinessException("付款金额大于当前应付金额，请重新输入付款金额");
//		}

		amountPayment.setSubAmountPayment();
		amountPaymentDao.merge(amountPayment);
	}

	public void deleteShare(Long paymentShareId) {
		amountPaymentShareDao.remove(paymentShareId);
	}

	public void passApproveApplication(FormApprove formApprove) {
		AmountPayment t = super.passFlowApproveApplication(formApprove);
		computeAmountPayment(t, true);
		for (AmountPaymentShare s : t.getAmountPaymentShareSet()) { // 付款计划款项状态
			Instalment r = instalmentService.get(s.getInstalmentId());
			r.setAlreadyPayment(r.getAlreadyPayment().add(s.getPresentPayment())); // 已付款额+当前付款额
			if (r.getPayment().compareTo(r.getAlreadyPayment()) == 1) {
				r.setStatus(Status.Fund.paymenting);
			} else {
				r.setStatus(Status.Fund.paymented);
			}
			instalmentService.save(r);
		}
		// 关联业务的付款状态
		if (fundPaymentVoucherServices.containsKey(t.getRelateModule())) {
			FundPaymentVoucherService fundService = fundPaymentVoucherServices.get(t.getRelateModule());
			if (t.getRelateAmount().compareTo(t.getHasPaymentAmount()) == 1) { // 关联业务金额 > (已付金额 + 本次付款金额)
				fundService.saveRelateAmountPaymentStatus(t, t.getRelateId(), Status.Fund.paymenting);
			} else {
				fundService.saveRelateAmountPaymentStatus(t, t.getRelateId(), Status.Fund.paymented);
			}
		}
		if (t.getPaymentAmount().compareTo(t.getRelateAmount().subtract(t.getHasPaymentAmount())) == -1) { // 本次付款金额 < (关联业务金额 - 已付金额)
			t.setPaymentStatus(Status.InvoiceAmount.unfinished);
		} else { // 0:是等于,1:是大于
			t.setPaymentStatus(Status.InvoiceAmount.finished);
		}
		// 企业帐户余额-付款
		if (t.getPaymentEntAccountId() != null && SystemConstant.MODULE_CORP.equals(t.getPaymentModule())) {
			CorpAccount account = corpAccountDao.get(t.getPaymentEntAccountId());
			if (account != null) {
				account.setBalance(account.getBalance().subtract(t.getPaymentAmount()));
				corpAccountDao.save(account);
			}
		}
		amountPaymentDao.save(t);
	}

}
