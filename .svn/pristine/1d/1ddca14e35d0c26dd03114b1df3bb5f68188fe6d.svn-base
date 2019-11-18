/**
 *====================================================
 * 文件名称: MoneyBackServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-16			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.MoneyBackDao;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.MoneyBack;
import com.knight.emms.model.MoneyLend;
import com.knight.emms.service.MoneyBackService;
import com.knight.emms.service.MoneyLendService;

/**
 * @ClassName: MoneyBackServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-16 下午5:39:15
 */
public class MoneyBackServiceImpl extends BusinessFlowServiceImpl<MoneyBack> implements MoneyBackService {

	private MoneyBackDao moneyBackDao;

	@Resource
	private MoneyLendService moneyLendService;

	public MoneyBackServiceImpl(MoneyBackDao dao) {
		super(dao);
		this.moneyBackDao = dao;
	}

	public void saveOrMergeForEdit(MoneyBack moneyBack) {
		moneyBack.setArrearsAmount(moneyBackDao.queryArrearsAmount(moneyBack));
		if (moneyBack.getBackId() == null) {
			moneyBackDao.saveSerialModel(moneyBack);
		} else {
			moneyBackDao.merge(moneyBack);
		}
	}

	protected MoneyBack passFlowApproveApplication(FormApprove formApprove) {
		MoneyBack back = super.passFlowApproveApplication(formApprove);
		MoneyLend lend = moneyLendService.get(back.getLendId());
		lend.setBackAmount(lend.getBackAmount().add(back.getBackAmount()));
		if (Status.InvoiceAmount.unfinished.equals(lend.getLendbackStatus())) {
			if (lend.getLendAmount().compareTo(lend.getBackAmount()) != 1) {
				lend.setLendbackStatus(Status.InvoiceAmount.finished);
			}
		}
		moneyLendService.save(lend);
		return back;
	}

}
