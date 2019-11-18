/**
 *====================================================
 * 文件名称: EquipActivateServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ContractLeaseDao;
import com.knight.emms.dao.EquipActivateDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipInstallDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.model.ContractLease;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.EquipActivateService;
import com.knight.emms.service.EquipDiaryService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipActivateServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-23 下午8:09:43
 */
public class EquipActivateServiceImpl extends BaseBusinessModelServiceImpl<EquipActivate> implements EquipActivateService {

	private EquipActivateDao equipActivateDao;

	@Resource
	private EquipDiaryDao equipDiaryDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private ContractLeaseDao contractLeaseDao;
	@Resource
	private EquipInstallDao equipInstallDao;
	
	@Resource
	private EquipFlowDao equipFlowDao;
	
	@Resource
	private EquipDiaryService equipDiaryService;

	

	public EquipActivateServiceImpl(EquipActivateDao dao) {
		super(dao);
		this.equipActivateDao = dao;
	}

	public List<EquipActivate> queryTranslateAllFull(QueryFilter filter) {
		List<EquipActivate> list = equipActivateDao.getAll(filter);
		for (EquipActivate e : list) {
			CodeServiceImpl.translate(e, getPersistantStruct());
			CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
		}
		return list;
	}

	public EquipActivate getTranslateFull(Long activateId) {
		EquipActivate e = equipActivateDao.get(activateId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
		return e;
	}

	public void effective(EquipActivate equipActivate) {
		ContractLease cl = equipActivate.getEquipFlow().getContractLease();
		if (Constant.DISENABLED.equals(cl.getEffective())) {
			cl.setEffective(Constant.ENABLED);
			contractLeaseDao.save(cl);
		}

		EquipDiary ed = equipActivate.getEquipFlow().getEquipDiary();
		ed.setActivateDate(equipActivate.getActivateDate());
		ed.setLastSettleDate(ed.getActivateDate());
		equipDiaryDao.save(ed);

		// 设备业务状态
		Equipment e = equipActivate.getEquipFlow().getEquipment();
		e.setBusinessStatus(Status.EquipBusiness.activate);
		equipmentDao.save(e);

		equipActivate.setEffective(Constant.ENABLED);
		if(StringUtils.isBlank(equipActivate.getEffectiveDate())) {
			equipActivate.setEffectiveDate(DateUtil.getCurrentLinkTimeStr());
		}
		equipActivateDao.save(equipActivate);
	}

	public void loseEffective(EquipActivate equipActivate) {
		Equipment e = equipActivate.getEquipFlow().getEquipment();
		if(Status.EquipBusiness.activate.equals(e.getBusinessStatus())) {
			e.setBusinessStatus(Status.EquipBusiness.install);
			equipmentDao.save(e);
		}else {
			throw new BusinessException("设备状态异常, 无法失效");
		}
		
		EquipDiary ed = equipActivate.getEquipFlow().getEquipDiary();
		ed.setActivateDate(null);
		ed.setLastSettleDate(null);
		equipDiaryDao.save(ed);
		
		equipActivate.setEffective(Constant.DISENABLED);
		equipActivateDao.save(equipActivate);
		
		//如果合同中的所有设备都未启用，则改变 合同的effective值
		List<Map<String,Object>> list = equipActivateDao.queryByScript("equipFlow.contract_equip_is_activate", equipActivate.getActivateId());
		if(list==null || list.size()==0) {
			ContractLease cl = equipActivate.getEquipFlow().getContractLease();
			if (Constant.ENABLED.equals(cl.getEffective())) {
				cl.setEffective(Constant.DISENABLED);
				contractLeaseDao.save(cl);
			}
		}
	}
	
	public void saveOrMergeForEdit(EquipActivate equipActivate) {
		equipActivateDao.saveSerialModel(equipActivate);
		EquipFlow ef = equipFlowDao.get(equipActivate.getEquipFlow().getFlowId());
		ef.setActivateId(equipActivate.getActivateId());
		EquipInstall ei = equipInstallDao.get(ef.getInstallId());
		EquipDiary ed = equipDiaryDao.get(ei.getEquipFlow().getEquipDiaryId());
		ei.setStartinDate(equipActivate.getEquipFlow().getEquipInstall().getStartinDate());
		ei.setApproachNumber(equipActivate.getEquipFlow().getEquipInstall().getApproachNumber());
		ed.setBuildingNum(equipActivate.getEquipFlow().getEquipDiary().getBuildingNum());
		equipFlowDao.save(ef);
		equipDiaryService.save(ed);
		equipInstallDao.save(ei);
	}
}
