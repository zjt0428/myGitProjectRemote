/**
 *====================================================
 * 文件名称: EquipmentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ChangeRecordDao;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.EquipmentAffiliatedDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.InstalmentDao;
import com.knight.emms.domain.*;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.ChangeRecord;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.support.EquipmentSupport;
import com.knight.system.dao.DepartmentDao;
import com.knight.system.model.Department;
import com.knight.system.service.impl.CodeServiceImpl;
import org.apache.commons.lang.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: EquipmentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午11:23:40
 */
public class EquipmentServiceImpl extends BaseBusinessModelServiceImpl<Equipment> implements EquipmentService, FundPaymentVoucherService {

	private EquipmentDao equipmentDao;
	
	@Resource
	private BaseJDBCDao baseJdbcDao;
	@Resource
	private ChangeRecordDao changeRecordDao;
	

	@Resource
	private EquipmentAffiliatedDao equipmentAffiliatedDao;

	@Resource
	private InstalmentDao instalmentDao;

	@Resource
	private ComponentDao componentDao;

	@Resource
	private IUploadTerminalDomain uploadTerminalDomain;

	@Resource
	private SchedularArchiveDomain schedularArchiveDomain;

	@Resource
	private SchedularDispatchDomain schedularDispatchDomain;

	@Resource
	private SchedularFundDomain schedularFundDomain;
	
	@Resource
	private DepartmentDao departmentDao;

	public EquipmentServiceImpl(EquipmentDao dao) {
		super(dao);
		this.equipmentDao = dao;
	}

	public Equipment getTranslateFull(Long equipId) {
		Equipment e = equipmentDao.get(equipId);
		CodeServiceImpl.translate(e, getPersistantStruct());
		CodeServiceImpl.translate(e.getInstalmentSet(), instalmentDao.getPersistantStruct());
		CodeServiceImpl.translate(e.getComponentSet(), componentDao.getPersistantStruct());
		CodeServiceImpl.translate(e.getEquipmentAffiliatedSet(), equipmentAffiliatedDao.getPersistantStruct());
		return e;
	}

	public void saveCreate(Equipment equipment) {
		serialExists(equipment);
		EquipmentSupport.completeDefaultEquipment(equipment);
		int seq = equipmentDao.createNextSerialseq(equipment, equipment.getEquipGeneric());
		equipment.setRecordSerial(equipment.getEquipGeneric() + DateUtil.getCurrentDateStr() + StringUtils.leftPad(seq + "", 3, "0"));
		equipmentDao.save(equipment);
	}

	public void saveUpload(List<Equipment> equipmentList) {
		SerialNumberStrategy strategy = Equipment.class.getAnnotation(SerialNumberStrategy.class);
		String currentDate = DateUtil.getCurrentDateStr();
		Map<String, List<Equipment>> equipMap = new HashMap<String, List<Equipment>>();
		for (Equipment e : equipmentList) {
			List<Equipment> equipList = null;
			if (equipMap.containsKey(e.getEquipGeneric())) {
				equipList = equipMap.get(e.getEquipGeneric());
			} else {
				equipList = new ArrayList<Equipment>();
				equipMap.put(e.getEquipGeneric(), equipList);
			}
			equipList.add(e);
		}
		for (List<Equipment> equipList : equipMap.values()) {
			Equipment e = equipList.get(0);
			int seq = equipmentDao.createNextSerialseq(e, e.getEquipGeneric());
			if (seq + equipList.size() > strategy.maxseq()) {
				throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
			}
			for (int i = 0; i < equipList.size(); i++) {
				Equipment equipment = equipList.get(i);
				EquipmentSupport.completeDefaultEquipment(equipment);
				equipment.setRecordSerial(equipment.getEquipGeneric() + currentDate + StringUtils.leftPad((seq + i) + "", (strategy.maxseq() + "").length(), "0"));
			}
		}
		for (Equipment equipment : equipmentList) {
			uploadTerminalDomain.uploadsave(equipment);
		}
	}

