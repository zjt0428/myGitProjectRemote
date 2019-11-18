/**
 *====================================================
 * 文件名称: AutocraneServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年1月20日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.AutocraneDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.Autocrane;
import com.knight.emms.service.AutocraneService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: AutocraneServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年1月20日 下午7:10:49
 */
public class AutocraneServiceImpl extends BaseBusinessModelServiceImpl<Autocrane> implements AutocraneService, FundPaymentVoucherService {

	private AutocraneDao autocraneDao;

	public AutocraneServiceImpl(AutocraneDao dao) {
		super(dao);
		this.autocraneDao = dao;
	}

	@Override
	public List<Autocrane> queryTranslateAllFull(QueryFilter filter) {
		List<Autocrane> list = autocraneDao.getAll(filter);
		for (Autocrane a : list) {
			CodeServiceImpl.translate(a);
			CodeServiceImpl.translate(a.getEquipment());
		}
		return list;
	}

	@Override
	public Autocrane getTranslateFull(Long autocraneId) {
		Autocrane a = autocraneDao.get(autocraneId);
		CodeServiceImpl.translate(a);
		CodeServiceImpl.translate(a.getEquipment());
		return a;
	}

	@Override
	public void saveOrMergeForEdit(Autocrane autocrane) {
		if (autocrane.getAutocraneId() == null) {
			autocraneDao.saveSerialModel(autocrane);
		}
		autocrane.setSubAutocrane();
		autocraneDao.merge(autocrane);
	}

	@Override
	public BigDecimal getRelatePaymentAmount(Long autocraneId) {
		Autocrane autocrane = autocraneDao.get(autocraneId);
		return autocrane.getAutocraneAmount();
	}

	@Override
	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long autocraneId, String status) {
		Autocrane autocrane = autocraneDao.get(autocraneId);
		autocrane.setPaymentAmount(amountPayment.getHasPaymentAmount());
		autocrane.setBalanceAmount(autocrane.getAutocraneAmount().subtract(autocrane.getPaymentAmount()));
		autocrane.setFundStatus(status);
		autocraneDao.save(autocrane);
	}

}
