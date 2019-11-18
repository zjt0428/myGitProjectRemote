/**
 *====================================================
 * 文件名称: DeductServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.Date;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.EmmsConstant;
import com.knight.emms.constant.Type;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.DeductDao;
import com.knight.emms.dao.DeductPractiDao;
import com.knight.emms.dao.DeductScaleDao;
import com.knight.emms.model.Deduct;
import com.knight.emms.model.DeductPracti;
import com.knight.emms.model.DeductScale;
import com.knight.emms.model.FormApprove;
import com.knight.emms.service.DeductService;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: DeductServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:27:37
 */
public class DeductServiceImpl extends BusinessFlowServiceImpl<Deduct> implements DeductService {

	private DeductDao deductDao;

	@Resource
	private DeductScaleDao deductScaleDao;

	@Resource
	private DeductPractiDao deductPractiDao;

	@Resource
	private CodeService codeService;

	public DeductServiceImpl(DeductDao dao) {
		super(dao);
		this.deductDao = dao;
	}

	private void computeDeduct(Deduct deduct) {
		// 合同支出费用(采购/报销/付款)
		BigDecimal disbursement = deductPractiDao.queryForDefaultObjectByScript("fund.contract_relate_pay", BigDecimal.class, BigDecimal.ZERO, deduct.getContractId());
		deduct.setDisbursement(disbursement);
		// 合同提成比例及金额
		BigDecimal deductBaseAmount = null;
		if (Type.DeductCardinal.real.equals(deduct.getCardinal())) { // 合同实收款
			deductBaseAmount = deduct.getContractAmount();
		} else { // 合同毛利
			deductBaseAmount = deduct.getContractAmount().subtract(disbursement);
		}
		BigDecimal percent = null;
		if (Type.DeductProport.simple.equals(deduct.getProportionType())) {
			DeductScale scale = deductScaleDao.get(DeductScale.SIMPLE);
			percent = scale.getScalePercent();
		} else {
			percent = deductScaleDao.getPercent(deduct.getContractAmount());
		}
		if (percent == null || BigDecimal.ZERO.equals(percent)) {
			throw new BusinessException("未查询到提成比例信息,请检查提成比例设置!");
		}
		deduct.setProportion(percent);
		deduct.setDeductTotalAmount(deductBaseAmount.multiply(percent).divide(EmmsConstant.HUNDRED));
	}

	public Deduct getTranslateFull(Long deductId) {
		Deduct d = deductDao.get(deductId);
		CodeServiceImpl.translate(d, getPersistantStruct());
		for (DeductPracti p : d.getDeductPractiSet()) {
			p.setPickupStatusName(codeService.getValue("DEDUCT_PICKUP_STATUS", p.getPickupStatus()));
		}
		return d;
	}

	public void saveOrMergeForEdit(Deduct deduct) {
		computeDeduct(deduct);
		if (deduct.getDeductId() == null) {
			deductDao.saveSerialModel(deduct);
		}
		deduct.setSubDeduct();
		deductDao.merge(deduct);
	}

	protected Deduct passFlowApproveApplication(FormApprove formApprove) {
		Deduct deduct = super.passFlowApproveApplication(formApprove);
		BigDecimal srcAmount = deduct.getDeductTotalAmount();
		computeDeduct(deduct);
		if (srcAmount.compareTo(deduct.getDeductTotalAmount()) != 0) {
			for (DeductPracti dp : deduct.getDeductPractiSet()) {
				dp.setReward(deduct.getDeductTotalAmount().multiply(dp.getProportion().divide(EmmsConstant.HUNDRED)));
			}
		}
		deduct.setApplyforPassDate(new Date());
		return deduct;
	}

	public void deletedPracti(Long deductPractiId) {
		deductPractiDao.remove(deductPractiId);
	}

}
