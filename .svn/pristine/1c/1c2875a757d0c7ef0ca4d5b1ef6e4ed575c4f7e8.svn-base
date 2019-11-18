/**
 *====================================================
 * 文件名称: EquipDetectServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipDetectDao;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.EquipDetect;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.EquipDetectService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipDetectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:18:42
 */
public class EquipDetectServiceImpl extends BusinessLongPKServiceImpl<EquipDetect> implements EquipDetectService, FundPaymentVoucherService {

	private EquipDetectDao equipDetectDao;

	@Resource
	protected EquipmentDao equipmentDao;

	@Resource
	protected EquipFlowDao equipFlowDao;

	public EquipDetectServiceImpl(EquipDetectDao dao) {
		super(dao);
		this.equipDetectDao = dao;
	}

	public List<EquipDetect> queryTranslateAllFull(QueryFilter filter) {
		List<EquipDetect> list = equipDetectDao.getAll(filter);
		for (EquipDetect e : list) {
			CodeServiceImpl.translate(e, getPersistantStruct());
			CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
		}
		return list;
	}

	public EquipDetect getTranslateFull(Long detectId) {
		EquipDetect e = equipDetectDao.get(detectId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
		return e;
	}

	public void saveOrUpdate(EquipDetect equipDetect) {
		if (equipDetect.getDetectId() == null) {
			List<EquipDetect> list = equipDetectDao.getDetectBySerial(equipDetect);
			if (!list.isEmpty()) {
				throw new BusinessException("检测报告编号[" + equipDetect.getDetectSerial() + "]已经存在!");
			}
		}
		equipDetect.setSubEquipDetect();
		equipDetectDao.merge(equipDetect);

		// 设备业务状态
		EquipFlow equipFlow = equipFlowDao.get(equipDetect.getEquipFlow().getFlowId());
		Equipment e = equipFlow.getEquipment();
		e.setBusinessStatus(Status.EquipBusiness.detect);
		equipmentDao.save(e);
	}

	public BigDecimal getRelatePaymentAmount(Long detectId) {
		EquipDetect p = equipDetectDao.get(detectId);
		return p.getDetectAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long detectId, String status) {
		EquipDetect p = equipDetectDao.get(detectId);
		p.setPaymentAmount(amountPayment.getHasPaymentAmount());
		p.setBalanceAmount(p.getDetectAmount().subtract(p.getPaymentAmount()));
		equipDetectDao.save(p);
	}

}
