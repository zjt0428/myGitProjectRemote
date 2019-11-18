/**
 *====================================================
 * 文件名称: SchedularArchiveDomainImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.script.SqlScriptBuilder;
import com.knight.core.util.DateUtil;
import com.knight.emms.domain.SchedularArchiveDomain;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.EquipDetectService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;

/**
 * @ClassName: SchedularArchiveDomainImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-10 下午2:44:22
 */
@Slf4j
public class SchedularArchiveDomainImpl implements SchedularArchiveDomain {

	@Resource
	private BaseJDBCDao baseJdbcDao;

	@Resource
	protected AppUserService appUserService;

	@Resource
	protected EquipDetectService equipDetectService;

	@Resource
	protected BusinessMessageService businessMessageService;

	public void corpCertDueToRemind() {
		log.debug("企业资质到期验证及预警信息...");
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("remainddays.cert");
		String remainddate = DateUtil.changeDateToStr(
				DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String sql = SqlScriptBuilder.get("remaind.schedule_corpcert_dueto");
		baseJdbcDao.jdbcTemplate().update(sql, remainddate);
		sql = "UPDATE T_CORP_CERT SET ISVALID = '4' WHERE DEL_FLAG = '1' AND END_DATE < CONVERT(CHAR(10),GETDATE(),23)";
		baseJdbcDao.jdbcTemplate().execute(sql);
	}

	public void practiCertDueToRemind() {
		log.debug("人员资质到期验证及预警信息...");
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("remainddays.cert");
		log.info("资质证测试日期");
		List<Map<String, Object>> maplist = appUserService.queryByScript("remaind.cert_left_effect_days");
		for (int i = 0; i < maplist.size(); i++) {
			if ((Integer) maplist.get(i).get("days") >= remainddays_cert) {
				String msg = "尊敬的".concat((String) maplist.get(i).get("userName")).concat("先生,您有一本")
						.concat((String) maplist.get(i).get("kindWork")).concat("从业资格证有效截止日期")
						.concat((String) maplist.get(i).get("effectDate")).concat("，请悉知！");
				send(msg, String.valueOf(maplist.get(i).get("userId")));
			}
		}
	}

	public void detectDateRemind() {
		log.info("下次检测时间提醒...");
		// int remainddays_redetect = (Integer)
		// ApplicationContainer.getSysConfig().get("equip.redetect");
		List<Map<String, Object>> maplist = equipDetectService.queryByScript("remaind.redetec_date");
		if (maplist.size() > 0) {
			for (int i = 0; i < maplist.size(); i++) {
				String msg = "项目为"
						.concat(((String) maplist.get(i).get("projectName")) == null ? ""
								: ((String) maplist.get(i).get("projectName")))
						.concat(",楼号为")
						.concat(((String) maplist.get(i).get("buildingNum")) == null ? ""
								: ((String) maplist.get(i).get("buildingNum")))
						.concat(",出厂编号为")
						.concat(((String) maplist.get(i).get("exwSerial")) == null ? ""
								: ((String) maplist.get(i).get("exwSerial")))
						.concat("的设备将于").concat(((String) maplist.get(i).get("redetectDate")) == null ? ""
								: ((String) maplist.get(i).get("redetectDate")))
						.concat("进行定检，请悉知！");
				send(msg, String.valueOf(maplist.get(i).get("userId")));
			}
		}

	}

	public void equipScrapToRemind() {
		log.debug("设备到期预警信息...");
		Date preDate = DateUtil.transpositionDate(new Date(), Calendar.DATE, 30);
		String remaindDate = DateUtil.changeDateToStr(preDate, DateUtil.LINK_DISPLAY_DATE);
		String sql = SqlScriptBuilder.get("remaind.schedule_equipscrap_dueto");
		// baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
		log.debug("设备到期报废...");
		sql = "UPDATE T_EQUIPMENT SET STATUS = '6', STATUS_DATE = GETDATE() WHERE DEL_FLAG = '1' AND STATUS = '1' AND SCRAP_DATE < GETDATE()";
		baseJdbcDao.jdbcTemplate().execute(sql);
		// log.debug("零配件报废到期...");
		// sql = "UPDATE T_COMPONENT SET STATUS = '6', STATUS_DATE = GETDATE() WHERE
		// DEL_FLAG = '1' AND STATUS = '1' AND SCRAP_DATE < GETDATE() AND CONSUME_FLAG =
		// '0'";
		// baseJdbcDao.jdbcTemplate().execute(sql);
	}

	public void setDepreciateRate() {
		log.debug("设备/零配件 折旧率设置......");
		String sql = SqlScriptBuilder.get("remaind.compon_depreciate_rate");
		baseJdbcDao.jdbcTemplate().execute(sql);
		sql = SqlScriptBuilder.get("remaind.equip_depreciate_rate");
		baseJdbcDao.jdbcTemplate().execute(sql);
	}

	public void birthdayRemind() {
		log.debug("客户/供应商 联系人生日提醒......");
		String sql = SqlScriptBuilder.get("remaind.schedule_customer_birthday");
		baseJdbcDao.jdbcTemplate().execute(sql);
		sql = SqlScriptBuilder.get("remaind.schedule_supplier_birthday");
		baseJdbcDao.jdbcTemplate().execute(sql);
	}

	public void equipInsureOvertimeRemind() {
		log.debug("设备保险逾期提醒......");
		String sql = SqlScriptBuilder.get("remaind.schedule_insure_overtime");
		int remainddays_insure = (Integer) ApplicationContainer.getSysConfig().get("remainddays.insure");
		String remainddate = DateUtil.changeDateToStr(
				DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_insure), DateUtil.LINK_DISPLAY_DATE);
		baseJdbcDao.jdbcTemplate().update(sql, remainddate);
	}

	public void componentMthStocks() {
		log.debug("每月配件存盘....");
		String sql = SqlScriptBuilder.get("remaind.componentMthStocks");

		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMM");
		String yearmth = formatter.format(new Date());
		baseJdbcDao.jdbcTemplate().update(sql, yearmth);
	}

	private boolean send(String msg, String man) {
		String[] dismans = man.split(",");
		for (int i = 0; i < dismans.length; i++) {
			AppUser appUser = appUserService.get(Long.valueOf(dismans[i]));
			BusinessMessage bm = new BusinessMessage();
			bm.setMessage(msg);
			bm.setReceiveTel(appUser.getMobile());
			bm.setSenderName("系统消息");
			bm.setSendFlag("0");
			bm.setModule("OTHERS");
			bm.setCreateTime(new Date());
			businessMessageService.sendOnce(bm);
		}
		return true;
	}

}
