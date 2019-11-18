
package com.knight.emms.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.text.ParseException;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.PractiInsuranceDao;
import com.knight.emms.dao.PractiInsuranceDetailDao;
import com.knight.emms.model.PractiInsurance;
import com.knight.emms.model.PractiInsuranceDetail;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.PractiInsuranceDetailService;
import com.knight.emms.service.PractiInsuranceService;
import com.knight.emms.service.PractitionerService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;



/**
 * @ClassName: EquipInsuranceServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class PractiInsuranceServiceImpl extends BusinessLongPKServiceImpl<PractiInsurance> implements PractiInsuranceService {

	@Resource
	private PractiInsuranceDao practiInsuranceDao;
	
	@Resource
	private PractiInsuranceDetailDao practiInsuranceDetailDao;
	
	@Resource
	private PractitionerService practitionerService;
	
	@Resource
	private PractiInsuranceDetailService practiInsuranceDetailService;

	public PractiInsuranceServiceImpl(PractiInsuranceDao dao) {
		super(dao);
		this.practiInsuranceDao = dao;
	}

	@Override
	public PractiInsurance getTranslateFull(Long insureId) {
		PractiInsurance ei = practiInsuranceDao.get(insureId);
//		CodeServiceImpl.translate(ei, getPersistantStruct());
//		for (PractiInsuranceDetail d : ei.getPractiInsuranceDetailSet()) {
//			CodeServiceImpl.translate(d.getPractitioner());
//		}
		return ei;
	}

	@Override
	public void deletedDetail(Long tdetailId) {
//		EquipInsurance p = equipInsuranceDao.get(tdetailId);
//		equipInsuranceDao.save(p);
	}

	@Override
	public void submitDepot(Long depottId) {
//		EquipInsurance p = equipInsuranceDao.get(depottId);
//		equipInsuranceDao.save(p);
	}

	@Override
	public void saveCreate(PractiInsurance practiInsurance) {
	}
	
	@Override
	public void saveOrMergeFor(PractiInsurance t) {
		if(t.getInsureId() == null) {
			if(t.getPractiNum() == t.getPractiMaxNum()){
				t.setPractiFull("1");
			}else{
				t.setPractiFull("0");
			}
			practiInsuranceDao.save(t);
		}
		t.setSubInsureClaim();
		if(t.getPractiNum() == t.getPractiMaxNum()){
			t.setPractiFull("1");
		}else{
			t.setPractiFull("0");
		}
		practiInsuranceDao.merge(t);
		if("1".equals(t.getEffective())){
			this.multiEffective(t.getInsureId());
		}
	}


	@Override
	public void delDetail(Long tdetailId) {
		practiInsuranceDetailDao.remove(tdetailId);
	}


	@Override
	public void multiEffective(Long insureId) {
		PractiInsurance ei = practiInsuranceDao.get(insureId);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_insureId_L_EQ", ei.getInsureId().toString());
		List<PractiInsuranceDetail> list = practiInsuranceDetailService.getTranslateFull(filter);
		if(list.size()<=0){
			throw new BusinessException("该保险单未有员工参保！");
		}
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
		for (PractiInsuranceDetail e : list) {
			Practitioner p = practitionerService.get(e.getPractiId());
			if (distanceMin < 30) {
				p.setInsureStatus("12");
				ei.setEffective(Status.InsureEffective.onlyMonth);
			} else {
				p.setInsureStatus("1");
				ei.setEffective(Status.InsureEffective.effective);
			}
			p.setInsureTime(ei.getEndInsureDate());
			practitionerService.update(p);
		}
		practiInsuranceDao.update(ei);
	}

	@Override
	public void multiLoseEffective(Long insureId) {
		PractiInsurance ei = practiInsuranceDao.get(insureId);
		ei.setEffective(Status.InsureEffective.ineffective);
		practiInsuranceDao.update(ei);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_insureId_L_EQ", ei.getInsureId().toString());
		List<PractiInsuranceDetail> list = practiInsuranceDetailService.getTranslateFull(filter);
		for(PractiInsuranceDetail e : list){
			Practitioner p = practitionerService.get(e.getPractiId());
			p.setInsureStatus("0");
			practitionerService.update(p);
		}
	}


	
}
