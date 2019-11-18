
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.knight.core.Constants;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.PractiCertDao;
import com.knight.emms.dao.PractiInsuranceDetailDao;
import com.knight.emms.dao.PractiLeaveDao;
import com.knight.emms.dao.PractitionerDao;
import com.knight.emms.model.PractiCert;
import com.knight.emms.model.PractiInsuranceDetail;
import com.knight.emms.model.PractiLeave;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.PractiLeaveService;
import com.knight.system.service.CodeService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;



/**
 * @ClassName: PractiLeaveServiceImpl
 * @Description: 人员离职
 * @author
 * @date
 */
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class PractiLeaveServiceImpl extends BusinessLongPKServiceImpl<PractiLeave> implements PractiLeaveService {

	@Resource
	private PractiLeaveDao practiLeaveDao;
	
	@Resource
	private PractitionerDao practitionerDao;
	
	@Resource
	private PractiCertDao practiCertDao;
	
	@Resource
	private PractiInsuranceDetailDao practiInsuranceDetailDao;
	
	@Resource
	private CodeService codeService;

	
	
	public PractiLeaveServiceImpl(PractiLeaveDao dao) {
		super(dao);
		this.practiLeaveDao = dao;
	}

	@Override
	public PractiLeave getTranslateFull(Long leaveId) {
		PractiLeave pl = practiLeaveDao.get(leaveId);
		CodeServiceImpl.translate(pl, getPersistantStruct());
		return pl;
	}

	@Override
	public void multiEffective(Long insureId) {
		PractiLeave pl = practiLeaveDao.get(insureId);
		if(pl.getPractitioner().getIncumbent().equals("0")) {
			throw new BusinessException("该人员已离职，请勿重复操作!");
		}
		pl.setEffective(Status.GenericEffective.effective);
		practiLeaveDao.update(pl);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_practiId_L_EQ", pl.getPractiId().toString());
		Practitioner p = practitionerDao.get(pl.getPractiId());
		//人员状态变为离职、未参保、未交底、证书全注销，从所有保险中删除此员工
		p.setSeparationDate(pl.getLeaveTime());
		p.setIncumbent("0");
		p.setInsureStatus("0");
		p.setClarificaStatus("0");
		p.setWorkState("1");
		practitionerDao.merge(p);
		List<PractiCert> pcList = practiCertDao.getAll(filter);
		for(PractiCert pc : pcList) {
			if(!pc.getQstate().equals(Status.Archives.disenabled)) {
				pc.setQstate(Status.Archives.cancel);
				practiCertDao.merge(pc);
			}
		}
		List<PractiInsuranceDetail> pidList = practiInsuranceDetailDao.getAll(filter);
		for(PractiInsuranceDetail pid : pidList) {
			pid.setDelFlag(Constants.DISENABLED.toString());
			practiInsuranceDetailDao.merge(pid);
		}
	}

	@Override
	public void multiLoseEffective(Long insureId) {
		//TODO
	}

	
}
