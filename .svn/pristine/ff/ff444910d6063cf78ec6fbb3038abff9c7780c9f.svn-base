/**
 *====================================================
 * 文件名称: IndisNoticeServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2016年8月26日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.IndisNoticeDao;
import com.knight.emms.dao.IndisNoticePractiDao;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.IndisNotice;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.IndisNoticeService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;
import org.apache.commons.lang.StringUtils;

/**
 * @ClassName: IndisNoticeServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2016年8月26日 上午11:12:40
 */
public class IndisNoticeServiceImpl extends BusinessLongPKServiceImpl<IndisNotice> implements IndisNoticeService {

	private IndisNoticeDao indisNoticeDao;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	protected BusinessMessageService businessMessageService;

	@Resource
	private IndisNoticePractiDao indisNoticePractiDao;

	public IndisNoticeServiceImpl(IndisNoticeDao dao) {
		super(dao);
		this.indisNoticeDao = dao;
	}

	private void sendMessage(Map<String, String> mobile, String message) {
		for (Map.Entry<String, String> entry : mobile.entrySet()) {
			if (StringUtils.isBlank(entry.getKey())) {
				continue;
			}
			BusinessMessage bm = new BusinessMessage();
			bm.setMessage(message);
			bm.setReceiveName(entry.getValue());
			bm.setReceiveTel(entry.getKey());
			bm.setSenderName("系统消息");
			bm.setSendFlag("0");
			bm.setCreateTime(new Date());
			businessMessageService.sendOnce(bm);
		}
	}

	private void putMessageReceive(Map<String, String> mobile, String tel, String name) {
		if (StringUtils.isBlank(tel)) {
			return;
		}
		String[] split = tel.split(",");
		for (String s : split) {
			mobile.put(s, name);
		}
	}

	private void sendAcceptMessage(IndisSchema indisSchema, String message) {
		// 发送信息 市场联系方式、资产联系方式、技术联系方式、维保联系方式、工程联系方式、安全联系方式、责任人联系方式1、责任人联系方式2、责任人联系方式3
		Map<String, String> mobile = new HashMap<String, String>();
		CorpInfo corpInfo = corpInfoService.get(indisSchema.getInEnt());
		putMessageReceive(mobile, corpInfo.getMarketTel(), corpInfo.getMarket());
		putMessageReceive(mobile, corpInfo.getCapitalTel(), corpInfo.getCapital());
		putMessageReceive(mobile, corpInfo.getTechnologyTel(), corpInfo.getTechnology());
		putMessageReceive(mobile, corpInfo.getMaintenanceTel(), corpInfo.getMaintenance());
		putMessageReceive(mobile, corpInfo.getEngineeringTel(), corpInfo.getEngineering());
		putMessageReceive(mobile, corpInfo.getSecurityTel(), corpInfo.getSecurity());
		putMessageReceive(mobile, corpInfo.getDutymanTel1(), corpInfo.getDutyman());
		putMessageReceive(mobile, corpInfo.getDutymanTel2(), corpInfo.getDutyman());
		putMessageReceive(mobile, corpInfo.getDutymanTel3(), corpInfo.getDutyman());
		sendMessage(mobile, message);
	}

	@Override
	public List<IndisNotice> queryTranslateAllFull(QueryFilter filter) {
		List<IndisNotice> notices = indisNoticeDao.getAll(filter);
		for (IndisNotice notice : notices) {
			CodeServiceImpl.translate(notice.getIndisSchema());
			CodeServiceImpl.translate(notice.getIndisSchema().getEquipment());
		}
		return notices;
	}

	@Override
	public IndisNotice getTranslateFull(Long noticeId) {
		IndisNotice notice = indisNoticeDao.get(noticeId);
		CodeServiceImpl.translate(notice.getIndisSchema());
		CodeServiceImpl.translate(notice.getIndisSchema().getEquipment());
		return notice;
	}

	@Override
	public void saveOrMergeForEdit(IndisNotice indisNotice) {
		if (indisNotice.getNoticeId() == null) {
			super.save(indisNotice);
		}
		indisNotice.setSubIndisNotice();
		indisNoticeDao.merge(indisNotice);
		String message = null;
		if (SystemConstant.MODULE_EQUIP_INSTALL.equals(indisNotice.getRelateModule())) {
			message = indisNotice.getIndisSchema().getProject().getProjectName() + "的安装告知已办理完成，请悉知！";
		} else {
			message = indisNotice.getIndisSchema().getProject().getProjectName() + "的拆卸告知已办理完成，请悉知！";
		}
		sendAcceptMessage(indisNotice.getIndisSchema(), message);
	}

	@Override
	public void deletePracti(Long noticePractiId) {
		indisNoticePractiDao.remove(noticePractiId);
	}

}