	public void refresh() {
		schedularArchiveDomain.birthdayRemind();
		schedularArchiveDomain.corpCertDueToRemind();
		schedularArchiveDomain.equipInsureOvertimeRemind();
		schedularArchiveDomain.equipScrapToRemind();
		schedularArchiveDomain.practiCertDueToRemind();
		schedularArchiveDomain.setDepreciateRate();
		schedularDispatchDomain.borrowExpireRemaind();
		schedularDispatchDomain.borrowOvertimeRemaind();
		schedularDispatchDomain.contractExpireEquipRemaind();
		schedularDispatchDomain.contractOvertimeEquipRemaind();
		schedularDispatchDomain.purchaseOvertimeRemaind();
		schedularFundDomain.amountPayDueToRemind();
		schedularFundDomain.moneyLendOvertimeRemind();
	}

	public List<Map<String, Object>> queryDistributeMapInfo(QueryFilter filter) {
		return equipmentDao.queryDistributeMapInfo(filter);
	}

	// ====================================================================================//
	public BigDecimal getRelatePaymentAmount(Long equipId) {
		Equipment e = equipmentDao.get(equipId);
		if (e.getMortgageAmount() == null) {
			return BigDecimal.ZERO;
		}
		return e.getMortgageAmount();
	}
	public List<Equipment> getEquipment(){

		List<Equipment> list = equipmentDao.getAll();
		return list;
		
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long equipId, String status) {
		Equipment e = equipmentDao.get(equipId);
		e.setFinishedAmount(amountPayment.getHasPaymentAmount());
		e.setRemainderAmount(e.getMortgageAmount().subtract(e.getFinishedAmount()));
		e.setFundStatus(status);
		equipmentDao.save(e);
	}

	public void removeAffiliated(Long affiliatedId) {
		equipmentAffiliatedDao.remove(affiliatedId);
	}

	@Override
	public void bindingDepartmentPermission(Equipment equipment) {
		Long depId = equipment.getDepId();
		if(depId != null) {
			String str = concatPermission(depId);
			equipment.setPermissionFlag(str);
		}
	}

	public String concatPermission(Long depId) {
		StringBuffer sb = new StringBuffer();
		if(depId!=null && depId!=0) {
			Department dep = departmentDao.get(depId);
			sb.append("d").append(dep.getDepSerial()).append("d,");
			if(dep.getParentId()!=null) {
				concatPermission(dep.getParentId());
			}
		}
		return sb.toString();
	}

