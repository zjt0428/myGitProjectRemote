/**
 *====================================================
 * 文件名称: SmsSchedularDomain.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-12-3			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.sms;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.BusinessMessageDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.AntiFallDetectionService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;

import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: SmsSchedularDomain
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-12-3 下午4:18:41
 */
@Slf4j
public class SchedularSmsDomainImpl implements SchedularSmsDomain {

	@Resource
	private BaseJDBCDao baseJdbcDao;
	
	@Resource
	private BusinessMessageDao businessMessageDao;
	
	@Resource
	private BusinessMessageService businessMessageService;
	
	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private AntiFallDetectionService antiFallDetectionService;

	private boolean sendAlignment(SmsAlignment alignment) {
		int result = 1;
		try {
			if (alignment.getItems() > 1) {
				result = OpenApi.sendBatch(alignment.getMobile().toString(), alignment.getAlignmentMessage());
			} else {
				result = OpenApi.sendOnce(alignment.getMobile().toString(), alignment.getAlignmentMessage());
			}
			alignment.setReplyCode(result);
		} catch (Exception e) {
			log.error("", e);
			alignment.setReplyCode(99);
			return false;
		}
		return result == 1;
	}

	public void sendsmsBusinessMessage() {
		log.debug("短信批量发送任务...");
		String openurl = (String) ApplicationContainer.getSystemParam("sms.openurl");
		String account = (String) ApplicationContainer.getSystemParam("sms.account");
		String enterprise = (String) ApplicationContainer.getSystemParam("sms.enterprise");
		String authkey = (String) ApplicationContainer.getSystemParam("sms.authkey");
		int cgid = (Integer) ApplicationContainer.getSystemParam("sms.cgid");
		int csid = (Integer) ApplicationContainer.getSystemParam("sms.csid");
		OpenApi.initialzeAccount(openurl, account, enterprise, authkey, cgid, csid);

		String presql = "UPDATE T_BUSINESS_MESSAGE SET SEND_FLAG = '1' WHERE LEN(LTRIM((RTRIM(RECEIVE_TEL)))) = 0 AND SEND_FLAG = '0'";
		baseJdbcDao.jdbcTemplate().update(presql);
		boolean continued = true;
		String querysql = "SELECT TOP 50 * FROM T_BUSINESS_MESSAGE BM WHERE BM.SEND_FLAG = '0'";
		String updatesql = "UPDATE T_BUSINESS_MESSAGE SET SEND_FLAG = ?, REPLY_CODE = ?, SEND_TIME = GETDATE() WHERE MESSAGE_ID = ?";
		while (continued) {
			final List<Map<String, Object>> messages = baseJdbcDao.jdbcTemplate().queryForList(querysql);
			if (messages.size() < 50) {
				continued = false;
			}
			SmsAlignment alignment = new SmsAlignment();
			List<Long> alignmentids = new ArrayList<Long>();
			final Map<Long, Map<String, Object>> msges = new HashMap<Long, Map<String, Object>>(messages.size());
			for (int i = 0; i < messages.size(); i++) {
				Map<String, Object> message = messages.get(i);
				msges.put((Long) message.get("MESSAGE_ID"), message);

				if (alignment.getContent().length() + message.get("MESSAGE").toString().length() < 997) {
					alignment.push(message.get("MESSAGE").toString(), message.get("RECEIVE_TEL").toString());
					alignmentids.add((Long) message.get("MESSAGE_ID"));
				} else {
					String successFlag = sendAlignment(alignment) ? Status.SMS.sendSuccess : Status.SMS.sendFail;
					for (Long messageId : alignmentids) {
						msges.get(messageId).put("SEND_FLAG", successFlag);
						msges.get(messageId).put("REPLY_CODE", alignment.getReplyCode());
					}
					alignment.clear();
					alignmentids.clear();

					alignment.push(message.get("MESSAGE").toString(), message.get("RECEIVE_TEL").toString());
					alignmentids.add((Long) message.get("MESSAGE_ID"));
				}
				if (i == messages.size() - 1) {
					String successFlag = sendAlignment(alignment) ? Status.SMS.sendSuccess : Status.SMS.sendFail;
					for (Long messageId : alignmentids) {
						msges.get(messageId).put("SEND_FLAG", successFlag);
						msges.get(messageId).put("REPLY_CODE", alignment.getReplyCode());
					}
					alignment.clear();
					alignmentids.clear();
				}
				if (alignment.getReplyCode() < 0) {
					continued = false;
				}
			}
			baseJdbcDao.jdbcTemplate().batchUpdate(updatesql, new BatchPreparedStatementSetter() {
				public int getBatchSize() {
					return messages.size();
				}

				public void setValues(PreparedStatement ps, int i) {
					try {
						ps.setString(1, messages.get(i).get("SEND_FLAG").toString());
						ps.setString(2, messages.get(i).get("REPLY_CODE").toString());
						ps.setLong(3, (Long) messages.get(i).get("MESSAGE_ID"));
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			});
		}
	}
	
	
	public void oneRemainsendsmsBusinessMessage(){
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("oremain");
		String recNum = (String) ApplicationContainer.getSysConfig().get("onremainNum");
		if(recNum=="" || recNum==null){
			return;
		}
		
		String[] strnum = null;	
		
		if(recNum.indexOf(",")>0){
			strnum = recNum.split(",");
		}else{
			strnum = new String[1];
			strnum[0] = recNum;
		}
			
		
		String remainddate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String querySql = "select p.PRACTI_NAME,p.ID_CARD,c.CERT_NUM,c.EFFECT_DATE from T_PRACTI_CERT c,T_PRACTITIONER p "
				+ "where p.PRACTI_ID=c.PRACTI_ID and c.EFFECT_DATE='"+remainddate+"'";
		
		List<Map<String, Object>> certs = baseJdbcDao.jdbcTemplate().queryForList(querySql);
		for(Map<String, Object> cert:certs){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "从业人员："+(String)cert.get("PRACTI_NAME")+",身份证号："+(String)cert.get("ID_CARD")+",证书编号："+(String)cert.get("CERT_NUM")+"的证书截止日期为："+(String)cert.get("EFFECT_DATE")+"离到期时间还有"+remainddays_cert+"天,请及时办理年检；";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}
		
		Date tempdate = DateUtil.transpositionDate(new Date(), Calendar.YEAR, -3);
		String equipdate = DateUtil.changeDateToStr(DateUtil.transpositionDate(tempdate, Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String equipsql = "select t.RECORD_ID,t.EXW_SERIAL,t.EXW_DATE from T_EQUIPMENT t where t.EQUIP_GENERIC='T' and t.STATUS in(0,1,2) and t.EXAMINE_DATE= '"+equipdate+"'";
		
		List<Map<String, Object>> equips = baseJdbcDao.jdbcTemplate().queryForList(equipsql);
		for(Map<String, Object> equip:equips){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "设备编号："+(String)equip.get("RECORD_ID")+",出厂编号："+(String)equip.get("EXW_SERIAL")+
						",的性能检测到期时间为："+DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE)+"离到期时间还有"+remainddays_cert+"天,请及时办理年检。";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}
		
		Date cdate = DateUtil.transpositionDate(new Date(), Calendar.YEAR, -1);
		String compdate = DateUtil.changeDateToStr(DateUtil.transpositionDate(cdate, Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String compsql = "select c.COMPON_SERIAL from T_COMPONENT c where c.status in(0,1,2,3) and c.DEL_FLAG=1 "
				+ "and c.PARACHUTE_FLAG=1 and c.LEFTCAGE_CHECK_DATE='"+compdate+"'";
		List<Map<String, Object>> compons = baseJdbcDao.jdbcTemplate().queryForList(compsql);
		for(Map<String, Object> compon:compons){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "防坠器编号:"+(String)compon.get("COMPON_SERIAL")+"的检测到期时间为："+DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE)
						+"离到期时间还有"+remainddays_cert+"天，请及时办理年检。";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}		
	}
	
	public void twoRemainsendsmsBusinessMessage(){
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("tremain");
		String recNum = (String) ApplicationContainer.getSysConfig().get("twRemainNum");
		if(recNum=="" || recNum==null){
			return;
		}
		
		String[] strnum = null;	
		
		if(recNum.indexOf(",")>0){
			strnum = recNum.split(",");
		}else{
			strnum = new String[1];
			strnum[0] = recNum;
		}
		
		String remainddate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String querySql = "select p.PRACTI_NAME,p.ID_CARD,c.CERT_NUM,c.EFFECT_DATE from T_PRACTI_CERT c,T_PRACTITIONER p "
				+ "where p.PRACTI_ID=c.PRACTI_ID and c.EFFECT_DATE='"+remainddate+"'";
		
		List<Map<String, Object>> certs = baseJdbcDao.jdbcTemplate().queryForList(querySql);
		for(Map<String, Object> cert:certs){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "从业人员："+(String)cert.get("PRACTI_NAME")+",身份证号："+(String)cert.get("ID_CARD")+",证书编号："+(String)cert.get("CERT_NUM")+"的证书截止日期为："+(String)cert.get("EFFECT_DATE")+"离到期时间还有"+remainddays_cert+"天,请及时办理年检；";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}
		
		Date tempdate = DateUtil.transpositionDate(new Date(), Calendar.YEAR, -3);
		String equipdate = DateUtil.changeDateToStr(DateUtil.transpositionDate(tempdate, Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String equipsql = "select t.RECORD_ID,t.EXW_SERIAL,t.EXW_DATE from T_EQUIPMENT t where t.EQUIP_GENERIC='T' and t.STATUS in(0,1,2) and t.EXAMINE_DATE= '"+equipdate+"'";
		
		List<Map<String, Object>> equips = baseJdbcDao.jdbcTemplate().queryForList(equipsql);
		for(Map<String, Object> equip:equips){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "设备编号："+(String)equip.get("RECORD_ID")+",出厂编号："+(String)equip.get("EXW_SERIAL")+
						",的性能检测到期时间为："+DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE)+"离到期时间还有"+remainddays_cert+"天,请及时办理年检。";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}
		
		Date cdate = DateUtil.transpositionDate(new Date(), Calendar.YEAR, -1);
		String compdate = DateUtil.changeDateToStr(DateUtil.transpositionDate(cdate, Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String compsql = "select c.COMPON_SERIAL from T_COMPONENT c where c.status in(0,1,2,3) and c.DEL_FLAG=1 "
				+ "and c.PARACHUTE_FLAG=1 and c.LEFTCAGE_CHECK_DATE='"+compdate+"'";
		List<Map<String, Object>> compons = baseJdbcDao.jdbcTemplate().queryForList(compsql);
		for(Map<String, Object> compon:compons){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "防坠器编号:"+(String)compon.get("COMPON_SERIAL")+"的检测到期时间为："+DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE)
						+"离到期时间还有"+remainddays_cert+"天，请及时办理年检。";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}		
	}
	
	public void thrRemainsendsmsBusinessMessage(){
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("thRemain");
		String recNum = (String) ApplicationContainer.getSysConfig().get("thRemainNum");
		if(recNum=="" || recNum==null){
			return;
		}
		String[] strnum = null;	
		
		if(recNum.indexOf(",")>0){
			strnum = recNum.split(",");
		}else{
			strnum = new String[1];
			strnum[0] = recNum;
		}	
		
		String remainddate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String querySql = "select p.PRACTI_NAME,p.ID_CARD,c.CERT_NUM,c.EFFECT_DATE from T_PRACTI_CERT c,T_PRACTITIONER p "
				+ "where p.PRACTI_ID=c.PRACTI_ID and c.EFFECT_DATE='"+remainddate+"'";
		
		List<Map<String, Object>> certs = baseJdbcDao.jdbcTemplate().queryForList(querySql);
		for(Map<String, Object> cert:certs){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "从业人员："+(String)cert.get("PRACTI_NAME")+",身份证号："+(String)cert.get("ID_CARD")+",证书编号："+(String)cert.get("CERT_NUM")+"的证书截止日期为："+(String)cert.get("EFFECT_DATE")+"离到期时间还有"+remainddays_cert+"天,请及时办理年检；";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}
		
		Date tempdate = DateUtil.transpositionDate(new Date(), Calendar.YEAR, -3);
		String equipdate = DateUtil.changeDateToStr(DateUtil.transpositionDate(tempdate, Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String equipsql = "select t.RECORD_ID,t.EXW_SERIAL,t.EXW_DATE from T_EQUIPMENT t where t.EQUIP_GENERIC='T' and t.STATUS in(0,1,2) and t.EXAMINE_DATE= '"+equipdate+"'";
		
		List<Map<String, Object>> equips = baseJdbcDao.jdbcTemplate().queryForList(equipsql);
		for(Map<String, Object> equip:equips){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "设备编号："+(String)equip.get("RECORD_ID")+",出厂编号："+(String)equip.get("EXW_SERIAL")+
						",的性能检测到期时间为："+DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE)+"离到期时间还有"+remainddays_cert+"天,请及时办理年检。";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}
		
		Date cdate = DateUtil.transpositionDate(new Date(), Calendar.YEAR, -1);
		String compdate = DateUtil.changeDateToStr(DateUtil.transpositionDate(cdate, Calendar.DATE, remainddays_cert), DateUtil.LINK_DISPLAY_DATE);
		String compsql = "select c.COMPON_SERIAL from T_COMPONENT c where c.status in(0,1,2,3) and c.DEL_FLAG=1 "
				+ "and c.PARACHUTE_FLAG=1 and c.LEFTCAGE_CHECK_DATE='"+compdate+"'";
		List<Map<String, Object>> compons = baseJdbcDao.jdbcTemplate().queryForList(compsql);
		for(Map<String, Object> compon:compons){
			for(String str:strnum){
				BusinessMessage bm = new BusinessMessage();
				String msg = "防坠器编号:"+(String)compon.get("COMPON_SERIAL")+"的检测到期时间为："+DateUtil.changeDateToStr(new Date(), DateUtil.LINK_DISPLAY_DATE)
						+"离到期时间还有"+remainddays_cert+"天，请及时办理年检。";
				bm.setMessage(msg);
				bm.setReceiveTel(str);
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
			}
		}		
	}
	
	public void inspectRemainMessage(){
		int remainddays_cert = (Integer) ApplicationContainer.getSysConfig().get("inspectOverDateRemain");
		
		String remaindate = DateUtil.changeDateToStr(DateUtil.transpositionDate(new Date(), Calendar.DATE, 0-remainddays_cert), DateUtil.DB_STORE_DATE);
		List<Map<String, Object>> inspectList = businessMessageService.queryByScript("remaind.inspectOverDate", remaindate);
		for(Map<String, Object> inspect:inspectList){
				List<Map<String,Object>> list = businessMessageService.queryByScript("terminal.get_currentAppUser", (Long)inspect.get("userId"));
				BusinessMessage bm = new BusinessMessage();
				String msg = (String)inspect.get("projectName")+",楼号:"+(String)inspect.get("buildingnum")+"的设备, 巡检结果为"+(String)inspect.get("inspectResultName")+",已发生7天仍未完成整改，请立即监督处理。";
				bm.setMessage(msg);
				bm.setReceiveTel((String)list.get(0).get("MOBILE"));
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				businessMessageDao.save(bm);
				businessMessageService.sendOnce(bm);
		}
	}
	public void antiFallRemindMessage(){		
		List<Map<String, Object>> inspectList = antiFallDetectionService.queryByScript("remaind.antiFallDate");
		for(Map<String, Object> inspect:inspectList){
				List<Map<String,Object>> listr = corpInfoService.queryByScript("terminal.get_currentAntiFallAppUser", (Long)inspect.get("userId"));
				BusinessMessage bm = new BusinessMessage();
				String msg = "您的"+inspect.get("antiFallNum")+"编号的防坠器将于"+inspect.get("endDate")+"到达检测有效日期，请提前做好相关准备工作！";
				bm.setMessage(msg);
				if(listr.get(0).get("SECURITY_TEL")!=null){
				bm.setReceiveTel((String)listr.get(0).get("SECURITY_TEL"));
				bm.setSenderName("系统消息");
				bm.setSendFlag("0");
				bm.setCreateTime(new Date());
				//businessMessageDao.save(bm);
				businessMessageService.sendOnce(bm);
				}
		}
		
	}
}
