/**
 *====================================================
 * 文件名称: EquipBlockupServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.StringUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.EquipBlockupDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.EquipBlockup;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.EquipBlockupService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipBlockupServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-23 上午7:07:37
 */
public class EquipBlockupServiceImpl extends BaseBusinessModelServiceImpl<EquipBlockup> implements EquipBlockupService {

	private EquipBlockupDao equipBlockupDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private EquipDiaryDao equipDiaryDao;
	
	@Resource
	private CorpInfoService corpInfoService;
	
	@Resource
	private BusinessMessageService businessMessageService;

	public EquipBlockupServiceImpl(EquipBlockupDao dao) {
		super(dao);
		this.equipBlockupDao = dao;
	}

	public List<EquipBlockup> queryTranslateAllFull(QueryFilter filter) {
		List<EquipBlockup> list = equipBlockupDao.getAll(filter);
		for (EquipBlockup e : list) {
			CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
			CodeServiceImpl.translate(e);
		}
		return list;
	}

	public EquipBlockup getTranslateFull(Long blockupId) {
		EquipBlockup e = equipBlockupDao.get(blockupId);
		CodeServiceImpl.translate(e.getEquipFlow().getEquipDiary());
		CodeServiceImpl.translate(e);
		return e;
	}

	public void saveOrUpdate(EquipBlockup equipBlockup) {
		Equipment e = null;
		if (equipBlockup.getBlockupId() == null) {
			equipBlockup.setEffective(Constant.DISENABLED);
			equipBlockup.setDelFlag(Constant.ENABLED);
			equipBlockupDao.saveSerialModel(equipBlockup);
			e = equipmentDao.get(equipBlockup.getEquipFlow().getEquipId());
			
			if(equipBlockup.getCorpId()!=null){
				if(equipBlockup.getCorpId()!=null){
				CorpInfo corp = corpInfoService.getTranslateFull(equipBlockup.getCorpId());
				String projectName = equipBlockup.getEquipFlow().getEquipDiary().getProjectName();
				String exwSerial =  equipBlockup.getEquipFlow().getEquipDiary().getExwSerial();
				Date maintDate = equipBlockup.getBlockupDate();
				String msg = projectName+exwSerial+"编号设备已于"+DateUtil.changeDateToStr(maintDate, DateUtil.CN_DISPLAY_DATE)+"停租，请各部门安排好停租后准备工作！";
				String []tel = null;
				String recieveName = "";
				for(int i=0;i<5;i++){
					switch(i){
					case(0):
						tel = StringUtil.translateString(corp.getCapitalTel());
					recieveName = corp.getCapital();
					break;
					case(1):
						tel = StringUtil.translateString(corp.getMarketTel());
					recieveName = corp.getMarket();
					break;
					case(2):
						tel = StringUtil.translateString(corp.getEngineeringTel());
						recieveName = corp.getEngineering();
					break;
					case(3):
						tel = StringUtil.translateString(corp.getMaintenanceTel());
						recieveName = corp.getMaintenance();
					break;
					case(4):
						tel = StringUtil.translateString(corp.getSecurityTel());
						recieveName = corp.getSecurity();
					break;
					default:break;
					}
					if(tel!=null){
						for(int j=0;j<tel.length;j++){
							BusinessMessage bm = new BusinessMessage();
				            bm.setReceiveTel(tel[j]);
				            bm.setMessage(msg);
				            bm.setSenderName("停用管理消息");
				            businessMessageService.sendOnce(bm);
							}
						}
					}
				}
			}	
		} else {
			EquipBlockup blockup = equipBlockupDao.get(equipBlockup.getBlockupId());
			e = blockup.getEquipFlow().getEquipment();
			blockup.setBlockupDate(equipBlockup.getBlockupDate());
			blockup.setRemark(equipBlockup.getRemark());
			blockup.setCorpId(equipBlockup.getCorpId());
			blockup.setBlockupType(equipBlockup.getBlockupType());
			blockup.setDelFlag(Constant.ENABLED);
			equipBlockupDao.save(blockup);
		}
		/*e.setBusinessStatus(Status.EquipBusiness.stop);
		e.setStatus(Status.EquipCompon.stop);
		e.setStatusDate(DateUtil.getCurrentDate());
		equipmentDao.merge(e);*/
	}

	public void activate(Long blockupId, String reactivateDate) {
		EquipBlockup eb = equipBlockupDao.get(blockupId);
		eb.setReactivateDate(reactivateDate);
		equipBlockupDao.save(eb);
		Equipment e = eb.getEquipFlow().getEquipment();
		if (Status.EquipCompon.stop.equals(e.getStatus())) { // 恢复停用设备
			e.setBusinessStatus(Status.EquipBusiness.activate);
			e.setStatus(Status.EquipCompon.inused);
			e.setStatusDate(DateUtil.getCurrentDate());
			equipmentDao.save(e);
		}
	}

	public void effective(EquipBlockup equipBlockup) {
		equipBlockup.setEffective(Constant.ENABLED);
		equipBlockup.setEffectiveDate(DateUtil.getCurrentLinkTimeStr());
		if(equipBlockup.getCorpId()!=null){
			if(equipBlockup.getCorpId()!=null){
			CorpInfo corp = corpInfoService.getTranslateFull(equipBlockup.getCorpId());
			String projectName = equipBlockup.getEquipFlow().getEquipDiary().getProjectName();
			String exwSerial =  equipBlockup.getEquipFlow().getEquipDiary().getExwSerial();
			Date maintDate = equipBlockup.getBlockupDate();
			String msg = projectName+exwSerial+"编号设备已于"+DateUtil.changeDateToStr(maintDate, DateUtil.CN_DISPLAY_DATE)+"停租，请各部门安排好停租后准备工作！";
			String []tel = null;
			String recieveName = "";
			for(int i=0;i<5;i++){
				switch(i){
				case(0):
					tel = StringUtil.translateString(corp.getCapitalTel());
				recieveName = corp.getCapital();
				break;
				case(1):
					tel = StringUtil.translateString(corp.getMarketTel());
				recieveName = corp.getMarket();
				break;
				case(2):
					tel = StringUtil.translateString(corp.getEngineeringTel());
					recieveName = corp.getEngineering();
				break;
				case(3):
					tel = StringUtil.translateString(corp.getMaintenanceTel());
					recieveName = corp.getMaintenance();
				break;
				case(4):
					tel = StringUtil.translateString(corp.getSecurityTel());
					recieveName = corp.getSecurity();
				break;
				default:break;
				}
				if(tel!=null){
					for(int j=0;j<tel.length;j++){
						BusinessMessage bm = new BusinessMessage();
			            bm.setReceiveTel(tel[j]);
			            bm.setMessage(msg);
			            bm.setSenderName("停用管理消息");
			            businessMessageService.sendOnce(bm);
					}
				}
			}
			}
		
		
		}
		equipBlockupDao.save(equipBlockup);

		EquipDiary equipDiary = equipBlockup.getEquipFlow().getEquipDiary();
		equipDiary.setLastBlockupDate(DateUtil.changeDateToStr(equipBlockup.getBlockupDate(), DateUtil.LINK_DISPLAY_DATE));
		equipDiaryDao.save(equipDiary);
	}

	public void loseEffective(EquipBlockup equipBlockup) {
		equipBlockup.setEffective(Constant.DISENABLED);
		equipBlockupDao.save(equipBlockup);
	}

}