	@Override
	public void changeEquip(Equipment equip) {
		serialExists(equip);
		// TODO Auto-generated method stub
		Equipment e = equipmentDao.get(equip.getEquipId());
		
		Boolean f = false;
		StringBuffer one = new StringBuffer();
		StringBuffer two = new StringBuffer();
		StringBuffer sa = new StringBuffer();
		StringBuffer sc = new StringBuffer();//停用管理，起租管理
		String sqa = new String();
		String sqc = new String();
		sa.append("UPDATE T_EQUIPMENT SET ");
		one.append("UPDATE T_EQUIPMENT SET ");
		sc.append("UPDATE T_EQUIPMENT_DIARY SET ");
		two.append("UPDATE T_EQUIPMENT_DIARY SET ");
		if(StringUtils.isNotBlank(equip.getEquipSource()) && !equip.getEquipSource().equals(e.getEquipSource())){
			sa.append("EQUIP_SOURCE = '"+equip.getEquipSource()+"',");
			one.append("EQUIP_SOURCE = '"+e.getEquipSource()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(equip.getEquipSpecific()) && !equip.getEquipSpecific().equals(e.getEquipSpecific())){
			sa.append("EQUIP_SPECIFIC = '"+equip.getEquipSpecific()+"',");
			sc.append("EQUIP_SPECIFIC = '"+equip.getEquipSpecific()+"',");
			one.append("EQUIP_SPECIFIC = '"+e.getEquipSpecific()+"',");
			two.append("EQUIP_SPECIFIC = '"+e.getEquipSpecific()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(equip.getEquipGeneric()) && !equip.getEquipGeneric().equals(e.getEquipGeneric())){
			sa.append("EQUIP_GENERIC = '"+equip.getEquipGeneric()+"',");
			sc.append("EQUIP_GENERIC = '"+equip.getEquipGeneric()+"',");
			one.append("EQUIP_GENERIC = '"+e.getEquipGeneric()+"',");
			two.append("EQUIP_GENERIC = '"+equip.getEquipGeneric()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(equip.getRecordId()) && !equip.getRecordId().equals(e.getRecordId())){
			sa.append("RECORD_ID = '"+equip.getRecordId()+"',");
			sc.append("RECORD_ID = '"+equip.getRecordId()+"',");
			one.append("RECORD_ID = '"+e.getRecordId()+"',");
			two.append("RECORD_ID = '"+e.getRecordId()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(equip.getEquipSerial()) && !equip.getEquipSerial().equals(e.getEquipSerial())){
			sa.append("EQUIP_SERIAL = '"+equip.getEquipSerial()+"',");
			sc.append("EQUIP_SERIAL = '"+equip.getEquipSerial()+"',");
			one.append("EQUIP_SERIAL = '"+e.getEquipSerial()+"',");
			two.append("EQUIP_SERIAL = '"+e.getEquipSerial()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(String.valueOf(equip.getPropertyEnt())) && !equip.getPropertyEnt().equals(e.getPropertyEnt())){
			sa.append("PROPERTY_ENT = '"+equip.getPropertyEnt()+"',PROPERTY_NAME = '"+equip.getPropertyName()+"',DUTYMAN = '"+equip.getDutyman()+"',DUTYMAN_TEL = '"+equip.getDutymanTel()+"',");
			sc.append("PROPERTY_ENT = '"+equip.getPropertyEnt()+"',PROPERTY_NAME = '"+equip.getPropertyName()+"',");
			one.append("PROPERTY_ENT = '"+e.getPropertyEnt()+"',PROPERTY_NAME = '"+e.getPropertyName()+"',DUTYMAN = '"+e.getDutyman()+"',DUTYMAN_TEL = '"+e.getDutymanTel()+"',");
			two.append("PROPERTY_ENT = '"+e.getPropertyEnt()+"',PROPERTY_NAME = '"+e.getPropertyName()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(equip.getExwSerial()) && !equip.getExwSerial().equals(e.getExwSerial())){
			sa.append("EXW_SERIAL = '"+equip.getExwSerial()+"',");
			sc.append("EXW_SERIAL = '"+equip.getExwSerial()+"',");
			one.append("EXW_SERIAL = '"+e.getExwSerial()+"',");
			two.append("EXW_SERIAL = '"+equip.getExwSerial()+"',");
			f = true;
		}
		if(f){
			sqa = sa.substring(0, sa.length()-1).concat(" WHERE EQUIP_ID = "+equip.getEquipId());
			sqc = sc.substring(0, sc.length()-1).concat(" WHERE EQUIP_ID = "+equip.getEquipId());
			one.append(" WHERE EQUIP_ID = "+equip.getEquipId());
			two.append(" WHERE EQUIP_ID = "+equip.getEquipId());
			changeRecordDao.recordChange(sqa, one.toString());
			changeRecordDao.recordChange(sqc, two.toString());
			baseJdbcDao.jdbcTemplate().execute(sqa);
			baseJdbcDao.jdbcTemplate().execute(sqc);
		}
	}
	
	@Override
	public void serialExists(Equipment equipment) {
		if(equipment.getExwSerial()==null) {
			throw new BusinessException("出厂编号不能为空！");
		}else {
			QueryFilter filter = new QueryFilter();
			filter.addConjunctFilter("Q_exwSerial_S_EQ", equipment.getExwSerial());
			filter.addConjunctFilter("Q_delFlag_S_EQ", "1");
			if(equipment.getEquipId()!=null){
				filter.addConjunctFilter("Q_equipId_L_NEQ", equipment.getEquipId()+"");
			}
			List<Equipment> list  = equipmentDao.getAll(filter);
			if(list.size()>0) {
				throw new BusinessException("出厂编号已存在！");
			}
			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_equipSerial_S_EQ", equipment.getEquipSerial());
			filter1.addConjunctFilter("Q_delFlag_S_EQ", "1");
			if(equipment.getEquipId()!=null){
				filter1.addConjunctFilter("Q_equipId_L_NEQ", equipment.getEquipId()+"");
			}
			List<Equipment> list1  = equipmentDao.getAll(filter1);
			if(list1.size()>0) {
				throw new BusinessException("设备自编号已存在！");
			}
		}
	}
}
