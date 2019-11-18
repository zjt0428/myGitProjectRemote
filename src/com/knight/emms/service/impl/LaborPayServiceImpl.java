
package com.knight.emms.service.impl;


import javax.annotation.Resource;

import org.apache.commons.lang.xwork.StringUtils;
import org.springframework.transaction.annotation.Transactional;

import com.knight.emms.dao.LaborPayDao;
import com.knight.emms.dao.LaborPayDetailDao;
import com.knight.emms.model.LaborPay;
import com.knight.emms.model.LaborPayDetail;
import com.knight.emms.model.LaborSettle;
import com.knight.emms.service.LaborPayService;
import com.knight.emms.service.LaborSettleService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;



/**
 * @ClassName: LaborPayServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class LaborPayServiceImpl extends BusinessLongPKServiceImpl<LaborPay> implements LaborPayService {

	@Resource
	private LaborPayDao laborPayDao;
	
	@Resource
	private LaborPayDetailDao laborPayDetailDao;
	
	@Resource
	private LaborSettleService laborSettleService;

	public LaborPayServiceImpl(LaborPayDao dao) {
		super(dao);
		this.laborPayDao = dao;
	}

	@Override
	public LaborPay getTranslateFull(Long laborPayId) {
		LaborPay ei = laborPayDao.get(laborPayId);
		CodeServiceImpl.translate(ei.getEquipment());
		return ei;
	}

	@Override
	public void saveOrMerge(LaborPay laborPay) {
		if(laborPay.getLaborPayId() == null){
			laborPayDao.saveSerialModel(laborPay);
		}
		laborPay.setSubInsureClaim();
		for(LaborPayDetail ld : laborPay.getLaborPayDetailSet()){
			if(StringUtils.isBlank(ld.getDetailSerial())){
				laborPayDetailDao.saveSerialModel(ld);
			}
		}
		
		laborPayDao.merge(laborPay);
		LaborSettle ls =  laborSettleService.get(laborPay.getLaborSettId());
		ls.setPaidAmount(laborPay.getPaidAmount());
		ls.setPayState(laborPay.getPayState());
		laborSettleService.update(ls);
	}
	
}
