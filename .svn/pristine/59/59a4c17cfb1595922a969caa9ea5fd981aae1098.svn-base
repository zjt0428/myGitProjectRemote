
package com.knight.emms.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.EquipInsuranceDao;
import com.knight.emms.dao.EquipInsuranceDetailDao;
import com.knight.emms.model.EquipInsurance;
import com.knight.emms.model.EquipInsuranceDetail;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.EquipInsuranceDetailService;
import com.knight.emms.service.EquipInsuranceService;
import com.knight.emms.service.EquipmentService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;


/**
 * @ClassName: EquipInsuranceServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class EquipInsuranceServiceImpl extends BusinessLongPKServiceImpl<EquipInsurance> implements EquipInsuranceService {

	@Resource
	private EquipInsuranceDao equipInsuranceDao;
	
	@Resource
	private EquipInsuranceDetailDao equipInsuranceDetailDao;
	
	@Resource
	private EquipInsuranceDetailService equipInsuranceDetailService;
	
	@Resource
	private EquipmentService equipmentService;

	public EquipInsuranceServiceImpl(EquipInsuranceDao dao) {
		super(dao);
		this.equipInsuranceDao = dao;
	}

	@Override
	public EquipInsurance getTranslateFull(Long insureId) {
		// TODO Auto-generated method stub
		EquipInsurance ei = equipInsuranceDao.get(insureId);
		CodeServiceImpl.translate(ei, getPersistantStruct());
		for (EquipInsuranceDetail d : ei.getEquipInsuranceDetailSet()) {
			CodeServiceImpl.translate(d.getEquipment());
		}
		return ei;
	}

	@Override
	public void deletedDetail(Long tdetailId) {
		EquipInsurance p = equipInsuranceDao.get(tdetailId);
		equipInsuranceDao.save(p);
	}

	@Override
	public void submitDepot(Long depottId) {
		EquipInsurance p = equipInsuranceDao.get(depottId);
		equipInsuranceDao.save(p);
	}

	@Override
	public void saveCreate(EquipInsurance equipInsurance) {
	}
	
	@Override
	public void saveOrMergeFor(EquipInsurance t) {
		if(t.getInsureId() == null) {
			equipInsuranceDao.save(t);
		}
		t.setSubInsureClaim();
		equipInsuranceDao.merge(t);
	}


	@Override
	public void delDetail(Long tdetailId) {
		equipInsuranceDetailDao.remove(tdetailId);
	}


	@Override
	public void multiEffective(Long insureId) {
		EquipInsurance ei = equipInsuranceDao.get(insureId);
		ei.setEffective(Status.InsureEffective.effective);
		equipInsuranceDao.update(ei);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_insureId_L_EQ", ei.getInsureId().toString());
		List<EquipInsuranceDetail> list = equipInsuranceDetailService.getTranslateFull(filter);
		SimpleDateFormat s = new SimpleDateFormat("yyyy-MM-dd");
		String sa = s.format(new Date());
		Date date1 = null;
		Date date2 = null;
		try {
			date1 = s.parse(sa);
			date2 = s.parse(ei.getEndInsureDate());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Calendar ca1 = Calendar.getInstance();
		Calendar ca2 = Calendar.getInstance();
		ca1.setTime(date1);
		ca2.setTime(date2);
		long distanceMin = (ca2.getTimeInMillis() - ca1.getTimeInMillis()) / (1000 * 60 * 60 * 24);
		for (EquipInsuranceDetail e : list) {
			Equipment equip = equipmentService.getTranslateFull(e.getEquipId());
			if (distanceMin < 30) {
				equip.setInsureStatus("12");
			} else {
				equip.setInsureStatus("1");
			}
			equip.setInsureTime(ei.getEndInsureDate());
			equipmentService.update(equip);
		}
	}

	@Override
	public void multiLoseEffective(Long insureId) {
		// TODO Auto-generated method stub
		EquipInsurance ei = equipInsuranceDao.get(insureId);
		ei.setEffective(Status.InsureEffective.ineffective);
		equipInsuranceDao.update(ei);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_insureId_L_EQ", ei.getInsureId().toString());
		List<EquipInsuranceDetail> list = equipInsuranceDetailService.getTranslateFull(filter);
		for(EquipInsuranceDetail e : list){
			Equipment equip = equipmentService.getTranslateFull(e.getEquipId());
			equip.setInsureStatus("0");
			equipmentService.update(equip);
		}
	}


	
}
