/**
 *====================================================
 * 文件名称: DispatchAutocraneServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年5月16日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;

import com.knight.emms.dao.DispatchAutocraneDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.DispatchAutocrane;
import com.knight.emms.service.DispatchAutocraneService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: DispatchAutocraneServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年5月16日 下午4:29:34
 */
public class DispatchAutocraneServiceImpl extends BusinessLongPKServiceImpl<DispatchAutocrane> implements DispatchAutocraneService, FundPaymentVoucherService {

	private DispatchAutocraneDao dispatchAutocraneDao;

	public DispatchAutocraneServiceImpl(DispatchAutocraneDao dao) {
		super(dao);
		this.dispatchAutocraneDao = dao;
	}

	public BigDecimal getRelatePaymentAmount(Long autocraneId) {
		DispatchAutocrane dispatchAutocrane = dispatchAutocraneDao.get(autocraneId);
		return dispatchAutocrane.getSummary();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long relateId, String status) {

	}

}
