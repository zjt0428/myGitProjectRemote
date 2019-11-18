/**
 *====================================================
 * 文件名称: LogisticsBacksportServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月5日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.dao.LogisticsBackcarfeeDao;
import com.knight.emms.dao.LogisticsBackdetailDao;
import com.knight.emms.dao.LogisticsBacksportDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.LogisticsBackdetail;
import com.knight.emms.model.LogisticsBacksport;
import com.knight.emms.service.LogisticsBacksportService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: LogisticsBacksportServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月5日 下午8:21:17
 */
public class LogisticsBacksportServiceImpl extends BusinessLongPKServiceImpl<LogisticsBacksport> implements LogisticsBacksportService, FundPaymentVoucherService {

	private LogisticsBacksportDao logisticsBacksportDao;

	@Resource
	private LogisticsBackdetailDao logisticsBackdetailDao;

	@Resource
	private LogisticsBackcarfeeDao logisticsBackcarfeeDao;

	@Resource
	private ComponDiaryDao componDiaryDao;

	public LogisticsBacksportServiceImpl(LogisticsBacksportDao dao) {
		super(dao);
		this.logisticsBacksportDao = dao;
	}

	public List<LogisticsBacksport> queryTranslateAll(QueryFilter queryFilter) {
		List<LogisticsBacksport> list = super.queryTranslateAll(queryFilter);
		for (LogisticsBacksport l : list) {
			CodeServiceImpl.translate(l.getEquipment());
		}
		return list;
	}

	public LogisticsBacksport getTranslateFull(Long backsportId) {
		LogisticsBacksport t = logisticsBacksportDao.get(backsportId);
		CodeServiceImpl.translate(t.getEquipment());
		CodeServiceImpl.translate(t, getPersistantStruct());
		for (LogisticsBackdetail l : t.getLogisticsBackdetailSet()) {
			CodeServiceImpl.translate(l.getComponDiary());
		}
		return t;
	}

	public void deletedBackdetail(Long backdetailId) {
		logisticsBackdetailDao.remove(backdetailId);
	}

	public void deletedBackcarfee(Long backcarfeeId) {
		logisticsBackcarfeeDao.remove(backcarfeeId);
	}

	public void received(LogisticsBacksport logisticsBacksport) {
		logisticsBacksport.setStatus(Status.Logistics.received);
		for (LogisticsBackdetail logistics : logisticsBacksport.getLogisticsBackdetailSet()) {
			ComponDiary diary = logistics.getComponDiary();
			diary.setBacksportCounts(diary.getBacksportCounts() + logistics.getCounts());
			if (diary.getBacksportCounts() >= diary.getCounts()) {
				diary.setBacksportStatus(Status.Backsport.finished);
			} else {
				diary.setBacksportStatus(Status.Backsport.execute);
			}
			componDiaryDao.save(diary);
		}
		logisticsBacksportDao.save(logisticsBacksport);
	}

	public void saveOrMergeForEdit(LogisticsBacksport logisticsBacksport) {
		if (logisticsBacksport.getBacksportId() == null) {
			logisticsBacksportDao.saveSerialModel(logisticsBacksport);
		}
		logisticsBacksport.setSubLogisticsBacksport();
		logisticsBacksportDao.merge(logisticsBacksport);
	}

	// ====================================================================================//
	public BigDecimal getRelatePaymentAmount(Long backsportId) {
		LogisticsBacksport logisticsBacksport = logisticsBacksportDao.get(backsportId);
		return logisticsBacksport.getBacksportAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long backsportId, String status) {
		LogisticsBacksport logisticsBacksport = logisticsBacksportDao.get(backsportId);
		logisticsBacksport.setFinishedAmount(amountPayment.getHasPaymentAmount());
		logisticsBacksport.setRemainderAmount(logisticsBacksport.getBacksportAmount().subtract(logisticsBacksport.getFinishedAmount()));
		logisticsBacksport.setFundStatus(status);
		logisticsBacksportDao.save(logisticsBacksport);
	}

}
