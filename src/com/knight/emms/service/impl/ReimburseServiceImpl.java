/**
 *====================================================
 * 文件名称: ReimburseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;

import javax.annotation.Resource;

import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.CarDao;
import com.knight.emms.dao.CarExpenseDao;
import com.knight.emms.dao.ReimburseDao;
import com.knight.emms.dao.ReimburseTicketDao;
import com.knight.emms.model.Car;
import com.knight.emms.model.CarExpense;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.Reimburse;
import com.knight.emms.model.ReimburseTicket;
import com.knight.emms.service.ReimburseService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: ReimburseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:29:18
 */
public class ReimburseServiceImpl extends BusinessFlowServiceImpl<Reimburse> implements ReimburseService, ExportService {

	private ReimburseDao reimburseDao;

	@Resource
	private ReimburseTicketDao reimburseTicketDao;

	@Resource
	private CarExpenseDao carExpenseDao;

	@Resource
	private CarDao carDao;

	public ReimburseServiceImpl(ReimburseDao dao) {
		super(dao);
		this.reimburseDao = dao;
	}

	public Reimburse getTranslateFull(Long reimburseId) {
		Reimburse r = reimburseDao.get(reimburseId);
		CodeServiceImpl.translate(r, getPersistantStruct());
		CodeServiceImpl.translate(r.getReimburseTicketSet());
		r.getReimburseTicketSet();
		return r;
	}

	public void saveOrMergeForEdit(Reimburse reimburse) {
		reimburse.setArrearsAmount(reimburseDao.queryArrearsAmount(reimburse));
		if (reimburse.getReimburseId() == null) {
			reimburseDao.saveSerialModel(reimburse);
		}
		reimburse.setSubReimburse();
		reimburseDao.merge(reimburse);
	}

	public void deletedTicket(Long ticketId) {
		reimburseTicketDao.remove(ticketId);
	}

	public void passApproveApplication(FormApprove formApprove) {
		Reimburse r = super.passFlowApproveApplication(formApprove);
		r.setReimburseAmount(new BigDecimal(formApprove.getExtendMessage()));
		for (ReimburseTicket t : r.getReimburseTicketSet()) {
			if (t.getCarId() == null) {
				continue;
			}
			CarExpense c = new CarExpense();
			c.setCarId(t.getCarId());
			c.setExpense(CodeServiceImpl.fastValue("reimburseType", t.getReimburseType()));
			c.setPaymentAmount(t.getSummary());
			c.setInstructions(t.getRemark());
			c.setPractiName(r.getPractiName());
			c.setSpendDate(r.getProvidedDate());
			carExpenseDao.save(c);

			Car car = carDao.get(t.getCarId());
			car.setDisbursement(car.getDisbursement().add(c.getPaymentAmount()));
			carDao.save(car);
		}
		reimburseDao.save(r);
	}

}
